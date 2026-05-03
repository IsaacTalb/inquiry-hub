import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pageId, tenantId, accessToken } = await req.json();
  const { data, error } = await supabase.from("integrations").insert({ tenant_id: tenantId, provider: "facebook", external_id: pageId, metadata: { accessToken } }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
