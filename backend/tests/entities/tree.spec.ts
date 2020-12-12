import Tree from '../../src/entities/tree';
import Node from '../../src/entities/node';

describe('Tree', () => {
  it('can correctly create a tree', () => {
    const tree = new Tree();
    expect(tree).toBeInstanceOf(Tree);
    expect(tree.root).toBeNull();
  });

  test('first node will be the root', () => {
    const tree = new Tree();
    const node = new Node('root', 'description');

    tree.insert(node);
    expect(tree.root).toBe(node);
    expect(tree.root?.name).toBe('root');
    expect(tree.root?.description).toBe('description');
    expect(tree.root?.children.length).toBe(0);
  });

  test('child node will be the correctly put under root', () => {
    const tree = new Tree();
    const parent = new Node('root', 'description');
    tree.insert(parent);

    const childNode = new Node('child', 'description');
    tree.insert(childNode, parent.name);

    expect(tree.root?.children.length).toBe(1);
    expect(tree.root?.children[0].name).toBe('child');
  });

  test('tree is able to json serialise into the correct format', () => {
    const tree = new Tree();
    const parent = new Node('root', 'description');
    tree.insert(parent);
    const childNode = new Node('child', 'description');
    tree.insert(childNode, parent.name);

    const format = JSON.stringify(tree.root);
    const expectedFormat = '{"name":"root","description":"description","children":[{"name":"child","description":"description","children":[]}]}';
    expect(format).toEqual(expectedFormat);
  });
});
