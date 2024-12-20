import { useLocalStorage } from "usehooks-ts";
import Sync from "./components/sync/sync";
import { Item } from "./lib/types";

type Props = {};

export default function App({}: Props) {
  const [items] = useLocalStorage<Item[]>("items", [
    { id: "1", title: "Example" },
  ]);
  return (
    <main className="max-w-md mx-auto p-4">
      <Sync />

      {items.map((item) => (
        <div className="mt-4" key={item.id}>
          {item.title}
        </div>
      ))}
    </main>
  );
}
