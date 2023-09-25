import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './inbox.css';
import 'swiper/css';
import 'swiper/css/pagination';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Axios from 'axios';

// import required modules
import { Pagination, A11y } from 'swiper/modules';

const Inbox = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    // Fetch data from the server when the component mounts
    Axios.get('http://localhost:8000/anonymous')
      .then((response) => {
        console.log(response.data.anonymous)
        setSlidesData(response.data.anonymous);
        setLoading(false); // Data is loaded, set loading to false
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Error occurred, set loading to false
      });
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Adjust slidesPerView based on screen width
      if (window.innerWidth <= 768) {
        setSlidesPerView(1); // Display 1 slide on smaller screens
      } else {
        setSlidesPerView(1.3); // Display 2 slides on larger screens
      }
    };

    // Initial setup and event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener when component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="container">
      <div className="swipers">
  {loading ? (
    <p>Loading...</p>
  ) : Array.isArray(slideData) ? (
    <Swiper
      className="container testimonials__container"
      modules={[Pagination, A11y]}
      spaceBetween={40}
      slidesPerView={slidesPerView}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
    >
      {slideData.map((data, index) => {
        console.log(data);
        return (
          <SwiperSlide key={index} className="testimonial">
            <Card
              themecolor={data.themecolor}
              img="https://photosfile.com/wp-content/uploads/2022/07/Single-Boy-DP-1.jpeg"
              title={data.title}
              content={data.description}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <p>Error: Data is not in the expected format.</p>
  )}
</div>

        <div className="container">
          <div className="play_link">
            <div>
              <p>{slideData[currentSlide]?.title}</p>
              <Button themecolor={slideData[currentSlide]?.themecolor}></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
