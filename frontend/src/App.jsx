
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import CreateTrip from "./pages/CreateTrip"
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tripdetails from "./pages/Tripdetails"
import ErrorBoundary from "./pages/ErrorBoundry"
import SavedTrip from "./pages/SavedTrip"




function App() {


  return (
    <ErrorBoundary>
      <div className="px-4 sm:px-[5vw]  md:px-[7vw] lg:px-[9vw] ">
        <ToastContainer position="top-right" autoClose={2000}  />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/createtrip" element ={<CreateTrip />} />
         <Route path="/tripdetails/:id" element={<Tripdetails />} />
         <Route path="/savedtrip" element={<SavedTrip />} />
      </Routes>
    
        
    </div>

    </ErrorBoundary>
    
  )
}

export default App
