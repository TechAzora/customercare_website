import React, { useEffect } from "react";

const ConvaiWidget = () => {
  useEffect(() => {
    // Load the external script only once
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <elevenlabs-convai agent-id="agent_9101k4fbjc3sfp7rhws1m5tgyv0q"></elevenlabs-convai>
  );
};

export default ConvaiWidget;
