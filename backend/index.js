const express = require("express");
const app = express();
const cors = require("cors");
const setDbConnection = require("./Models/DB.js");
const Routes = require("./Routes/Routes.js");

app.listen(8080);

app.use(cors( {origin: true,
   methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


setDbConnection().then(()=>{ console.log("Database Connected")}).catch((err)=>{ console.log(err)});

app.use("/transactions",Routes)

module.exports = app;