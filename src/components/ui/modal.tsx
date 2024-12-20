import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modalStyles?: string;
  content: React.ReactNode;
};

export default function modal({
  isOpen,
  onClose,
  modalStyles = "",
  content,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className={`${modalStyles}`} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}
