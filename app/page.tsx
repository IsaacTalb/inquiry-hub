import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <h1 className="text-3xl font-bold">Unified Inquiry Operations</h1>
        <p className="mt-3 text-sm text-slate-600">Connect Facebook and Telegram, ingest webhooks, and generate day/night shift reporting for every tenant.</p>
        <Button asChild className="mt-6"><Link href="/register">Get Started</Link></Button>
      </Card>
    </div>
  );
}
