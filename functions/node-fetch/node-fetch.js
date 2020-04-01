/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  try {
    var endpoint = event.path.replace('/.netlify/functions/node-fetch/','') + '?'
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      endpoint += `${key}=${value}&`
    }
    const response = await fetch(endpoint, {
      headers: { 
        'Authorization': event.headers.authorization,
        //'Content-Type': event.header.contentType 
      } 
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ response: err.message })
    }
  }
}
