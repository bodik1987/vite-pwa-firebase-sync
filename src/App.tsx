import { useState } from "react";
import Sync from "./components/sync/sync";
import Modal from "./components/ui/modal";
import { Item } from "./lib/types";
import useLocalStorage from "./lib/useLocalStorage";
import useCheckConnection from "./lib/useCheckConnection";

type Props = {};

export default function App({}: Props) {
  const isOnline = useCheckConnection();

  const [items] = useLocalStorage<Item[]>("items", [
    { id: "1", title: "Example" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className="bg-[#282828] border border-[#3F3F3F] rounded-md px-5 py-1"
      >
        {!isOnline ? "No connection" : "Sync"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalStyles="max-w-sm w-full p-4 bg-[#282828] border border-[#3F3F3F] rounded-md relative shadow-xl"
        content={<Sync />}
      />

      {items.map((item) => (
        <div className="mt-4" key={item.id}>
          {item.title}
        </div>
      ))}
    </main>
  );
}
