/**
 * A simple node.
 * @author uboat46
 */
export default class Node {
  /**
  * Constructor for a new Node.
  * @param {String} title - title of a node
  * @param {Array} children - children of a node
  * @param {Node} father - father of the node
  */
  constructor (title, children, father) {
    this.title = title;
    this.children = children;
    this.father = father;
  }

  /**
  * Add node to children
  * @param {Node} node - a node te be added to children
  */
  add(node) {
    this.children.push(node);
  }

  /**
  * Prints the title
  */
  print() {
    console.log(this.title);
  }
}