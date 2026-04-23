'use client'

import { useState } from "react"

export default function App() {

  const [name, setName] = useState("")
  const [users, setUsers] = useState([])
  const [editId, setEditId] = useState(null)

  // 🔵 GET USERS
  const getUsers = async () => {
    const res = await fetch("http://localhost:4000/users")
    const data = await res.json()
    setUsers(data)
  }

  // 🟢 ADD USER
  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })

    setName("")
    getUsers()
  }

  // 🟡 UPDATE USER (PUT)
  const updateUser = async (id) => {
    await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })

    setName("")
    setEditId(null)
    getUsers()
  }

  // 🔴 DELETE USER
  const deleteUser = async (id) => {
    await fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE"
    })

    getUsers()
  }

  return (
    <div className="flex flex-col items-center gap-5 bg-gray-800 min-h-screen p-6">

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          className="bg-orange-300 text-black p-2 rounded"
        />

        <button className="bg-blue-500 px-4 py-2 rounded text-white">
          ADD
        </button>
      </form>

      {/* LOAD */}
      <button
        onClick={getUsers}
        className="bg-green-500 px-4 py-2 rounded text-white"
      >
        LOAD USERS
      </button>

      {/* USERS LIST */}
      <div className="mt-4 w-full text-center">

        {users.length === 0 ? (
          <p className="text-red-400 text-2xl">No Users Found</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex justify-center items-center gap-3 mb-2"
            >

              {/* name */}
              <p className="text-white text-xl">{user.name}</p>

              {/* EDIT */}
              <button
                onClick={() => {
                  setName(user.name)
                  setEditId(user.id)
                }}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Edit
              </button>

              {/* UPDATE */}
              <button
                onClick={() => updateUser(user.id)}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Update
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>
    </div>
  )
}