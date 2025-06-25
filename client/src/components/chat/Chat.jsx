import { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getMessageLogs } from "../../services/chat";

const socket = io("http://localhost:8080", {
  auth: { user_id: Number.parseInt(Cookies.get("user_id")) },
});

const Chat = ({ isUser = true }) => {
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
  const [room, setRoom] = useState([
    [
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
        msg: "Tôi muốn mua quần áo 1",
        mark: 1,
      },
    ],
    [
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
        msg: "Tôi muốn mua quần áo 2",
        mark: 1,
      },
    ],
    [
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
        msg: "Tôi muốn mua quần áo 3",
        mark: 1,
      },
    ],
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
  const [check, setCheck] = useState(false);
  const [toUser, setToUser] = useState(1);
  const token = Cookies.get("accessToken");
  const navigate = useNavigate();
  const msgRef = useRef(null);
  const [messageData, setMessageData] = useState({});
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, [messageLogs, active]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMessageLogs();
      if (response.status === 200) {
        setMessageData(response.chat_room);
        setMessageLogs(response.chat_room[0].chat_messages);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    socket.on("chat message", ({ from, to, msg }) => {
      setMessageLogs((prev) => [...prev, { from: from, to: to, msg: msg }]);
    });
  }, [msg]);
  return (
    <div className="">
      <div
        className={`relative transition-all duration-300 ease-in-out bg-[#f5f5f5] p-2  border-[#ddd] border shadow-md ${
          active
            ? isUser
              ? "w-[400px] h-[450px] rounded-md"
              : "w-[600px] h-[450px] rounded-md"
            : "w-[50px] h-[50px] rounded-full"
        }`}
      >
        {active ? (
          <div className="flex w-full h-full">
            <IoMdClose
              onClick={() => setActive((prev) => !prev)}
              className="absolute cursor-pointer top-2 right-2"
            />
            {isUser ? (
              <></>
            ) : (
              <>
                <div className="flex-[2] h-full py-5">
                  {messageData?.map((value, index) => (
                    <div
                      className={`flex gap-2 py-2 rounded-md cursor-pointer hover:bg-blue-200 mb-1 ${
                        value.user_one === toUser || value.user_two === toUser
                          ? "bg-blue-300"
                          : ""
                      }`}
                      key={value.user_id}
                      onClick={() => {
                        setMessageLogs(value.chat_messages);
                        setToUser(
                          value.user_one ===
                            Number.parseInt(Cookies.get("user_id"))
                            ? value.user_one
                            : value.user_two
                        );
                      }}
                    >
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PSqLyX20AR7-QbeMokUp_5_yathFie1eJw&s"
                        alt=""
                        className="w-6 h-6 rounded-lg ml-2"
                      />
                      <div className="truncate">
                        {value.user.firstname + " " + value.user.lastname}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-[3px] bg-gray rounded-sm bg-opacity-30 mx-2"></div>
              </>
            )}
            <div className="flex-[5] flex flex-col justify-between">
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
                {check ? (
                  messageLogs?.map((value, index) => (
                    <div
                      key={index}
                      className={`my-4 px-2 w-fit p-1 rounded-md ${
                        value.from === Number.parseInt(Cookies.get("user_id"))
                          ? "right-0 bg-blue-500 text-white ml-auto"
                          : "left-0 bg-gray-light text-dark"
                      }`}
                    >
                      {value.msg}
                    </div>
                  ))
                ) : (
                  <div className="w-fit mx-auto">
                    <button
                      className="mx-auto bg-blue-400 p-1 rounded-lg text-white hover:bg-blue-600"
                      onClick={() => {
                        setCheck(true);
                      }}
                    >
                      Bắt đầu trò chuyện
                    </button>
                  </div>
                )}
              </div>
              {check ? (
                <div className="w-full flex items-center bg-[#f8f9fa] border border-[#ced4da] rounded-md">
                  <input
                    className="outline-0 bg-transparent w-full px-2"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        socket.emit("chat message", {
                          from: Number.parseInt(Cookies.get("user_id")),
                          to: toUser,
                          msg: msg,
                        });
                        setMsg("");
                        setMessageLogs((prev) => [
                          ...prev,
                          {
                            from: Number.parseInt(Cookies.get("user_id")),
                            to: toUser,
                            msg: msg,
                          },
                        ]);
                      }
                    }}
                  />
                  <IoIosSend
                    className="cursor-pointer mr-2"
                    onClick={() => {
                      setMsg("");
                      setMessageLogs((prev) => [
                        ...prev,
                        {
                          from: Number.parseInt(Cookies.get("user_id")),
                          to: toUser,
                          msg: msg,
                        },
                      ]);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
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
