"use client";
import { React, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
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
import Login from "@/app/components/login";
import Signup from "@/app/components/sign-up";
export default function Home() {
  const [selected, setSelected] = useState("login");
  const notify = () => toast("Here is your toast.");
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
              sizes="(min-width: 500px) 254px, (min-width: 780px) 147px, 254px"
              priority={true}
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] flex justify-center items-center">
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
                    <Login />
                  </Tab>
                  <Tab
                    key="sign-up"
                    title="Sign up"
                    className="text-2xl md:text-3xl m-2"
                  >
                    <Signup />
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>
          <button onClick={notify}>Make me a toast</button>
          <Toaster />
        </div>
      </section>
    </main>
  );
}
