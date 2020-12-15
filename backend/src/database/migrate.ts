import neo4j, { Transaction } from 'neo4j-driver';
import httpGet, { NodeData } from '../services/client';
import ConnectionDriver from './connection_driver';

const url = 'https://gist.githubusercontent.com/leefreemanxyz/903b8d090e8cb7caa82ab2ebf17c6a35/raw/f85c3ddb9b218515b88eb8f723fc05f257bed468/nerf-herders-test-data';

async function extract() {
  return httpGet(url);
}

async function transform(nodeData: NodeData[]) {
  return nodeData.map((node) => ({
    name: node.name,
    description: node.description,
    parent: node.parent ?? node.parentId,
  }));
}

async function load(nodeData: NodeData[]) {
  const driver = ConnectionDriver.getConnection();
  const writeSession = driver
    .session({ defaultAccessMode: neo4j.session.WRITE });

  await writeSession.writeTransaction(async (tx: Transaction) => {
    await tx.run('MATCH (n:Node) DETACH DELETE n');
    await tx.run(`UNWIND $nodes AS node
            CREATE (n:Node) 
            SET n.name=node.name, n.description=node.description
            WITH n, node.parent as nodeParent
            MATCH (parent:Node {name:nodeParent})
            CREATE (n)-[:CHILD]->(parent)`, { nodes: nodeData });
  }).catch((error) => console.log(error));

  await writeSession.close();
  await ConnectionDriver.close();
}

const migrate = async () => {
  await extract()
    .then((response: NodeData[]) => transform(response))
    .then((response: NodeData[]) => load(response))
    .then(() => console.log('Data was correctly migrated'));
};

migrate()
  .catch((err) => console.log(err.message));
