import React, { memo, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

import { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

// utils
import { isPanelValue, omit } from "../utils/misc";

// components
import { CardWrapper } from "./CardWrapper";

// types
import type { CardDialogProps } from "./CardDialog";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ha-card": unknown;
      "ha-dialog": unknown;
      "ha-dialog-header": unknown;
      "ha-icon-button": unknown;
    }
  }
}

export type HassCardProps = {
  hass?: HomeAssistant;
  config?: HassCardConfig;
  narrow?: boolean;
  openDialog: (dialogParams: CardDialogProps) => Promise<void>;
  closeDialog: () => void;
  openEntityMoreInfo: (entityId: string) => void;
  closeEntityMoreInfo: () => void;
};
export type HassCardConfig = Record<string, unknown> & {
  type: string;
  _panel?: {
    component_name: string;
    icon: string | null;
    title: string | null;
    url_path: string | null;
    require_admin: boolean;
    config_panel_domain: string | null;
    name: string;
    embed_iframe: boolean;
    trust_external: boolean;
    module_url: string;
    prefix: string;
    path: string;
  };
};

export function createReactHassCard(
  cardName: string,
  Component: React.FC<HassCardProps & unknown>,
  options: {
    cardSize?: number;
    updateIntervalMs?: number;
  } = { cardSize: 1, updateIntervalMs: 1000 }
) {
  const ComponentMemo = memo(Component);

  class HassCard extends HTMLElement {
    _root?: ReactDOM.Root = undefined;
    _props: HassCardProps = {
      hass: undefined,
      config: undefined,
      narrow: false,
      openDialog: async () => undefined,
      closeDialog: () => undefined,
      openEntityMoreInfo: () => undefined,
      closeEntityMoreInfo: () => undefined,
    };

    connectedCallback() {
      this._root = ReactDOM.createRoot(this);
      this._root.render(
        <React.StrictMode>
          <CardWrapper {...this._props} Component={ComponentMemo} />
        </React.StrictMode>
      );
    }
    disconnectedCallback() {
      this._root?.unmount?.();
      this._root = undefined;
      if (this._hassUpdateTimeout) this._hassUpdateTimeout = clearTimeout(this._hassUpdateTimeout);
    }

    setConfig(newVal: typeof this._props.config) {
      this.updateProps("config", newVal);
    }
    getCardSize() {
      return options?.cardSize || 1;
    }

    private _hassUpdateTimeout: NodeJS.Timeout | void = undefined;
    private _lastHassUpdate: Date | void = undefined;
    set hass(newVal: typeof this._props.hass) {
      if (this._hassUpdateTimeout) this._hassUpdateTimeout = clearInterval(this._hassUpdateTimeout);
      if (!options?.updateIntervalMs || !this._lastHassUpdate) {
        this.updateProps("hass", newVal);
      } else {
        const now = new Date();
        if (now && this._lastHassUpdate && now.getTime() - this._lastHassUpdate.getTime() > options.updateIntervalMs) {
          this.updateProps("hass", newVal);
        } else {
          this._hassUpdateTimeout = setInterval(() => this.updateProps("hass", newVal), options.updateIntervalMs);
        }
      }
    }
    set narrow(newVal: typeof this._props.narrow) {
      this.updateProps("narrow", newVal);
    }
    set panel(newVal: typeof this._props.hass) {
      this.updateProps("panel", newVal);
    }
    set route(newVal: typeof this._props.hass) {
      this.updateProps("route", newVal);
    }

    updateProps(name: keyof typeof this._props | "panel" | "route", value: unknown): void {
      if (!name) return;

      if (name === "panel" && isPanelValue(value)) {
        return this.updateProps("config", {
          ...(this._props.config || {}),
          type: value.config?._panel_custom.name,
          ...omit(value.config || {}, "_panel_custom", "_route"),
          _panel: {
            ...omit(value, "config"),
            ...(value.config?._panel_custom || {}),
          },
        });
      }

      if (name === "route" && value && typeof value === "object") {
        return this.updateProps("config", {
          ...(this._props.config || {}),
          _panel: { ...(this._props.config?._panel || {}), ...value },
        });
      }

      if (name === "hass") {
        this._props["hass"] = value as HassCardProps["hass"];
        this._lastHassUpdate = new Date();
      } else if (name === "config") this._props["config"] = value as HassCardProps["config"];
      else if (name === "narrow") this._props["narrow"] = !!value;

      if (this._root?.render) {
        this._root.render(
          <React.StrictMode>
            <CardWrapper {...this._props} Component={ComponentMemo} />
          </React.StrictMode>
        );
      }
    }
  }

  return customElements.define(cardName, HassCard);
}

export const useLovelaceCard = (
  type: string,
  hass?: HomeAssistant,
  config?: Omit<LovelaceCardConfig, "type">,
  children?: React.ReactNode
) => {
  const CardTag = type;

  const cardRef = useRef<LovelaceCard>();
  const updateCardHass = useCallback(() => {
    if (!cardRef.current || !hass) return;
    cardRef.current.hass = hass;
  }, [hass]);
  useEffect(() => updateCardHass(), [updateCardHass]);

  const updateCardConfig = useCallback(() => {
    if (!cardRef.current || !hass) return;
    cardRef.current.setConfig({ ...(config || {}), type: config?.type || type });
  }, [config, hass, type]);

  const updateRef = useCallback(
    (el: LovelaceCard | null) => {
      cardRef.current = el || undefined;
      updateCardHass();
      updateCardConfig();
    },
    [updateCardConfig, updateCardHass]
  );
  useEffect(() => updateCardConfig(), [updateCardConfig]);

  // @ts-expect-error custom element props
  return <CardTag ref={updateRef}>{children}</CardTag>;
};
