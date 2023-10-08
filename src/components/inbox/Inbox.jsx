import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./inbox.css";
import "swiper/css";
import "swiper/css/pagination";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Axios from "axios";
import { Circles } from "react-loader-spinner";
// import required modules
import { Pagination, A11y } from "swiper/modules";
import {Helmet} from 'react-helmet':
const Inbox = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const copyLinkToClipboard = () => {
    const linkToCopy = `https://anonz.netlify.app/message/${slideData[currentSlide]?._id}/${userInfo.userId}`; 
  
    // Check if the link exists before copying
    if (linkToCopy) {
      navigator.clipboard.writeText(linkToCopy).then(() => {
        // Link copied successfully, show the success message
        console.log("Link copied to clipboard: " + linkToCopy);
        setShowSuccessMessage(true);
  
        // Hide the success message after a few seconds 
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000); // Hide after 3 seconds (adjust the time as needed)
      }).catch((error) => {
        // Handle any errors that may occur during copying
        console.error("Error copying link: " + error);
      });
    }
  };

  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    Axios.get("https://anon-backend-qse7.onrender.com/authUser", { headers })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch data from the server when the component mounts
    Axios.get("https://anon-backend-qse7.onrender.com/anonymous", { headers })
      .then((response) => {
        console.log(response.data.anonymous);
        setSlidesData(response.data.anonymous);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>

     <Helmet>
        <meta name="description" content={`Send ${userInfo.username} a ${slideData[currentSlide]?.title} he/she won't know who sent it`} />
      </Helmet>
      <div className="container">
        <div className="swipers">
          {loading ? (
                   <div className="audio">
                   <div>
                     <Circles
                       className="audio"
                       height={80}
                       width={80}
                       radius={9}
                       color="rgb(167, 70, 199)"
                       ariaLabel="loading"
                       wrapperStyle
                       wrapperClass
                     />
                     <p>Loading...</p>
                   </div>
                 </div>
          ) : Array.isArray(slideData) && slideData.length > 0 ? (
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
                      img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsYvKgXGTrUNed6sIR60Gtxkvrp6H5wBr8Q&usqp=CAU"
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
              <button onClick={copyLinkToClipboard}> 
              <Button   onClick={copyLinkToClipboard} themecolor={slideData[currentSlide]?.themecolor}></Button>
           </button>
           {showSuccessMessage && (
        <p className="success-message">Link copied successfully!</p>
      )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
