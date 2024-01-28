import React from "react";
import { HomeAssistant, LovelaceCardConfig } from "custom-card-helpers";
export type HassCardProps = {
    hass?: HomeAssistant;
    config?: HassCardConfig;
    narrow?: boolean;
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
export declare function createReactHassCard(cardName: string, Component: React.FC<HassCardProps & unknown>, cardSize?: number): void;
export declare const useLovelaceCard: (type: "entities" | "entity", hass?: HomeAssistant, config?: Omit<LovelaceCardConfig, "type">) => JSX.Element;
