import { useContext, useEffect, useState } from "react";
import { RiCloseFill, RiEditBoxLine } from "react-icons/ri";
import VideoCardSmall from "./videoCardSmall";
import Spinner from "./spinner";
import { authContext } from "../pages/homePage";
import lodash from "lodash";
import EmptyPlacholder from "./emptyPlacholder";

const ProfileModal = () => {
  const {
    setEditImage,
    setProfile,
    profileData,
    didFollow,
    doUnFollow,
    doFollow,
    setEdit,
  } = useContext(authContext);
  const [follow, setFollow] = useState(0);

  useEffect(() => {
    trackData();
  }, [profileData]);

  const trackData = async () => {
    const state = await didFollow(profileData.id);
    if (state.status === 204) {
      setFollow(1);
    } else if (state.status === 200) {
      setFollow(2);
    } else {
      setFollow(0);
    }
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="header__hr">
          <h5 className="hr__title">Profile</h5>
          <RiCloseFill
            onClick={() => {
              setProfile(false);
            }}
            size={"32px"}
          />
        </div>
        {lodash.isEmpty(profileData) ? (
          <Spinner />
        ) : (
          <div className="modal__content">
            <div className="profile__header">
              <div className="header__user">
                <div className="user__img">
                  <img
                    className="img-cover"
                    src={profileData.photo}
                    alt="profile"
                  />
                  {follow === 0 ? (
                    <div
                      onClick={() => setEditImage(true)}
                      className="img-edit"
                    >
                      <RiEditBoxLine size={"24px"} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="user__info">
                  <h5 className="info__username">{profileData.username}</h5>
                  <p className="info__bio body1">{profileData.details}</p>
                </div>
                {follow === 1 ? (
                  <button
                    onClick={() => {
                      doFollow(profileData.id);
                      setFollow(2);
                    }}
                    className="btn btn--small body1"
                  >
                    Follow
                  </button>
                ) : follow === 2 ? (
                  <button
                    onClick={() => {
                      doUnFollow(profileData.id);
                      setFollow(1);
                    }}
                    className="btn btn--small btn--active  body1"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => setEdit(true)}
                    className="btn btn--small body1"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
              <div className="header__numbers">
                <div className="number">
                  {profileData.followers}
                  <span className="number__identifier"> Followers</span>
                </div>
                <div className="number">
                  {profileData.following}
                  <span className="number__identifier"> Following</span>
                </div>
                <div className="number">
                  {profileData.posts}
                  <span className="number__identifier"> Videos</span>
                </div>
              </div>
            </div>
            <div className="scrollable-div">
              {lodash.isEmpty(profileData.videos) ? (
                <EmptyPlacholder />
              ) : (
                <div className="videos-container">
                  {profileData.videos.map((video, index) => (
                    <VideoCardSmall key={index} video={video} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
