import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  message?: unknown;
  service?: unknown;
  honeypot?: unknown;
};

// NOTE: this endpoint currently only validates and logs submissions.
// Wiring it to real email/SMS delivery and CRM storage is a follow-up task
// once those providers (SMTP/SMS credentials, CRM API) are chosen.
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

  console.log("[contact-lead]", {
    name,
    phone,
    message: message.slice(0, 500),
    service,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
