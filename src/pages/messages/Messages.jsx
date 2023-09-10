import React from 'react'
import './messages.css'
import {CiMail} from 'react-icons/ci'
import {AiOutlineCheck} from 'react-icons/ai'
import { messages } from '../../message'
const Messages = () => {
  return (
    <>
        <div className="container">
            <div className="messages">
                <div className='grid'>
                    {
                        messages.map((data)=>{
return(
    <a href={`/message/${data.id}`} className="message">
    <div className="icon">
    <CiMail/>
    </div>
    <div className="check">
    <AiOutlineCheck/>
    </div>
  
</a>
)
                        })
               
}
                
                </div>
            </div>
        </div>
    </>
  )
}

export default Messages