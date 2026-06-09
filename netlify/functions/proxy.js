exports.handler = async function(event) {
  const path = event.path.replace('/.netlify/functions/proxy', '');
  const url = 'http://openapi.seoul.go.kr:8088' + path;
  
  try {
    const response = await fetch(url);
    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: data
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
