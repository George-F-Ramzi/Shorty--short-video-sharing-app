import { useContext, useState, useEffect } from "react";
import { authContext } from "../pages/homePage";

const SearchedProfile = ({ user }) => {
  const { doUnFollow, doFollow, getProfile, didFollow } =
    useContext(authContext);
  const [follow, setFollow] = useState(3);

  useEffect(() => {
    trackData();
  }, []);

  const trackData = async () => {
    const state = await didFollow(user.id);
    if (state.status === 204) {
      setFollow(1);
    } else if (state.status === 200) {
      setFollow(2);
    } else {
      setFollow(0);
    }
  };

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
      {follow === 1 ? (
        <button
          onClick={() => {
            doFollow(user.id);
            setFollow(2);
          }}
          className="btn btn--small body1"
        >
          Follow
        </button>
      ) : follow === 2 ? (
        <button
          onClick={() => {
            doUnFollow(user.id);
            setFollow(1);
          }}
          className="btn btn--small btn--active  body1"
        >
          Following
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchedProfile;
