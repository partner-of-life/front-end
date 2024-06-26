"use client";

import { useCallback, useEffect, useState } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";
import Cookies from "universal-cookie";

const APP_ID = process.env.TALKJS_APP_ID || "tGsFLBOZ";

export default function ChatPublic() {
  const [isOpen, setIsOpen] = useState(false);
  const cookies = new Cookies();
  const [user, setUser] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
  });
  const guest = Math.floor(1000000 + Math.random() * 9000000);
  const userId = user && user._id ? String(user._id) : `guest${guest}`;
  const userName = user && user.name ? user.name : `Guest#${guest}`;
  const userEmail = user && user.email ? user.email : `guest${guest}@mail.com`;

  useEffect(() => {
    const userId = cookies.get("UserId");
    const name = cookies.get("Name");
    const username = cookies.get("Username");
    const email = cookies.get("Email");
    setUser({
      _id: userId,
      name: name,
      username: username,
      email: email,
    });
  }, []);

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: userId,
        name: userName,
        email: userEmail,
        photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
        welcomeMessage: "Hi!",
      }),
    [user, guest]
  );

  const syncConversation = useCallback((session) => {
    const conversation = session.getOrCreateConversation(userId);

    const other = new Talk.User({
      id: "admin",
      name: "Admin",
      email: "admin@mail.com",
      photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
      welcomeMessage: "Hey, how can I help?",
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-[125px] right-[10px] z-50 w-[480px]">
          <Session appId={APP_ID} syncUser={syncUser}>
            <Chatbox
              syncConversation={syncConversation}
              style={{ width: "100%", height: "500px" }}
            ></Chatbox>
          </Session>
        </div>
      )}
      <button
        onClick={openModal}
        className="btn btn-accent h-[60px] w-[60px] rounded-[30px] fixed bottom-[50px] right-[50px] z-50"
      >
        {!isOpen ? (
          <svg
            className="w-[50px] h-[50px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[50px] h-[50px]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
