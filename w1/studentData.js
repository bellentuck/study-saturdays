let students = [
  { id : 0, name : 'Dan'},
  { id : 1, name : 'Rohan'},
  { id : 2, name : 'Sol'},
  { id : 3, name : 'Ella'},
  { id : 4, name : 'Michael'},
  { id : 5, name : 'Karen'},
];

const idMaker = (function* () {
  let index = 6;
  while(true)
      yield index++;
})();

module.exports = {
  students,
  idMaker
};
