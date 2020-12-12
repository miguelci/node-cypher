import Node from '../../src/entities/node';

describe('Node', () => {
  it('can correctly create a node', () => {
    const node = new Node('name', 'description');

    expect(node.name).toEqual('name');
    expect(node.description).toEqual('description');
    expect(node.children.length).toEqual(0);
  });

  it('can add new child nodes to a node', () => {
    const node = new Node('name', 'description');

    const childNode = new Node('child', 'child description');
    node.addChildren(childNode);

    expect(node.children.length).toBe(1);
    const child = node.children[0];
    expect(child.name).toEqual('child');
    expect(child.description).toEqual('child description');
    expect(child.children.length).toEqual(0);
  });
});
