import {useState, useEffect} from "react"
import {useNavigate, Link, useParams} from "react-router-dom"
import { backendUrl } from "./tools";

export default function DeleteTransaction(){

     
    const navigate = useNavigate();
    const {id} = useParams();
    const [transactionData, setTransactionData] = useState({title:"", amount: 0, category:""});


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

    async function trgrDelete(){
      const unProcessed = await fetch(`${backendUrl}/${id}`,{
        method : "DELETE",
      });
      const processed = await unProcessed.json();
      if(processed.status==true){
        setTimeout(()=>{
            alert("Deleted Successfully");
            navigate('/');
        },1000)
      }
      else{
        alert(processed.body.message);
      }
    }

    return(
       <div className="pages flex flex-col gap-10">

            <h1 className="text-2xl py-5">Delete Transaction</h1>

            <form className="forms">
                 <div className="inputFeildsWrappers">
                     <label>Title</label>
                     <input disabled={true} name="title"  className="inputFeilds cursor-not-allowed md:w-[400px] w-[200px]" type="text" value={transactionData.title}/>
                  </div>

                  <div className="inputFeildsWrappers">
                     <label>Amount</label>
                     <input  disabled ={true} name="amount"  className="inputFeilds cursor-not-allowed md:w-[400px] w-[200px]"  type="number" value={transactionData.amount}/>
                  </div>

                  
                  <div className="inputFeildsWrappers">
                     <label>Category</label>
                     <input  disabled={true} type="text"  className="inputFeilds cursor-not-allowed md:w-[400px] w-[200px]" value={transactionData.category} />
                  </div>
                  
                  <div className="flex flex-col w-full gap-2 py-2 ">
                         <h1 className="text-nowrap text-[12px]">Confirm Delete ?</h1>                
                         <div className="flex justify-around w-full">
                             <button type="button" className="hover:scale-[1.05] hover:text-green-600 transition-[200ms_ease-in-out] cursor-pointer text-[15px]  px-3 py-1 flex gap-1min-[780px]:text-[15px] items-center gap-2  bg-black  text-white rounded-[4px]" onClick={trgrDelete}><img src="/rightIcon.png" className="h-5"/>Yes</button>
                             <button type="button" className="hover:scale-[1.05] hover:text-red-600   transition-[200ms_ease-in-out] cursor-pointer text-[15px]  px-3 py-1 min-[780px]:text-[15px]  flex items-center gap-2  bg-black text-white rounded-[4px]"  ><Link to={`/${id}/edit`} className="flex gap-1"><img src="/wrongIcon.png" className="h-5"/>No</Link></button>
                         </div>
                  </div>
                  
            </form>

        </div>
    )
}