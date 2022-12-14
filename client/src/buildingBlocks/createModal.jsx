import { useState, useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import getBlobDuration from "get-blob-duration";
import { authContext } from "../pages/homePage";
import Spinner from "./spinner";
import { toast } from "react-toastify";
import Joi from "joi";

const CreateModal = () => {
  const [video, setVideo] = useState();
  const [photo, setPhoto] = useState();
  const [photoPreview, setPhotoPreview] = useState();
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [canCreate, setCanCreate] = useState(false);
  const { createVideo, setCreate } = useContext(authContext);

  const handleVideoChange = async (event) => {
    event.preventDefault();
    const path = URL.createObjectURL(event.target.files[0]);
    const duration = await getBlobDuration(path);
    if (duration > 60) {
      return toast("Video Duration Excede 60s", { type: "error" });
    }
    toast("You Select A Video", { type: "success" });
    setVideo(event.target.files[0]);
    setCanCreate(true);
  };

  const handlePhotoChange = (event) => {
    event.preventDefault();
    const path = URL.createObjectURL(event.target.files[0]);
    setPhotoPreview(path);
    setPhoto(event.target.files[0]);
  };

  const handleDetailsChange = (event) => {
    event.preventDefault();
    setDetails(event.target.value);
  };

  const handleSubmit = () => {
    const schema = Joi.object({
      photo: Joi.object().required(),
      video: Joi.object().required(),
      details: Joi.string().required(),
    });
    const { error } = schema.validate({ photo, video, details });
    if (error) {
      return toast(`${error.message}`, {
        type: "error",
      });
    }
    createVideo(details, video, photo);
    setLoading(true);
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Create a new video</h5>
            <RiCloseFill
              onClick={() => {
                setCreate(false);
              }}
              size={"32px"}
            />
          </div>
        </div>
        <div className="modal__content">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="header-files-input">
                <div className="input-body">
                  <div className="input-placeholder">Choose Photo</div>
                  <img className="previewPhoto" src={photoPreview} />
                  <input
                    onChange={handlePhotoChange}
                    className="input-file"
                    type={"file"}
                    accept="image/*"
                  />
                </div>
                <div className="input-body">
                  <div className="input-placeholder">Choose Video</div>
                  <input
                    onChange={handleVideoChange}
                    className="input-file"
                    type={"file"}
                    accept="video/*"
                  />
                </div>
              </div>
              <input
                placeholder="Details max: 56"
                className="input input--big details-input"
                onChange={handleDetailsChange}
                value={details}
              />
              {!canCreate ? (
                <button className="btn btn--disalbe btn--big create-btn ">
                  Create
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="btn btn--big create-btn "
                >
                  Create
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
