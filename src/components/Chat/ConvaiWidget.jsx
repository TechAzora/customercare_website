import React, { useEffect } from "react";


const ConvaiWidget = () => {
  // ✅ Load external Convai script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <>
      {/* {token && ( */}
      <elevenlabs-convai
        agent-id="agent_9101k4fbjc3sfp7rhws1m5tgyv0q"
      ></elevenlabs-convai>
      {/* )} */}
    </>

  );

}
export default ConvaiWidget;
