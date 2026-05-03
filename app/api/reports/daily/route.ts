import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tenantId = searchParams.get("tenantId");
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  if (!tenantId) {
    return NextResponse.json({ error: "tenantId is required" }, { status: 400 });
  }

  const supabase = await createClient();
  const start = `${date}T00:00:00.000Z`;
  const end = `${date}T23:59:59.999Z`;

  const { data, error } = await supabase
    .from("messages")
    .select("provider,shift")
    .eq("tenant_id", tenantId)
    .gte("received_at", start)
    .lte("received_at", end);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const byProvider = data.reduce(
    (acc: Record<string, number>, row) => ({
      ...acc,
      [row.provider]: (acc[row.provider] || 0) + 1
    }),
    {}
  );

  return NextResponse.json({ date, total: data.length, byProvider });
}
