import { notification } from "antd";
import { createContext } from "react";
import { MdDone } from "react-icons/md";

export const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = ({ message }) => {
    api.open({
      icon: <MdDone className="bg-green-500 rounded-full p-[1px] text-white" />,
      message: message,
      duration: 2,
      showProgress: true,
      style: { fontWeight: "normal" },
    });
  };
  return (
    <MessageContext.Provider value={{ openNotification, contextHolder }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
