import { Outlet } from "react-router-dom";
import ProfileNav from "../components/profile/ProfileNav";
import AddressProvider from "../contexts/AddressContext";

const Profile = () => {
  return (
    <AddressProvider>
      <div className="flex w-full min-h-[500px] max-w-[1110px] mx-auto py-8">
        <ProfileNav className={"w-80"} />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </AddressProvider>
  );
};

export default Profile;
