import { useState } from "react";
import { IUser } from "../../lib/types";
import useLocalStorage from "../../lib/useLocalStorage";
import UserForm from "./user-form";
import SyncPanel from "./sync-panel";

export default function Sync() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [user, saveUser] = useLocalStorage<IUser | null>("user", null);
  const [userForm, setUserForm] = useState(false);

  return (
    <>
      <p className="w-full text-center">
        {user ? user.name : "Нет пользователя"}
      </p>

      {user ? (
        <SyncPanel
          user={user}
          setLoading={setLoading}
          setSuccess={setSuccess}
          setError={setError}
        />
      ) : (
        <>
          {userForm ? (
            <UserForm
              saveUser={saveUser}
              setLoading={setLoading}
              setSuccess={setSuccess}
              setError={setError}
            />
          ) : (
            <>
              <button
                onClick={() => setUserForm(true)}
                className="w-full p-2 mt-4 bg-[#76B9ED] rounded-md text-black"
              >
                Войти
              </button>
            </>
          )}
        </>
      )}
      {loading && <Loader />}

      {success && <div className="mt-4">{success}</div>}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </>
  );
}

function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 54 20"
      className="mt-5 max-w-10"
    >
      <circle cx="6" cy="10" r="6" className="fill-white">
        <animate
          attributeName="opacity"
          begin=".1"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="26" cy="10" r="6" className="fill-white">
        <animate
          attributeName="opacity"
          begin=".2"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
      <circle cx="46" cy="10" r="6" className="fill-white">
        <animate
          attributeName="opacity"
          begin=".3"
          dur="1s"
          repeatCount="indefinite"
          values="0;1;0"
        />
      </circle>
    </svg>
  );
}
