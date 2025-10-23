// src/hooks/useChatSocket.jsx
import React, { useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";

const CHAT_SERVER =
   import.meta.env.VITE_Server_API_KEY || "http://localhost:3001";

/**
 * useChatSocket(onMessage, onAck, onTyping, onRead)
 *
 * - onMessage(msg)        -> called for incoming "message"
 * - onAck(ack)            -> called for "message:ack"
 * - onTyping(payload)     -> called for "typing"
 * - onRead(payload)       -> called for "message:read"
 *
 * Returns: socketRef (React ref) whose .current is the connected socket
 */
const useChatSocket = (onMessage, onAck, onTyping, onRead, onPresence) => {
   const { getToken, user } = useContext(AuthContext);
   const socketRef = useRef(null);

   useEffect(() => {
      // only connect when we have a logged-in user
      if (!user) return;

      let active = true;
      let socket;

      (async () => {
         try {
            // get a fresh token for the handshake (forceRefresh = false is OK)
            const token = await getToken(false);
            if (!token) {
               console.warn(
                  "useChatSocket: no token available, aborting socket connect"
               );
               return;
            }

            // create socket connection with auth token
            socket = io(CHAT_SERVER, {
               auth: { token },
               transports: ["websocket"],
               // you can add reconnection options here if desired
            });

            // set on ref
            socketRef.current = socket;

            socket.on("connect", () => {
               if (!active) return;
               console.debug("Chat socket connected:", socket.id);
               toast.success("Chat connected");
            });

            socket.on("connect_error", (err) => {
               console.error("Chat connect_error:", err?.message || err);
               // show a user-friendly toast only on first connect error
               toast.error("Chat connection failed");
            });

            socket.on("disconnect", (reason) => {
               console.warn("Chat socket disconnected:", reason);
               // Do not show a toast on normal client-initiated disconnects
            });

            // Core event listeners
            socket.on("message", (msg) => {
               try {
                  onMessage && onMessage(msg);
               } catch (err) {
                  console.error("onMessage handler threw:", err);
               }
            });

            socket.on("message:ack", (ack) => {
               try {
                  onAck && onAck(ack);
               } catch (err) {
                  console.error("onAck handler threw:", err);
               }
            });

            socket.on("typing", (payload) => {
               try {
                  onTyping && onTyping(payload);
               } catch (err) {
                  console.error("onTyping handler threw:", err);
               }
            });

            socket.on("message:read", (payload) => {
               try {
                  onRead && onRead(payload);
               } catch (err) {
                  console.error("onRead handler threw:", err);
               }
            });

            socket.on("join:error", (payload) => {
               console.warn("join:error", payload);
               toast.error(payload?.error || "Failed to join conversation");
            });

            socket.on("message:error", (payload) => {
               console.warn("message:error", payload);
               toast.error(payload?.error || "Failed to send message");
            });

            socket.on("join:ok", ({ conversationId }) => {
               console.debug("Joined conversation ok:", conversationId);
            });

            socket.on("presence", (payload) => {
               try {
                  onPresence && onPresence(payload);
               } catch (e) {
                  console.error(e);
               }
            });
         } catch (err) {
            console.error("Failed to init chat socket:", err);
         }
      })();

      // cleanup
      return () => {
         active = false;
         if (socketRef.current) {
            try {
               socketRef.current.disconnect();
            } catch (e) {
               console.warn("Error disconnecting socket:", e);
            }
            socketRef.current = null;
         }
      };
      // Recreate socket when the authenticated user changes or handlers change
      // We intentionally include handlers in deps so the listeners use latest callbacks.
   }, [getToken, user, onMessage, onAck, onTyping, onRead, onPresence]);

   return socketRef;
};

export default useChatSocket;
