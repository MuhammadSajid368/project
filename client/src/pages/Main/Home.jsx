import React from 'react'
import {useAuth} from '../../context/auth.jsx'
import Middle from '../../components/Middle.jsx';
import SuccessStories from './SuccessStories.jsx';
import Third from './Third.jsx';
import Sliders from './sliders.jsx';
import UpcomingEvents from './UpcomingEvents.jsx';

const Home = () => {
    const [auth, setAuth] = useAuth();
    
  return (
    <div> 
      <Sliders/>
        <Middle />
        <Third />
        <SuccessStories />
        <UpcomingEvents />
    </div>
  )
}

export default Home
