import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, phone, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Все поля обязательны" },
        { status: 400 }
      );
    }

    const text = `
Новая заявка!

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text,
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      throw new Error("Ошибка Telegram API");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Сообщение отправлено",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}