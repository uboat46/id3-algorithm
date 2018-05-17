import Table from './table';
import DFS from './dfs';
import id3 from './id3';

/**
 * id3-algorithm class
 * @author uboat46
 */
export default class ID3A {
  /**
  * Constructor a new id3-algorithm class.
  * @param {Obj} options - options for a new ID3A
  * options = {
  *   titles: - Array of Strings fot the titles of a set,
  *   data: - Array of arrays of data for each of the titles,
  *   classes: data for the classes of every data array for every title
  * }
  */
  constructor (options) {
    this.id3 = new id3(new Table(options.titles, options.data, options.classes));
  }

  /**
  * Creates an id3 tree
  * @returns {Obj} and object containing the result of the id3-algorithm
  */
  getTree() {
    return this.id3.getTree();
  }

  /**
  * Returns the rules of an id3-algorithm
  * @returns {Array} and array containing the rules of the id3-algorithm
  */
  getRules() {
    let dfs = new DFS(this.id3.getTree());
    return dfs.getRules();
  }
}