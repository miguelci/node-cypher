import neo4j from 'neo4j-driver';
import Node from '../entities/node';
import Tree from '../entities/tree';
import ConnectionDriver from './connection_driver';

export type NodeObject = {
  parent: { name: string; description: string; };
  child: { name: string; description: string; };
};

class Load {
  tree: Tree;

  constructor() {
    this.tree = new Tree();
  }

  private readDataFromDatabase = async (): Promise<NodeObject[]> => {
    const driver = ConnectionDriver.getConnection();
    const readSession = driver.session({ defaultAccessMode: neo4j.session.READ });

    const result = await readSession.readTransaction(async (tx) => {
      const queryResult = await tx.run('MATCH n=(:Node)<-[:CHILD]-(:Node) RETURN n');
      return queryResult.records.map((record) => {
        const node = record.get('n');

        return {
          parent: node.start.properties,
          child: node.end.properties,
        };
      });
    });

    await readSession.close();

    return result;
  };

  async start() {
    return this.readDataFromDatabase()
      .then((nodes: NodeObject[]): Node | null => {
        nodes.forEach((node: NodeObject) => {
          if (this.tree.root === null) {
            const parentNode = new Node(node.parent.name, node.parent.description);
            this.tree.insert(parentNode);
          }

          const child = new Node(node.child.name, node.child.description);
          this.tree.insert(child, node.parent.name);
        });
        return this.tree.root;
      })
      .catch((err) => console.log(err));
  }
}

export default Load;
