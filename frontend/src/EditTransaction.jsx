import {useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import { backendUrl } from "./tools";

export default function EditTransaction(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [transactionData, setTransactionData] = useState({title:"", amount:0, category:""});

    useEffect(()=>{
        const getTransactionData = async ()=>{
            const unProcessed = await fetch(`${backendUrl}/${id}`, {
                method : "GET"
            });
            const processed = await unProcessed.json();
            setTransactionData(processed.body);
        } 
        getTransactionData();
    },[])

    function trgrChange(e){
        if(e.target.name=="amount" && (e.target.value== "")){ 
            setTransactionData((prev)=>{ return {...prev, [e.target.name]: 0}}); 
        }
        else{
            setTransactionData((prev)=>{ return {...prev, [e.target.name] : e.target.value};})
        }
    }

    async function trgrSubmission(e){
        e.preventDefault();
        const unProcessed = await fetch(`${backendUrl}/${id}`, {
            method : "PUT",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify(transactionData)
        })
        const processed = await unProcessed.json();
        if(processed.status==true){
            setTimeout(()=>{
               alert("Updated Successfully");
               navigate('/');
            },1000)
        }
        else{
            alert(processed.body);
            console.log(processed)
        }
    }

  

    return(
        <div className="pages flex flex-col gap-10">
            <h1 className="text-2xl py-5">Edit Transaction</h1>
            <form className="forms" onSubmit={(e)=>{trgrSubmission(e)}}>

                  <div className="inputFeildsWrappers">
                     <label>Title</label>
                     <input  onChange={trgrChange} name="title"  className="inputFeilds md:w-[400px] w-[200px]" type="text" value={transactionData.title} placeholder="Enter Your Title"/>
                  </div>

                  <div className="inputFeildsWrappers">
                     <label>Amount</label>
                     <input  onChange={trgrChange} name="amount"  className="inputFeilds md:w-[400px] w-[200px]"  type="number" value={transactionData.amount} placeholder="Enter Your Amount"/>
                  </div>

                  
                  <div className="inputFeildsWrappers">
                     <label>Category</label>
                     <select onChange={trgrChange} name="category"  className="inputFeilds md:w-[400px] w-[200px]" value={transactionData.category}>
                            <option  value="Income" className="w-full text-center bg-black" >Income</option>
                            <option  value="Expense" className="w-full text-center bg-black" >Expense</option>
                            <option  value="Saving" className="w-full text-center bg-black" >Saving</option>
                      </select>
                  </div>

                  <button type="submit" className="w-full bg-black  text-white rounded-[4px] my-5 py-1  shadow-[0px_2px_5px_black] hover:scale-[1.01] transition-[200ms_ease-in-out]">Submit</button>

                   <div className="w-full flex justify-around">
                    <button type="button" className="min-[780px]:text-[15px] text-[12px] flex items-center gap-2 cursor-pointer  bg-black px-2 py-1  text-white rounded-[4px]"><Link to={`/`}            className="flex gap-1 underline items-center"><img   className="h-4" src="/backIcon.png"/>{`Go Back`}</Link></button>
                    <button type="button" className="min-[780px]:text-[15px] text-[12px] flex items-center gap-2 cursor-pointer  bg-black px-2 py-1  text-white rounded-[4px]"><Link to={`/${id}/delete`} className="flex gap-1 underline items-center"><img  className="h-4" src="/deleteIcon.png"/>{`Delete`}</Link></button>
                   </div>
                
            </form>
        </div>
    
    )
}
