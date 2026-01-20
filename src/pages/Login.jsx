import {useState} from "react";
export default function Login({login}){
 const [u,setU]=useState("");
 const [p,setP]=useState("");
 return(
  <div className="h-screen flex justify-center items-center">
   <div className="p-10 bg-white">
    <input placeholder="Username" onChange={e=>setU(e.target.value)}/>
    <input type="password" placeholder="Password" onChange={e=>setP(e.target.value)}/>
    <button onClick={()=>u==="admin"&&p==="1234"?login():alert("Invalid")}>Login</button>
   </div>
  </div>
 )
}
