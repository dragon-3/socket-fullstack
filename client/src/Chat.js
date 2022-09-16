import React from 'react'
import {useState} from 'react'

function Chat({socket, name, room}) {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const sendMessage = () => {
        if (currentMessage !== "") {

            const messageData = {
                room: room,
                author: name,
                message: currentMessage,
                time: 
                new Date(Date.now()).getHours() +
                    ":" +
                new Date(Date.now()).getMinutes()
            }

            socket.emit("send_message", messageData);
            // setMessageList()

        }
    }
    
    


    return (

        <div>
            <div className="container">
                <div className="message-history">
                    
                </div>
                <div className="text">
                    <input type="text" placeholder='text'onChange={(e) => setCurrentMessage(e.target.value)} />
                    <button onClick={sendMessage}>SEND</button>
                </div>
            </div>
            
        </div>

    )
}

export default Chat