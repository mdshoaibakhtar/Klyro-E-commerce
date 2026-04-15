import { useEffect } from 'react';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Klyro`;
    
    // Dynamic Favicon
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%232ab0bf%22/><text y=%22.9em%22 font-size=%2280%22 font-weight=%22bold%22 fill=%22white%22 x=%2215%22>K</text></svg>`;
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
