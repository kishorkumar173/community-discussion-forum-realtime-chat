import axios from "axios";

const API = axios.create({
  baseURL: "https://community-discussion-forum-realtime-chat.onrender.com/api",
});

export default API;