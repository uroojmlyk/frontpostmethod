'use client'
import { useState } from "react"
export default function App(){
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const handleSubmit=async(e)=>{
  e.preventDefault()
  const res=await fetch("http://localhost:4000/login",{
method : "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({email,password})
  })
  const data= await res.text()
  console.log(data);
  
}
return <div className="h-screen flex items-center justify-center bg-indigo-500">
  <form onSubmit={handleSubmit} className="flex flex-col gap-3" >
<h1 className="text-4xl text-white">LOGIN FORM</h1>
<input type="Email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="text-black rounded-b-sm"/>
<input type="Password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="text-black rounded-b-sm"/>
<button className=" bg-black text-white hover:bg-white hover:text-black transition rounded-b-sm">Login</button>
  </form>
</div>





















}