"use client";
import { setCookie } from "nookies";
import { auth } from "@/app/firebase";
// import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Link,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log("token:", token);
      localStorage.setItem("token", token);
      toast.success("Login Success", {
        position: "top-center",
        autoClose: 2000,
        onClose: () => router.push("/map"),
      });
    } catch (error) {
      toast.warning("Login Failed", {
        position: "top-center",
      });
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
