import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recentRequests = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const lastRequest = recentRequests.get(ip);
    const now = Date.now();

    if (lastRequest && now - lastRequest < 30000) {
      return NextResponse.json(
        { error: "Please wait 30 seconds before the next message." },
        { status: 429 }
      );
    }

    recentRequests.set(ip, now);

    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Fill in all fields" },
        { status: 400 }
      );
    }

    if (!email.includes("@") || email.length > 100) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: "The message must be between 10 and 2000 characters long." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Портфоліо: повідомлення від ${email}`,
      text: `
Від: ${email}

Повідомлення:
${message}
      `,
      replyTo: email,
    });

    return NextResponse.json({ message: "Delievered!" }, { status: 200 });
  } catch (error) {
    console.error("Помилка:", error);
    return NextResponse.json({ error: "Sending error" }, { status: 500 });
  }
}
