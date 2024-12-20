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
      {loading && <div className="mt-4">Loading...</div>}

      {success && <div className="mt-4">{success}</div>}

      {error && <div className="mt-4 text-red-500">{error}</div>}
    </>
  );
}
