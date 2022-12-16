import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AllowJoin } from "../api/userApi";
import Spinner from "../buildingBlocks/spinner";
import "../css/form.css";
import "../css/landingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    join();
    document.getElementById("html").style.backgroundColor = "white";
  }, []);

  const join = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) throw Error;
      await AllowJoin();
      navigate("/home");
    } catch (error) {
      setSpinner(false);
      navigate("/");
    }
  };

  return (
    <div className="landing-page">
      {spinner ? (
        <Spinner />
      ) : (
        <div className="landing__container">
          <div className="container__leftSide">
            <h4 className="leftSide__logo">Shorty</h4>
            <h1 className="leftSide__title">
              Discover the world through short videos
            </h1>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
