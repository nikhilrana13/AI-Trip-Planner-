import Navbar from '@/components/Navbar'
import React from 'react'
import { FaSearch, FaUser, FaUsers, FaUserFriends, FaPlane } from "react-icons/fa";
import { MdFamilyRestroom, MdClear } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';

const CreateTrip = () => {
  const [loading,setloading] = useState(false)
  const {user} = useSelector((state)=>state.user)
  const id = user?._id 
  // console.log('id',id)
  const navigate = useNavigate();
     const { register, handleSubmit, watch,setValue, formState: { errors } } = useForm();

    const  selectedtype = watch("traveltype");
     const selectedbudget = watch("budget");
     const onSubmit = async(data)=>{
       const formdata = {
          "days":data.days,
          "destination":data.destination,
          "traveltype":selectedtype,
          "budget":selectedbudget,
       }
       
                 try {
                  setloading(true)
                  const res = await axios.post(`http://localhost:5000/api/trip/createtrip/${id}`,formdata,{
                      headers:{"Content-Type":"application/json"},withCredentials:true
                      
                  });
                  if(res.data){
                    toast.success(res.data.message || "Trip created successfully", { autoClose: 2000 });
                    console.log('trip',res.data.trip)
                    navigate(`/tripdetails/${res.data.trip._id}`);
                  }

                 } catch (error) {
                  console.log(error)
                  toast.error(error.response.data.message || "Something went wrong", { autoClose: 2000 });
                  setloading(false)
                  
                 }
     }
  










  const travelTypes = [
    { id: "solo", label: "Solo", icon: <FaUser /> },
    { id: "family", label: "Family", icon: <MdFamilyRestroom /> },
    { id: "friends", label: "Friends", icon: <FaUserFriends /> },
    { id: "group", label: "Group", icon: <FaUsers /> },
    { id: "couple", label: "Couple", icon: <FaUser /> }
  ];

  const bugdetType = [
    { id: "cheap", label: "Cheap", icon: <MdFamilyRestroom /> },
    { id: "luxury", label: "Luxury", icon: <FaPlane />},
    { id: "medium", label: "Medium", icon: <MdFamilyRestroom />}
  ]




  return (
    <>
    <Navbar />
    <div className='container px-4 mt-12 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
        <div className='flex flex-col gap-2 p-5'>
            <p className='font-[400] text-[1.5rem] sm:text-[2.5rem] md:text-[3rem]' >AI Trip planner 🚩  </p>
            <p className='text-sm sm:text-[1rem] text-purple-500'>
            Plan your dream trip with personalized itineraries. 
            </p>
        </div>

        <div className="  mt-12">
      <div className="max-w-4xl mx-auto p-5 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaPlane className="text-gray-500" /> Create Your Trip
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div  className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Days
                <span className="text-red-500">*</span>
              </label>
              <div className="relative flex gap-2 ">
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"    {...register("days", { required: true })} >
                  <option value="">Select days</option>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                  <option value="8">8 days</option>
                </select>
                <BsCalendarDate className="absolute right-6 top-3 text-gray-400" />
              </div>
              <br />
              {errors.days && <span className="text-red-500">Field is required</span>}
            
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input type="text" placeholder="Where are you traveling?" className="w-full px-4 py-2.5 rounded-lg border focus:ring-2 pl-10" {...register("destination", { required: true })} />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                <MdClear className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600" />
              </div>
              <br />
              {errors.destination && <span className="text-red-500">Field is required</span>}
            </div>
         

            </div>
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {
                travelTypes.map((type,index)=>{
                  return(
                    <button type="button" key={index}  onClick={(()=>setValue("traveltype",type.id) )} className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 ${selectedtype === type.id ? "bg-blue-500 text-white" : ""} `}{...register("traveltype", { required: true })} >
                    {type.icon}
                    <span>{type.label}</span>
    
                  </button>
                  )
                })
              }
            </div>
            <br />
            {errors.traveltype && <span className="text-red-500">Field is required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {
                bugdetType.map((type,index)=>{
                  return(
                    <button type="button" key={index}  onClick={(()=>setValue("budget",type.id) )} className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-300 ${selectedbudget === type.id ? "bg-blue-500 text-white" : ""} `}{...register("budget", { required: true })} >
                    {type.icon}
                    <span>{type.label}</span>
    
                  </button>
                  )
                })
              }
              <br />
              {errors.budget && <span className="text-red-500">Field is required</span>}

            </div>
          </div>
        
           
           <div className='flex justify-center md:justify-end'>
              {
                loading ? (
                  
                  <Button  type="submit" className="px-5 py-3 rounded-full">
                      <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                      please wait 😄
                  </Button>
                ):(
                  <Button  type="submit" className="px-5 py-3 rounded-full">Generate</Button>
                )
              }
           
           </div>
        </form>
      </div>
    </div>
    </div>
    <div className='mt-5'>
      <Footer />
      </div>

    </>
  )
}

export default CreateTrip
