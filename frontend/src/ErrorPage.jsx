import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function ErrorPage(){
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{ 
          navigate('/');
        },2000)
    })
    return (
        <div className="bg-black flex h-screen w-full justify-center items-center">
         <h1 className="text-amber-50">404 Page Not Found ! Redirecting... </h1>

        </div>  
    )
}