import { useContext } from "react";
import { authContext } from "../pages/homePage";
import { DateFormating } from "../utility/dateFormating";

const NotificationCard = ({ info }) => {
  const { getProfile, GetTheVideo } = useContext(authContext);

  return (
    <div className="notification">
      <img src={info.user.photo} className="notification__img" alt="profile" />
      <div className="notification__info">
        <p>
          {info.user.username}: {DateFormating(info.createdAt)}
        </p>
        <h5>
          {(info.messageId === 1 && "Start Following You") ||
            (info.messageId === 2 && "Upload A New Video")}
        </h5>
      </div>
      {(info.messageId === 1 && (
        <button
          onClick={() => getProfile(info.triggerId)}
          className="btn btn--small body1"
        >
          See
        </button>
      )) ||
        (info.messageId === 2 && (
          <button
            onClick={() => GetTheVideo(info.videoId)}
            className="btn btn--small body1"
          >
            See
          </button>
        ))}
    </div>
  );
};

export default NotificationCard;
