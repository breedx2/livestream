'require strict';

const xml2js = require('browser-xml2js');

function listStreams(){
  fetch('/stat')
  .then(response => {
    return new Promise((fulfill,reject) => {
      const jsonStr = xml2js.parseString(response.text(), (err, res) => {
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
