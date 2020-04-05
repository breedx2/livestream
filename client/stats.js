'require strict';

const xml2json = require('xml2json');

function listStreams(){
  fetch('/stat')
  .then(response => {
    const jsonStr = xml2json.toJson(response.text());
    return JSON.parse(jsonStr);
  })
  .then(data => {
    console.log(data);
  });
}

module.exports = {
  listStreams
};
