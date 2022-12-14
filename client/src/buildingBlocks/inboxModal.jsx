import { RiCloseFill } from "react-icons/ri";
import { useContext } from "react";
import NotificationCard from "./notificationCard";
import { authContext } from "../pages/homePage";
import Spinner from "./spinner";
import lodash from "lodash";
import EmptyPlacholder from "./emptyPlacholder";

const InboxModal = () => {
  const { setInbox, notifications, spinner } = useContext(authContext);
  return (
    <div className="modal">
      <div className="modal__body">
        <div className="modal__header">
          <div className="header__hr">
            <h5 className="hr__title">Inbox</h5>
            <RiCloseFill
              onClick={() => {
                setInbox(false);
              }}
              size={"32px"}
            />
          </div>
        </div>
        <div className="modal__content">
          <div className="scrollable-div">
            {spinner ? (
              <Spinner />
            ) : lodash.isEmpty(notifications) ? (
              <EmptyPlacholder />
            ) : (
              notifications.map((card, index) => (
                <NotificationCard key={index} info={card} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxModal;
