var Tree = require('./tree');
var Node = require('./node');

/**
 * dfs class
 * @author uboat46
 */
module.exports = class DFS {
  /**
  * Constructor a new dfs class.
  * @param {Tree} tree - tree in which to perform dfs
  */
  constructor (tree) {
    this.tree = tree;
  }

  /**
  * performs dfs on a tree
  * @param {Node} node - a node in which to run dfs
  * @param {String} res - a string wich contains the rule to be written
  * @param {Array} rules - an aray which contains the discovered rules
  * @returns {Array} and object containing the rules of the id3-algorithm
  */
  dfs(node, rule, rules) {
    if(node.children.length > 1) {
      rule += `if ${node.title} = `;
    }else if( node.children.length == 1 && node.children[0].children.length > 0) {
      rule += `${node.title} && `;
    }else if(node.children.length == 1 && node.children[0].children.length == 0) {
      rule += `${node.title} => `;
    }else if(node.children.length == 0) {
      rule += `${node.title}`;
      rules.push(rule);
    }
    node.discovered = true;
    node.children.forEach(n => {
      if(!n.discovered) {
        this.dfs(n, rule, rules);
      }
    });
    return rules;
  }

  /**
  * Returns the rules of an id3-algorithm
  * @returns {Array} and array containing the rules of the id3-algorithm
  */
  getRules() {
    return this.dfs(this.tree.getHead(), '', []);
  }
}