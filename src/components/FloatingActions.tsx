"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  FaPlus,
  FaTimes,
  FaArrowUp,
  FaComments,
  FaPaperPlane,
  FaRobot,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { Message } from "@/types/messages";
import { createMessage, formatTime } from "@/components/messages";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

export default function FloatingActions() {
  const t = useTranslations("chatbot");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("bot");

  // Sample users list
  const [users] = useState<ChatUser[]>(() => {
    const now = Date.now();
    return [
      { id: "bot", name: "Trợ lý ảo", lastMessage: "Xin chào! Tôi có thể giúp gì cho bạn?", lastMessageTime: new Date(now) },
      { id: "user1", name: "Nguyễn Văn A", lastMessage: "Cảm ơn bạn!", lastMessageTime: new Date(now - 3600000) },
      { id: "user2", name: "Trần Thị B", lastMessage: "Tôi cần hỗ trợ", lastMessageTime: new Date(now - 7200000) },
      { id: "user3", name: "Lê Văn C", lastMessage: "OK", lastMessageTime: new Date(now - 86400000) },
    ];
  });

  // Messages by user ID
  const [messagesByUser, setMessagesByUser] = useState<Record<string, Message[]>>(() => ({
    bot: [createMessage(1, t("welcome"), "bot")],
    user1: [createMessage(1, "Xin chào!", "user"), createMessage(2, "Cảm ơn bạn!", "user")],
    user2: [createMessage(1, "Tôi cần hỗ trợ", "user")],
    user3: [createMessage(1, "OK", "user")],
  }));

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current messages based on selected user
  const currentMessages = useMemo(() => {
    return messagesByUser[selectedUserId] || [];
  }, [messagesByUser, selectedUserId]);

  const selectedUser = useMemo(() => {
    return users.find((u) => u.id === selectedUserId) || users[0];
  }, [users, selectedUserId]);

  // Auto scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
    setInputMessage("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
    setIsMenuOpen(false);
  };

  const handlePhoneClick = () => {
    // Mở số điện thoại để gọi
    window.location.href = "tel:+3568362335";
    setIsMenuOpen(false);
  };

  const handleSendMessage = useCallback(() => {
    const text = inputMessage.trim();
    if (!text || !selectedUserId) return;

    const userId = selectedUserId;
    setMessagesByUser((prev) => {
      const currentUserMessages = prev[userId] || [];
      const userMessage = createMessage(currentUserMessages.length + 1, text, "user");
      const updated = { ...prev, [userId]: [...currentUserMessages, userMessage] };

      // Simulate response (only for bot)
      if (userId === "bot") {
        setTimeout(() => {
          setMessagesByUser((current) => {
            const botMessages = current[userId] || [];
            return {
              ...current,
              [userId]: [
                ...botMessages,
                createMessage(botMessages.length + 1, t("defaultResponse"), "bot"),
              ],
            };
          });
        }, 1000);
      }

      return updated;
    });

    setInputMessage("");
  }, [inputMessage, selectedUserId, t]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const actions = [
    {
      id: "scroll",
      icon: FaArrowUp,
      label: "Scroll to top",
      onClick: scrollToTop,
      angle: -90, 
    },
    {
      id: "chat",
      icon: FaComments,
      label: "Chat",
      onClick: handleChatClick,
      angle: 180, 
    },
    {
      id: "phone",
      icon: FaPhone,
      label: "Contact",
      onClick: handlePhoneClick,
      angle: 225, 
    },
  ];

  const radius = 80;

  return (
    <>
      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {isMenuOpen &&
            actions.map((action, index) => {
              const angleRad = (action.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              const delay = index * 100;

              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className={`absolute w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 z-0 ${
                    action.id === "phone"
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                      : action.id === "chat"
                      ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                  style={{
                    right: "0px",
                    bottom: "0px",
                    "--translate-x": `${x}px`,
                    "--translate-y": `${y}px`,
                    animation: isMenuOpen
                      ? `buttonAppear 0.6s ease-out ${delay}ms forwards`
                      : "none",
                  } as React.CSSProperties}
                  aria-label={action.label}
                >
                  <action.icon className="w-5 h-5" />
                </button>
              );
            })}

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className={`relative z-10 index-10 bg-white w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center ${
              isMenuOpen ? "rotate-45" : "rotate-0"
            }`}
            aria-label="Toggle actions menu"
          >
            {isMenuOpen ? (
              <FaPlus className="w-6 h-6" />
            ) : (
              <RxHamburgerMenu  className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Box */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[800px] h-[600px] bg-white rounded-lg shadow-2xl flex border border-gray-200 overflow-hidden">
          {/* Sidebar - User List */}
          <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50">
            {/* Sidebar Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold">{t("title")}</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-blue-700 rounded-full p-1 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {users.map((user) => {
                const isSelected = selectedUserId === user.id;
                const lastMessage = messagesByUser[user.id]?.[messagesByUser[user.id].length - 1];
                const displayLastMessage = lastMessage?.text || user.lastMessage || "";

                return (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-100 transition-colors border-b border-gray-200 ${
                      isSelected ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                      {user.avatar ? (
                        <div 
                          className="w-full h-full rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${user.avatar})` }}
                        />
                      ) : user.id === "bot" ? (
                        <FaRobot className="w-5 h-5" />
                      ) : (
                        <FaUser className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className={`text-sm font-medium truncate ${isSelected ? "text-blue-600" : "text-gray-900"}`}>
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{displayLastMessage}</p>
                    </div>
                    {user.unreadCount && user.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                        {user.unreadCount > 9 ? "9+" : user.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between border-b border-blue-700">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  {selectedUser.id === "bot" ? (
                    <FaRobot className="w-5 h-5" />
                  ) : (
                    <FaUser className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedUser.name}</h3>
                  <p className="text-xs text-blue-100">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-blue-700 rounded-full p-2 transition-colors shrink-0"
                aria-label="Close chat"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ""}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
