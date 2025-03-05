import Button from "../button/Button";
import AddressDetail from "./AddressDetail";

const Address = () => {
  return (
    <div>
      <div className="uppercase text-xl">Địa chỉ của bạn</div>
      <Button
        label={"Thêm địa chỉ"}
        className={"w-[150px] text-sm mt-10"}
        variant="white"
      />
      <AddressDetail
        name={"Trường"}
        address={"Ha noi, Phường Viên Sơn, Thị xã Sơn Tây, Hà Nội, Vietnam"}
        phone={"0334011350"}
        defaul={true}
      />
      <AddressDetail
        name={"Trường"}
        address={"Ha noi, Phường Viên Sơn, Thị xã Sơn Tây, Hà Nội, Vietnam"}
        phone={"0334011350"}
        defaul={false}
      />
    </div>
  );
};

export default Address;
