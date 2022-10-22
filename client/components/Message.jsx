import { useState, useEffect, useRef } from "react";

const messageRef = useRef(null);
const [messageReceived, setMessageReceived] = useState([]);
// useEffect(() => {}, []);
const submitHandler = (e) => {
  e.preventDefault();
  const message = messageRef.current.value;

  socket.emit("send_message", message);
  e.target.reset();
};
useEffect(() => {
  console.log(messageReceived);
  console.log("USEFFFECT");
  socket.on("receive_message", (data) => {
    console.log(data);
    setMessageReceived((prevMessages) => {
      return [...prevMessages, { message: data }];
    });
  });
  return () => socket.off("receive_message");
}, [socket]);
return (
  <>
    <form onSubmit={submitHandler}>
      <input type="text" ref={messageRef}></input>
      <button type="submit">Submit</button>
    </form>
    <h1>Message</h1>
    {messageReceived.map((el, i) => {
      return (
        <div key={i}>
          <p>{el.message}</p>
        </div>
      );
    })}
  </>
);
