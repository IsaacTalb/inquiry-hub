import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId");
  const shift = searchParams.get("shift");
  const supabase = await createClient();

  const { data, error } = await supabase.from("messages").select("id,provider,sender,content,received_at").eq("tenant_id", tenantId).eq("shift", shift);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ shift, total: data.length, messages: data });
}
