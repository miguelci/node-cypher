import Node from './node';

class Tree {
  root: Node | null = null;

  insert(newNode: Node, parentName: string| null = null): void {
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    if (this.root.name === parentName) {
      this.root.addChildren(newNode);
      return;
    }

    const childParent = this.root.children.find((node: Node) => node.name === parentName);

    if (childParent !== undefined) {
      childParent.addChildren(newNode);
    }
  }
}

export default Tree;
