
const http = require('http');
const { resolve } = require('path');

const server = http.createServer(function(request, response){

    response.setHeader('content-type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.writeHead(200); //status code http 200 / ok

    let dataObj = { id: 123, name: "Eian", email: "ellandis@crimson.ua.edu"};
    let data = JSON.stringify(dataObj);
    response.end(data);
});

server.listen(1234, function(){
    console.log('port 1234')
})