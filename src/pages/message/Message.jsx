import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Assuming messages data is defined as you provided
import { messages } from '../../message';
import "./message.css"
import { Circles } from 'react-loader-spinner';
import { CircularProgress } from '@mui/material';

const Message = () => {
  const [loading, setLoading] = useState(true);
  const [cardContent, setCardContent] = useState({ title: '', message: '', cardId: '' });
  const { id } = useParams();

  useEffect(() => {

    setTimeout(()=>{
      if (id) {
        const selectedCard = messages.find((card) => card.id === Number(id)); // Convert id to a number
  
        if (selectedCard) {
          // Update cardContent state with the selected card's data
          setCardContent({
            title: selectedCard.title,
            message: selectedCard.message,
            cardId: selectedCard.id,
          });
        } else {
          // Handle the case where the card is not found
          console.log(`Card with ID ${id} not found`);
        }
        setLoading(false)
      }
    }, 1000);

  }, [id]);

  return (
    <div className="container">
      {loading ? (
        <div className="audio">
 <Circles
        className ="audio"
       height="80"
       width= "80"
       radius = "9"
       color=' rgb(167, 70, 199)'
       ariaLabel='loading'
       
       wrapperStyle
       wrapperClass
       
       />
        </div>
       
      ) : (
        <div>
      <div className="mesage_container">
        <div className="mesage">
          <p>{cardContent.title}</p>
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
