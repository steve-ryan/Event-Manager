import React,{useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
  event:"",
  venue:"",
  date:"",
};

const EventForm = () => {
  const [state,setState] = useState(initialState);
  const {event,venue,date} = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event || !venue || !date) {
      toast.error("Please fill the inputs");
    }else{
      axios.post("/api/postevent",{
        event,
        venue,
        date
      }).then(()=>{
        toast.success(`Event ${event} added successfully`);
        setState({event:"",venue:"",date:""});
      }).catch((error)=> toast.error(error.response.data));
      // setTimeout(()=>history.pushState("/"),500);
    }
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    // sprend out
    setState({...state,[name]:value}) ;
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control control-box"
              id="event"
              name="event"
              placeholder="Event Name .."
              value={event}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              type="text"
              className="form-control control-box"
              id="venue"
              name="venue"
              placeholder="Type Venue name.."
              value={venue}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-3">
            <input
              type="date"
              className="form-control control-box"
              id="date"
              name="date"
              value={date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group col-md-2">
            <input
              type="submit"
              class="btn btn-success form-control btn-form"
              value="Save"
            />
          
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
