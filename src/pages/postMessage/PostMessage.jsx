import React, { useState, useEffect } from "react";
import './PostMessage.css'
import { useParams } from 'react-router-dom';
import { Circles } from "react-loader-spinner";

const PostMessage = () => {
  const [anonymousData, setAnonymousData] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { anonymousId, userId } = useParams();
  const {notification, setNotification} =useState('');

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const handleMessage = (e) => {
    e.preventDefault();

    // Check if the message is not empty before making the request
    if (message.trim() === '') {
      // Handle the case where the message is empty, show an error message, or prevent the request
      console.log("empty");
      return;
    }

    const messageData = {
      message: message
    };

    // Send the message to the server using fetch
    fetch(`https://anon-backend-qse7.onrender.com/message/${encodeURIComponent(anonymousId)}/${encodeURIComponent(userId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    })
    .then((response) => {
      if (response.ok) {
      
        setNotification("Message sent sucessfully, it's time for you to create yours")
        console.log("Message sent successfully");
      } else {
        // Handle the case where the request was not successful
        console.error("Failed to send message");
      }
    })
    .catch((error) => {
      console.error(error);
      setLoading(false); // You might want to handle errors gracefully
    });
  };

  useEffect(() => {
    // Fetch data from the server when the component mounts using fetch
    fetch(`https://anon-backend-qse7.onrender.com/message/${encodeURIComponent(anonymousId)}/${encodeURIComponent(userId)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Handle the case where the request was not successful
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        console.log(data);
        setAnonymousData(data.data); // Set the messages in state
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // You might want to handle errors gracefully
      });
  }, [anonymousId, userId]);

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
          {notification}
          <div className="mesage_container">
            <div className="mesage">
              <p>{anonymousData.description}</p>
              <form onSubmit={handleMessage}>
                {/* <input type='text' placeholder="Type in your message" value={message}  /> */}
                <textarea value={message} rows={11} name="message" onChange={handleMessageInput}>Type in your message</textarea>
                <button type="submit" className="butn butn2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostMessage;
