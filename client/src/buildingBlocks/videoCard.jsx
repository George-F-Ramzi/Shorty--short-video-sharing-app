import React, { useRef, useContext, useEffect, useState } from "react";
import { authContext } from "../pages/homePage";
import { didliked, DeleteVideo } from "../api/authApi";
import { DateFormating } from "../utility/dateFormating";
import { toast } from "react-toastify";
import {
  RiChat2Line,
  RiPlayFill,
  RiVolumeUpFill,
  RiPauseFill,
  RiVolumeMuteFill,
  RiHeart2Fill,
  RiHeart2Line,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const VideoCard = () => {
  const theVideo = useRef();
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const {
    index,
    setIndex,
    video,
    setMute,
    isMuted,
    isPlaying,
    setPlay,
    like,
    Dislike,
    getProfile,
    length,
    doFollow,
    didFollow,
    doUnFollow,
    Getcomments,
  } = useContext(authContext);

  useEffect(() => {
    trackVideoState();
  }, [video]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 4000);
    }
  }, [show]);

  const trackVideoState = async () => {
    const isMuted = theVideo.current.muted;
    const isPaused = theVideo.current.paused;
    if (isMuted) {
      setMute(true);
    }
    if (isPaused) {
      setPlay(true);
    }

    const didLiked = await didliked(video.id);
    if (didLiked.status === 204) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    const check = await didFollow(video.user.id);
    if (check.status === 204) {
      setFollowed(1);
    } else if (check.status === 200) {
      setFollowed(2);
    } else {
      setFollowed(3);
    }
  };

  const togglePlay = () => {
    const isPaused = theVideo.current.paused;
    if (isPaused) {
      theVideo.current.play();
      setPlay(true);
    } else {
      theVideo.current.pause();
      setPlay(false);
    }
  };

  const toggleMute = () => {
    const isMuted = theVideo.current.muted;
    if (isMuted) {
      theVideo.current.muted = false;
      setMute(false);
    } else {
      theVideo.current.muted = true;
      setMute(true);
    }
  };

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseMove={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onTouchStart={() => setShow(true)}
      className="video"
    >
      {show ? (
        <>
          <button
            onClick={() => setIndex(index + 1)}
            className={
              index >= length - 1
                ? "change-button right hide"
                : "change-button right "
            }
          >
            <RiArrowRightLine />
          </button>
          <button
            onClick={() => setIndex(index - 1)}
            className={
              index <= 0 ? "change-button left hide" : "change-button left "
            }
          >
            <RiArrowLeftLine />
          </button>
        </>
      ) : (
        ""
      )}
      <div
        className={show ? "video__header" : "video__header header--disActive"}
      >
        <div className="header__details">
          <img
            src={video.user.photo}
            className="details__img"
            alt="profile"
            onClick={() => {
              getProfile(video.user.id);
            }}
          />
          <div className="details__info">
            <h5
              onClick={() => getProfile(video.user.id)}
              className="info__name"
            >
              {video.user.username}
              <span className="info__subname body1">
                {DateFormating(video.createdAt)}
              </span>
            </h5>
          </div>
        </div>
        {followed === 3 ? (
          <button
            onClick={async () => {
              try {
                await DeleteVideo(video.id);
                navigate("/");
              } catch (error) {
                return toast("Something Went Wrong", {
                  type: "error",
                });
              }
            }}
            className="header__button danger-btn"
          >
            Delete
          </button>
        ) : (
          ""
        )}
        {followed === 2 ? (
          <button
            onClick={() => {
              doUnFollow(video.user.id);
              setFollowed(1);
              video.user.followers--;
            }}
            className="header__button active"
          >
            Following({video.user.followers})
          </button>
        ) : (
          ""
        )}

        {followed === 1 ? (
          <button
            onClick={() => {
              doFollow(video.user.id);
              setFollowed(2);
              video.user.followers++;
            }}
            className="header__button"
          >
            Follow({video.user.followers})
          </button>
        ) : (
          ""
        )}
      </div>
      <video
        poster={video.thumbnail}
        ref={theVideo}
        loop
        className="video__body"
        // src={video.url}
        autoPlay
        muted
      />
      <div className={show ? "video__fotor" : "video__fotor header--disActive"}>
        <h5 className="fotor__details">{video.details}</h5>
        <div className="fotor__controller">
          <div onClick={togglePlay} className="controller__play">
            {!isPlaying ? (
              <RiPlayFill size={"32px"} />
            ) : (
              <RiPauseFill size={"32px"} />
            )}
          </div>
          <div className="controller__actions">
            {liked ? (
              <div
                className="actions__button"
                onClick={() => {
                  Dislike(video.id);
                  setLiked(false);
                }}
              >
                <RiHeart2Fill size={"28px"} />
                <p className="body1">{video.likes}</p>
              </div>
            ) : (
              <div
                className="actions__button"
                onClick={() => {
                  like(video.id);
                  setLiked(true);
                }}
              >
                <RiHeart2Line size={"28px"} />
                <p className="body1">{video.likes}</p>
              </div>
            )}
            <div
              onClick={() => {
                Getcomments(video);
              }}
              className="actions__button"
            >
              <RiChat2Line size={"28px"} />
              <p className="body1">{video.comments}</p>
            </div>
            <div onClick={toggleMute} className="actions__button">
              {isMuted ? (
                <RiVolumeMuteFill size={"28px"} />
              ) : (
                <RiVolumeUpFill size={"28px"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
