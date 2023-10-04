import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import "./message.css";
import { Circles } from "react-loader-spinner";

const Message = () => {
  const [loading, setLoading] = useState(true);
  const [ userInfo, setUserInfo] = useState([]);
  const [cardContent, setCardContent] = useState([]);

  const { messageId } = useParams();
  useEffect(() => {
    const trimmedMessageId = messageId.trim();
    const encodedMessageId = encodeURIComponent(trimmedMessageId);

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    Axios.get("http://localhost:8000/authUser", { headers })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // Fetch data from the server when the component mounts
    Axios.get(`http://localhost:8000/message/${encodedMessageId}`, { headers })
      .then((response) => {
        console.log(response.data.message);
        setCardContent(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [messageId]);

      const divToCaptureRef = useRef(null);
      const handleShareClick = async () => {
        if (navigator.share) {
          try {
            const canvas = await html2canvas(divToCaptureRef.current);
            const dataUrl = canvas.toDataURL('image/png');
            const blob = await fetch(dataUrl).then((res) => res.blob());
    
            const shareData = {
              title: "Message Screenshot",
              text: "Check out this message!",
              files: [new File([blob], 'screenshot.png', { type: 'image/png' })],
            };
    
            await navigator.share(shareData);
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          console.log('Web Share API not supported');
          // You can provide a fallback sharing mechanism here for unsupported browsers
        }
      };

  return (
    <div className="container">
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
            <p>Fetching...</p>
          </div>
        </div>
      ) : (
        <div ref={divToCaptureRef}>
          <div className="mesage_container" >
            <div className="mesage">
              <p>{cardContent.anonymousId.description}</p>
              <small>{cardContent.message}</small>
            </div>
          </div>
          <div className="button">
            <button className="butn" onClick={handleShareClick}>Share</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
