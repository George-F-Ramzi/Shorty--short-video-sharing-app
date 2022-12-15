import axios from "axios";

export const getVideos = async () => {
  const token = localStorage.getItem("token");
  const videos = "https://shorty-i6gt.onrender.com/videos";
  return await axios.get(videos, { headers: { "x-auth-token": token } });
};

export const getVideo = async (id) => {
  const token = localStorage.getItem("token");
  const video = `https://shorty-i6gt.onrender.com/video/${id}`;
  return await axios.get(video, { headers: { "x-auth-token": token } });
};

export const uploadVideo = async (data) => {
  const token = localStorage.getItem("token");
  const upload = `https://shorty-i6gt.onrender.com/upload`;
  return await axios.post(upload, data, {
    headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" },
  });
};

export const likeVideo = async (id) => {
  const token = localStorage.getItem("token");
  const like = `https://shorty-i6gt.onrender.com/like/${id}`;
  return await axios.post(like, {}, { headers: { "x-auth-token": token } });
};

export const DislikeVideo = async (id) => {
  const token = localStorage.getItem("token");
  const like = `https://shorty-i6gt.onrender.com/dislike/${id}`;
  return await axios.delete(like, { headers: { "x-auth-token": token } });
};

export const didliked = async (id) => {
  const token = localStorage.getItem("token");
  const didliked = `https://shorty-i6gt.onrender.com/didliked/${id}`;
  return await axios.get(didliked, { headers: { "x-auth-token": token } });
};

export const Profile = async (id) => {
  const token = localStorage.getItem("token");
  const profile = `https://shorty-i6gt.onrender.com/profile/${id}`;
  return await axios.get(profile, { headers: { "x-auth-token": token } });
};

export const Follow = async (id) => {
  const token = localStorage.getItem("token");
  const follow = `https://shorty-i6gt.onrender.com/follow/${id}`;
  return await axios.post(follow, {}, { headers: { "x-auth-token": token } });
};

export const UnFollow = async (id) => {
  const token = localStorage.getItem("token");
  const unfollow = `https://shorty-i6gt.onrender.com/unFollow/${id}`;
  return await axios.delete(unfollow, { headers: { "x-auth-token": token } });
};

export const DidFollow = async (id) => {
  const token = localStorage.getItem("token");
  const didFollow = `https://shorty-i6gt.onrender.com/didFollow/${id}`;
  return await axios.get(didFollow, { headers: { "x-auth-token": token } });
};

export const GetComments = async (id) => {
  const token = localStorage.getItem("token");
  const getComments = `https://shorty-i6gt.onrender.com/getComments/${id}`;
  return await axios.get(getComments, { headers: { "x-auth-token": token } });
};

export const doComment = async (videoId, userId, details) => {
  const token = localStorage.getItem("token");
  const comment = `https://shorty-i6gt.onrender.com/comment/${videoId}/${userId}`;
  return await axios.post(
    comment,
    { details },
    { headers: { "x-auth-token": token } }
  );
};

export const GetNotifications = async () => {
  const token = localStorage.getItem("token");
  const GetNotifications = `https://shorty-i6gt.onrender.com/inbox`;
  return await axios.get(GetNotifications, {
    headers: { "x-auth-token": token },
  });
};

export const SearchUsers = async (value) => {
  const token = localStorage.getItem("token");
  const SearchUsers = `https://shorty-i6gt.onrender.com/search/users/${value}`;
  return await axios.get(SearchUsers, {
    headers: { "x-auth-token": token },
  });
};

export const SearchVideos = async (value) => {
  const token = localStorage.getItem("token");
  const SearchVideos = `https://shorty-i6gt.onrender.com/search/videos/${value}`;
  return await axios.get(SearchVideos, {
    headers: { "x-auth-token": token },
  });
};

export const DeleteVideo = async (id) => {
  const token = localStorage.getItem("token");
  const DeleteVidoe = `https://shorty-i6gt.onrender.com/delete/${id}`;
  return await axios.delete(DeleteVidoe, {
    headers: { "x-auth-token": token },
  });
};

export const GetProfileForEdit = async () => {
  const token = localStorage.getItem("token");
  const GetProfileForEdit = `https://shorty-i6gt.onrender.com/getProfile/edit`;
  return await axios.get(GetProfileForEdit, {
    headers: { "x-auth-token": token },
  });
};

export const UpdateProfile = async (data) => {
  const token = localStorage.getItem("token");
  const UpdateProfile = `https://shorty-i6gt.onrender.com/update`;
  return await axios.put(UpdateProfile, data, {
    headers: { "x-auth-token": token },
  });
};

export const UpdateProfilePhoto = async (data) => {
  const token = localStorage.getItem("token");
  const UpdateProfile = `https://shorty-i6gt.onrender.com/update/photo`;
  return await axios.put(UpdateProfile, data, {
    headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" },
  });
};
