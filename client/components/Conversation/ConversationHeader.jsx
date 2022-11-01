import BackIcon from "../../assets/BackIcon";
import LogoutIcon from "../../assets/LogoutIcon";
import { useAuth } from "../../context/AuthContext";
import { useConversations } from "../../context/ConversationsProvider";

export const ConversationHeader = () => {
  const { logout } = useAuth();
  const { setRecipients, recipients } = useConversations();
  const handleLogout = () => {
    logout();
  };

  const mobileHandler = () => {
    setRecipients();
  };
  return (
    <div className="flex h-16 w-full items-center justify-between bg-primary-dark py-3 px-5  text-white">
      <button
        onClick={mobileHandler}
        className="flex h-full w-11 items-center justify-center rounded-xl bg-primary  md:hidden"
      >
        <BackIcon className="h-8 w-8 fill-white " />
      </button>
      <h2 className="font-heading text-3xl capitalize">
        {recipients.username}
      </h2>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center rounded-xl bg-primary  p-2"
      >
        <LogoutIcon className="h-7 w-7  " />
      </button>
    </div>
  );
};
