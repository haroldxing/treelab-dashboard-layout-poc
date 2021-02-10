import React, { useEffect, useState } from "react";

export default () => {
  const [message, setMessage] = useState("APP");
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      setMessage(e.data);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);
  return <div>{message}</div>;
};
