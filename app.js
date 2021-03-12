const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname + "/public"));

app.set('views', path.join(__dirname, 'public'));
app.set("view engine", "pug");

app.use("/", function(request, response){
      
    response.render("index");
});

app.listen(3000);