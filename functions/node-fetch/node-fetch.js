/* eslint-disable */
const fetch = require('node-fetch')
exports.handler = async function(event, context) {
  try {
    var endpoint = event.path.replace('/.netlify/functions/node-fetch/','') + '?'
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      endpoint += `${key}=${value}&`
    }
    const response = await fetch(endpoint, {
      headers: { 'Authorization': event.headers.authorization } 
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()
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
