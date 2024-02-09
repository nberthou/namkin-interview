import { Link } from "@tanstack/react-router";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { Button } from "../Button/button";

export const Menu = () => {
  const currentUser = useGetCurrentUser();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <ul className="w-full flex justify-center p-6">
      <li>
        <Button variant="destructive" onClick={() => logout()}>
          Se déconnecter
        </Button>
      </li>
    </ul>
  );
};
