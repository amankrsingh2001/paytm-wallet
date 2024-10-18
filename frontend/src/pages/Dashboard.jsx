import { useEffect, useState } from "react"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import axios from '../../node_modules/axios/dist/esm/axios';

const Dashboard = () =>{
    const [amount, setAmount] = useState(0)
    const token = localStorage.getItem('token')


    const getAmount = async() =>{
        const response = await axios.get('http://localhost:3000/api/v1/account/getbalance',{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(response)
        setAmount(response.data.amount.toFixed(2))
    }

    useEffect(()=>{
        getAmount()
    },[token])
    
    return <div>
            <Appbar/>
            <div className="m-8">
            <Balance value={amount} />
            <Users />
        </div>
         </div>
}
export default Dashboard