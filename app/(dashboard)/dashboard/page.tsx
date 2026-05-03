import { Card } from "@/components/ui/card";
import { getDashboardData } from "@/lib/repositories/messages";

export default async function DashboardPage() {
  const data = await getDashboardData();
  if (!data) return <p>Missing tenant or unauthorized.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold">{data.tenant.name} Dashboard</h1>
        <p className="text-sm text-slate-600">Multi-tenant communication intelligence center.</p>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold">Connected Integrations</h2>
          <ul className="space-y-2 text-sm">{data.integrations.map((item) => <li key={item.id}>{item.provider}: {item.external_id}</li>)}</ul>
        </Card>
        <Card>
          <h2 className="mb-4 font-semibold">Recent Messages</h2>
          <ul className="space-y-2 text-sm">{data.messages.map((msg) => <li key={msg.id}><b>{msg.provider}</b> ({msg.shift}) - {msg.content}</li>)}</ul>
        </Card>
      </div>
    </div>
  );
}
