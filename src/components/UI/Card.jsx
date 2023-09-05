import React from 'react';
import './card.css'; // Create a CSS file for styling

const Card = ({img, themecolor, title, content }) => {
    const titleStyle = {
        background: themecolor,
      };
  return (
    <div >
      <div className='img'  style={titleStyle}>
         <div className="client__avatar">
            <img src={img} alt="Avatar One"/>
            </div>
            
     <h2>{title}</h2>
     </div>
      <p>{content}</p>
    </div>
  );
};

export default Card;
