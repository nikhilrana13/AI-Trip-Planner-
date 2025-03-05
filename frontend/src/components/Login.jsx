import React from 'react'
import { Button } from './ui/button'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle ,DialogTrigger } from './ui/dialog'

import { Input } from './ui/input'
import { Label } from './ui/label'
import { NavLink } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { SetAuthUser } from '@/redux/UserSlice'


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async(data)=>{
          const userinfo = {
            email: data.email,
            password: data.password
          }

          try {
              const res = await axios.post("http://localhost:5000/api/user/login",userinfo,{withCredentials:true});
              if(res.data){
                toast.success(res.data.message,{autoClose:2000} || 'Login successfully', );
                dispatch(SetAuthUser(res.data.user))
                navigate('/')
                
              }
            
          } catch (error) {
            console.log("error",error.response.data.message)
            toast.error(error.response?.data?.message || 'Login failed',{autoClose:2000}  );
            
          }
    }
  return (
 <Dialog>
    <DialogTrigger asChild>
      <Button className="py-2 px-4 rounded-full">Login</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                Password is required
              </span>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-end">
          <Button type="submit">Login</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default Login
