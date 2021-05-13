1. Go Google could platform choose a project or create a new one.
2. Add GSC libray
3. Set up the necessary scopes and redirection URL from OAuth consent screen. 
4. Create the OAuth Client Id credentials
5. After following step #4 you can donwload the json file conatining the necessary credentials. (name it credentials.json)
6. Go the local project and install the required dependencies by running **npm install** 
7. Create pending.txt file and append the list of desired domains to use GSC (one domain on each line). 
8. Convert pending.txt to a javascript array and put it inside a new file called pending.json, you can do it by running **node convert_txt_to_json.js** (make sure you have followed step #7)
9. Add the list of domains to GSC by running **node app.js**
10. You can verify if the sites were added by running ***node list_added_sites.js** This script will log all the sites using GSC