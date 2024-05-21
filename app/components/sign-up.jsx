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

export default function Signup() {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  console.log(signupName);
  console.log(signupEmail);
  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        placeholder="Enter your name"
        type="password"
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
        Already have an account ?
        <Link
          size="lg"
          onPress={() => setSelected("login")}
          className="ml-2 cursor-pointer hover:text-blue-900"
        >
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" className="text-2xl " size="md">
          Sign up to enter Mapper
        </Button>
      </div>
    </form>
  );
}
