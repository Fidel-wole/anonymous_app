import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./inbox.css";
import "swiper/css";
import "swiper/css/pagination";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Axios from "axios";
import Helmet from 'react-helmet';
import { Circles } from "react-loader-spinner";
// import required modules
import { Pagination, A11y } from "swiper/modules";

const Inbox = () => {
  const [userInfo, setUserInfo] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideData, setSlidesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const shortenAndCopyLink = async () => {
    const longURL = `https://anonz.netlify.app/message/${slideData[currentSlide]?._id}/${userInfo.userId}`;
    // const bitlyAccessToken = '4960dd948a3d0ec5c0389b6e62e530ecddd84c95'; // Replace with your Bitly access token
  
    // try {
    //   // Make a POST request to Bitly's API to shorten the URL
    //   const response = await Axios.post(
    //     'https://api-ssl.bitly.com/v4/shorten',
    //     {
    //       long_url: longURL,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${bitlyAccessToken}`,
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );
  
      const shortenedLink = longURL;
  
      // Check if the link exists before copying
      if (shortenedLink) {
        navigator.clipboard.writeText(shortenedLink).then(() => {
          // Link copied successfully, show the success message
          console.log("Link copied to clipboard: " + shortenedLink);
          setShowSuccessMessage(true);
  
          // Hide the success message after a few seconds
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000); // Hide after 3 seconds (adjust the time as needed)
        });
      }
    // } catch (error) {
    //   // Handle any errors that may occur during URL shortening or copying
    //   console.error("Error shortening and copying link: " + error);
    // }
  };
  

  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    // Check if user info is already cached
    const cachedUserInfo = JSON.parse(localStorage.getItem("cachedUserInfo"));

    if (cachedUserInfo) {
      setUserInfo(cachedUserInfo);
    } else {
      Axios.get("https://anon-backend-qse7.onrender.com/authUser", { headers })
        .then((response) => {
          const userData = response.data;
          setUserInfo(userData);

          // Cache user info
          localStorage.setItem("cachedUserInfo", JSON.stringify(userData));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // Check if slides data is already cached
    const cachedSlidesData = JSON.parse(localStorage.getItem("cachedSlidesData"));

    if (cachedSlidesData) {
      setSlidesData(cachedSlidesData);
      setLoading(false);
    } else {
      Axios.get("https://anon-backend-qse7.onrender.com/anonymous", { headers })
        .then((response) => {
          const data = response.data.anonymous;
          setSlidesData(data);
          setLoading(false);

          // Cache slides data
          localStorage.setItem("cachedSlidesData", JSON.stringify(data));
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
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
  {/* Title */}
  <title>Send Anonymous Message</title>

  {/* Description */}
  <meta property="og:description" content={`Send ${userInfo.username} a ${slideData[currentSlide]?.title} he/she won't know who sent it`} />

  {/* Image */}
  <meta property="og:image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUsYvKgXGTrUNed6sIR60Gtxkvrp6H5wBr8Q&usqp=CAU"/>

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
              <button onClick={shortenAndCopyLink}> 
              <Button   onClick={shortenAndCopyLink} themecolor={slideData[currentSlide]?.themecolor}></Button>
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
