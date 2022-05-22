import React,{useState,useEffect} from "react";
import del from './../icons/delete.png';
import edit from './../icons/pencil.png';
import './Form.css';
import './Table.css';
import {Link} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EventTable = () => {
  const [data, setData] = useState([]);
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
  console.log(date);


  const loadData = async()=>{
  const response = await axios.get("/api/fetchevents");
  setData(response.data);
  };

  useEffect(()=>{
loadData();
  },[]);

  const deleteEvent = (event_id) => {
    if (window.confirm("Are you sure you want to delete")) {
      axios.delete(`/api/delete/${event_id}`);
      toast.success("Event deleted successfully");
      
    }
  }

  return (
    <div className="table-responsive">
      <table className="table ">
        <thead className="table-dark tabhead">
          <tr>
          <th scope="col">No</th>
            <th scope="col">Event</th>
            <th scope="col">Venue</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i)=>{
            const evdate = `${(new Date(item.event_date).toLocaleDateString())}`;

            if (date < evdate ) {
              window.status = "Upcoming";
              window.display = "text-info";
            }else if(date === evdate){
              window.status = "Happening";
              window.display = "text-warning";
            } else {
              window.status = "Past event";
              window.display = "text-danger";
            }
            return(
              <tr key={item.event_id}>
                <th scope="row">{i+1}</th>
                <td>{item.name}</td>
                <td>{item.venue}</td>
                <td>{evdate}</td>
                <td className={`${window.display}`}>{window.status}</td>
                <td colSpan="3">
                  <Link to={`/${item.event_id}`}>
                  <button className="btn  btn-edit"><img src={edit} className="bg-success" alt="edit" /></button>
                  </Link>
                  <button className="btn btn-trash " onClick={()=>deleteEvent(item.event_id)}><img src={del} className="bg-danger" alt="delete"/></button>
                </td>
              </tr>
            )
        })}
        </tbody>
      </table>
      <p></p>
    </div>
  );
};

export default EventTable;
