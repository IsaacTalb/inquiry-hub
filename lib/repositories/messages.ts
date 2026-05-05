import { createClient } from "@/lib/supabase/server";

type Tenant = { id: string; name: string };
type Message = { id: string; provider: string; content: string; received_at: string; shift: string | null };
type Integration = { id: string; provider: string; external_id: string };

type DashboardData = {
  tenant: Tenant;
  messages: Message[];
  integrations: Integration[];
};

export async function getDashboardData(): Promise<DashboardData | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const { data: tenant } = await supabase
    .from("tenants")
    .select("id,name")
    .eq("owner_id", auth.user.id)
    .single();

  if (!tenant) return null;

  const { data: messages } = await supabase
    .from("messages")
    .select("id,provider,content,received_at,shift")
    .eq("tenant_id", tenant.id)
    .order("received_at", { ascending: false })
    .limit(20);

  const { data: integrations } = await supabase
    .from("integrations")
    .select("id,provider,external_id")
    .eq("tenant_id", tenant.id);

  return {
    tenant: tenant as Tenant,
    messages: (messages ?? []) as Message[],
    integrations: (integrations ?? []) as Integration[],
  };
}
