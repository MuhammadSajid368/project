import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'

const PrivateRoutes = () => {
    const [auth , setAuth] = useAuth()
    const [ok , setOk]  = useState(false)

    useEffect(() => {
        if (auth?.token) fetchCurrentUser()
    } , [auth?.token])
const fetchCurrentUser = async() => {
    try {
        const {data} = await axios.get("/loggedIn-user" , {
            headers : {
                Authorization : auth?.token
            }
        })
        setOk(true)
    } catch (error) {
        setOk(false)
    }
}
  return (
    <div></div>
  )
}

export default PrivateRoutes