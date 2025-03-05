import { Outlet } from "react-router-dom";
import ProfileNav from "../components/profile/ProfileNav";

const Profile = () => {
  return (
    <div className="flex w-full max-w-[1110px] mx-auto py-8">
      <ProfileNav className={"w-80"} />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
