"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import mapBg from "@/public/images/map-bg.svg";

export default function Login() {
  const [selected, setSelected] = React.useState("login");

  // const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log("Logging in with:", { email, password });
  //   router.push("/dashboard");
  // };

  return (
    <main className=" max-h-screen">
      <section className="flex flex-col md:flex-row md:gap-x-4 gap-y-4 h-screen w-full md:p-4 px-4 pt-0 pb-4">
        <div className="bg-white md:bg-blue-500 w-full md:w-[50%] flex justify-center items-center rounded-3xl">
          <div className=" text-3xl md:text-5xl  text-blue-500 md:text-white flex md:flex-col justify-center flex-col-reverse items-center">
            <div className="flex justify-center">Welcome to Mapper</div>
            <Image
              src={mapBg}
              alt="map goes here"
              width={350}
              // height={451}
              sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
              // className="hidden md:block"
              priority={true}
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] flex justify-center items-center">
          {/* <div className="bg-slate-400 py-10 px-5 rounded w-full">
            <div>
              <h1 class="text-white text-xl md:text-3xl font-bold mb-5">
                Login
              </h1>
            </div>

            <form onSubmit={handleLogin} class="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <Link href="/forgotPassword">
                <h1 class="text-sky-500 text-base md:text-xl font-semibold hover:text-blue-600 my-4">
                  Forgot Password ?
                </h1>
              </Link>
              <button
                type="submit"
                class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-600 "
              >
                Map your way in
              </button>
            </form>
            <div className="text-white flex gap-1 justify-center text-base md:text-xl mt-4">
              <h1>Don't have an account ?</h1>
              <Link href="/signup">
                <h1 class="text-sky-500  font-semibold hover:text-blue-600">
                  Sign up
                </h1>
              </Link>
            </div>
          </div> */}
          <div className="max-w-full w-[1000px] h-[420px] max-h-full mb-8">
            <Card>
              <CardBody className="overflow-hidden">
                <Tabs
                  fullWidth
                  size="lg"
                  aria-label="Tabs form"
                  selectedKey={selected}
                  onSelectionChange={setSelected}
                  className="mb-6"
                >
                  <Tab
                    key="login"
                    title="Login"
                    className="text-2xl md:text-3xl m-2"
                  >
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        // label="Email"
                        placeholder="Enter your email"
                        type="email"
                        size="lg"
                      />
                      <Input
                        isRequired
                        // label="Password"
                        placeholder="Enter your password"
                        type="password"
                        size="lg"
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
                        >
                          Map your way in
                        </Button>
                      </div>
                    </form>
                  </Tab>
                  <Tab
                    key="sign-up"
                    title="Sign up"
                    className="text-2xl md:text-3xl m-2"
                  >
                    <form className="flex flex-col gap-4">
                      <Input
                        isRequired
                        // label="Name"
                        placeholder="Enter your name"
                        type="password"
                        size="lg"
                      />
                      <Input
                        isRequired
                        // label="Email"
                        placeholder="Enter your email"
                        type="email"
                        size="lg"
                      />
                      <Input
                        isRequired
                        // label="Password"
                        placeholder="Enter Password"
                        type="password"
                        size="lg"
                      />
                      <Input
                        isRequired
                        // label="Confirm Password"
                        placeholder="Confirm password"
                        type="password"
                        size="lg"
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
                        <Button
                          fullWidth
                          color="primary"
                          className="text-2xl "
                          size="md"
                        >
                          Sign up to enter Mapper
                        </Button>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* <div className="w-full md:w-[50%] flex justify-center items-center ">
          <div className="bg-slate-400 py-10 px-5 rounded w-full">
            <div>
              <h1 class="text-white text-xl md:text-3xl font-bold mb-5">
                Sign up
              </h1>
            </div>

            <form onSubmit={handleLogin} class="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  class="w-full px-4 py-3 rounded-lg bg-white text-black focus:outline-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-blue-600 "
              >
                Create mapper account
              </button>
            </form>
          </div>
        </div> */}
      </section>
    </main>
  );
}
