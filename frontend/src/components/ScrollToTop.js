// react
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// components scrolls to top
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
