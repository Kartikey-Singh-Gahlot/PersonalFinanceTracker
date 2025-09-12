const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    title :{type:String, required:[true, "Title can't be empty"]},
    amount :{type:Number, required:[true, "Amount can't be empty"]},
    date :{type:Date, default:Date.now()},
    category :{type:String, required:true, enum:["Income", "Expense", "Saving"] },
})


const transactionModel = new mongoose.model("transactions", transactionSchema);

module.exports = transactionModel;