import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from "./component/Home"; 

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <div className="card">
      <div className="tools">
    <div className="circle">
      <span className="red box"></span>
    </div>
    <div className="circle">
      <span className="yellow box"></span>
    </div>
    <div className="circle">
    <span className="green box"></span>
    </div>
    </div>
        <div className="card-body">
        <ToastContainer  position="top-center"/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
