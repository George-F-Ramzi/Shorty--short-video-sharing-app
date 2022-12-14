import axios from "axios";

export const getVideos = async () => {
  const token = localStorage.getItem("token");
  const videos = "http://localhost:3999/videos";
  return await axios.get(videos, { headers: { "x-auth-token": token } });
};

export const getVideo = async (id) => {
  const token = localStorage.getItem("token");
  const video = `http://localhost:3999/video/${id}`;
  return await axios.get(video, { headers: { "x-auth-token": token } });
};

export const uploadVideo = async (data) => {
  const token = localStorage.getItem("token");
  const upload = `http://localhost:3999/upload`;
  return await axios.post(upload, data, {
    headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" },
  });
};

export const likeVideo = async (id) => {
  const token = localStorage.getItem("token");
  const like = `http://localhost:3999/like/${id}`;
  return await axios.post(like, {}, { headers: { "x-auth-token": token } });
};

export const DislikeVideo = async (id) => {
  const token = localStorage.getItem("token");
  const like = `http://localhost:3999/dislike/${id}`;
  return await axios.delete(like, { headers: { "x-auth-token": token } });
};

export const didliked = async (id) => {
  const token = localStorage.getItem("token");
  const didliked = `http://localhost:3999/didliked/${id}`;
  return await axios.get(didliked, { headers: { "x-auth-token": token } });
};

export const Profile = async (id) => {
  const token = localStorage.getItem("token");
  const profile = `http://localhost:3999/profile/${id}`;
  return await axios.get(profile, { headers: { "x-auth-token": token } });
};

export const Follow = async (id) => {
  const token = localStorage.getItem("token");
  const follow = `http://localhost:3999/follow/${id}`;
  return await axios.post(follow, {}, { headers: { "x-auth-token": token } });
};

export const UnFollow = async (id) => {
  const token = localStorage.getItem("token");
  const unfollow = `http://localhost:3999/unFollow/${id}`;
  return await axios.delete(unfollow, { headers: { "x-auth-token": token } });
};

export const DidFollow = async (id) => {
  const token = localStorage.getItem("token");
  const didFollow = `http://localhost:3999/didFollow/${id}`;
  return await axios.get(didFollow, { headers: { "x-auth-token": token } });
};

export const GetComments = async (id) => {
  const token = localStorage.getItem("token");
  const getComments = `http://localhost:3999/getComments/${id}`;
  return await axios.get(getComments, { headers: { "x-auth-token": token } });
};

export const doComment = async (videoId, userId, details) => {
  const token = localStorage.getItem("token");
  const comment = `http://localhost:3999/comment/${videoId}/${userId}`;
  return await axios.post(
    comment,
    { details },
    { headers: { "x-auth-token": token } }
  );
};

export const GetNotifications = async () => {
  const token = localStorage.getItem("token");
  const GetNotifications = `http://localhost:3999/inbox`;
  return await axios.get(GetNotifications, {
    headers: { "x-auth-token": token },
  });
};

export const SearchUsers = async (value) => {
  const token = localStorage.getItem("token");
  const SearchUsers = `http://localhost:3999/search/users/${value}`;
  return await axios.get(SearchUsers, {
    headers: { "x-auth-token": token },
  });
};

export const SearchVideos = async (value) => {
  const token = localStorage.getItem("token");
  const SearchVideos = `http://localhost:3999/search/videos/${value}`;
  return await axios.get(SearchVideos, {
    headers: { "x-auth-token": token },
  });
};

export const DeleteVideo = async (id) => {
  const token = localStorage.getItem("token");
  const DeleteVidoe = `http://localhost:3999/delete/${id}`;
  return await axios.delete(DeleteVidoe, {
    headers: { "x-auth-token": token },
  });
};

export const GetProfileForEdit = async () => {
  const token = localStorage.getItem("token");
  const GetProfileForEdit = `http://localhost:3999/getProfile/edit`;
  return await axios.get(GetProfileForEdit, {
    headers: { "x-auth-token": token },
  });
};

export const UpdateProfile = async (data) => {
  const token = localStorage.getItem("token");
  const UpdateProfile = `http://localhost:3999/update`;
  return await axios.put(UpdateProfile, data, {
    headers: { "x-auth-token": token },
  });
};

export const UpdateProfilePhoto = async (data) => {
  const token = localStorage.getItem("token");
  const UpdateProfile = `http://localhost:3999/update/photo`;
  return await axios.put(UpdateProfile, data, {
    headers: { "x-auth-token": token, "Content-Type": "multipart/form-data" },
  });
};
