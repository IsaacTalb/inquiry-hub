import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const getShift = (date: Date) => {
  const hour = date.getUTCHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
};

export async function POST(req: Request) {
  const supabase = await createClient();
  const payload = await req.json();
  const tenantId = payload.tenantId as string;
  const provider = payload.provider as "facebook" | "telegram";
  const receivedAt = new Date(payload.receivedAt ?? Date.now());

  const { error } = await supabase.from("messages").insert({
    tenantId,
    provider,
    sender: payload.sender,
    content: payload.content,
    receivedAt: receivedAt.toISOString(),
    rawPayload: payload,
    shift: getShift(receivedAt)
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
