'require strict';

const xml2js = require('browser-xml2js');

function listStreams(){
  fetch('/stat')
  .then(response => response.text())
  .then(xml => {
    return new Promise((fulfill,reject) => {
      console.log(`This xml: ${xml}`);
      const jsonStr = xml2js.parseString(xml, (err, res) => {
        if(err){
          return reject(err);
        }
        fulfill(res);
      });
    });
  })
  .then(data => {
    console.log(JSON.stringify(data));
  });
}

module.exports = {
  listStreams
};
