import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Sliders = () => {
  const slides = [
    {
      url: "https://www.expat.com/images/upload/9/3/2/4/1698325737-university-in-germany-1-news_item_slider-t1698325737.jpg",
      title: "University of Eureka Learning",
      text: "The University of Eureka Learning traces its origins back to 1980, when a group of visionaries and educators came together with the ambitious goal of establishing an institution dedicated to higher learning.",
    },
    {
      url: "https://www.bankrate.com/2022/09/12184702/States-with-the-highest-and-lowest-student-loan-debt-in-2022.jpg?auto=webp&optimize=high&crop=16:9",
      title: "University of Eureka Learning",
      text: "The University of Eureka Learning traces its origins back to 1980, when a group of visionaries and educators came together with the ambitious goal of establishing an institution dedicated to higher learning.",
    },
    {
      url: "https://watermark.lovepik.com/photo/20211125/large/lovepik-xiamen-university-jian-nan-auditorium-playground-picture_501033525.jpg",
      title: "University of Eureka Learning",
      text: "The University of Eureka Learning traces its origins back to 1980, when a group of visionaries and educators came together with the ambitious goal of establishing an institution dedicated to higher learning.",
    },
    {
      url: "https://assets.teenvogue.com/photos/58d17622ca22480abd4d3e6e/16:9/w_1280,c_limit/german-slides-fb.jpg",
      title: "University of Eureka Learning",
      text: "The University of Eureka Learning traces its origins back to 1980, when a group of visionaries and educators came together with the ambitious goal of establishing an institution dedicated to higher learning.",
    },
    {
      url: "https://studyineurope.com.sg/storage/8172/home914-copia.jpg",
      title: "University of Eureka Learning",
      text: "The University of Eureka Learning traces its origins back to 1980, when a group of visionaries and educators came together with the ambitious goal of establishing an institution dedicated to higher learning.",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlider = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const nextSlider = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [slides.length]);

  return (
    <div className='max-w-[1400px] h-[630px] w-full m-auto py-16 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-full rounded-sm bg-center bg-cover duration-500'
      >
        {slides[currentIndex].title && (
          <div className='absolute top-0 left-0 w-full h-[90%] flex justify-end items-start p-9 flex-col text-white bg-black/50'>
            <div className='lg:w-[40%] sm:w-[90%] backdrop-blur-md p-5 m-10 border-l-8 rounded-r-xl'>
              <h2 className='text-[40px] sm:text-[30px] mb-2 font-bold'>{slides[currentIndex].title}</h2>
              <p className='text-sm'>{slides[currentIndex].text}</p>
            </div>
          </div>
        )}
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlider} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlider} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className='text-2xl cursor-pointer'>
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sliders;
