import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
  service?: unknown;
  honeypot?: unknown;
};

// NOTE: submissions are persisted to the leads table (visible in the admin
// panel). Wiring real-time email/SMS notifications is a follow-up task once
// an SMTP/SMS provider is chosen.
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const service = typeof payload.service === "string" ? payload.service.trim() : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  const source = service === "مشاوره رایگان" ? "consultation_form" : "contact_form";
  const fullMessage = service ? `[سرویس: ${service}] ${message}`.trim() : message || null;

  await db.insert(leads).values({
    name,
    phone,
    message: fullMessage,
    source,
  });

  return NextResponse.json({ ok: true });
}
