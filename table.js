/**
 * A criteria table.
 * @author uboat46
 */
module.exports = class Table {
  /**
  * Constructor for a new table.
  * @param {Array} titles - titles of a table
  * @param {Array} data - data for the titles
  * @param {Array} classes - classes for the data
  */
  constructor (titles, data, classes) {
    this.titles = titles;
    this.data = data;
    this.classes = classes;
  }

  /**
  * Remove a title from a table
  * @param {String} title - a title to be removed
  * @returns {Table} new table without a title
  */
  removeTitle(title) {
    let index = this.titles.indexOf(title);
    this.titles.splice(index, 1);
    this.data.splice(index, 1);

    return new Table(this.titles, this.data, this.classes);
  }

  /**
  * Get entropy of a title
  * @param {Array} data - data of the title
  * @returns {Double} entropy of a title
  */
  getEntropyOfTitle(data) {
    let entropy = {};
    let res = 0;
    data.forEach((d, index) => {
      if(entropy[d] == null) {
        if(!entropy.counter) {
          entropy.counter = 1;
        }else {
          entropy.counter += 1;
        }
        entropy[d] = {};
        entropy[d].counter = 1;
        if(entropy[d][this.classes[index]] == null) {
          entropy[d][this.classes[index]] = 1;
        }else {
          entropy[d][this.classes[index]] += 1;
        }
      }else {
        entropy.counter += 1;
        entropy[d].counter += 1;
        if(entropy[d][this.classes[index]] == null) {
          entropy[d][this.classes[index]] = 1;
        }else {
          entropy[d][this.classes[index]] += 1;
        }
      }
    });

    let types = Object.keys(entropy).filter(t => {
      return t != 'counter';
    });

    types.forEach(t => {
      let aux = 0;
      let distinctClasses = Object.keys(entropy[t]).filter(t => {
        return t != 'counter';
      });

      distinctClasses.forEach(c => {
        let v = (entropy[t][c] / entropy[t].counter);
        let g = Math.log2( entropy[t][c] / entropy[t].counter);
        let u = v * g;
        aux += u;
      });
      aux = -aux;
      aux *= entropy[t].counter / data.length;
      res += aux;
    });

    return res;
  }

  /**
  * Get entropy of table
  * @returns {Object} Object that contains the entropy of 
  * the table
  */
  getEntropy() {
    let entropy = {};
    this.titles.forEach((t, index) => {
      entropy[t] = this.getEntropyOfTitle(this.data[index]);
    });
    return entropy;
  }

  /**
  * Get probabilities for each class
  * @returns {Object} Object that contains the probability for 
  * each class of the table.
  */
  getProbabilities () {
    let auxClasses = {};
    this.classes.forEach(c => {
      if(auxClasses[c] == null) {
        auxClasses[c] = 1;
      }else {
        auxClasses[c] += 1;
      }
    });

    for (let c in auxClasses) {
      auxClasses[c] = auxClasses[c] / this.classes.length;
    }

    return auxClasses;
  }

  /**
  * Get titles of table
  * @returns {Array} array of titles of the
  * the table
  */
  getTitles() {
    return this.titles;
  }

  /**
  * Get data of table
  * @returns {Array} array of data of the
  * the table
  */
  getData() {
    return this.data;
  }

  /**
  * Get classes of table
  * @returns {Array} array of classes of the
  * the table
  */
  getClasses() {
    return this.classes;
  }

};