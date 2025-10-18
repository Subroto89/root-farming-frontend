import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const CHAT_SERVER =
   import.meta.env.VITE_Server_API_KEY || "http://localhost:3001";

const useChatSocket = (onMessage, onAck, onTyping) => {
   const { getToken, user } = useContext(AuthContext);
   const socketRef = useRef(null);

   useEffect(() => {
      let cancelled = false;
      let socket;

      async function init() {
         if (!user) return;
         const token = await getToken();
         if (!token) {
            console.warn("No token - cannot init socket");
            return;
         }

         socket = io(CHAT_SERVER, {
            auth: { token },
            transports: ["websocket"],
         });

         socket.on("connect", () => {
            console.log("socket connected", socket.id);
            toast.success("Chat connected");
         });

         socket.on("message", (msg) => {
            onMessage && onMessage(msg);
         });

         socket.on("message:ack", (ack) => {
            onAck && onAck(ack);
         });

         socket.on("typing", (payload) => {
            onTyping && onTyping(payload);
         });

         socket.on("disconnect", (reason) => {
            console.log("socket disconnected:", reason);
         });

         socketRef.current = socket;
      }

      init();

      return () => {
         cancelled = true;
         if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
         }
      };
      // only re-run when the user changes (auth) — token refresh handled internally
   }, [getToken, user, onMessage, onAck, onTyping]);

   return socketRef;
};

export default useChatSocket;
