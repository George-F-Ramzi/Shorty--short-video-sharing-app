import { useContext, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import Comment from "./comment";
import { authContext } from "../pages/homePage";
import lodash from "lodash";
import Joi from "joi";
import Spinner from "./spinner";
import JWTDecoder from "jwt-decoder-claims";

const CommentsModal = () => {
  const {
    setComments,
    commentsData,
    DoComment,
    currentVideo,
    spinner,
    active,
    getProfile,
  } = useContext(authContext);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  const Payload = () => {
    const token = localStorage.getItem("token");
    const payload = JWTDecoder.payload(token);
    return payload._id;
  };

  const comenting = async () => {
    const schema = Joi.object({
      details: Joi.string().required().max(200).label("Comment"),
    });
    const { error } = schema.validate({ details });
    if (error) {
      return setError(error.message);
    }
    await DoComment(currentVideo, Payload(), details);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Comments</h5>
            <RiCloseFill
              onClick={() => {
                setComments(false);
              }}
              size={"32px"}
            />
          </div>
          <div className="modal__content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                comenting();
              }}
            >
              <input
                placeholder="what's on your mind?"
                className="input input--small comment__input"
                type="text"
                value={details}
                onChange={handleChange}
                disabled={active}
              />

              {error ? <p className="error">{error}</p> : ""}
            </form>
            <div className="scrollable-div">
              {spinner ? (
                <Spinner />
              ) : lodash.isEmpty(commentsData) ? (
                <p>There's Noting To Show Here</p>
              ) : (
                commentsData.map((comment, index) => (
                  <Comment
                    key={index}
                    set={setComments}
                    profile={getProfile}
                    info={comment}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
