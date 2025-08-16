import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { toast } from "react-toastify";
import { contactUsEmail } from "@/api/auth";
export const UserContact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // handle submit email
  const handleSubmitEmail = async () => {
    if (!fullName || !email || !message) {
      toast.error("Please Fill All Fields");
      return;
    } else {
      const data = {
        fullName,
        email,
        message,
      };

      // sending the email
      setIsLoading(true);
      await contactUsEmail(data).then((res) => {
        if (res.success) {
          toast.success(res.message || "Email sent successfully!");
        } else {
          toast.error(res.message || "Failed to send email!");
        }
        setIsLoading(false);
      });

      setFullName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <>
      <div className="min-h-svh bg-[#060B26] flex flex-col justify-between">
        <Navbar />
        <section className="flex flex-row flex-wrap-reverse items-center w-full my-4 justify-evenly">
          <div className="bg-[#0E132D] text-white py-4 px-12 w-full max-w-[450px] border border-solid border-gray-600 rounded-[24px]">
            <h2 className="font-roboto text-[18px] font-bold leading-[23.4px] text-center my-4">
              WRITE US A MESSAGE
            </h2>
            <p className="text-center text-[11px] leading-4 text-[#F2994A]">
              We would love to hear from you
            </p>
            <div className="my-5">
              <div className="flex flex-col my-8 w-[100%]">
                <label
                  htmlFor="name"
                  className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px] "
                >
                  FULL NAME
                </label>

                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="bg-[#151933] my-2 px-3 py-3  w-full rounded-[10px]"
                  required
                />
              </div>
              <div className="flex flex-col my-8 w-[100%]">
                <label
                  htmlFor="email"
                  className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px] "
                >
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="e-mail"
                  id="email"
                  placeholder="Your email address"
                  className="bg-[#151933] my-2 px-3 py-3  w-full rounded-[10px]"
                  required
                />
              </div>
              <div className="flex flex-col my-8 w-[100%]">
                <label
                  htmlFor="message"
                  className="font-roboto text-[14px] w-[95%] self-center font-medium leading-[19.6px]"
                >
                  MESSAGE
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  name="message"
                  id="message"
                  rows={2}
                  placeholder="Write your message here..."
                  className="bg-[#151933] my-2 px-3 py-3 w-full rounded-[10px]"
                ></textarea>
              </div>
            </div>

            <button
              disabled={isLoading}
              onClick={handleSubmitEmail}
              className="bg-[#0075FF] disabled:cursor-not-allowed flex justify-center font-roboto text-[15px] font-bold leading-[22.5px] tracking-[0.08em] text-center w-full py-3 rounded-[12px] my-8"
            >
              {isLoading ? "SENDING ..." : "SEND"}{" "}
              <img
                src="/signin.svg"
                className="mx-2 my-1 max-w-[17px]"
                alt=""
                //  srcset=""
              />
            </button>
          </div>
          <div className="flex flex-col ">
            <img
              src="/Algorithm Logo 22 1.svg"
              className="mx-auto max-w-[280px]  object-cover "
              alt="BITS&ALGORITHM"
              //   srcset=""
            />
            <h1 className=" py-9 text-white font-roboto text-[50px] font-semibold leading-[68px] tracking-[0.1em] text-center">
              LET’S <br /> CONNECT
            </h1>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
