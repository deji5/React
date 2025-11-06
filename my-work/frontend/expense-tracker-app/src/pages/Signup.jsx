import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handle(e){
        e.preventDefault()

        const res = await fetch("http://127.0.0.1:8000/SignUp", {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        })

        if(res.ok) {
            alert("Sign up successfull")
            navigate('/Dashboard')
        } else{
            alert('error')
        }
    }
    return (
        <form onSubmit={handle} >
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder='username' required />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' required />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' type='password' required />
            <button type='submit'>Sign up</button>
        </form>
    )
}