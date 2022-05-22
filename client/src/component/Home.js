import React from "react";
import EventTable from "./EventTable";
import EventForm from "./EventForm";


const Home = () => {
  return (
    <div>
      <h1 className="text-warning text-center mb-4">
        Event<span className="text-success text-sm">Manager</span>
      </h1>
      <EventForm />
      <EventTable />
    </div>
  );
};

export default Home;


