'require strict';

const xml2js = require('browser-xml2js');
const _ = require('lodash');

async function listStreams(){
  return fetch('/stat')
    .then(response => response.text())
    .then(xml => {
      return new Promise((fulfill,reject) => {
        // console.log(`This xml: ${xml}`);
        const jsonStr = xml2js.parseString(xml, (err, res) => {
          if(err){
            return reject(err);
          }
          fulfill(res);
        });
      });
    })
    .then(data => {
      // console.log(JSON.stringify(data));
      // HARD CODED APP NAME HERE IS "live"
      const apps = _.get(data, 'rtmp.server[0].application[0].live', []);
      return apps.flatMap(app => app.stream[0].name[0]);
    });
}

module.exports = {
  listStreams
};
