const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/webmasters'];

const TOKEN_PATH =  "./token.json";
const CREDENTIALS_PATH = "./credentials.json";

 // Start application
 fs.readFile(CREDENTIALS_PATH, (err, content) => {
   if (err) return console.log('Error loading client secret file:', err.message);
   // Authorize a client with credentials, then call the Google search console API.
   authorize(JSON.parse(content), getSites);
 });

 // Get authorization by Google search console
 function authorize(credentials, callback) {
   
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) 
      {
        return getAccessToken(oAuth2Client, callback);
      
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
 // Request/Update GSC access token 
 function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
   const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', (code) => {
   rl.close();
   oAuth2Client.getToken(code, (err, token) => {
   if (err) return console.error('Error retrieving access token', err);
   oAuth2Client.setCredentials(token);
  
   fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
   });

   callback(oAuth2Client);
  
   });
  });
}

 // Add sites to Google search console
 const getSites = async (auth) => {

  const webmater = google.webmasters({version: 'v3', auth});
  let pending_sites = require('./pending.json');

  pending_sites.forEach( async (site) => {

   try{

    request = await webmater.sites.add({siteUrl:site});
    console.log(`Domain ${site} added`);

   }catch(e){ throw new Error(e.message); }

  });

 }
