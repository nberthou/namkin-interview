import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { Menu } from "../components/Menu/Menu";

export const Route: any = createRootRoute({
  component: () => {
    const { location } = useRouterState();
    const token = localStorage.getItem("token");

    const { isExpired, decodedToken } = useJwt(token!);
    if (decodedToken && isExpired) {
      localStorage.removeItem("token");
    }

    const showMenu: boolean = location.pathname !== "/login";

    return (
      <>
        {showMenu && <Menu />}
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  }
});
