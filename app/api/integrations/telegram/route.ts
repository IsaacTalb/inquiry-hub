import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { botUsername, tenantId, botToken } = await req.json();
  const { data, error } = await (supabase as any)
    .from("integrations")
    .insert([
      {
        tenant_id: tenantId,
        provider: "telegram",
        external_id: botUsername,
        metadata: { botToken },
      },
    ]);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
