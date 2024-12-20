import { useState } from "react";
import { child, get, ref, set } from "firebase/database";
import { IUser } from "../../lib/types";
import { DATABASE, RD_PROJECT_USERS } from "../../firebase";

type Props = {
  saveUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserForm({
  saveUser,
  setLoading,
  setSuccess,
  setError,
}: Props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    const localUser = { name: name.trim(), password: password.trim() };

    if (name.trim() && password.trim()) {
      const dbRef = ref(DATABASE);
      get(child(dbRef, `${RD_PROJECT_USERS}/${localUser.name}`))
        .then((snapshot) => {
          const existedUserName = snapshot.val() && snapshot.val().name;
          const existedUserPassword = snapshot.val() && snapshot.val().password;

          // "Checking for existed user"
          if (existedUserName) {
            if (localUser.password === existedUserPassword) {
              setLoading(false);
              saveUser(localUser);
              setSuccess("Успешно");
            } else {
              setLoading(false);
              setError("Неправильный пароль");
              return;
            }
          } else {
            // "Creating NEW user in Database"
            set(ref(DATABASE, RD_PROJECT_USERS + name.trim()), localUser)
              .then(() => {
                setSuccess("Новый пользователь создан");
                saveUser(localUser);
                setLoading(false);
              })
              .catch(() => {
                setError("Ошибка");
                setLoading(false);
              });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("Введите корректные данные");
      return;
    }
  };

  return (
    <form className="mt-4 w-full flex flex-col" onSubmit={onSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Логин"
        autoComplete="off"
        className="w-full p-2 text-center border-b border-[#6B6B6B] bg-[#1F1F1F] rounded-t-md"
        spellCheck={"false"}
        autoFocus
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        autoComplete="off"
        className="w-full p-2 text-center border-b border-[#6B6B6B] bg-[#1F1F1F] rounded-b-md"
        spellCheck={"false"}
      />

      <button
        type="submit"
        disabled={!name || !password}
        className="w-full p-2 mt-4 bg-[#76B9ED] rounded-md text-black"
      >
        Войти
      </button>
    </form>
  );
}
