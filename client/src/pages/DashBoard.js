import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddProject from '../components/AddProject'

export default function DashBoard() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : ''

  const fetchLoggedInUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(`/api/auth/session`, config)
      setUserData(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error.response.data)
      navigate('/login')
    }
  }

  useEffect(() => {
    fetchLoggedInUser()
  }, [])

  const logout = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <>
    <button onClick={logout}>Logout</button>
    <div>
      <AddProject />
    </div>
    </>
  )
}
