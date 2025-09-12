import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { backendUrl } from "./tools";


export default function Transaction(){

    const navigate = useNavigate();

    const [transactionData, setTransactionData] = useState({income:[], expense:[], saving:[]});
  
    function trgrEdit(id){
      navigate(`/${id}/edit`);
    }


    useEffect(()=>{
      const getTransactionData = async ()=>{
        const unProcessed = await fetch(backendUrl, {
          method :"GET"
        });
        const processed = await unProcessed.json();
        const allTransactions = processed.body;
        setTransactionData((prev)=>{
         
          return {
            ...prev,
            income : allTransactions.filter((i)=>{ return i.category.toLowerCase() == "income"}),
            expense : allTransactions.filter((i)=>{ return i.category.toLowerCase() == "expense"}),
            saving : allTransactions.filter((i)=>{ return i.category.toLowerCase() == "saving"}),
          }
        })
      } 
      getTransactionData();
    
    },[]);
    return(
      <div className="pages overflow-x-hidden">

        <header className="w-full flex justify-between items-center sticky top-0.2 py-3 px-3 shadow-[0px_2px_5px_black]">
                <h1>{ `Overall : ₹ 
                    ${ 
                      (transactionData.income.length>0 || transactionData.expense.length>0 || transactionData.saving.length>0) ? 
                          (
                            transactionData.income.reduce((sum, val) =>{ return  sum + Number(val.amount)}, 0) +
                            transactionData.saving.reduce((sum, val) =>{ return  sum + Number(val.amount)}, 0) -
                            transactionData.expense.reduce((sum, val) =>{ return sum + Number(val.amount)}, 0)
                          ) : 0
                    } `}
                </h1> 

                <button className=""><Link className="flex items-center gap-2" to={'/add'}><img src="/addIcon.png" className="h-5"/>Add Transaction</Link></button> 

               
        </header>

         <main className="h-full w-full"> 
               <div className="h-full w-full flex md:flex-row flex-col">


                      <div className="h-full w-full flex flex-col px-2">
                          <h1 className="w-full text-center md:text-2xl text-[20px] py-5">{`Income : ₹ ${ (transactionData.income.length>0)? transactionData.income.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                          <ul className="flex flex-col gap-5">
                             {
                              (transactionData.income.length>0)?
                               transactionData.income.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard  border-[1px] border-amber-50 py-1 flex flex-col w-full box-border ">
                                        <ul className="px-2">
                                          <div className="w-full flex justify-between py-2">
                                                <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                          </div>

                                          <li className="w-full text-center py-5 text-2xl">{i.title}</li>

                                        </ul>
                                        <div className="w-full flex justify-between  py-1 px-2">
                                               <button className="">{`Amount : ₹ ${i.amount} `}</button>
                                               <button className="flex items-center gap-2 cursor-pointer" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
                                        </div>
                                        </li>);
                               }):<h1 className="w-full text-center">No Income</h1>
                              }
                          </ul>
                      </div>

                      <div className="h-full w-full flex flex-col px-2">
                          <h1 className="w-full text-center md:text-2xl text-[20px] py-5">{`Expenses : ₹ ${ (transactionData.income.length>0)? transactionData.expense.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                          <ul className="flex flex-col gap-5">
                            {
                             (transactionData.expense.length>0)?
                               transactionData.expense.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard border-[1px] border-amber-50 py-1 flex flex-col w-full box-border">
                                        <ul className="px-2">
                                          <div className="w-full flex justify-between py-2">
                                                <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                          </div>

                                          <li className="w-full text-center py-5 text-2xl">{i.title}</li>   

                                       </ul>
                                        <div className="w-full flex justify-between  py-1 px-2">
                                               <button className="">{`Amount : ₹ ${i.amount}`}</button>
                                              <button className="flex items-center gap-2 cursor-pointer" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
                                        </div>
                                        </li>);
                               }):<h1 className="w-full text-center">No Expense</h1>
                            }
                          </ul>
                      </div>
                     
                      <div className="h-full w-full flex flex-col px-2">
                        <h1 className="w-full text-center md:text-2xl text-[20px] py-5">{`Saving : ₹ ${ (transactionData.income.length>0)? transactionData.saving.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                         <ul className="flex flex-col gap-5">
                          {
                           (transactionData.saving.length>0)?
                               transactionData.saving.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard border-[1px] border-amber-50 py-1 flex flex-col w-full box-border">
                                        <ul className="px-2">
                                          <div className="w-full flex justify-between py-2">
                                                <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                          </div>

                                          <li className="w-full text-center  py-5 text-2xl">{i.title}</li>

                                        </ul>
                                        <div className="w-full flex justify-between  py-1 px-2">
                                              <button className="">{`Amount : ₹ ${i.amount} `}</button>
                                              <button className="flex items-center gap-2 cursor-pointer" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
                                        </div>
                                        </li>);
                               }):<h1 className="w-full text-center">No Saving</h1>
                          }
                         </ul>
                      </div>


                </div>                   
         </main>
      </div>
    );
}



