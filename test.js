var ID3A = require('./id3-algorithm');

let test = new ID3A({
  titles: ['cielo', 'barometro', 'viento'],
  data: [
    ['limpio', 'nublado', 'nublado', 'limpio', 'nublado', 'nublado', 'nublado', 'limpio'],
    ['subiendo', 'subiendo', 'estable', 'bajando', 'bajando', 'subiendo', 'bajando', 'subiendo'],
    ['norte', 'sur', 'norte', 'norte', 'norte', 'norte', 'sur', 'sur']
  ],
  classes: ['no', 'si', 'si', 'no', 'si', 'si', 'no', 'no']
});

let res = test.getTree();
console.log(res);

console.log('=======================================');
console.log('=======================================');

console.log(test.getRules());