import { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const socket = io("http://localhost:8080", {
  auth: { user_id: Cookies.get("user_id") || 2 },
});

const Chat = () => {
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [messageLogs, setMessageLogs] = useState([
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
    {
      msg: "Chào bạn!",
      mark: 1,
    },
    {
      msg: "Vâng, Xin chào!",
      mark: 0,
    },
    {
      msg: "Bạn cần hỗ trợ gì?",
      mark: 0,
    },
    {
      msg: "Tôi muốn mua quần áo",
      mark: 1,
    },
  ]);
  const [user, setUser] = useState([
    {
      user_id: 1,
      name: "Truong",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PSqLyX20AR7-QbeMokUp_5_yathFie1eJw&s",
    },
    {
      user_id: 2,
      name: "Truong",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PSqLyX20AR7-QbeMokUp_5_yathFie1eJw&s",
    },
    {
      user_id: 3,
      name: "Truong",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PSqLyX20AR7-QbeMokUp_5_yathFie1eJw&s",
    },
  ]);
  const token = Cookie.get("token");
  const navigate = useNavigate();
  const msgRef = useRef(null);
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messageLogs, active]);
  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessageLogs((prev) => [...prev, { mark: 0, msg: msg }]);
    });
  }, [msg]);
  return (
    <div className="">
      <div
        className={`relative transition-all duration-300 ease-in-out bg-[#f5f5f5] p-2  border-[#ddd] border shadow-md ${
          active
            ? "w-[600px] h-[450px] rounded-md"
            : "w-[50px] h-[50px] rounded-full"
        }`}
      >
        {active ? (
          <div className="flex w-full h-full">
            <IoMdClose
              onClick={() => setActive((prev) => !prev)}
              className="absolute cursor-pointer top-2 right-2"
            />
            <div className="flex-[2] h-full py-5">
              {user?.map((value, index) => (
                <div
                  className={`flex gap-2 py-2 rounded-md cursor-pointer hover:bg-blue-200 mb-1 ${
                    index === 0 ? "bg-blue-300" : ""
                  }`}
                  key={value.user_id}
                >
                  <img
                    src={value.avatar}
                    alt=""
                    className="w-6 h-6 rounded-lg ml-2"
                  />
                  <div>{value.name}</div>
                </div>
              ))}
            </div>
            <div className="w-[3px] bg-gray rounded-sm bg-opacity-30 mx-2"></div>
            <div className="flex-[5] flex flex-col">
              <div className="flex gap-2 items-end">
                <img
                  src={user[0].avatar}
                  alt=""
                  className="w-8 h-8 rounded-md"
                />
                <div className="align-text-bottom">{user[0].name}</div>
              </div>
              <div
                className="w-full my-5 px-3 overflow-y-auto bg-light-blue rounded-md"
                ref={msgRef}
              >
                {messageLogs?.map((value, index) => (
                  <div
                    key={index}
                    className={`my-4 px-2 w-fit p-1 rounded-md ${
                      value.mark === 1
                        ? "right-0 bg-blue-500 text-white ml-auto"
                        : "left-0 bg-gray-light text-dark"
                    }`}
                  >
                    {value.msg}
                  </div>
                ))}
              </div>
              <div className="w-full flex items-center bg-[#f8f9fa] border border-[#ced4da] rounded-md">
                <input
                  className="outline-0 bg-transparent w-full px-2"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      socket.emit("chat message", {
                        from: 3,
                        to: 1,
                        msg: msg,
                      });
                      setMsg("");
                      setMessageLogs((prev) => [
                        ...prev,
                        { msg: msg, mark: 1 },
                      ]);
                    }
                  }}
                />
                <IoIosSend
                  className="cursor-pointer mr-2"
                  onClick={() => {
                    setMsg("");
                    setMessageLogs((prev) => [...prev, { msg: msg, mark: 1 }]);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <IoChatbubbleEllipsesOutline
            className="text-3xl m-auto cursor-pointer"
            onClick={() => {
              if (token) {
                setActive(true);
              } else {
                navigate("/login");
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
