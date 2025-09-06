// TawkWidget.jsx
import { useEffect } from "react";

const TawkWidget = () => {
  useEffect(() => {
    // avoid adding multiple scripts
    if (document.getElementById("tawk-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-script";
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://embed.tawk.to/6729d5f92480f5b4f598d104/1ibtmnm8s";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      // cleanup if component unmounts
      const existingScript = document.getElementById("tawk-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // nothing visible in JSX
};

export default TawkWidget;
