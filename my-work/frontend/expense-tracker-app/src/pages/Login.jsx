import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preveventDefault()
        
        const res = await fetch(`http://127.0.0.1:8000/Login`,{
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        if(res.ok){
            alert("Succuessfilly loged in")
            navigate('/Dashboard')
        }else{
            alert("Try again")
        }
    }


    return (
    <form onSubmit={handleLogin} >
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder='username' required />
      <input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' required />
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login;