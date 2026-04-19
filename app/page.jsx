'use client'
import { useState } from "react"
export default function App(){
const[email,setEmail]=useState("")
const[password,setPassword]=useState("")
const handleSubmit=async(e)=>{
  e.preventDefault()
const res=await fetch("http://localhost:4000/login",{
method: "POST",
headers:{ "Content-Type":"Application/json"},
body: JSON.stringify({email,password})

})
const data = await res.text()
console.log(data);

}

return <div className="h-screen flex items-center justify-center bg-gray-700">
<form onSubmit={handleSubmit} className="flex flex-col gap-3">
<h1 className="text-black text-4xl text-center">LOGIN FORM</h1>
<input type="Emaii" placeholder="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="  text-black bg-white "/>
<input type="Password" placeholder="Enter Your Password" value={password} onChange={(e)=>setPassword(e.target.value)} className=" text-black  bg-white  "/>
<button type="submit" className="px-4 py-2 bg-black text-white hover:bg-white hover:text-black transition p-2">Login</button>
</form>
</div>
















}