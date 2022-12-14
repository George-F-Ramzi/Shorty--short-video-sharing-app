import { useContext } from "react";
import { authContext } from "../pages/homePage";

const SearchedProfile = ({ user }) => {
  const { getProfile } = useContext(authContext);
  return (
    <div className="searched-profile">
      <img
        src={user.photo}
        alt="profile"
        className="searched__photo"
        onClick={() => getProfile(user.id)}
      />
      <h5 onClick={() => getProfile(user.id)} className="searched__name">
        {user.username}
      </h5>
      <button className="btn btn--small body1">Follow</button>
    </div>
  );
};

export default SearchedProfile;
