import React from 'react'

const Button = ({themecolor}) => {
        const titleStyle = {
            background: themecolor,
          };
      return (
        <>
        <button className='btn' style={titleStyle}>Copy Link</button>
        </>
      )
}

export default Button