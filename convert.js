const FILE_DIR = './yuque.side'

const { Parser } = require('json2csv');
const fs = require('fs')
let data = JSON.parse(fs.readFileSync(FILE_DIR, 'utf-8'))

const preprocessedData = data['tests']
  .map(test => test.commands)
  .reduce((t,v)=>t.concat(v) , [])

const fields = ['id' ,'comment', 'command' , 'value' ,'target' ];
const opts = { fields };

try {
  const parser = new Parser(opts);
  const csv = parser.parse(preprocessedData);
  // console.log(csv);
  fs.writeFileSync('yuque.csv' , csv);
} catch (err) {
  console.error(err);
}