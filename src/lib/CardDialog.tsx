import React, { useCallback, useRef } from "react";

export type CardDialogProps = {
  content: React.ReactNode;
  title?: React.ReactNode | false;
  titleHover?: string;
  fullScreenOnMobile?: boolean;
  onClose?: () => void;
};

export function CardDialog({
  title,
  titleHover,
  content,
  fullScreenOnMobile = true,
  onClose,
}: CardDialogProps) {
  const elRef = useRef<HTMLElement | null>(null);

  const handleDialogRef = useCallback(
    (el: HTMLElement) => {
      if (!el) return;
      elRef.current = el;
      el.addEventListener("closed", () => onClose?.());

      const root = el?.shadowRoot;
      if (!root) return;

      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
      :host{
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: min(600px, 95vw);
        --justify-action-buttons: space-between;
        --vertical-align-dialog: flex-start;
        --dialog-surface-margin-top: 40px;
        --dialog-surface-position: static;
        --dialog-content-position: static;
        --dialog-content-padding: 0;
        --chart-base-position: static;
      } 
      @media (max-width: 450px), (max-height: 500px){
        :host{
          ${
            fullScreenOnMobile
              ? `--mdc-dialog-min-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
          --mdc-dialog-max-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: 0;`
              : ``
          }
      }}`;

      root.appendChild(styleEl);
    },
    [fullScreenOnMobile, onClose]
  );

  return (
    <ha-dialog open hideactions flexcontent ref={handleDialogRef}>
      <div className="dialog-wrapper">
        {title !== false && (
          <ha-dialog-header slot="heading">
            <ha-icon-button slot="navigationIcon" dialogaction="cancel">
              <svg
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <g>
                  <path
                    className="primary-path"
                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                  ></path>
                </g>
              </svg>
            </ha-icon-button>

            <span
              slot="title"
              title={
                titleHover || (typeof title === "string" ? title : undefined)
              }
            >
              {title}
            </span>
          </ha-dialog-header>
        )}
        <div
          className="content"
          style={{ padding: 16, paddingTop: title !== false ? 0 : undefined }}
        >
          {content}
        </div>
      </div>
    </ha-dialog>
  );
}
