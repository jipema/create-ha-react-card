import { useMemo } from "react";
import type { HassCardProps } from "../lib/createReactHaCard";

function Card({ hass, config }: HassCardProps) {
  const lightsOn = useMemo(
    () =>
      Object.entries(hass?.states || {}).reduce<string[]>((out, [id, entity]) => {
        if (id.indexOf("light.") === 0 && entity.state === "on") {
          out.push(id);
        }
        return out;
      }, []),
    [hass?.states]
  );
  return (
    <>
      <h3>You have {lightsOn?.length || 0} light(s) ON.</h3>
      <div>
        Card config: <pre>{JSON.stringify(config, null, 2)}</pre>
      </div>
    </>
  );
}

export default Card;
