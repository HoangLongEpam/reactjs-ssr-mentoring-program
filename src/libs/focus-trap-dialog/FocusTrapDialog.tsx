import { PropsWithChildren } from "react";
import { Dialog, DialogProps } from "../dialog/Dialog";
import FocusTrap from "focus-trap-react";

export const FocusTrapDialog = ({
  title = "Dialog",
  isOpen,
  onClose,
  children,
}: PropsWithChildren<DialogProps>) => {
  return (
    <FocusTrap active={isOpen}>
      <Dialog title={title} isOpen={isOpen} onClose={onClose}>
        {children}
      </Dialog>
    </FocusTrap>
  );
};
