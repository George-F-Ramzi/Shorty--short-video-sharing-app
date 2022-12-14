import { useState, useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import SearchedProfile from "./searchedProfile";
import VideodCardSmall from "./videoCardSmall";
import { authContext } from "../pages/homePage";
import { SearchUsers, SearchVideos } from "../api/authApi";
import lodash from "lodash";
import EmptyPlacholder from "./emptyPlacholder";
import Spinner from "./spinner";
import { toast } from "react-toastify";

const SearchModal = () => {
  const [users, setUsers] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const { setSearch } = useContext(authContext);
  const [details, setDetails] = useState("");
  const [usersSearched, setUsersSearched] = useState([]);
  const [videosSearched, setVideosSearched] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setDetails(e.target.value);
  };

  const search = async () => {
    if (users) {
      setSpinner(true);
      try {
        const { data } = await SearchUsers(details);
        setUsersSearched(data);
        setSpinner(false);
        return;
      } catch (error) {
        setSpinner(false);
        return toast("Something Went Wrong", {
          type: "error",
        });
      }
    }

    setSpinner(true);
    try {
      const { data } = await SearchVideos(details);
      setVideosSearched(data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      return toast("Something Went Wrong", {
        type: "error",
      });
    }
  };

  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Search</h5>
            <RiCloseFill
              onClick={() => {
                setSearch(false);
              }}
              size={"32px"}
            />
          </div>
          <div className="modal__content">
            {spinner ? (
              <Spinner />
            ) : (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    search();
                  }}
                >
                  <input
                    placeholder="What are you looking for?"
                    className="input input--small search-input"
                    type="text"
                    value={details}
                    onChange={handleChange}
                    required
                  />
                </form>
                <div className="filter-buttons">
                  <h5
                    className={
                      users ? "filter__button active-left" : "filter__button"
                    }
                    onClick={() => setUsers(true)}
                  >
                    Users
                  </h5>
                  <h5
                    className={
                      !users ? "filter__button active-right" : "filter__button"
                    }
                    onClick={() => setUsers(false)}
                  >
                    Videos
                  </h5>
                </div>
                <div className="scrollable-div">
                  {users ? (
                    <>
                      {lodash.isEmpty(usersSearched) ? (
                        <EmptyPlacholder />
                      ) : (
                        <div className="users__container">
                          {usersSearched.map((user, index) => (
                            <SearchedProfile key={index} user={user} />
                          ))}
                        </div>
                      )}
                    </>
                  ) : lodash.isEmpty(videosSearched) ? (
                    <EmptyPlacholder />
                  ) : (
                    <div className="videos-container">
                      {videosSearched.map((video, index) => (
                        <VideodCardSmall key={index} video={video} />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
