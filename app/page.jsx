'use client'
import { useState } from "react"

export default function App() {

  const [name, setName] = useState("")
  const [users, setUsers] = useState([])

  // 🔥 GET users
  const getUsers = async () => {
    const res = await fetch("http://localhost:4000/users")
    const data = await res.json()
    setUsers(data)
  }

  // 🔥 ADD USER (POST)
  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })

    setName("")     // input clear
    getUsers()      // ⭐ list refresh
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-5">

      {/* 🔥 FORM */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow flex gap-2"
      >
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded text-black"
        />

        <button className="bg-black text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* 🔥 LOAD BUTTON */}
      <button
        onClick={getUsers}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        Load Users
      </button>

      {/* 🔥 LIST */}
      <div className="bg-white p-4 rounded shadow w-64">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users yet</p>
        ) : (
          users.map((user, index) => (
            <p key={index} className="border-b p-2 text-gray-800">
              {user.name}
            </p>
          ))
        )}
      </div>

    </div>
  )
}