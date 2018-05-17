var Node = require('./node');

/**
 * A simple node tree.
 * @author uboat46
 */
module.exports = class Tree {
  /**
  * Constructor for a new Tree.
  * @param {Node} head - head of a tree
  */
  constructor (head) {
    this.head = head;
  }

  /**
  * Add node to head
  * @param {Node} node - a node te be added to head
  */
  add(node) {
    this.head.add(node);
  }

  /**
  * get tree head
  * @returns {Node} the head of the tree
  */
  getHead() {
    return this.head;
  }
}