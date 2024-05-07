import { ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";

export interface DialogProps {
  title: string | ReactNode;
  isOpen: boolean;
  onClose: () => void;
  innerRef?: React.RefObject<HTMLDivElement>;
}

type PropsWithChildren<P> = P & { children?: ReactNode };

export const Dialog = forwardRef(({
  title = "Dialog",
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DialogProps>, _) => {
  

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center min-h-screen text-center">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div
        className="inline-block w-full max-w-3xl bg-gray-800 text-left overflow-hidden shadow-xl transform transition-all p-4 px-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="text-white flex flex-col mb-4">
          <button className="text-right" onClick={onClose}>x</button>
          <div className="text-2xl uppercase">{title}</div>
        </div>
        {children}
      </div>
    </div>,
    document?.getElementById("root") as Element
  );
});
