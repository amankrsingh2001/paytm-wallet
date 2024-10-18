import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import Subheading from "../components/Subheading"
import { useState } from "react"
import  axios  from '../../node_modules/axios/dist/esm/axios';

const SignIn = () =>{

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()


    return <div className="h-screen w-screen flex justify-center items-center">
         <div className=" text-black bg-[#c7c3c3] rounded-md p-12 flex flex-col items-center gap-2">
         <div className="bg-[#ebe8e8] rounded-md py-4 flex flex-col gap-3 justify-center items-center px-2">
                <Header label={'Sign In'}/>
                <Subheading label={'Enter your information to create your account'}/>
                <InputBox onChange={(e)=>setUsername(e.target.value)} label={'Username'} type={'text'} placeholder={'Enter you email'} id={'username'}/>
                <InputBox onChange={(e)=>setPassword(e.target.value)} label={'Password'} type={'password'} placeholder={'Enter you password'} id={'password'}/>
                </div>
        <div className="w-full mt-3 drop-shadow-xl">
            <button onClick={async ()=>{
                const reponse = await axios.post('http://localhost:3000/api/v1/user/signin',{username, password})
                        localStorage.setItem('token',reponse.data.token)
                        navigate('/dashboard')
            }} className="bg-black w-full px-3 py-2 text-white rounded-md">
                SignIn
            </button>
        </div>

        <div className="flex gap-3 drop-shadow-xl">
            <p>
            Don't have an account??
            </p>
            <Link to='/signup' className="underline text-blue-900" >
                SignUp
            </Link>
        </div>
        
    </div>
</div>
}

export default SignIn