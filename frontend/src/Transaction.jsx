import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { backendUrl } from "./tools";
import Chart from "./Chart";


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

        <header className="w-full flex justify-between items-center sticky top-0.1 py-5 px-5 shadow-[0px_1px_10px_black] border-[1px] border-black bg-black text-amber-50 box-border">
                <h1 className="min-[780px]:text-[15px] text-[12px] text-nowrap">{ `Overall : ₹ 
                    ${ 
                      (transactionData.income.length>0 || transactionData.expense.length>0 || transactionData.saving.length>0) ? 
                          (
                            transactionData.income.reduce((sum, val) =>{ return  sum + Number(val.amount)}, 0) +
                            transactionData.saving.reduce((sum, val) =>{ return  sum + Number(val.amount)}, 0) -
                            transactionData.expense.reduce((sum, val) =>{ return sum + Number(val.amount)}, 0)
                          ) : 0
                    } `}
                </h1> 

                <button className="bg-white px-2 py-1 rounded-[4px] hover:bg-[antiquewhite] text-black"><Link className="flex items-center gap-1 hover:scale-[1.01] transition-[100ms_ease-in-out] min-[780px]:text-[15px] text-[12px] text-nowrap" to={'/add'}><img src="/addIcon.png" className="h-5"/>Add</Link></button> 

               
        </header>

         <main className="h-full w-full"> 

              <section className=" w-full flex justify-center pt-2 pb-10">
                       <Chart chartData={transactionData}/>
              </section>

               <div className="h-full w-full flex min-[780px]:flex-row flex-col box-border px-2.5">


                      <div className="h-full w-full flex flex-col px-2">
                          <h1 className="w-full text-center min-[780px]:text-2xl text-[18px] mt-10 mb-5 transactionSections">{`Income : ₹ ${ (transactionData.income.length>0)? transactionData.income.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                          <ul className="flex flex-col gap-5">
                             {
                              (transactionData.income.length>0)?
                               transactionData.income.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard  border-[1px] border-amber-50 py-1 flex flex-col  box-border ">
                                         <ul className="px-2">
                                           <div className="w-full flex justify-between py-2 bg-black text-amber-50 box-border px-2 rounded-[4px]">
                                                 <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                 <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                           </div>
                                           <li className="w-full text-center py-5 min-[780px]:text-2xl text-[20px]">{i.title}</li>
                                         </ul>
                                         <div className="w-full flex justify-between  py-1 px-2">
                                                <button className="min-[780px]:text-[15px] text-[12px]">{`Amount : ₹ ${i.amount} `}</button>
                                                <button className="min-[780px]:text-[15px] text-[12px] flex items-center gap-2 cursor-pointer bg-black px-2 py-1  text-white rounded-[4px]" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
                                         </div>
                                         </li>);
                               }):<h1 className="w-full text-center">No Income</h1>
                              }
                          </ul>
                      </div>

                      <div className="h-full w-full flex flex-col px-2">
                          <h1 className="w-full text-center min-[780px]:text-2xl text-[18px] mt-10 mb-5 transactionSections">{`Expenses : ₹ ${ (transactionData.income.length>0)? transactionData.expense.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                          <ul className="flex flex-col gap-5">
                            {
                             (transactionData.expense.length>0)?
                               transactionData.expense.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard border-[1px] border-amber-50 py-1 flex flex-col w-full box-border">
                                        <ul className="px-2">
                                          <div className="w-full flex justify-between py-2 bg-black text-amber-50 box-border px-2 rounded-[4px]" >
                                                <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                          </div>

                                          <li className="w-full text-center py-5 min-[780px]:text-2xl text-[20px]">{i.title}</li>   

                                       </ul>
                                        <div className="w-full flex justify-between  py-1 px-2">
                                               <button className="min-[780px]:text-[15px] text-[12px]">{`Amount : ₹ ${i.amount}`}</button>
                                               <button className="min-[780px]:text-[15px] text-[12px] flex items-center gap-2 cursor-pointer  bg-black px-2 py-1  text-white rounded-[4px]" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
                                        </div>
                                        </li>);
                               }):<h1 className="w-full text-center">No Expense</h1>
                            }
                          </ul>
                      </div>
                     
                      <div className="h-full w-full flex flex-col px-2">
                        <h1 className="w-full text-center min-[780px]:text-2xl text-[18px] mt-10 mb-5 transactionSections">{`Saving : ₹ ${ (transactionData.income.length>0)? transactionData.saving.reduce((sum, val)=>{ return sum + Number(val.amount)},0):0 }`}</h1>
                         <ul className="flex flex-col gap-5">
                          {
                           (transactionData.saving.length>0)?
                               transactionData.saving.map((i)=>{
                                 return( <li key={i._id} className=" transactionCard border-[1px] border-amber-50 py-1 flex flex-col w-full box-border">
                                        <ul className="px-2">
                                          <div className="w-full flex justify-between py-2 bg-black text-amber-50 box-border px-2 rounded-[4px]">
                                                <li className="text-[12px]">{`Date : ${i.date.split('T')[0]}` }</li>
                                                <li className="text-[12px]">{`Category : ${i.category}`}</li>
                                          </div>

                                          <li className="w-full text-center py-5 min-[780px]:text-2xl text-[20px]">{i.title}</li>

                                        </ul>
                                        <div className="w-full flex justify-between  py-1 px-2">
                                              <button className="min-[780px]:text-[15px] text-[12px] ">{`Amount : ₹ ${i.amount} `}</button>
                                              <button className="min-[780px]:text-[15px] text-[12px] flex items-center gap-2 cursor-pointer  bg-black px-2 py-1  text-white rounded-[4px]" onClick={()=>{ trgrEdit(i._id)}}><img src="/editIcon.png" className="h-4"/>Edit</button>
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



