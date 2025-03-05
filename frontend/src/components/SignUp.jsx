import React from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle ,DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const SignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const onSubmit = async(data)=>{
          const userinfo = {
            name:data.name,
            email:data.email,
            password:data.password
          }

           try {
            const res = await axios.post("https://ai-trip-planner-backend-bwb4.onrender.com/api/user/signup",userinfo,{withCredentials:true});
            if(res.data){
               toast.success(res.data.message,{autoClose:2000} || 'Signup successfully', );
               reset();
               navigate('/')
            }
             
           } catch (error) {
            console.log("error",error.response.data.message)
            toast.error(error.response?.data?.message || 'Signup failed',{autoClose:2000}  );
           }
  }
  return (
    <Dialog>
    <DialogTrigger asChild>
      <button className="py-3 px-3">Signup</button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Signup</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

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
          <Button type="submit">Signup</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
);
   

}

export default SignUp
