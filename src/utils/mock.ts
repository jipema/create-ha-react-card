import { NumberFormat, TimeFormat } from "custom-card-helpers";
import { HassCardProps } from "../lib/createReactHassCard";

export const mockReactCardProps: HassCardProps = {
  hass: {
    auth: {
      data: {
        access_token: "qwerty",
        expires_in: 1800,
        hassUrl: "http://homeassistant.local:8123",
        clientId: "http://homeassistant.local:8123/",
        expires: 1999464397775,
        refresh_token: "qwert",
      },
      wsUrl: "",
      accessToken: "",
      expired: false,
      refreshAccessToken: async () => undefined,
      revoke: async () => undefined,
    },
    connection: {
      // @ts-expect-error ignore missin stuff
      options: {
        setupRetry: 0,
        auth: {
          data: {
            access_token: "qwert",
            hassUrl: "http://homeassistant.local:8123",
            clientId: "http://homeassistant.local:8123/",
            expires: 1999464397775,
            expires_in: 1999464397775,
            refresh_token:
              "328470b9842635e802ceb00b818b22e92153186bf210f5555c76096f6e6bef334338b2bca772857abdead8d7d49745b6ab57c1cc30fd85da67d7bea0e9f0a9cd",
          },
          wsUrl: "",
          accessToken: "",
          expired: false,
          refreshAccessToken: async () => undefined,
          revoke: async () => undefined,
        },
      },
      commandId: 44,
      commands: new Map(),
      eventListeners: new Map(),
      closeRequested: false,
      socket: {
        haVersion: "2024.1.5",
        binaryType: "arraybuffer",
        bufferedAmount: 0,
        extensions: "",
        onclose: () => undefined,
        onerror: () => undefined,
        onmessage: () => undefined,
        onopen: () => undefined,
        protocol: "",
        readyState: 0,
        url: "",
        close: () => undefined,
        send: () => undefined,
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => true,
      },
      haVersion: "2024.1.5",
    },
    connected: true,
    states: {
      "light.living_lamp": {
        entity_id: "light.living_lamp",
        state: "on",
        attributes: {
          icon: "hue:floor-shade",
          friendly_name: "Lampe Salon",
          supported_features: 40,
        },
        context: {
          id: "123",
          parent_id: null,
          user_id: null,
        },
        last_changed: "2024-01-28T16:32:04.307Z",
        last_updated: "2024-01-28T16:32:09.321Z",
      },
    },
    devices: {
      "321": {
        area_id: "living",
        configuration_url: null,
        config_entries: ["123"],
        connections: [],
        disabled_by: null,
        entry_type: "service",
        hw_version: null,
        id: "123",
        identifiers: [["hassio", "core"]],
        manufacturer: "Home Assistant",
        model: "Home Assistant Core",
        name_by_user: null,
        name: "Home Assistant Core",
        serial_number: null,
        sw_version: "2024.1.5",
        via_device_id: null,
      },
    },
    areas: {
      laundry: {
        aliases: [],
        area_id: "laundry",
        name: "Laundry",
        picture: null,
      },
    },
    config: {
      latitude: 49.123,
      longitude: 6.123,
      elevation: 300,
      unit_system: {
        length: "km",
        accumulated_precipitation: "mm",
        mass: "g",
        pressure: "Pa",
        temperature: "°C",
        volume: "L",
        wind_speed: "m/s",
      },
      location_name: "Luxembourg",
      time_zone: "Europe/Luxembourg",
      components: ["number", "device_tracker", "notify", "group"],
      config_dir: "/config",
      allowlist_external_dirs: ["/media", "/config/www"],
      allowlist_external_urls: [],
      version: "2024.1.5",
      config_source: "storage",
      state: "RUNNING",
      external_url: null,
      internal_url: null,
      currency: "EUR",
      safe_mode: false,
    },
    themes: {
      themes: {},
      default_theme: "default",
    },
    selectedTheme: null,
    panels: {
      lovelace: {
        component_name: "lovelace",
        icon: null,
        title: null,
        config: {
          mode: "storage",
        },
        url_path: "lovelace",
      },
    },
    services: {
      light: {
        turn_on: {
          name: "Turn on",
          description:
            "Turn on one or more lights and adjust properties of the light, even when they are turned on already.",
          fields: {
            transition: {
              selector: {
                number: {
                  min: 0,
                  max: 300,
                  unit_of_measurement: "seconds",
                },
              },
              name: "Transition",
              description: "Duration it takes to get to next state.",
              example: "",
            },
          },
          target: {
            entity: [
              {
                domain: ["light"],
              },
            ],
          },
        },
      },
    },
    user: {
      id: "1",
      name: "JP",
      is_owner: true,
      is_admin: true,
      credentials: [
        {
          auth_provider_type: "homeassistant",
          auth_provider_id: "nope",
        },
      ],
      mfa_modules: [
        {
          id: "totp",
          name: "Authenticator app",
          enabled: false,
        },
      ],
    },
    panelUrl: "dashboard-default",
    defaultPanel: "lovelace",
    language: "en",
    selectedLanguage: null,
    locale: {
      language: "en",
      number_format: NumberFormat["language"],
      time_format: TimeFormat["am_pm"],
    },
    resources: {
      en: {},
    },
    translationMetadata: {
      fragments: [],
      translations: {},
    },
    dockedSidebar: true,
    vibrate: true,
    debugConnection: false,
    suspendWhenHidden: true,
    enableShortcuts: true,
    moreInfoEntityId: "",
    userData: {
      showAdvanced: true,
    },
    _cameraTmbUrl: {},
  },
  config: {
    type: "custom:react-card",
    entities: ["light.living", "light.bedroom"],
  },
};
