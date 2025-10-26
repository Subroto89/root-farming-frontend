// ChatWithAgriSpecialist.jsx
import React, {
   useState,
   useEffect,
   useRef,
   useContext,
   useCallback,
   useMemo,
} from "react";
import { motion } from "framer-motion";
import {
   Send,
   User,
   CheckCheck,
   MoveVertical as MoreVertical,
} from "lucide-react";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useTheme } from "../../../../hooks/useTheme";
import useChatSocket from "../../../../hooks/useChatSocket";
import Specialist from "../../../../components/Dashboard/RouteBasedComponents/FarmerRoutesComponents/ChatWithAgriSpecialist/Specialist";
import toast from "react-hot-toast";

const CHAT_SERVER =
   import.meta.env.VITE_Server_API_KEY || "http://localhost:3001";

const PAGE_LIMIT = 50; // use same limit consistently

// ---------- lightweight MessageItem (memoized) ----------
const MessageItem = React.memo(
   function MessageItem({ message, currentUid, theme }) {
      const isMine = String(message.senderUid) === String(currentUid);
      return (
         <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
               className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isMine
                     ? theme === "dark"
                        ? "bg-green-600 text-white"
                        : "bg-green-500 text-white"
                     : theme === "dark"
                     ? "bg-gray-700 text-gray-200"
                     : "bg-gray-100 text-gray-800"
               }`}
            >
               <p className="text-sm">{message.text}</p>
               <div
                  className={`flex items-center gap-1 mt-1 ${
                     isMine ? "justify-end" : "justify-start"
                  }`}
               >
                  <span
                     className={`text-xs ${
                        isMine
                           ? theme === "dark"
                              ? "text-green-200"
                              : "text-green-100"
                           : theme === "dark"
                           ? "text-gray-400"
                           : "text-gray-500"
                     }`}
                  >
                     {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                     })}
                  </span>
                  {isMine && (
                     <CheckCheck
                        size={12}
                        className={
                           theme === "dark"
                              ? "text-green-200"
                              : "text-green-100"
                        }
                     />
                  )}
               </div>
            </div>
         </div>
      );
   },
   (prev, next) => {
      // shallow compare essential props so items don't re-render unnecessarily
      return (
         prev.message._id === next.message._id &&
         prev.message.tempId === next.message.tempId &&
         prev.message.text === next.message.text &&
         prev.theme === next.theme
      );
   }
);

// ---------- MessageList (memoized) ----------
const MessageList = React.memo(function MessageList({
   messages,
   currentUid,
   theme,
}) {
   return (
      <>
         {messages.map((m) => (
            <MessageItem
               key={m._id || m.tempId}
               message={m}
               currentUid={currentUid}
               theme={theme}
            />
         ))}
      </>
   );
});

/**
 * InputBox - child component that keeps its own internal state so rapid typing
 * doesn't re-render parent. It calls onSend(text) when Enter/click Send, and
 * emits typing using emitTyping(isTyping). It is memoized.
 */
const InputBox = React.memo(function InputBox({
   connected,
   canSend,
   onSend,
   emitTyping,
   theme,
}) {
   const [value, setValue] = useState("");
   const typingTimeoutRef = useRef(null);
   const lastEmitRef = useRef(0);
   const THROTTLE = 700; // ms
   const STOP_TYPING_DELAY = 900; // ms

   const handleChange = (v) => {
      setValue(v);

      if (!connected) return;

      const now = Date.now();
      if (now - lastEmitRef.current > THROTTLE) {
         lastEmitRef.current = now;
         try {
            emitTyping(true);
         } catch (e) {
            // swallow
         }
      }

      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
         emitTyping(false);
      }, STOP_TYPING_DELAY);
   };

   const send = () => {
      const trimmed = value.trim();
      if (!trimmed || !canSend) return;
      onSend(trimmed);
      setValue("");
      // ensure we tell remote we've stopped typing
      emitTyping(false);
   };

   return (
      <div
         className={`p-4 border-t ${
            theme === "dark"
               ? "border-gray-600 bg-gray-800"
               : "border-gray-200 bg-gray-50"
         }`}
      >
         <div className="flex items-center gap-3">
            <input
               aria-label="Type your message"
               type="text"
               value={value}
               onChange={(e) => handleChange(e.target.value)}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                     send();
                  }
               }}
               placeholder={
                  connected ? "Type your message..." : "Connecting..."
               }
               disabled={!connected}
               className={`flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  theme === "dark"
                     ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                     : "bg-white border-gray-200 text-gray-700 placeholder-gray-500"
               }`}
            />
            <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={send}
               disabled={!value.trim() || !canSend}
               className={`px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 ${
                  theme === "dark"
                     ? "bg-green-600 hover:bg-green-700 text-white"
                     : "bg-green-500 hover:bg-green-600 text-white"
               }`}
            >
               <Send size={18} /> Send
            </motion.button>
         </div>
      </div>
   );
});

/* -------------------- Main component -------------------- */
const ChatWithAgriSpecialist = () => {
   const prevSelectedRef = useRef(null);
   const [joinedConversations, setJoinedConversations] = useState({}); // optional tracker
   const [isJoined, setIsJoined] = useState(false); // indicates last join result for currently selected conv

   const [specialists, setSpecialists] = useState([]);

   const { user, getToken } = useContext(AuthContext);
   const { theme } = useTheme();
   const [selectedSpecialist, setSelectedSpecialist] = useState(null);
   const [messages, setMessages] = useState({}); // keyed by conversationId OR specialistFirebaseUid
   const [conversationMap, setConversationMap] = useState({}); // specialistFirebaseUid -> conversationId (if exists)
   const [typingUsers, setTypingUsers] = useState({});

   // --- scroll refs and paging state for each conversation
   const messagesContainerRef = useRef(null);
   const messagesEndRef = useRef(null); // keep for fallback
   const loadingOlderRef = useRef({}); // convId -> bool
   const hasMoreRef = useRef({}); // convId -> bool
   const pageRef = useRef({}); // convId -> current page number (1 = newest page we already have)

   // For typing emit throttle (avoid heavy socket traffic) - parent-level emits used only from InputBox via emitTyping
   const lastTypingEmitRef = useRef(0);
   const TYPING_EMIT_THROTTLE_MS = 700; // ms

   // helper: determine user's proximity to bottom
   const isUserAtBottom = useCallback((threshold = 120) => {
      const c = messagesContainerRef.current;
      if (!c) return true;
      return c.scrollHeight - c.scrollTop - c.clientHeight <= threshold;
   }, []);

   // scroll to bottom helper
   const scrollToBottom = useCallback(() => {
      const c = messagesContainerRef.current;
      if (c) {
         c.scrollTop = c.scrollHeight;
         return;
      }
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, []);

   // --- SOCKET handlers (for the hook)
   const handleIncoming = useCallback(
      (msg) => {
         const convKey =
            msg.conversationId || msg.senderUid || msg.recipientUid;
         setMessages((prev) => {
            const list = [...(prev[convKey] || []), msg];
            return { ...prev, [convKey]: list };
         });

         if (msg.conversationId && selectedSpecialist) {
            const specUid = selectedSpecialist.firebaseUid;
            if (msg.senderUid === specUid || msg.recipientUid === specUid) {
               setConversationMap((prev) => ({
                  ...prev,
                  [specUid]: msg.conversationId,
               }));
            }
         }
      },
      [selectedSpecialist]
   );

   const handleAck = useCallback(
      (ack) => {
         const { tempId, savedMessage } = ack || {};
         if (!tempId || !savedMessage) return;

         const convKey =
            savedMessage.conversationId ||
            savedMessage.recipientUid ||
            savedMessage.senderUid;
         setMessages((prev) => {
            const list = (prev[convKey] || []).map((m) =>
               m.tempId && m.tempId === tempId
                  ? { ...savedMessage, tempId: undefined }
                  : m
            );
            const hasSaved = list.some(
               (m) => m._id && String(m._id) === String(savedMessage._id)
            );
            if (!hasSaved) list.push(savedMessage);
            return { ...prev, [convKey]: list };
         });

         if (savedMessage.conversationId) {
            if (
               selectedSpecialist &&
               (savedMessage.senderUid === selectedSpecialist.firebaseUid ||
                  savedMessage.recipientUid === selectedSpecialist.firebaseUid)
            ) {
               setConversationMap((prev) => ({
                  ...prev,
                  [selectedSpecialist.firebaseUid]: savedMessage.conversationId,
               }));
            }
         }
      },
      [selectedSpecialist]
   );

   const handleTypingRemote = useCallback(
      ({ conversationId, userId, isTyping } = {}) => {
         const convKey = conversationId || userId;
         setTypingUsers((prev) => ({ ...prev, [convKey]: isTyping }));
      },
      []
   );

   // handle presence updates (socket 'presence' event)
   const handlePresence = useCallback(({ uid, status, lastSeen } = {}) => {
      if (!uid) return;
      setSpecialists((prev) =>
         prev.map((s) =>
            String(s.firebaseUid || s.uid) === String(uid)
               ? { ...s, status, lastSeen }
               : s
         )
      );
   }, []);

   // get socketRef from hook
   const socketRef = useChatSocket(
      handleIncoming,
      handleAck,
      handleTypingRemote,
      (payload) => {
         if (!payload?.conversationId || !Array.isArray(payload?.messageIds))
            return;
         setMessages((prev) => {
            const list = (prev[payload.conversationId] || []).map((m) =>
               payload.messageIds.includes(String(m._id))
                  ? { ...m, status: "read" }
                  : m
            );
            return { ...prev, [payload.conversationId]: list };
         });
      }
   );

   // Register presence and generic socket listeners (join:ok, join:error)
   useEffect(() => {
      const s = socketRef.current;
      if (!s) return;
      const onPresence = (p) => handlePresence(p);
      const onJoinOk = ({ conversationId } = {}) => {
         if (!conversationId) return;
         setJoinedConversations((prev) => ({
            ...prev,
            [conversationId]: true,
         }));
         const convForSelected =
            selectedSpecialist &&
            conversationMap[selectedSpecialist.firebaseUid];
         if (
            convForSelected &&
            String(convForSelected) === String(conversationId)
         ) {
            setIsJoined(true);
         }
      };
      const onJoinErr = (payload) => {
         const err = payload?.error || "Failed to join conversation";
         toast.error(err);
         const convForSelected =
            selectedSpecialist &&
            conversationMap[selectedSpecialist.firebaseUid];
         if (
            convForSelected &&
            String(convForSelected) === String(payload?.conversationId)
         ) {
            setIsJoined(false);
         }
      };

      s.on("presence", onPresence);
      s.on("join:ok", onJoinOk);
      s.on("join:error", onJoinErr);
      return () => {
         s.off("presence", onPresence);
         s.off("join:ok", onJoinOk);
         s.off("join:error", onJoinErr);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [socketRef, conversationMap, selectedSpecialist]);

   // --- Fetch specialists from backend (real data)
   useEffect(() => {
      if (!user) return;
      let mounted = true;
      (async () => {
         try {
            const token = await getToken();
            const res = await fetch(
               `${CHAT_SERVER}/users/get-users-by-type?type=agri-specialist`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            if (!res.ok) throw new Error("Failed to fetch specialists");
            const data = await res.json();
            if (!mounted) return;
            const normalized = data.map((s) => ({
               firebaseUid:
                  s.firebaseUid || s.uid || s.userId || s._id?.toString(),
               userName: s.userName || s.name || s.displayName || s.userEmail,
               userPhoto: s.userPhoto || s.photoURL || "",
               specialty: s.specialty || "",
               status: s.status || "offline",
               lastSeen: s.lastSeen || null,
               experience: s.experience || "",
               ...s,
            }));
            setSpecialists(normalized);
         } catch (err) {
            console.error("Load specialists error:", err);
         }
      })();
      return () => {
         mounted = false;
      };
   }, [user, getToken]);

   // --- load conversationId if exists and message history when selecting specialist
   useEffect(() => {
      if (!selectedSpecialist || !user) return;

      const prevSpec = prevSelectedRef.current;
      if (prevSpec && prevSpec.firebaseUid && socketRef.current) {
         const prevConvId = conversationMap[prevSpec.firebaseUid];
         if (prevConvId) {
            socketRef.current.emit("leaveConversation", {
               conversationId: prevConvId,
            });
            setJoinedConversations((s) => {
               const copy = { ...s };
               delete copy[prevConvId];
               return copy;
            });
         }
      }

      setIsJoined(false);

      let cancelled = false;
      (async () => {
         try {
            const token = await getToken();
            const resConv = await fetch(
               `${CHAT_SERVER}/api/chat/conversations`,
               {
                  headers: { Authorization: `Bearer ${token}` },
               }
            );
            if (!resConv.ok) throw new Error("Failed to load conversations");
            const allConvs = await resConv.json();
            if (cancelled) return;

            const found = allConvs.find((c) =>
               (c.participants || []).includes(selectedSpecialist.firebaseUid)
            );

            if (found) {
               const convId = String(found._id);
               setConversationMap((prev) => ({
                  ...prev,
                  [selectedSpecialist.firebaseUid]: convId,
               }));

               // fetch messages (page 1)
               const resMsgs = await fetch(
                  `${CHAT_SERVER}/api/chat/conversations/${convId}/messages?limit=${PAGE_LIMIT}`,
                  {
                     headers: { Authorization: `Bearer ${token}` },
                  }
               );
               if (resMsgs.ok) {
                  const msgs = await resMsgs.json();
                  setMessages((prev) => ({ ...prev, [convId]: msgs }));
                  pageRef.current[convId] = 1;
                  hasMoreRef.current[convId] = msgs.length === PAGE_LIMIT;
               } else {
                  pageRef.current[convId] = 1;
                  hasMoreRef.current[convId] = false;
               }

               if (socketRef.current) {
                  socketRef.current.emit("joinConversation", {
                     conversationId: convId,
                  });

                  const onJoinOk = ({ conversationId }) => {
                     if (conversationId === convId) {
                        setIsJoined(true);
                        setJoinedConversations((s) => ({
                           ...s,
                           [convId]: true,
                        }));
                     }
                  };
                  const onJoinErr = (payload) => {
                     if (payload?.conversationId === convId) {
                        setIsJoined(false);
                        toast.error(
                           payload?.error || "Failed to join conversation"
                        );
                     }
                  };
                  socketRef.current.on("join:ok", onJoinOk);
                  socketRef.current.on("join:error", onJoinErr);
                  setTimeout(() => {
                     socketRef.current?.off("join:ok", onJoinOk);
                     socketRef.current?.off("join:error", onJoinErr);
                  }, 5000);
               }
            } else {
               setMessages((prev) => ({
                  ...prev,
                  [selectedSpecialist.firebaseUid]:
                     prev[selectedSpecialist.firebaseUid] || [],
               }));
               pageRef.current[selectedSpecialist.firebaseUid] = 0;
               hasMoreRef.current[selectedSpecialist.firebaseUid] = false;
            }
         } catch (err) {
            console.error("Load conversation error:", err);
         } finally {
            prevSelectedRef.current = selectedSpecialist;
         }
      })();

      return () => {
         cancelled = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedSpecialist, user, getToken]);

   // On unmount: leave all joined conversations
   useEffect(() => {
      return () => {
         Object.values(conversationMap).forEach((convId) => {
            if (socketRef.current && convId) {
               socketRef.current.emit("leaveConversation", {
                  conversationId: convId,
               });
            }
         });
      };
   }, [conversationMap, socketRef]);

   // --- Load older messages (prepend) for a conversation
   const loadOlderMessages = useCallback(
      async (convId) => {
         if (!convId) return;
         if (loadingOlderRef.current[convId]) return;
         if (hasMoreRef.current[convId] === false) return;

         loadingOlderRef.current[convId] = true;
         try {
            const nextPage = (pageRef.current[convId] || 1) + 1;
            const token = await getToken();
            const container = messagesContainerRef.current;
            const prevScrollHeight = container?.scrollHeight || 0;

            const res = await fetch(
               `${CHAT_SERVER}/api/chat/conversations/${convId}/messages?page=${nextPage}&limit=${PAGE_LIMIT}`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) {
               throw new Error("Failed to load older messages");
            }
            const olderMsgs = await res.json(); // oldest-first for that page
            if (!Array.isArray(olderMsgs) || olderMsgs.length === 0) {
               hasMoreRef.current[convId] = false;
               pageRef.current[convId] = nextPage - 1;
               return;
            }

            // prepend without duplicating (by id/tempId)
            setMessages((prev) => {
               const existing = prev[convId] || [];
               const existingIds = new Set(
                  existing.map((m) => String(m._id || m.tempId))
               );
               const uniqueOlder = olderMsgs.filter(
                  (m) => !existingIds.has(String(m._id || m.tempId))
               );
               const newList = [...uniqueOlder, ...existing];
               return { ...prev, [convId]: newList };
            });

            // update paging & hasMore
            pageRef.current[convId] = nextPage;
            hasMoreRef.current[convId] = olderMsgs.length === PAGE_LIMIT;

            // after DOM update, preserve scroll position
            requestAnimationFrame(() => {
               const newScrollHeight = container?.scrollHeight || 0;
               const delta = newScrollHeight - prevScrollHeight;
               if (container) {
                  container.scrollTop =
                     (container.scrollTop || 0) + (delta || 0);
               }
            });
         } catch (err) {
            console.error("loadOlderMessages error:", err);
         } finally {
            loadingOlderRef.current[convId] = false;
         }
      },
      [getToken]
   );

   // Attach scroll listener to trigger loading older messages when near top
   useEffect(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
      let ticking = false;
      const onScroll = () => {
         if (ticking) return;
         ticking = true;
         requestAnimationFrame(() => {
            const convKey =
               conversationMap[selectedSpecialist?.firebaseUid] ||
               selectedSpecialist?.firebaseUid;
            if (!convKey) {
               ticking = false;
               return;
            }
            if (container.scrollTop < 120) {
               // load older messages if available
               loadOlderMessages(convKey);
            }
            ticking = false;
         });
      };
      container.addEventListener("scroll", onScroll);
      return () => container.removeEventListener("scroll", onScroll);
   }, [selectedSpecialist, conversationMap, loadOlderMessages]);

   // Controlled auto-scroll: only when appropriate
   useEffect(() => {
      const convKey =
         conversationMap[selectedSpecialist?.firebaseUid] ||
         selectedSpecialist?.firebaseUid;
      if (!convKey) return;
      const list = messages[convKey] || [];
      if (!list.length) {
         return;
      }
      const lastMsg = list[list.length - 1];
      const userAtBottom = isUserAtBottom();

      if (!messagesContainerRef.current) {
         scrollToBottom();
         return;
      }

      if (
         (lastMsg && String(lastMsg.senderUid) === String(user?.uid)) ||
         userAtBottom
      ) {
         requestAnimationFrame(() => {
            scrollToBottom();
         });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [
      messages,
      selectedSpecialist,
      conversationMap,
      scrollToBottom,
      isUserAtBottom,
      user,
   ]);

   // --- ensureConversation helper
   const ensureConversation = useCallback(
      async (recipientUid) => {
         if (!user) throw new Error("User not authenticated");
         try {
            const token = await getToken();
            const res = await fetch(
               `${CHAT_SERVER}/api/chat/conversations/start`,
               {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ recipientUid }),
               }
            );
            if (!res.ok) {
               const err = await res.json().catch(() => ({}));
               throw new Error(err?.error || "Failed to create conversation");
            }
            const conv = await res.json();
            return conv;
         } catch (err) {
            console.error("ensureConversation error:", err);
            throw err;
         }
      },
      [getToken, user]
   );

   // --- send message (optimistic) - accepts `text` param from InputBox
   const handleSendMessage = useCallback(
      async (text) => {
         if (!text?.trim() || !selectedSpecialist || !socketRef.current) return;
         try {
            let convId = conversationMap[selectedSpecialist.firebaseUid];
            if (!convId) {
               const conv = await ensureConversation(
                  selectedSpecialist.firebaseUid
               );
               convId = conv._id;
               setConversationMap((prev) => ({
                  ...prev,
                  [selectedSpecialist.firebaseUid]: convId,
               }));

               // join the conversation room
               socketRef.current.emit("joinConversation", {
                  conversationId: convId,
               });

               // fetch initial messages if any
               try {
                  const token = await getToken();
                  const msgsRes = await fetch(
                     `${CHAT_SERVER}/api/chat/conversations/${convId}/messages?limit=${PAGE_LIMIT}`,
                     { headers: { Authorization: `Bearer ${token}` } }
                  );
                  if (msgsRes.ok) {
                     const msgs = await msgsRes.json();
                     setMessages((prev) => ({ ...prev, [convId]: msgs }));
                     pageRef.current[convId] = 1;
                     hasMoreRef.current[convId] = msgs.length === PAGE_LIMIT;
                  }
               } catch (e) {
                  console.warn("Failed fetching messages after conv create", e);
               }
            }

            const tempId = `temp-${Date.now()}`;
            const optimisticMsg = {
               tempId,
               senderUid: user?.uid,
               senderRole: "farmer",
               text,
               createdAt: new Date().toISOString(),
               status: "sending",
               conversationId: convId,
               recipientUid: selectedSpecialist.firebaseUid,
            };

            setMessages((prev) => {
               const list = [...(prev[convId] || []), optimisticMsg];
               return { ...prev, [convId]: list };
            });

            // ensure we scroll to show the newly sent optimistic message
            requestAnimationFrame(() => {
               scrollToBottom();
            });

            socketRef.current.emit("message", {
               tempId,
               conversationId: convId,
               recipientUid: selectedSpecialist.firebaseUid,
               text: text.trim(),
               senderRole: "farmer",
            });

            // after sending, ensure stop typing is emitted
            socketRef.current.emit("typing", {
               conversationId: convId,
               recipientUid: selectedSpecialist.firebaseUid,
               isTyping: false,
            });
         } catch (err) {
            console.error("send message error:", err);
         }
      },
      [
         socketRef,
         selectedSpecialist,
         conversationMap,
         user,
         getToken,
         scrollToBottom,
         ensureConversation,
      ]
   );

   // emitTyping: stable callback passed to InputBox
   const emitTyping = useCallback(
      (isTyping) => {
         try {
            const convId = conversationMap[selectedSpecialist?.firebaseUid];
            if (!socketRef.current) return;
            socketRef.current.emit("typing", {
               conversationId: convId || undefined,
               recipientUid: selectedSpecialist?.firebaseUid,
               isTyping,
            });
         } catch (e) {
            /* swallow */
         }
      },
      [socketRef, conversationMap, selectedSpecialist]
   );

   // ---------- Use useMemo to avoid recalculating current conversation messages array on every render ----------
   const currentConvKey = useMemo(
      () =>
         selectedSpecialist
            ? conversationMap[selectedSpecialist.firebaseUid] ||
              selectedSpecialist.firebaseUid
            : null,
      [selectedSpecialist, conversationMap]
   );
   const currentMessages = useMemo(
      () => (currentConvKey ? messages[currentConvKey] || [] : []),
      [messages, currentConvKey]
   );

   const canSend =
      socketRef.current?.connected &&
      (isJoined || Boolean(conversationMap[selectedSpecialist?.firebaseUid]));

   return (
      <div
         className={`min-h-screen ${
            theme === "dark"
               ? "bg-dark"
               : "bg-gradient-to-br from-green-50 to-blue-50"
         }`}
      >
         <div className="container mx-auto px-4 py-8">
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1
                  className={`text-4xl font-bold mb-2 flex items-center gap-3 ${
                     theme === "dark" ? "text-gray-50" : "text-gray-800"
                  }`}
               >
                  <div
                     className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-green-900" : "bg-green-100"
                     }`}
                  >
                     <User
                        className={
                           theme === "dark"
                              ? "text-green-300"
                              : "text-green-600"
                        }
                        size={32}
                     />
                  </div>
                  Agriculture Specialist Chat
               </h1>
               <p
                  className={`text-lg ${
                     theme === "dark" ? "text-gray-100" : "text-gray-600"
                  }`}
               >
                  Connect with expert agriculture specialists for personalized
                  farming advice
               </p>
            </motion.div>

            <div
               className={`rounded-xl shadow-lg border overflow-hidden h-[700px] flex ${
                  theme === "dark"
                     ? "fg-dark border-gray-600"
                     : "bg-white border-gray-200"
               }`}
            >
               <div
                  className={`w-1/3 border-r flex flex-col ${
                     theme === "dark" ? "border-gray-600" : "border-gray-200"
                  }`}
               >
                  <div
                     className={`p-4 border-b ${
                        theme === "dark"
                           ? "bg-green-900 border-gray-600"
                           : "bg-green-50 border-gray-200"
                     }`}
                  >
                     <h3
                        className={`font-semibold ${
                           theme === "dark" ? "text-gray-50" : "text-gray-800"
                        }`}
                     >
                        Available Specialists
                     </h3>
                     <p
                        className={`text-sm ${
                           theme === "dark" ? "text-gray-100" : "text-gray-600"
                        }`}
                     >
                        Choose a specialist to start chatting
                     </p>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                     {specialists.map((specialist) => (
                        <Specialist
                           key={specialist.firebaseUid}
                           specialist={specialist}
                           selectedSpecialist={selectedSpecialist}
                           setSelectedSpecialist={setSelectedSpecialist}
                           theme={theme}
                        />
                     ))}
                  </div>
               </div>

               <div className="flex-1 flex flex-col">
                  {selectedSpecialist ? (
                     <>
                        <div
                           className={`p-4 border-b ${
                              theme === "dark"
                                 ? "bg-blue-900 border-gray-600"
                                 : "bg-blue-50 border-gray-200"
                           }`}
                        >
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="relative">
                                    <img
                                       src={selectedSpecialist.userPhoto}
                                       alt={selectedSpecialist.userName}
                                       className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div
                                       className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                                          selectedSpecialist.status === "online"
                                             ? "bg-green-500"
                                             : selectedSpecialist.status ===
                                               "away"
                                             ? "bg-yellow-500"
                                             : "bg-gray-400"
                                       }`}
                                    />
                                 </div>
                                 <div>
                                    <h4
                                       className={`font-semibold truncate ${
                                          theme === "dark"
                                             ? "text-gray-100"
                                             : "text-gray-800"
                                       }`}
                                    >
                                       {selectedSpecialist.userName}
                                    </h4>
                                    <p
                                       className={`text-xs truncate ${
                                          theme === "dark"
                                             ? "text-gray-300"
                                             : "text-gray-500"
                                       }`}
                                    >
                                       {selectedSpecialist.status === "online"
                                          ? "Online now"
                                          : `Last seen ${
                                               selectedSpecialist.lastSeen
                                                  ? new Date(
                                                       selectedSpecialist.lastSeen
                                                    ).toLocaleString()
                                                  : "unknown"
                                            }`}
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2 rounded-lg transition-colors ${
                                       theme === "dark"
                                          ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    }`}
                                 >
                                    <MoreVertical size={20} />
                                 </motion.button>
                              </div>
                           </div>
                        </div>

                        {/* messages container (note ref for scroll) */}
                        <div
                           ref={messagesContainerRef}
                           className="flex-1 overflow-y-auto p-4 space-y-4"
                        >
                           <MessageList
                              messages={currentMessages}
                              currentUid={user?.uid}
                              theme={theme}
                           />

                           {typingUsers[currentConvKey] && (
                              <motion.div
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="flex justify-start"
                              >
                                 <div
                                    className={`px-4 py-2 rounded-lg ${
                                       theme === "dark"
                                          ? "bg-gray-700"
                                          : "bg-gray-100"
                                    }`}
                                 >
                                    <div className="flex items-center gap-1">
                                       <div className="flex gap-1">
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                          />
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                             style={{ animationDelay: "0.1s" }}
                                          />
                                          <div
                                             className={`w-2 h-2 rounded-full animate-bounce ${
                                                theme === "dark"
                                                   ? "bg-gray-400"
                                                   : "bg-gray-400"
                                             }`}
                                             style={{ animationDelay: "0.2s" }}
                                          />
                                       </div>
                                       <span
                                          className={`text-xs ml-2 ${
                                             theme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                          }`}
                                       >
                                          typing...
                                       </span>
                                    </div>
                                 </div>
                              </motion.div>
                           )}

                           <div ref={messagesEndRef} />
                        </div>

                        {/* InputBox: isolated input component (prevents parent re-renders while typing) */}
                        <InputBox
                           connected={socketRef.current?.connected}
                           canSend={canSend}
                           onSend={handleSendMessage}
                           emitTyping={emitTyping}
                           theme={theme}
                        />
                     </>
                  ) : (
                     <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                           <div
                              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                                 theme === "dark"
                                    ? "bg-gray-700"
                                    : "bg-gray-100"
                              }`}
                           >
                              <User
                                 size={40}
                                 className={
                                    theme === "dark"
                                       ? "text-gray-400"
                                       : "text-gray-400"
                                 }
                              />
                           </div>
                           <h3
                              className={`text-xl font-semibold mb-2 ${
                                 theme === "dark" ? "fg-dark" : "text-gray-800"
                              }`}
                           >
                              Select a Specialist
                           </h3>
                           <p
                              className={
                                 theme === "dark" ? "fg-dark" : "text-gray-600"
                              }
                           >
                              Choose a specialist from the left to start
                              chatting
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatWithAgriSpecialist;
