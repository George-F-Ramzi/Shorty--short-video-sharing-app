const joi = require("joi");
const prisma = require("../prisma/prisma");
const lodash = require("lodash");
const cloudinary = require("../Middlewears/cloudinary");

const UploadVideo = async (req, res) => {
  const { details } = req.body;
  const { filename: photoId, path: photoUrl } = req.files.photo[0];
  const { filename: videoId, path: videoUrl } = req.files.video[0];
  const { _id } = req.user;

  const schema = joi.object({
    details: joi.string().required().max(56),
  });

  const { error } = schema.validate({ details });

  if (error) return res.status(400).send(error.message);

  try {
    const create = await prisma.video.create({
      data: {
        url: videoUrl,
        details,
        thumbnail: photoUrl,
        userId: _id,
        urlId: videoId,
        thumbnailId: photoId,
      },
    });
    await prisma.user.update({
      where: { id: _id },
      data: { posts: { increment: 1 } },
    });

    const followers = await prisma.followers.findMany({
      where: { beenFollowingId: _id },
    });

    if (!lodash.isEmpty(followers)) {
      followers.forEach(async (follower) => {
        await prisma.notification.create({
          data: {
            messageId: 2,
            triggerId: _id,
            notifierId: follower.followingId,
            videoId: create.id,
          },
        });
      });
    }

    res.status(200).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetVideos = async (req, res) => {
  try {
    const data = await prisma.video.findMany({
      orderBy: { likes: "desc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            followers: true,
            photo: true,
          },
        },
      },
    });

    res.status(200).josn(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

const GetVideo = async (req, res) => {
  const { videoId } = req.params;
  const data = await prisma.video.findUnique({
    where: { id: videoId },
    include: {
      user: {
        select: { id: true, photo: true, username: true, followers: true },
      },
    },
  });
  res.status(200).send(data);
};

const Follow = async (req, res) => {
  const { _id } = req.user;
  const { userId } = req.params;
  try {
    if (_id === userId) throw Error("You Can't Follow Your Self");
    await prisma.followers.create({
      data: { followingId: _id, beenFollowingId: userId },
    });
    await prisma.user.update({
      where: { id: _id },
      data: { following: { increment: 1 } },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { followers: { increment: 1 } },
    });
    await prisma.notification.create({
      data: { messageId: 1, triggerId: _id, notifierId: userId },
    });
    res.status(200).send("following done");
  } catch (error) {
    res.status(400).send("You already following this user : " + error);
  }
};

const UnFollow = async (req, res) => {
  const { _id } = req.user;
  const { userId } = req.params;
  try {
    await prisma.followers.delete({
      where: {
        beenFollowingId_followingId: {
          followingId: _id,
          beenFollowingId: userId,
        },
      },
    });
    await prisma.user.update({
      where: { id: _id },
      data: { following: { decrement: 1 } },
    });
    await prisma.user.update({
      where: { id: userId },
      data: { followers: { decrement: 1 } },
    });
    res.status(200).send("unFollowing Done");
  } catch (error) {
    res.status(400).send("Follow Him First : " + error);
  }
};

const Comment = async (req, res) => {
  const schema = joi.object({
    details: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.message);

  const { userId, videoId } = req.params;
  const { details } = req.body;

  try {
    await prisma.comment.create({
      data: { details, userId, videoId },
    });
    await prisma.video.update({
      where: { id: videoId },
      data: { comments: { increment: 1 } },
    });
    res.status(200).send("Commenting Done");
  } catch (error) {
    res.status(400).send("Something Wrong Happen: " + error);
  }
};

const like = async (req, res) => {
  const { _id } = req.user;
  const { videoId } = req.params;

  const schema = joi.object({
    videoId: joi.string().required(),
  });
  const { error } = schema.validate({ videoId });
  if (error) return res.status(400).send(error.message);

  try {
    await prisma.likedVideo.create({
      data: { userId: _id, videoId },
    });
    await prisma.video.update({
      where: { id: videoId },
      data: { likes: { increment: 1 } },
    });
    res.status(200).send("Liked Done");
  } catch (error) {
    res.status(400).send("Something Wrong Happen: " + error);
  }
};

const Dislike = async (req, res) => {
  const { _id } = req.user;
  const { videoId } = req.params;

  const schema = joi.object({
    videoId: joi.string().required(),
  });
  const { error } = schema.validate({ videoId });
  if (error) return res.status(400).send(error.message);

  try {
    await prisma.likedVideo.delete({
      where: { userId_videoId: { userId: _id, videoId } },
    });
    await prisma.video.update({
      where: { id: videoId },
      data: { likes: { decrement: 1 } },
    });
    res.status(200).send("Dislike Done");
  } catch (error) {
    res.status(400).send("Something Wrong Happen: " + error);
  }
};

const Didliked = async (req, res) => {
  const { _id } = req.user;
  const { videoId } = req.params;

  const schema = joi.object({
    videoId: joi.string().required(),
  });
  const { error } = schema.validate({ videoId });
  if (error) return res.status(400).send(error.message);
  const find = await prisma.likedVideo.findUnique({
    where: { userId_videoId: { userId: _id, videoId } },
  });
  if (lodash.isEmpty(find)) {
    return res.status(204).send("You Didn't Like This Video");
  } else {
    return res.status(200).send("You Liked This Video");
  }
};

const profile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await prisma.user.findFirst({
      where: { id: userId },
      include: { videos: { select: { id: true, thumbnail: true } } },
    });
    delete profile.password;
    return res.status(200).send(profile);
  } catch (error) {
    return res.status(400).send("Profile Not Found");
  }
};

const UpdateProfileDetails = async (req, res) => {
  const { username, email, details } = req.body;
  const { _id } = req.user;

  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
  });

  const { error } = schema.validate({ username, email });
  if (error) return res.status(400).send(error.message);

  try {
    await prisma.user.update({
      data: { username, details, email },
      where: { id: _id },
    });
    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(400).send("Updated un did not completed : " + error);
  }
};

