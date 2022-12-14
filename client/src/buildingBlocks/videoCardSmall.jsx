import { useContext } from "react";
import { authContext } from "../pages/homePage";

const VideoCardSmall = ({ video }) => {
  const { GetTheVideo } = useContext(authContext);
  return (
    <div>
      <img
        src={video.thumbnail}
        className="video-card-small"
        alt="thumbnail"
        onClick={() => GetTheVideo(video.id)}
      />
    </div>
  );
};

export default VideoCardSmall;
