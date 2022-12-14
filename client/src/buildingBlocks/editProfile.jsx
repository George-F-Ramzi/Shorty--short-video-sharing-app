import { useContext, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { authContext } from "../pages/homePage";
import { GetProfileForEdit, UpdateProfile } from "../api/authApi";
import { toast } from "react-toastify";
import joi from "joi";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner";

const EditProfile = () => {
  const { setEdit } = useContext(authContext);
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    GetProfile();
  }, []);

  const GetProfile = async () => {
    const { data } = await GetProfileForEdit();
    setData(data);
    setShow(true);
  };

  const HandleTextChange = (e) => {
    e.preventDefault();
    const theData = { ...data };
    theData[e.target.name] = e.target.value;
    setData(theData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = joi.object({
      username: joi.string().required(),
      email: joi.string().required(),
    });

    const { error } = schema.validate({
      username: data.username,
      email: data.email,
    });

    if (error) return toast(`${error.message}`, { type: "error" });

    try {
      await UpdateProfile(data);
      toast(`Update Done`, { type: "success" });
    } catch (error) {
      console.log(error.response.data);
      toast(`Something Wrong Happen`, { type: "error" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Update Your Profiile</h5>
            <RiCloseFill
              onClick={() => {
                setEdit(false);
              }}
              size={"32px"}
            />
          </div>
        </div>
        <div className="modal__content">
          {!show ? (
            <Spinner />
          ) : (
            <>
              <form onSubmit={handleSubmit} className="edit-form">
                <input
                  placeholder="Username"
                  className="edit-input input input--big"
                  type="text"
                  value={data.username}
                  name="username"
                  onChange={HandleTextChange}
                />
                <input
                  placeholder="Email"
                  className="edit-input input input--big"
                  type="email"
                  value={data.email}
                  name="email"
                  onChange={HandleTextChange}
                />

                <input
                  type="text"
                  placeholder="Bio"
                  className="edit-input input input--big"
                  value={data.details}
                  name="details"
                  onChange={HandleTextChange}
                />
                <button className="btn btn--big edit-btn">Submit</button>
              </form>
              <button
                onClick={handleLogout}
                className="btn btn--big btn--danger edit-btn"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
