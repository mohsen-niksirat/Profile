import { useEffect, useState } from "react";
import { asset } from "../lib/paths";

// Live numbers from the hub's data.json, which a GitHub Action refreshes
// every six hours (stars, forks, totals). Fetched once per page load.
let pending = null;
const load = () =>
  (pending ??= fetch(asset("/data.json"))
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null));

export const useLiveStats = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    load().then((d) => alive && setData(d));
    return () => {
      alive = false;
    };
  }, []);
  return data;
};
