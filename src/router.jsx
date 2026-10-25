import { useEffect, useState } from "react";

const getPath = () => window.location.hash.replace(/^#/, "") || "/";

export function usePath() {
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onChange = () => {
      setPath(getPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export const navigate = (to) => {
  window.location.hash = to;
};

export function Link({ to, children, ...rest }) {
  return (
    <a href={`#${to}`} {...rest}>
      {children}
    </a>
  );
}

export function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Scroll to a landing-page section from any page.
export function goSection(id) {
  if (getPath() === "/") scrollToId(id);
  else {
    navigate("/");
    setTimeout(() => scrollToId(id), 150);
  }
}
