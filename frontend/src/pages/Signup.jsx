import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Subheading from "../components/Subheading"
import { useState } from "react"
import  axios  from '../../node_modules/axios/dist/esm/axios';

const Signup = () =>{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    return <div className="h-screen w-screen flex justify-center items-center">
            <div className=" text-black bg-[#c7c3c3] rounded-md p-12 flex flex-col items-center gap-2 drop-shadow-md">
                <div className="bg-[#ebe8e8] rounded-md py-4 flex flex-col gap-3 justify-center items-center drop-shadow-xl px-2">
                <Header label={'Sign Up'}/>
                <Subheading label={'Enter your information to create your account'}/>
                <InputBox  label={'Username'} type={'text'} placeholder={'Enter you email'} id={'username'}  onChange={(e)=>setUsername(e.target.value)} />
                <InputBox label={'Password'} type={'password'} placeholder={'Enter you password'} id={'password'}  onChange={(e)=>setPassword(e.target.value)}/>
                <InputBox label={'First Name'} type={'text'} placeholder={'Enter you First Name'} id={'firstName'}  onChange={(e)=>setFirstName(e.target.value)}/>
                <InputBox label={'Last Name'} type={'text'} placeholder={'Enter you Last Name'} id={'lastName'}  onChange={(e)=>setLastName(e.target.value)}/>
                </div>
                <div className="w-full mt-3">
                    <button className="bg-black w-full px-3 py-2 drop-shadow-xl text-white rounded-md" onClick={async()=>{
                        const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                            firstName,
                            lastName,
                            username,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                        navigate('/dashboard')
                    }}>
                        SignUp
                    </button>
                </div>

                <div className="flex gap-3 drop-shadow-xl ">
                    <p>
                    Already have an account??
                    </p>
                    <Link to='/signin' className="underline text-blue-900" >
                        Sign In
                    </Link>
                </div>
                
            </div>
        </div>
}

export default Signup