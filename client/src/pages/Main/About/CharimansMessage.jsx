import React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Chairman from '../../../images/feaculty.jpeg'

const CharimansMessage = () => {
  return (
    <div className='w-full mt-28'>
         <div className="flex mt-6 ml-10 items-center">
        <Link
          to={"/"}
          className="text-indigo-500 hover:text-indigo-800 hover:font-bold"
        >
          Eureka Learning{" "}
        </Link>{" "}
        <p className="ml-2  text-indigo-500 mr-2 font-extrabold text-xs">
          {" "}
          <FaAngleDoubleRight />{" "}
        </p>{" "}
        <Link
          to={"/about"}
          className="text-indigo-500 hover:text-indigo-800 hover:font-bold"
        >
          {" "}
          About{" "}
        </Link>
        <p className="ml-2  text-indigo-500 mr-2 font-extrabold text-xs">
          {" "}
          <FaAngleDoubleRight />{" "}
        </p>{" "}
        <Link
          to={"/about/chairman's-message"}
          className="text-indigo-800 hover:text-indigo-600 font-bold hover:font-extrabold"
        >
          {" "}
          Chairman's Message{" "}
        </Link>
      </div>
      <div className='flex mt-16'>
        <div className='w-2/3'>
        <p className='text-3xl font-extrabold pl-11'>Chairman's Message</p>
        <p className='pl-14 pr-14 mt-2 justify-between font-thin opacity-80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia atque tempora ad aspernatur? Dolore sequi perspiciatis modi accusamus aspernatur iste consectetur expedita vel, dignissimos corporis, ratione quidem eius enim facilis?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, beatae harum voluptatum error, ea aut adipisci et mollitia maiores omnis nobis voluptates deserunt quasi ad soluta deleniti praesentium! Et, rerum. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, illum facere, explicabo reiciendis aliquid autem dolorum quia soluta quam quas repellat quae molestiae voluptatem nam rerum doloremque. Itaque, sit ullam!</p>
        </div>
        <div className='w-1/3'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqa-Pi9VQUiASM6joe2FLjS8S4DOTM78cC9UzaWOh9w&s' className='w-full h-96 pr-7 rounded-xl' alt="img" />
        </div>
      </div>
    </div>
  )
}

export default CharimansMessage