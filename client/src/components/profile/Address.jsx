import Button from "../button/Button";
import AddressDetail from "./AddressDetail";
import { AddressContext } from "../../contexts/AddressContext";
import { useContext, useState } from "react";
import AddressDialog from "./AddressDialog";

const Address = () => {
  const { close, setClose, listData, data, setData } =
    useContext(AddressContext);
  const handleClose = () => {
    setClose((prev) => !prev);
  };
  const handleNew = () => {
    setData({
      name: "",
      address: "",
      phone: "",
      defaul: false,
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
            name={item.name}
            address={item.address}
            phone={item.phone}
            defaul={item.defaul}
            handleClose={handleClose}
          />
        );
      })}

      {/* <AddressDetail
        name={"Trường"}
        address={"Ha noi, Phường Viên Sơn, Thị xã Sơn Tây, Hà Nội, Vietnam"}
        phone={"0334011350"}
        defaul={false}
      /> */}
      {close ? <></> : <AddressDialog {...data} />}
    </div>
  );
};

export default Address;
