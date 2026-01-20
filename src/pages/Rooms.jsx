/*import axios from "axios";
import {useEffect,useState} from "react";

export default function Rooms(){
 const [rooms,setRooms]=useState([]);
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [image,setImage]=useState("");

 useEffect(()=>load(),[]);

 const load=()=>axios.get("http://localhost:8080/api/rooms").then(r=>setRooms(r.data));

 const add=()=>{
  axios.post("http://localhost:8080/api/rooms",{name,price,image}).then(load);
 }

 return(
  <div>
   <h2 className="text-xl mb-4">Room Management</h2>
   <input placeholder="Room name" onChange={e=>setName(e.target.value)}/>
   <input placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
   <input placeholder="Image URL" onChange={e=>setImage(e.target.value)}/>
   <button onClick={add}>Add</button>

   <div className="grid grid-cols-3 mt-4">
    {rooms.map(r=>(
      <div key={r.id}>
        <img src={r.image} className="h-32"/>
        <p>{r.name} - Rs.{r.price}</p>
      </div>
    ))}
   </div>
  </div>
 )
}*/
import { useEffect, useState } from "react";
import axios from "axios";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // ✅ Correct way: define async function inside useEffect
    async function fetchRooms() {
      try {
        const res = await axios.get("http://localhost:8080/api/rooms");
        setRooms(res.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    fetchRooms();
  }, []); // empty dependency array → runs once on mount

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.number} - {room.type} - ${room.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

