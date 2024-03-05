# create-react-hass-card

A simple tool to help React developers creating Home Assistant Lovelace cards.

## Content

### createReactHassCard()

Create a custom element compatible with Home Assistant Lovelace from a React component.

#### Usage

```js
import { createReactHassCard } from "create-react-hass-card";

createReactHassCard("name-of-the-card", ReactComponentToConvertToCard);
```

The react component will receive the matching props, on mount and when `hass` is updated:

```jsx
function ExampleCardComponent({ hass, config, narrow, openDialog, closeDialog, openEntityMoreInfo, closeEntityMoreInfo }) {
  // do something with the passed props
  return <div>
    <h2>I am a Home Assitant Card created with React.<h2>
    <p>Hass currently has {Object.keys(hass?.state || {}).length} entities.</p>
    <button onClick={()=>openEntityMoreInfo('light.bedroom_light')}>Open Entity More Info</button>
    <button onClick={()=>closeEntityMoreInfo()}>Close Entity More Info</button>
    <button onClick={()=>openDialog({
      title: 'Demo Dialog',
      content: <p>Im a custom dialog</p>,
    })}>Open Custom Dialog</button>
    <button onClick={()=>closeDialog()}>Close Custom Dialog</button>
  </div>
}
```

### useLovelaceCard()

Render Home Assistant Lovelace cards within your react component React.

#### Usage

```jsx
function ReactCardComponentExample({ hass, config, narrow }) {
  const entitiesCard = useLovelaceCard("hui-entities-card", hass, {
    entities: ["light.living", "light.bedroom"],
  });

  return <div>
    <h2>I am a Home Assitant Card created with React.<h2>
    {entitiesCard}
  </div>
}
```

Will render a Lovelace `hui-entities-card` element, passing the provided hass instance and config.
