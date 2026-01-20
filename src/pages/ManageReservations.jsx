import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageReservations() {
  const [data,setData]=useState([]);
  const [edit,setEdit]=useState(null);

  useEffect(()=>{
    load();
  },[]);

  const load=()=>{
    axios.get("http://localhost:8080/api/reservations")
    .then(res=>setData(res.data));
  }

  const remove=id=>{
    axios.delete(`http://localhost:8080/api/reservations/${id}`)
    .then(()=>load());
  }

  const save=()=>{
    axios.put(`http://localhost:8080/api/reservations/${edit.reservationId}`,edit)
    .then(()=>{
      setEdit(null);
      load();
    })
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl mb-4">Manage Reservations</h2>

      <table className="w-full border">
        <tr className="bg-gray-200">
          <th>ID</th><th>Guest</th><th>Room</th><th>Days</th><th>Bill</th><th>Action</th>
        </tr>
        {data.map(r=>(
          <tr key={r.reservationId}>
            <td>{r.reservationId}</td>
            <td>{r.guestName}</td>
            <td>{r.roomType}</td>
            <td>{r.days}</td>
            <td>{r.totalAmount}</td>
            <td>
              <button onClick={()=>setEdit(r)} className="bg-blue-500 text-white px-2 mr-2">Edit</button>
              <button onClick={()=>remove(r.reservationId)} className="bg-red-500 text-white px-2">Cancel</button>
            </td>
          </tr>
        ))}
      </table>

      {edit && (
        <div className="mt-6 bg-gray-100 p-5 rounded">
          <input className="border p-2 mr-2" value={edit.guestName}
            onChange={e=>setEdit({...edit,guestName:e.target.value})}/>
          <input className="border p-2 mr-2" value={edit.roomType}
            onChange={e=>setEdit({...edit,roomType:e.target.value})}/>
          <input className="border p-2 mr-2" value={edit.days}
            onChange={e=>setEdit({...edit,days:e.target.value})}/>
          <button onClick={save} className="bg-green-600 text-white px-3">Save</button>
        </div>
      )}
    </div>
  );
}
