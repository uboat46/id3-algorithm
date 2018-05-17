var Table = require('./table');
var Tree = require('./tree');
var Node = require('./node');

/**
 * An id3.
 * @author uboat46
 */
module.exports = class id3 {
  /**
  * Constructor for a new id3.
  * @param {Table} table - table to create tree
  */
  constructor (table) {
    this.table = table;
  }
  
  /**
  * Check if object is null
  * @param {Object} obj - object to check
  * @returns {Boolean} is object empty?
  */
  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  /**
  * Creates a copy of the indexes of an array
  * @param {Array} indexes - an array of indexes
  * @param {Array} data - an array to copy
  * @returns {Array} copy of an array from filter indexes
  */
  copyArrayFromIndexes(indexes, data) {
    let newArray = [];
    indexes.forEach(i => {
      newArray.push(data[i]);
    })
    return newArray;
  }

  /**
  * Creates a table from an array of indexes
  * @param {Array} indexes - an array of indexes
  * @returns {Array} array of tables from filter atrr
  */
  createFilteredTable(indexes) {
    let classes = this.table.getClasses();
    let data = this.table.getData();
    let titles = this.table.getTitles();
    let types = {};
    let newData = [];
    let newClasses = this.copyArrayFromIndexes(indexes, classes);

    data.forEach(d => {
      newData.push(this.copyArrayFromIndexes(indexes, d));
    });

    return new Table(JSON.parse(JSON.stringify(titles)), newData, newClasses)
  }

  /**
  * Creates id3 tree
  * @returns {Tree} id3 tree
  */
  getTree() {
    let titles = this.table.getTitles();
    let data = this.table.getData();
    let idTree = null;
    let entropies = this.table.getEntropy();
    let best = {};
    let classes = this.table.getClasses();
    let types = {};

    Object.keys(entropies).forEach(t => { 
      if(this.isEmpty(best)) {
        best.entropy = entropies[t];
        best.title = t;
      }else {
        if(entropies[t] < best.entropy){
          best.entropy = entropies[t];
          best.title = t;
        }
      }
    });

    data[titles.indexOf(best.title)].forEach((c, index) => {
      if(types[c] == null) {
        types[c] = [index];
      }else {
        types[c].push(index);
      }
    });

    idTree = new Tree(new Node(best.title, [], null));

    for(let type in types) {
      let childTable = this.createFilteredTable(types[type]);
      childTable = childTable.removeTitle(best.title);
      let numberOfClasses = Object.keys(childTable.getProbabilities());
      if(numberOfClasses.length > 1) {//there is more than a class, start recursion
        let newNode = new Node(data[titles.indexOf(best.title)][types[type][0]], [], null);
        newNode.add((new id3(childTable).getTree()).getHead() );
        idTree.add( newNode ) ;
      }else {// this type describes a final node ad it to the tree
        let newNode = new Node(data[titles.indexOf(best.title)][types[type][0]], [], null);
        newNode.add(new Node(classes[types[type][0]], [], null));
        idTree.add(newNode);
      }
    }

    return idTree;
  }
}