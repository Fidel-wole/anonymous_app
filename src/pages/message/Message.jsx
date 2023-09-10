import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Assuming messages data is defined as you provided
import { messages } from '../../message';
import "./message.css"

const Message = () => {
  const [cardContent, setCardContent] = useState({ title: '', message: '', cardId: '' });
  const { id } = useParams();

  useEffect(() => {
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
    }
  }, [id]);

  return (
    <div className="container">
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
  );
};

export default Message;
