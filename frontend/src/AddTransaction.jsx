import {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { backendUrl } from "./tools";

export default function AddTransaction(){
    const [transactionData, setTransactionData] = useState({title:"", amount: 0, category:"Income" });
    const navgiate = useNavigate();


    function trgrChange(e){
        setTransactionData((prev)=>{
            return {...prev, [e.target.name] : e.target.value};
        })
    }

    async function trgrSubmission(e){
        e.preventDefault();
        const unProcessed = await fetch(backendUrl, {
            method : "POST",
            headers: {"Content-Type": "application/json"} ,
            body:JSON.stringify(transactionData)
        })

        const processed = await unProcessed.json();
        if(processed.status==true){
            setTimeout(()=>{
               alert("Added Successfuly");
               navgiate('/');
            },1000)
            
        }
        else{
            alert(processed.body.message);
            setTransactionData({title:"", amount: 0, category:"Income" });
        }
    }


    return (
        <div className="pages">
          <h1 className="text-2xl py-5">Add Transaction</h1>
          <form action="" className="forms" onSubmit={(e)=>{ trgrSubmission(e)}}>
                <div className="inputFeildsWrappers">
                     <label>Title</label>
                      <input onChange={trgrChange} className="inputFeilds md:w-[400px] w-[200px]" type="text"  name="title" value={transactionData.title} placeholder="Untitled"/>
                </div>

               <div className="inputFeildsWrappers">
                    <label htmlFor="">Amount</label>
                    <input onChange={trgrChange} className="inputFeilds md:w-[400px] w-[200px]" type="number" name="amount" value={transactionData.amount} placeholder="0.00" />
               </div>


               <div className="inputFeildsWrappers">
                    <label htmlFor="">Catergory</label>
                    <select onChange={trgrChange}  name="category" className=" inputFeilds  md:w-[400px] w-[200px]" value={transactionData.category}>
                           <option value="Income" className="w-full text-center bg-black" >Income</option>
                           <option value="Expense" className="w-full text-center bg-black" >Expense</option>
                           <option value="Saving" className="w-full text-center bg-black" >Saving</option>
                     </select>
               </div>
               
                     
                <button type="submit" className="w-full bg-blue-600 border-[1px] border-[#ffffff57] rounded-2xl my-5 py-1  shadow-[0px_2px_5px_black] hover:bg-black">Submit</button>

              
                <div className="w-full flex ">
                     <button type="button" className="text-[12px]"><Link to={`/`}>{`<< Go Back`}</Link></button>
                </div>
          </form>
        </div>
      
    )
}