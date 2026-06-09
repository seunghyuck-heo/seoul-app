export default async (request, context) => {
  const url = new URL(request.url);
  const targetUrl = 'http://openapi.seoul.go.kr:8088' + url.pathname.replace('/api', '') + url.search;

  const response = await fetch(targetUrl);
  const data = await response.text();

  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
