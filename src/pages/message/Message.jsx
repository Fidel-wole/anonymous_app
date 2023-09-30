import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

import "./message.css";
import { Circles } from "react-loader-spinner";

const Message = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
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
    Axios.get("http://localhost:8000/message/" + encodedMessageId, { headers })
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
        <div>
          <div className="mesage_container">
            <div className="mesage">
              <p>{cardContent.anonymousId.description}</p>
              <small>{cardContent.message}</small>
            </div>
          </div>
          <div className="button">
            <button className="butn">Share</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
