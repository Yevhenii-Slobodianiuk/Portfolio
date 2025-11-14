"use client";

import { useState, FormEvent } from "react";
import Container from "../components/Container";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(
          "Your message has been successfully delivered! Thank you for contacting me."
        );
        setMessageType("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage(result.error || "Something went wrong. Please try again.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        "Connection error. Check your internet connection and try again."
      );
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-[#2E2F39] pt-10 pb-5 w-full" id="contact">
      <Container>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 m-auto mb-[100px] max-w-[500px]"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="px-4 py-2 border rounded-xl"
            required
            disabled={isLoading}
          />
          <textarea
            name="message"
            placeholder="Enter message"
            className="px-4 py-2 border rounded-xl min-h-[100px]"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="block bg-white hover:bg-transparent disabled:opacity-50 px-4 py-2 border border-amber-50 hover:border-[#F9E84E] rounded-xl text-[#171717] hover:text-white transition duration-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Contact me"}
          </button>

          {message && (
            <div
              className={`p-4 rounded-xl text-center ${
                messageType === "success"
                  ? "bg-green-500/20 text-green-300 border border-green-500"
                  : "bg-red-500/20 text-red-300 border border-red-500"
              }`}
            >
              {message}
            </div>
          )}
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
