"use client";
import { useState, useEffect } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import db from "@/app/firebase";
import { addDoc, collection, setDoc } from "firebase/firestore";

export default function Signup() {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  //   const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      console.log("User registered successfully!");
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await addDoc(collection(db, "Users", user.uid), {
          email: user.signupEmail,
          name: signupName,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSignup}>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <Input
        isRequired
        placeholder="Enter your name"
        type="text"
        size="lg"
        value={signupName}
        onChange={(e) => setSignupName(e.target.value)}
      />
      <Input
        isRequired
        placeholder="Enter your email"
        type="email"
        size="lg"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <Input
        isRequired
        placeholder="Enter Password"
        type="password"
        size="lg"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <Input
        isRequired
        placeholder="Confirm password"
        type="password"
        size="lg"
        value={signupConfirmPassword}
        onChange={(e) => setSignupConfirmPassword(e.target.value)}
      />
      <p className="text-center text-xl">
        Already have an account?
        <Link size="lg" className="ml-2 cursor-pointer hover:text-blue-900">
          Login
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
          Sign up to enter Mapper
        </Button>
      </div>
    </form>
  );
}
