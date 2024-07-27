import React from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const RegisterNow = () => {
  return (
    <div>
      <div className='flex items-center space-x-3 justify-center pl-20 pr-20 w-full h-auto     '>
        <div className='pt-16 pb-16 pl-4 pr-4  bg-white m-10 w-[50%] rounded-xl shadow-xl border  border-gray-300'>
            <p className='text-center font-bold text-2xl mb-3 text-blue-700'>Admin SignUp</p>
            <p>Register youSelf as Admin and get the complete right to  control website.Best of Luck </p>
            <div className='mt-16 '>
            <Link to={"/auth/signup"}  className=' flex  items-center justify-center text-blue-700 font-bold'>
              Create Account <FaArrowAltCircleRight className='ml-2' />
            </Link>
            </div>
        </div>
        <div className='pt-16 pb-16 pl-4 pr-4  bg-white m-10 w-[50%] rounded-xl shadow-xl border border-gray-300'>
            <p className='text-center font-bold text-2xl mb-3 text-blue-700'>Users SignUp</p>
            <p>Register youSelf as User and Unlock the helpful feaetures of our website and get more informative informations.. </p>
            <div className='mt-16'>
            <Link to={"/create/account"} className=' flex  items-center justify-center text-blue-700 font-bold'>
              Create Account <FaArrowAltCircleRight className='ml-2' />
            </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterNow
