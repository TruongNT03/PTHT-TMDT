import Button from "../button/Button";
import AddressDetail from "./AddressDetail";
import { AddressContext } from "../../contexts/AddressContext";
import { useContext } from "react";
import AddressDialog from "./AddressDialog";

const Address = () => {
  const { close, setClose, listData, data, setData } =
    useContext(AddressContext);
  const handleClose = () => {
    setClose((prev) => !prev);
  };
  const handleNew = () => {
    setData({
      id: 0,
      name: "",
      address: "",
      phone: "",
      isDefault: false,
    });
    setClose((prev) => !prev);
  };
  return (
    <div>
      <div className="uppercase text-xl">Địa chỉ của bạn</div>
      <Button
        label={"Thêm địa chỉ"}
        className={"w-[150px] text-sm mt-10"}
        variant="white"
        onClick={handleNew}
      />
      {listData.map((item, index) => {
        return (
          <AddressDetail
            key={index}
            id={item.id}
            name={item.name}
            address={item.address}
            phone={item.phone}
            isDefault={item.isDefault}
            handleClose={handleClose}
          />
        );
      })}
      {close ? <></> : <AddressDialog {...data} />}
    </div>
  );
};

export default Address;
