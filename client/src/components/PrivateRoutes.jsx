import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth'
import axios from 'axios'


const PrivateRoutes = () => {
    /*  context  */
    const [auth , setAuth] = useAuth()
    /*  states */
    const [ok , setOk] = useState(false)

    /*  make back-end request useEffect */
    useEffect(() => {
        if(auth?.token) fetchCurrentUser()
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
    <div>
    </div>
  )
}

export default PrivateRoutes
