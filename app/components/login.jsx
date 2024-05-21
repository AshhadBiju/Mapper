"use client";
import { auth } from "@/app/firebase";
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   console.log(loginEmail);
  //   console.log(loginPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Success");
    } catch (error) {
      toast.warning("Login Failed");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      <Input
        isRequired
        placeholder="Enter your email"
        type="email"
        size="lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        isRequired
        placeholder="Enter your password"
        type="password"
        size="lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-center text-xl">
        Need to create an account ?
        <Link
          size="lg"
          onPress={() => setSelected("sign-up")}
          className="ml-2 cursor-pointer hover:text-blue-600"
        >
          Sign up
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          className="text-2xl"
          size="md"
          type="submit"
        >
          Map your way in
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
}
