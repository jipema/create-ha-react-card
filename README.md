# Create React Hass Card

A simple tool to help React developers building Home Assistant Lovelace cards.

Examples will follow in case of interest, but this lib is currently composed of 2 utils:

## createReactHassCard

```js
createReactHassCard("name-of-the-card", ReactComponentToConvertToCard);
```

Where the react component will receive the matching props:

```js
function ReactComponentToConvertToCard({ hass, config, narrow }) {}
```

## useLovelaceCard

```js
useLovelaceCard("entities", hass, {
  entities: ["light.living", "light.bedroom"],
});
```

Will use Lovelace ``hui-entities-card` passing the hass instance and config, and return a ReactNode.
