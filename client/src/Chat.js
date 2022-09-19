import React, { useEffect } from 'react'
import {useState} from 'react'

function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    

    const sendMessage = async () => {
        if (currentMessage !== "") {

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                new Date(Date.now()).getHours() +
                    ":" +
                new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            
            setMessageList((list) => [...list, messageData]);
            
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    
    return (

        <div>
            <div className="container">
                <div className="message-history">
                    {
                        messageList.map(
                            (messages) => (
                                <div className="messages" id={username === messages.author ? "you" : "other"}>
                                    <tr key={messages.id}>
                                        <td>{messages.message}</td>
                                    </tr>
                                </div>
                                
                            )
                        )
                    }
                </div>
                <div className="chat_footer">
                    <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
                    <button onClick={sendMessage}>SEND</button>
                </div>
            </div>
            
        </div>

    )
}

export default Chat