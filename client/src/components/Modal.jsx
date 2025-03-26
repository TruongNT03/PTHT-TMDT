import { createPortal } from "react-dom";

let modalRoot = document.getElementById("modal-root");

if (!modalRoot) {
  const modalRootDiv = document.createElement("div");
  modalRootDiv.id = "modal-root";
  document.body.appendChild(modalRootDiv);
  modalRoot = modalRootDiv;
}

const Modal = ({ visible, setVisible, children }) => {
  return createPortal(
    <div className={`modal ${visible ? "" : "hidden"}`}>{children}</div>,
    modalRoot
  );
};

export default Modal;
