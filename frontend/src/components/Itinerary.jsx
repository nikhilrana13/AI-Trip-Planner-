
import React from 'react'
import { FaPlaneDeparture, FaMapMarkerAlt, FaRegCalendarAlt, FaUserFriends, FaMoneyBillWave } from 'react-icons/fa';

const Itinerary = ({id,destination,bgimage,days,budget,traveltype,itinerary}) => {
    
    
  return (
    <div className="  max-w-4xl  mx-auto gap-3 px-2 sm:px-6 py-10">
    <h1 className="text-2xl sm:text-4xl py-2 font-bold text-gray-500 flex items-center gap-3">
      <FaPlaneDeparture /> {destination} Trip
    </h1>
    
    {/* Trip Details */}
    <div key={id}  className="mt-6  border relative   bg-gray-100 p-6 rounded-lg shadow-lg space-y-4 bg-cover bg-no-repeat bg-center text-gray-200 " style={{ backgroundImage: `url(${bgimage})` }}>

     {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-transparent rounded-lg"></div>

     <div className='flex relative z-10 flex-col  p-2 px-3 gap-2'>
     <p className="text-lg flex items-center gap-2">
        <FaMapMarkerAlt className="text-red-500" /> <strong className='text-white'>Destination:</strong> {destination}
      </p>
      <p className="text-lg flex items-center gap-2">
        <FaRegCalendarAlt className="text-green-500" /> <strong className='text-white'>Duration:</strong> {days} days
      </p>
      <p className="text-lg flex items-center gap-2">
        <FaUserFriends className="text-purple-500" /> <strong className='text-white'>Travel Type:</strong> {traveltype}
      </p>
      <p className="text-lg flex items-center gap-2">
        <FaMoneyBillWave className="text-yellow-500" /> <strong className='text-white'>Budget:</strong> {budget}
      </p>

     </div>
     
    </div>

   
    {/* AI Generated Itinerary */}
    <div className="mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Let AI Craft Your Next Adventure! 🤖🏕️</h2>
      <div className="p-0 sm:p-6  rounded-lg  space-y-6">

      {itinerary && typeof itinerary === "string" ? ( 
         <div className="  p-0 sm:p-6 rounded-lg  leading-10 space-y-4">
        {itinerary
        .split("\n")  // remove line breaks
        .map(line => line.trim())  // Extra spaces remove 
        .filter(line => line !== "") // Empty lines remove 
        .map((line, index) => (
          <p key={index} className="text-sm sm:text-base leading-10 md:leading-[3rem]   font-[500]">
            {line.includes("Day") ? (
              <span className="font-bold text-[1rem] my-5 text-pink-500 sm:text-[2rem]">{line.replace(/\*/g, "")} </span>
            ) : (
              <span> {line.replace(/\*/g, "")}</span>
            )}
          </p>
        ))}
    </div>
  ) : (
    <p className="text-lg text-gray-600 text-center">⚠️ No itinerary available for this trip.</p>
  )}
      </div>
    </div>
  </div>
  )
}

export default Itinerary
