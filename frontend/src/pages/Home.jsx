import { Button } from '@/components/ui/button.jsx'
import Navbar from '../components/Navbar.jsx'
import React from 'react'
import { TrainFrontIcon } from 'lucide-react'
import Footer from '@/components/Footer.jsx'
import { NavLink } from 'react-router-dom'
import bgimage from '../assets/bgimage.png';


const Home = () => {
  return (
    <>
     <Navbar />
     <div className='container  mt-12'  >
        <div className=' flex flex-col justify-center p-10 my-10 bg-cover sm:bg-center rounded-lg  bg-no-repeat ' style={{backgroundImage:`url(${bgimage})`}}>
            <div className=' w-full  sm:max-w-[700px] items-center mx-auto px-5 py-1  flex flex-col gap-2 sm:gap-0 space-y-5 '>
                <p className='font-[800] text-center text-[1.5rem] text-white  leading-10 sm:leading-[4rem] sm:text-[2.5rem]'>Bina Tension, AI Se Ho 🐫 Trip Planning Asaan!" 🎒</p>
                <p className='font-[500] text-center leading-5 text-sm sm:text-[1rem] text-white'>
                Build, personalize, and optimize your itineraries with our free AI trip  planner. Designed for vacations workstations and everyday adventures.
                </p>
                <NavLink to="/createtrip">
                <Button  className="mt-5 bg-green-700 w-full sm:max-w-[200px] rounded-full px-4 py-6 text-[1rem] font-[500] text-white">
                <TrainFrontIcon />Create a new trip</Button>
                </NavLink>
              
            </div>
         
        </div>
     </div>
     <div className='flex justify-center'>
        <div className='w-full sm:max-w-[800px] items-center flex flex-col  p-10 gap-2  md:gap-5'>
            <span className='text-sm text-center text-pink-500 font-[500]'>
                TRIP PLANNER AI
            </span>
            <p className='text-[1.5rem] text-center sm:text-[3rem] font-[800] sm:leading-10 md:leading-[3rem]'>The only tool youll ever need! </p>
            <p className='text-gray-500 text-[400] text-center leading-6 text-sm sm:text-[1rem]'>
            Say goodbye to the stress of planning and hello to personalized <br /> recommendations, efficient itineraries, and seamless dining experiences.
            </p>
           

        </div>
     </div>
     <div className='mt-[4rem] flex justify-center p-5 flex-col items-center bg-black rounded-lg '>
          <div className='sm:p-10 p-2  text-white '>
            <p className='text-sm sm:text-3xl md:text-4xl font-bold text-center leading-8 md:leading-[3rem]'>Skip the manual trip planning and <br />
            start your effortless journey with <br />
            Trip Planner AI today, at no cost.
            </p>
            <div className='flex justify-center'>
            <NavLink to="/createtrip">
                <Button   className="mt-5  bg-white  w-full hover:bg-white  sm:max-w-[200px] rounded-full px-5 py-6 text-sm sm:text-[1rem] font-[500] text-black">
                Lets's 🤖 Create a Trip</Button>
                </NavLink>
            </div>
           

          </div>
     </div>

     
     <div className='mt-12'>
     <Footer />
     </div>


    </>
     
    
  )
}

export default Home
