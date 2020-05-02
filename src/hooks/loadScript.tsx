import { useEffect } from 'react';

const loadScript = (url: string, handleClientLoad: ((this: GlobalEventHandlers, ev: Event) => any) | null) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;
    script.async = true;
    script.onload = handleClientLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default loadScript;