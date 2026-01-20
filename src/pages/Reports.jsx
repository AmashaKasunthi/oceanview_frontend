import axios from "axios";
import {useEffect,useState} from "react";

export default function Reports(){
 const [data,setData]=useState([]);

 useEffect(()=>{
  axios.get("http://localhost:8080/api/reservations").then(r=>setData(r.data));
 },[]);

 return(
  <table className="w-full border">
   <tr><th>Guest</th><th>Room</th><th>Days</th><th>Total</th></tr>
   {data.map(r=>(
     <tr key={r.id}>
       <td>{r.guestName}</td>
       <td>{r.room.name}</td>
       <td>{r.days}</td>
       <td>{r.total}</td>
     </tr>
   ))}
  </table>
 )
}
