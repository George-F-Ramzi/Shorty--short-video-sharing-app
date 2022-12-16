import React from "react";
import { DateFormating } from "../utility/dateFormating";
const Comment = ({ info, profile, set }) => {
  return (
    <div className="comment">
      <div
        onClick={() => {
          profile(info.user.id);
          set(false);
        }}
        className="comment__user"
      >
        <img src={info.user.photo} className="comment__img" />
        <div className="user__details">
          <h5 className=" username">{info.user.username}</h5>
          <p className=" date body2">{DateFormating(info.createdAt)}</p>
        </div>
      </div>
      <p className="body1 comment__detail">{info.details}</p>
      <div className="line"></div>
    </div>
  );
};

export default Comment;
