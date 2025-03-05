import React from 'react'
import Login from '../components/Login'
import SignUp from './SignUp'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SetAuthUser } from '@/redux/UserSlice'

const Navbar = () => {
  const {user} = useSelector((state)=>state.user)
  const dispatch = useDispatch();

const handleLogout = async ()=>{
       await axios.get("http://localhost:5000/api/user/logout",{withCredentials:true}).then((res)=>{
        if(res.data){
          toast.success(res.data.message,{autoClose:2000} || 'Logout successfully', );
          dispatch(SetAuthUser(null))

        }
       }).catch((error)=>{
        toast.error(error.response?.data?.message || 'Logout failed',{autoClose:2000}  );
       })
 
      
}
  return (
    <div className='flex  items-center justify-between py-3 '>
        <div className='logo'>
          <NavLink to="/">
          <p className='font-[500] sm:text-2xl text-sm text-gray-800'>✈️ Trip Planner AI</p>
          </NavLink>
        
        </div>
        <div className='flex items-center gap-3 min-h-[50px'>
             {
              user ? (
                <>
                    <Button onClick={handleLogout} className="px-4 py-2 bg-black text-white rounded-full">Logout</Button>
               <NavLink to="/savedtrip" className="px-4 py-2 bg-gray-200 rounded-full">
                My Trips
            </NavLink>
                </>
            

              ):(
                <>
                   <Login />
                   <SignUp />
                </>
             
    
              )
             }
         
            
        </div>


    </div>
  )
}

export default Navbar
