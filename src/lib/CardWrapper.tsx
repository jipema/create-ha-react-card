import React, { useCallback, useState } from "react";
import { CardDialog, CardDialogProps } from "./CardDialog";
import { HassCardProps } from "./createReactHassCard";

type CardWrapperProps = HassCardProps & {
  Component: React.FC<HassCardProps & unknown>;
};

export function CardWrapper({ Component, ...props }: CardWrapperProps) {
  const [dialog, setDialog] = useState<CardDialogProps | null>(null);

  const handleOpenDialog = useCallback((dialogProps: CardDialogProps) => {
    setDialog(dialogProps);
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

  return (
    <>
      {!!dialog && <CardDialog {...dialog} />}
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
