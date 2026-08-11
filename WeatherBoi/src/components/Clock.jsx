import { useEffect, useState } from "react";

function Clock({ timeZone }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeZone) return null;

  const time = now.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return <p className="local-time">Local time: {time}</p>;
}

export default Clock;
