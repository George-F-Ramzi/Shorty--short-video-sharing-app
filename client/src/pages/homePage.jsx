import { useState, useEffect, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NavBar from "../buildingBlocks/navBar";
import VideoCard from "../buildingBlocks/videoCard";
import VideoPreviewModal from "../buildingBlocks/videoPreviewModal";
import Spinner from "../buildingBlocks/spinner";
import CommentsModal from "../buildingBlocks/commentsModal";
import InboxModal from "../buildingBlocks/inboxModal";
import ProfileModal from "../buildingBlocks/profileModal";
import SearchModal from "../buildingBlocks/searchModal";
import CreateModal from "../buildingBlocks/createModal";
import EditProfile from "../buildingBlocks/editProfile";
import EditPhoto from "../buildingBlocks/editPhoto";
import Joi from "joi";
import JWTDecoder from "jwt-decoder-claims";
import lodash from "lodash";
import "../css/homePage.css";
import "../css/navBar.css";
import "../css/modal.css";
import "../css/profile.css";
import "../css/video.css";
import "../css/inbox.css";
import "../css/search.css";
import "../css/create.css";
import "../css/comments.css";
import "../css/edit.css";
import "../css/previewedVideo.css";
import "react-toastify/dist/ReactToastify.css";
import { AllowJoin } from "../api/userApi";
import {
  getVideos,
  uploadVideo,
  likeVideo,
  DislikeVideo,
  Profile,
  Follow,
  DidFollow,
  UnFollow,
  GetComments,
  doComment,
  GetNotifications,
  getVideo,
} from "../api/authApi";

export const authContext = createContext();

const HomePage = () => {
  const [currentVideo, setCurrentVideo] = useState();
  const [index, setIndex] = useState(0);
  const [inbox, setInbox] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState(false);
  const [create, setCreate] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [comments, setComments] = useState(false);
  const [preview, setPreview] = useState(false);
  const [isPlaying, setPlay] = useState(true);
  const [isMuted, setMute] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [active, setActive] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [videos, setVideos] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [previewedVideo, setPreviewedVideo] = useState();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    join();
    data();
  }, []);

  useEffect(() => {
    if (profile || inbox || create || search || preview || comments) {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  }, [profile, inbox, create, search, preview, comments]);

  const Payload = () => {
    const token = localStorage.getItem("token");
    const payload = JWTDecoder.payload(token);
    return payload._id;
  };

  const join = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw Error;
      await AllowJoin();
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (overlay === true) {
      document.getElementById("html").style.backgroundColor =
        "rgba(0, 0, 0, 0.3)";
    } else {
      document.getElementById("html").style.backgroundColor = "white";
    }
  }, [overlay]);

  const data = async () => {
    const data = await getVideos();
    setVideos(data.data);
  };

  const getProfile = async (id) => {
    try {
      setProfile(true);
      const data = await Profile(id);
      setProfileData(data.data);
    } catch (error) {
      setProfile(false);
      return toast("Something Went Wrong", {
        type: "error",
      });
    }
  };

  const createVideo = async (details, video, photo) => {
    const form = new FormData();
    form.append("details", details);
    form.append("video", video);
    form.append("photo", photo);

    try {
      await uploadVideo(form);
      toast("Video Uploaded Successfully", { type: "success" });
      setCreate(false);
      getProfile(Payload());
    } catch (error) {
      toast("Video Upload Failed", { type: "error" });
      setCreate(false);
    }
  };

  const like = async (id) => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate({ id });
    if (error) {
      return toast("Invalid Input", {
        type: "error",
      });
    }
    try {
      await likeVideo(id);
      videos.forEach((video) => {
        if (video.id === id) {
          video.likes = video.likes + 1;
        }
      });
    } catch (error) {
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const Dislike = async (id) => {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    const { error } = schema.validate({ id });
    if (error) {
      return toast("Invalid Input", {
        type: "error",
      });
    }
    try {
      await DislikeVideo(id);
      videos.forEach((video) => {
        if (video.id === id) {
          video.likes = video.likes - 1;
        }
      });
    } catch (error) {
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const doFollow = async (id) => {
    try {
      await Follow(id);
    } catch (error) {
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const doUnFollow = async (id) => {
    try {
      await UnFollow(id);
    } catch (error) {
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const didFollow = async (id) => {
    try {
      const status = await DidFollow(id);
      return status;
    } catch (error) {
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const Getcomments = async (video) => {
    setComments(true);
    setSpinner(true);
    try {
      const data = await GetComments(video.id);
      setCommentsData(data.data);
      setCurrentVideo(video);
      setSpinner(false);
    } catch (error) {
      setComments(false);
      setSpinner(false);
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const DoComment = async (video, userId, details) => {
    try {
      setActive(true);
      setSpinner(true);
      await doComment(video.id, userId, details);
      await Getcomments(video);
      setActive(false);
    } catch (error) {
      setSpinner(false);
      setComments(false);
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const GetInbox = async () => {
    setInbox(true);
    setSpinner(true);
    try {
      const data = await GetNotifications();
      setNotifications(data.data);
      setSpinner(false);
    } catch (error) {
      setInbox(false);
      setSpinner(false);
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  const GetTheVideo = async (id) => {
    try {
      const { data } = await getVideo(id);
      setPreviewedVideo(data);
      setPreview(true);
    } catch (error) {
      setPreview(false);
      return toast("Something Went Wrong Please Try Again Later", {
        type: "error",
      });
    }
  };

  return (
    <div className="home">
      {!lodash.isEmpty(videos) ? (
        <>
          <ToastContainer />
          <authContext.Provider
            value={{
              createVideo,
              inbox,
              profile,
              search,
              create,
              overlay,
              setCreate,
              setInbox,
              setSearch,
              setProfile,
              video: videos[index],
              setIndex,
              index,
              comments,
              setComments,
              isPlaying,
              setPlay,
              isMuted,
              setMute,
              like,
              Dislike,
              profileData,
              getProfile,
              length: videos.length,
              doFollow,
              didFollow,
              doUnFollow,
              Getcomments,
              commentsData,
              DoComment,
              currentVideo,
              spinner,
              setSpinner,
              active,
              GetInbox,
              notifications,
              GetTheVideo,
              setPreview,
              previewedVideo,
              setEdit,
              setEditImage,
              setProfileData,
            }}
          >
            {search ? <SearchModal /> : ""}
            {inbox ? <InboxModal /> : ""}
            {profile ? <ProfileModal /> : ""}
            {edit ? <EditProfile /> : ""}
            {preview ? <VideoPreviewModal /> : ""}
            {comments ? <CommentsModal /> : ""}
            {create ? <CreateModal /> : ""}
            {editImage ? <EditPhoto /> : ""}
            <NavBar />
            <VideoCard />
          </authContext.Provider>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default HomePage;
