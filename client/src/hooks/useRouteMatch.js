import { useLocation, matchPath } from "react-router-dom";

export default function useRouteMatch(path) {
  const { pathname } = useLocation();

  return matchPath({ path }, pathname);
}