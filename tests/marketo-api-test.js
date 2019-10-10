//defining global vars
const fetch = require('node-fetch');




/**
  Description checks if there is an account with email made after given date and time.

  @param config.dateTime date and time used to get paging access_token
  @param config.email email of account were checking for
  @param config.domain domain to make api requests
  @param config.client_id
  @param client_secret

  @return {bool} whether or not account with email exists
*/
async function run(config) {
  const { dateTime, email, domain, client_id, client_secret } = config;
  const requestURL = domain + '/rest/v1/activities.json?activityTypeIds=2&nextPageToken=' + await getPagingToken(dateTime, domain, client_id, client_secret);
  const headers = {
    headers: {
      "Authorization": "Bearer " + await getAccessToken(domain, client_id, client_secret)
    }
  }
  const accounts = await getJsonResponse(requestURL, headers);
  for (let account of accounts["result"]) {
    if(account["attributes"][1]["value"].includes("<expected email here>")) {
      return true;
    }
  }
  return false;
}



/**
  Description: gets API access token
  @param domain
  @param client_id
  @param client_secret

  @return {string} access token
*/
async function getAccessToken(domain, client_id, client_secret) {
  const requestURL = domain + '/identity/oauth/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret;
  const data = await getJsonResponse(requestURL);
  return data["access_token"];
}



/**
  Description: gets paging token based on date and time

  @param dateTime date and time used to get paging token
  @param domain
  @param client_id
  @param client_secret

  @return {string} paging token
*/
async function getPagingToken(dateTime , domain, client_id, client_secret) {
  const requestURL = domain + '/rest/v1/activities/pagingtoken.json?sinceDatetime=' + dateTime;
  const headers = {
    headers: {
      "Authorization": "Bearer " + await getAccessToken(domain, client_id, client_secret)
    }
  }
  const data = await getJsonResponse(requestURL, headers);
  return data["nextPageToken"];
}

/**
  Description: gets JSON data from a given URL

  @param url url of JSON data
  @param headers headers to used in the request

  @return {bool} whether or not account with email exists
*/
async function getJsonResponse(url, headers) {
  const response = await fetch(url, headers);
  const data = await response.json();
  return data;
}
module.exports.run = run;
