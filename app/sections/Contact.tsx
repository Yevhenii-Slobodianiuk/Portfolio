"use client";

import { useEffect } from "react";
import Container from "../components/Container";
import emailjs from "@emailjs/browser";

const Contact = () => {
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => console.log("Message sent successfully"),
        (error) => console.error("Error sending message:", error)
      );

    e.currentTarget.reset();
  };

  return (
    <section className="bg-[#2E2F39] pt-10 pb-5 w-full" id="contact">
      <Container>
        <form
          onSubmit={sendEmail}
          className="flex flex-col gap-5 m-auto mb-[100px] max-w-[500px]"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="px-4 py-2 border rounded-xl"
            required
          />
          <textarea
            name="message"
            placeholder="Enter message"
            className="px-4 py-2 border rounded-xl min-h-[100px]"
            required
          />
          <button className="block bg-white hover:bg-transparent px-4 py-2 border border-amber-50 hover:border-[#F9E84E] rounded-xl text-[#171717] hover:text-white transition duration-300">
            contact me
          </button>
        </form>
        <p className="text-center">
          @DESIGNED AND DEVELOPED BY
          <span className="text-[#F9E84E]"> YEVHENII SLOBODIANIUK</span>
        </p>
      </Container>
    </section>
  );
};

export default Contact;
