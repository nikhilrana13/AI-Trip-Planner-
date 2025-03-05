import Itinerary from '@/components/Itinerary'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import Footer from '@/components/Footer';
const Tripdetails = () => {
    const {id} = useParams();
    // console.log('id',id);
    const [trip,setTrip] = useState(null);
    const [imageurl,setImageUrl] = useState(null);
    const [loading,setLoading] = useState(true);

     useEffect(()=>{
           const fetchDetails = async()=>{
            try {
                const res = await axios.get(`http://localhost:5000/api/trip/gettrip/${id}`,{withCredentials:true});
                if(res.data.trip){
                    // console.log('trip',res.data.trip);
                    setTrip(res.data.trip);
                    fetchDestinationimage(res.data.trip.destination);
                }
                
              } catch (error) {
                console.error(error);

              }finally{
                setTimeout(() => {
                  setLoading(false);
                  
                }, 1000);
              }
           }

           const fetchDestinationimage = async(destination)=>{
                   try {
                       const res = await axios.get(`https://api.unsplash.com/search/photos`,{
                           params:{
                               query: destination,
                               client_id :"k8m6vcE-nBKmHG9EeR9IrZw9zsNWdTNgEvI8uklqBTs"
                           }
           
                       })
                       setImageUrl(res.data.results[0]?.urls.regular || "https://bespokeindiatravel.co.uk/wp-content/uploads/2018/01/Simla.jpg")
                       
                   } catch (error) {
                       console.log("error fetching images",error);
                   }
               }
           fetchDetails()
         
     },[id])

    

  return (
    <> 
    <div className=' mt-12'> 
        <NavLink to="/savedtrip" className="p-10">
        <IoArrowBackCircleSharp className='w-10 h-10' />
        </NavLink>
    </div>
    
         {
            loading ?(
                <div className="animate-pulse container mx-auto p-6">
                <div className="h-48 w-full bg-gray-300 rounded-lg"></div>
                <div className="mt-4 h-6 w-2/3 bg-gray-300 rounded"></div>
                <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
                <div className="mt-6 h-24 w-full bg-gray-300 rounded-lg"></div>
                <div className="mt-6 h-24 w-full bg-gray-300 rounded-lg"></div>
            </div>
            ):(
                <div className='container'>
            <Itinerary bgimage={imageurl}  id={trip?._id} destination={trip?.destination} days={trip?.days} budget={trip?.budget} traveltype={trip?.traveltype} itinerary={trip?.itinerary} />
              </div>

            )
         }  
         <div className='mt-5'>
      <Footer />
      </div>      
            
        
     
  
    </>
  )
}

export default Tripdetails
