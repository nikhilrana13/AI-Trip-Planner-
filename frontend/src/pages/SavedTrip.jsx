import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '@/components/Footer';

const SavedTrip = () => {
    const {user} = useSelector((state)=>state.user);
    const id = user?._id
    // console.log('id',id);
    const [imageUrl,setimageurl] = useState({});
    const [savedtrip,setsavedtrip] = useState([]);
    const [loading,setloading] = useState(true);


       useEffect(()=>{
          const fetchSavedTrips = async()=>{
             try {
                const response = await axios.get(`https://ai-trip-planner-backend-bwb4.onrender.com/api/trip/getsavedtrip/${id}`,{withCredentials:true});
                if(response.data){
                    // console.log('savedtrips',response.data.savedtrips);
                    setsavedtrip(response.data.savedtrips)
                

                    response.data.savedtrips.map((item)=>{
                        fetchDestinationimage(item.destination,item._id);
                    })

                }
                
             } catch (error) {
                console.log("error",error)
             } finally{
                setTimeout(() => {
                    setloading(false)
                }, 1000);
             }
          }
          const fetchDestinationimage = async(destination,tripId)=>{
            try {
                const res = await axios.get(`https://api.unsplash.com/search/photos`,{
                    params:{
                        query: destination,
                        client_id :"k8m6vcE-nBKmHG9EeR9IrZw9zsNWdTNgEvI8uklqBTs"
                    }
    
                })
                setimageurl((prev)=>({
                    ...prev,
                    [tripId]:res.data.results[0]?.urls.regular || "https://bespokeindiatravel.co.uk/wp-content/uploads/2018/01/Simla.jpg"
                }))
                
            } catch (error) {
                console.log("error fetching images",error);
            }
        }

          fetchSavedTrips();
       },[id])
  return (
     <>
      <div className=' mt-12'> 
        <NavLink to="/" className="p-10">
        <IoArrowBackCircleSharp className='w-10 h-10' />
        </NavLink>
    </div>
      <div className='container'>
         <div className='m-2 p-5 '>
            <h1 className='text-2xl sm:text-3xl font-bold  '>Saved Trips 🤖🏕️ </h1>
         </div>
          
          {
            loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {Array(8)
              .fill("")
              .map((_, index) => (
                <div key={index} className="animate-pulse max-w-[20rem] p-2 px-3 overflow-hidden">
                  <div className="w-full h-[200px] md:h-[250px] lg:h-[250px] bg-gray-300 rounded-[14px]"></div>
                  <div className="mt-3 h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
              ))}
                </div>

            ):(savedtrip.length > 0 ? (
                <div className='cards  mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                {savedtrip.map((item)=>{
                    return(
                        
                        <NavLink to={`/tripdetails/${item._id}`}>
                            <div className='max-w-[20rem] gap-3 p-2 px-3 overflow-hidden hover:scale-110 transition ease-in-out '>
                           <div className='relative bg-cover bg-no-repeat bg-center '>
                             <img src={imageUrl[item._id]} lazyloading="true" alt="image"  className='w-full h-[200px] object-cover md:h-[250px] lg:h-[250px] transition-all duration-300 rounded-[14px]' />
                       </div>
                         <div className='flex flex-col p-1 gap-0 '>
                              <span className='text-[1rem] sm:text-2xl  text-black font-bold'>{item.destination}</span>
                              <p className='text-[1rem] text-[#6A6A6A] font-[500]'>{item.days} days 
                                with {item.budget} budget
                              </p>
                              
               
                         </div>
                 </div>
    
                        </NavLink>
                        
                    )
                })}
    
             </div>

            ):(
            <h1 className='text-2xl sm:text-3xl font-bold  text-center mt-12'>🤨 No Saved Trips</h1>

            ))}
         
      </div>
      <div className='mt-5'>
      <Footer />
      </div>
     
     </>
  )
}

export default SavedTrip
