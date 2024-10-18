import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from '../../node_modules/axios/dist/esm/axios';

const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')
    const token = localStorage.getItem('token')


    const getUsers = async() =>{
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}` ,{
                headers:{
                    authorization: `Bearer ${token}`
            }
        })
        console.log(response)
        setUsers(response.data.user)
    }

    const debounce = (func, delay)=>{
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(()=>{ func(...args),delay },[100])
        }
    }

    useEffect(()=>{
        const debouncedGetUsers = debounce(getUsers, 300); 

        if (filter) {
          debouncedGetUsers(); 
        }
        return () => clearTimeout(debouncedGetUsers);
        
    },[filter])


  return (<>
    <div className="font-bold mt-6 text-lg">
        Users
    </div>
    <div className="my-2">
        <input onChange={(e) => {
            setFilter(e.target.value)
        }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
    </div>
    <div>
        {users.map((user, index) => <User key={index} user={user} />)}
    </div>
</>
  )
}


function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <button className='bg-black text-white rounded-md px-2 py-2' onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}  >Send Money</button>
        </div>
    </div>
}

export default Users