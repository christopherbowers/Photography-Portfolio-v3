import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      let headers = { 'content-type': 'application/json' }
      const { data } = await axios.post(`/api/auth/login`,
        { email, password },
        headers,
      )

      setError('')
      localStorage.setItem('userInfo', JSON.stringify(data.data))
      navigate('/dashboard')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="login-page">
      <div className="form">
        <p>{error}</p>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  )
}
