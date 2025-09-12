const routes = require("express").Router();
const  {getAllTransactions, addNewTransaction, getATransaction, editATransaction, deleteATransaction} = require("../Controllers/UtilityControllers.js");

routes.get("/" , getAllTransactions);
routes.post("/",addNewTransaction);

routes.get("/:id", getATransaction);
routes.put("/:id", editATransaction);
routes.delete("/:id", deleteATransaction);

module.exports = routes;