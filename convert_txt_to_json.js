const fs = require("fs");
const sites_string = fs.readFileSync('./pending.txt').toString().split("\n");
let sites = [];
for(i in sites_string){
    sites.push(sites_string[i]);
}

fs.writeFile('pending.json', JSON.stringify(sites), function(err){
    if(err){throw new Error(err.message);}
});