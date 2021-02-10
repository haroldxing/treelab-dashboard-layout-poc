import React, { useRef, useState } from "react";

export default () => {
  const [message, setMessage] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>();
  return (
    <div>
      <iframe ref={iframeRef} src="/app" />
      <input
        value={message}
        onInput={(e) => setMessage(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          iframeRef.current.contentWindow.postMessage(message, "*");
        }}
      >
        发送
      </button>
    </div>
  );
};
