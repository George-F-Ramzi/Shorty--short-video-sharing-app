import { useContext, useState, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { authContext } from "../pages/homePage";
import { DateFormating } from "../utility/dateFormating";
import { didliked, DeleteVideo } from "../api/authApi";

const VideoPreviewModal = () => {
  const [followed, setFollowed] = useState(1);
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const {
    setPreview,
    previewedVideo,
    didFollow,
    doFollow,
    doUnFollow,
    Dislike,
    like,
    Getcomments,
    getProfile,
  } = useContext(authContext);

  useEffect(() => {
    trackVideoState();
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }, [show]);

  const trackVideoState = async () => {
    const check = await didFollow(previewedVideo.user.id);
    if (check.status === 204) {
      setFollowed(1);
    } else if (check.status === 200) {
      setFollowed(2);
    } else {
      setFollowed(3);
    }

    const likedTheVideo = await didliked(previewedVideo.id);

    if (likedTheVideo.status === 204) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Video</h5>
            <RiCloseFill
              onClick={() => {
                setPreview(false);
              }}
              size={"32px"}
            />
          </div>
        </div>
        <div className="modal__content">
          <div
            onMouseEnter={() => setShow(true)}
            onMouseMove={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onTouchStart={() => setShow(true)}
            className="video-wrapper"
          >
            {show ? (
              <div className="wrapper__header">
                <img
                  className="header__img-info"
                  src={previewedVideo.user.photo}
                  onClick={() => {
                    getProfile(previewedVideo.user.id);
                    setPreview(false);
                  }}
                />
                <div
                  onClick={() => {
                    getProfile(previewedVideo.user.id);
                    setPreview(false);
                  }}
                  className="header__user-info"
                >
                  <h5 className="header-user__name">
                    {previewedVideo.user.username}
                  </h5>
                  <p className="info__subname">
                    {DateFormating(previewedVideo.createdAt)}
                  </p>
                </div>
                {followed === 2 ? (
                  <button
                    onClick={() => {
                      doUnFollow(previewedVideo.user.id);
                      setFollowed(1);
                      previewedVideo.user.followers--;
                    }}
                    className="header__button active"
                  >
                    Following({previewedVideo.user.followers})
                  </button>
                ) : (
                  ""
                )}
                {followed === 1 ? (
                  <button
                    onClick={() => {
                      doFollow(previewedVideo.user.id);
                      setFollowed(2);
                      previewedVideo.user.followers++;
                    }}
                    className="header__button"
                  >
                    Follow({previewedVideo.user.followers})
                  </button>
                ) : (
                  ""
                )}
                {followed === 3 ? (
                  <button
                    onClick={async () => {
                      await DeleteVideo(previewedVideo.id);
                      await getProfile(previewedVideo.user.id);
                      setPreview(false);
                    }}
                    className="header__button danger-btn"
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <video
              className="previewedVideo"
              controls
              poster={previewedVideo.thumbnail}
              src={previewedVideo.url}
              autoPlay
              muted
              controlsList="nodownload nofullscreen"
            />
            {show ? (
              <div className="preview-fotor">
                <div className="fotor-preview-buttons">
                  <button
                    onClick={() => {
                      Getcomments(previewedVideo);
                    }}
                    className="btn"
                  >
                    Comments: {previewedVideo.comments}
                  </button>
                  {liked ? (
                    <button
                      onClick={() => {
                        Dislike(previewedVideo.id);
                        setLiked(false);
                        previewedVideo.likes--;
                      }}
                      className="btn btn--active"
                    >
                      Liked: {previewedVideo.likes}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        like(previewedVideo.id);
                        setLiked(true);
                        previewedVideo.likes++;
                      }}
                      className="btn"
                    >
                      Likes: {previewedVideo.likes}
                    </button>
                  )}
                </div>
                <h5 className="preview-details">{previewedVideo.details}</h5>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreviewModal;
