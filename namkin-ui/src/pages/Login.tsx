import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useSignUpUserMutation
} from "../slices/apiSlice";
import { useNavigate } from "@tanstack/react-router";
import { Button, buttonVariants } from "../components/Button/button";
import { Input } from "../components/Input/input";
import { Card, CardFooter } from "../components/Cards/card";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pageState, setPageState] = useState<"login" | "register">("login");

  const [loginUser] = useLoginUserMutation();
  const [registerUser] = useSignUpUserMutation();
  const navigate = useNavigate();

  const login = () => {
    loginUser({ email, password })
      .then((res: any) => {
        if (res.data) {
          localStorage.setItem("token", res.data.access_token);
        }
      })
      .then(() => {
        navigate({ to: "/" });
      });
  };

  const signUp = () => {
    registerUser({ name, email, password }).then((res: any) => {
      login();
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pageState === "login") {
      login();
    } else {
      signUp();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate({ to: "/" });
    }
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="p-6">
        <div>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Adresse email"
          />
          {pageState === "register" && (
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Nom"
              className="mt-3"
            />
          )}
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Mot de passe"
            className="mt-3"
          />
          {pageState === "login" ? (
            <Button
              variant="link"
              className="mt-3"
              onClick={() => setPageState("register")}
            >
              Sign up
            </Button>
          ) : (
            <Button
              variant="link"
              className="mt-3"
              onClick={() => setPageState("login")}
            >
              Login
            </Button>
          )}
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="default"
          className="bg-yellow-500 mt-6"
        >
          {pageState.toLocaleUpperCase()}
        </Button>
      </Card>
    </div>
  );
};
