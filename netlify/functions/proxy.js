const http = require('http');

exports.handler = async function(event) {
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const url = 'http://openapi.seoul.go.kr:8088' + path;

  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
          body: data
        });
      });
    }).on('error', (e) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: e.message })
      });
    });
  });
};
