import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import io from "socket.io-client" 

function App() {

  const socket = io.connect("http://localhost:3001")

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [displayChat, setDisplayChat] = useState("");

  const joinRoom = () => {
    socket.emit("join_room", room);
  }


  return (
    <div className="App">
      
      <div className="login">

        <label htmlFor="">Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)}/><br />

        <label htmlFor="">Room:</label>
        <input type="text" onChange={(e) => setRoom(e.target.value)}/><br />

        <button onClick={joinRoom}>JOIN</button>

      </div>

    </div>
  );
}

export default App;
