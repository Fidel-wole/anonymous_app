import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./messages.css";
import { CiMail } from "react-icons/ci";
import { AiOutlineCheck } from "react-icons/ai";
import { Circles } from "react-loader-spinner";

const Messages = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    Axios.get("http://localhost:8000/messages", { headers })
      .then((response) => {
        console.log(response.data.messages);
        setMessages(response.data.messages); // Set the messages in state
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="messages">
          <div className="grid">
            {loading ? (
              <div className="audio">
                <div>
                  <Circles
                    className="audio"
                    height="80"
                    width="80"
                    radius="9"
                    color=" rgb(167, 70, 199)"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                  />
                  <p>Fetching...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              messages.map((data) => (
                <a
                  href={`/message/${data._id}`}
                  className="message"
                  key={data._id}
                >
                  <div className="icon">
                    <CiMail />
                  </div>
                  <div className="check">
                    <AiOutlineCheck />
                  </div>
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
