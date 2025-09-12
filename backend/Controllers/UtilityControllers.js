const TransactionModel = require('../Models/TransactionModel.js');

const getAllTransactions = async (req, res)=>{
   try{
    const dataToSend = await TransactionModel.find({});
    return res.status(200).json({
        status : true,
        body : dataToSend
    })
   }catch(err){
       return res.status(500).json({
        status:false,
        body:err
       })
   }
}

const addNewTransaction = async (req, res)=>{
    const {title, amount, category} =  req.body;
    try{
      const newTransaction = new TransactionModel({title, amount, category});
      const dataToSend = await newTransaction.save();
      return res.status(201).json({
        status : true,
        body : dataToSend
      })
    }catch(err){
      return res.status(500).json({
        status : false,
        body : err
      })
    }
}

const getATransaction = async (req, res)=>{
   const {id} = req.params;
   try{
     const dataToSend = await TransactionModel.findById(id);
     if(dataToSend){
        return res.status(200).json({
         status :true,
         body : dataToSend
        }) 
     }
     return res.status(404).json({
       status : false,
       body :"Transaction Not Found"
     })
   }
   catch(err){
     return res.status(500).json({
      status : false,
      body : err
     })
   }
}

const editATransaction = async (req, res)=>{
  const {id} = req.params;
  const {title, amount, category} = req.body;
  try{
    const dataToSend = await TransactionModel.findByIdAndUpdate(id,{title, amount, category},{ new: true });
    if(dataToSend){
      return res.status(200).json({
        status:true,
        body : dataToSend
      })
    } 
    return res.status(404).json({
      status: false,
      body : "Transaction Not Found"
    })  
  }
  catch(err){
    return res.status(500).json({
      status:false,
      body : err
    })
  }
}

const deleteATransaction = async (req, res)=>{
  const {id} = req.params;
  try{
   const dataToSend = await TransactionModel.findByIdAndDelete(id);
   if(dataToSend){
      return res.status(200).json({
        status : true,
        body : dataToSend
      })
   }
   return res.status(404).json({
     status : false,
     body : "Transaction Not Found"
   })
  }catch(err){
    return res.status(500).json({
      status :false,
      body : err
    });
  }
}




module.exports = {getAllTransactions, addNewTransaction ,getATransaction, editATransaction, deleteATransaction};