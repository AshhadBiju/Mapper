import { useState } from "react";
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

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  console.log(loginEmail);
  console.log(loginPassword);
  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        placeholder="Enter your email"
        type="email"
        size="lg"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <Input
        isRequired
        placeholder="Enter your password"
        type="password"
        size="lg"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
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
        <Button fullWidth color="primary" className="text-2xl" size="md">
          Map your way in
        </Button>
      </div>
    </form>
  );
}
