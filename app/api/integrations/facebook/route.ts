import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { pageId, tenantId, accessToken } = await req.json();
  const insertData: Database["public"]["Tables"]["integrations"]["Row"] = {
    tenant_id: tenantId,
    provider: "facebook",
    external_id: pageId,
    metadata: { accessToken },
    id: "", // Placeholder for required fields
    created_at: new Date().toISOString(),
  };

  const { data, error } = await (supabase as any)
  .from("integrations")
  .insert({
    tenant_id: tenantId,
    provider: "facebook",
    external_id: pageId,
    metadata: { accessToken }
  })
  .select()
  .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