const UpdateProfilePhoto = async (req, res) => {
  const { path, filename } = req.file;
  const { _id } = req.user;

  const prevId = "123456789";

  try {
    const photoId = await prisma.user.findUnique({
      where: { id: _id },
      select: { photoId: true },
    });

    if (prevId !== photoId) {
      await cloudinary.uploader.destroy(photoId);
      await prisma.user.update({
        data: { photo: path, photoId: filename },
        where: { id: _id },
      });
    }

    res.status(200).send("Updated Successfully");
  } catch (error) {
    res.status(400).send("Updated un did not completed : " + error);
  }
};

const DidFollow = async (req, res) => {
  const { _id } = req.user;
  const { userId } = req.params;

  const schema = joi.object({
    userId: joi.string().required(),
  });
  const { error } = schema.validate({ userId });
  if (error) return res.status(400).send(error.message);

  if (_id === userId) {
    return res.status(205).send("That's You");
  }

  const find = await prisma.followers.findUnique({
    where: {
      beenFollowingId_followingId: {
        beenFollowingId: userId,
        followingId: _id,
      },
    },
  });
  if (lodash.isEmpty(find)) {
    return res.status(204).send("You Didn't Follow This User");
  } else {
    return res.status(200).send("You Are Following This User");
  }
};

const GetComments = async (req, res) => {
  const { videoId } = req.params;
  const data = await prisma.comment.findMany({
    where: { videoId },
    include: { user: { select: { id: true, username: true, photo: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).send(data);
};

const GetNotifications = async (req, res) => {
  const { _id } = req.user;
  const data = await prisma.notification.findMany({
    where: { notifierId: _id },
    include: { user: { select: { id: true, username: true, photo: true } } },
    orderBy: { createdAt: "desc" },
  });
  res.status(200).send(data);
};

const SearchUsers = async (req, res) => {
  const { value } = req.params;
  const data = await prisma.user.findMany({
    where: { username: { search: `${value}*` } },
    select: { id: true, username: true, photo: true },
  });

  res.status(200).send(data);
};

const SearchVideos = async (req, res) => {
  const { value } = req.params;
  const data = await prisma.video.findMany({
    where: { details: { search: `${value}*` } },
    select: { id: true, thumbnail: true },
  });

  res.status(200).send(data);
};

const DeleteVideo = async (req, res) => {
  const { videoId } = req.params;
  const { _id } = req.user;
  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (video.userId === _id) {
      await prisma.video.delete({
        where: { id: videoId },
      });
      await prisma.user.update({
        data: { posts: { decrement: 1 } },
        where: { id: _id },
      });
      await cloudinary.uploader.destroy(video.thumbnailId);

      await cloudinary.uploader.destroy(video.urlId, {
        resource_type: "video",
      });
    }

    res.status(200).send("Deleting Done");
  } catch (error) {
    res.status(400).send("Something wrong happen: " + error);
  }
};

const GetProfileForEdit = async (req, res) => {
  const { _id } = req.user;
  try {
    const profile = await prisma.user.findUnique({
      where: { id: _id },
      select: {
        email: true,
        username: true,
        details: true,
      },
    });
    return res.status(200).send(profile);
  } catch (error) {
    return res.status(400).send("Profile Not Found");
  }
};

module.exports = {
  UploadVideo,
  GetVideos,
  Follow,
  UnFollow,
  Comment,
  GetVideo,
  like,
  Dislike,
  Didliked,
  UpdateProfileDetails,
  profile,
  DidFollow,
  GetComments,
  GetNotifications,
  SearchUsers,
  SearchVideos,
  DeleteVideo,
  GetProfileForEdit,
  UpdateProfilePhoto,
};
