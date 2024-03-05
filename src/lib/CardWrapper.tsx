import React, { useCallback, useRef, useState } from "react";
import { CardDialog, CardDialogProps } from "./CardDialog";
import { HassCardProps } from "./createReactHassCard";
import { Deferred } from "../utils/misc";

type CardWrapperProps = HassCardProps & {
  Component: React.FC<HassCardProps & unknown>;
};

export function CardWrapper({ Component, ...props }: CardWrapperProps) {
  const [dialog, setDialog] = useState<CardDialogProps | null>(null);

  const dialogPromRef = useRef<Deferred>();
  const handleOpenDialog = useCallback(async (dialogProps: CardDialogProps) => {
    const def = new Deferred();
    dialogPromRef.current = def;
    setDialog(dialogProps);
    return def.promise;
  }, []);
  const handleCloseDialog = useCallback(() => setDialog(null), []);

  const handleOpenEntityMoreInfo = useCallback((entityId: string) => {
    const haEl = document.querySelector("home-assistant");
    if (!haEl) return;

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: entityId },
    });
    haEl.dispatchEvent(event);
  }, []);
  const handleCloseEntityMoreInfo = useCallback(() => {
    const haEl = document.querySelector("home-assistant");
    if (!haEl) return;

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: null },
    });
    haEl.dispatchEvent(event);
  }, []);

  const handleDialogClose = useCallback(() => {
    setDialog(null);
    if (dialogPromRef.current?.promise && dialogPromRef.current?.resolve) {
      dialogPromRef.current.resolve(undefined);
    }
  }, []);

  return (
    <>
      {!!dialog && <CardDialog {...dialog} onClose={handleDialogClose} />}
      <Component
        {...props}
        openDialog={handleOpenDialog}
        closeDialog={handleCloseDialog}
        openEntityMoreInfo={handleOpenEntityMoreInfo}
        closeEntityMoreInfo={handleCloseEntityMoreInfo}
      />
    </>
  );
}
