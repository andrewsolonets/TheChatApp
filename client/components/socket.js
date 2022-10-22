import { io } from "socket.io-client";

let socket;
const URL = "http://localhost:3001";
socket = io(URL, { autoConnect: false });



export default socket;
