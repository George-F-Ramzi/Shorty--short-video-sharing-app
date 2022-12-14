import { useContext, useState } from "react";
import { authContext } from "../pages/homePage";
import { RiCloseFill } from "react-icons/ri";
import { UpdateProfilePhoto } from "../api/authApi";

const EditPhoto = () => {
  const { setEditImage } = useContext(authContext);
  const [photoUrl, setPhotoUrl] = useState();
  const [photo, setPhoto] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setPhoto(e.target.files[0]);
    setTimeout(() => {
      setCanSubmit(true);
      const url = URL.createObjectURL(e.target.files[0]);
      setPhotoUrl(url);
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Form = new FormData();
    Form.append("photo", photo);
    try {
      await UpdateProfilePhoto(Form);
      setEditImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Update Your Photo</h5>
            <RiCloseFill
              onClick={() => {
                setEditImage(false);
              }}
              size={"32px"}
            />
          </div>
        </div>
        <div className="modal__content">
          <form onSubmit={handleSubmit} className="photo-form">
            <div className="form-photo-input">
              <input
                className="input-file-photo"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              <img src={photoUrl} className="img-edit-cover" />
              Choose A Photo
            </div>
            {canSubmit ? (
              <button className="btn btn--big btn--edit">Submit</button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPhoto;
