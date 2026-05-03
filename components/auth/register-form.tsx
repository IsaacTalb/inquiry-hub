"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenant, setTenant] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setError(error.message);
    if (data.user) {
      await fetch("/api/tenants", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: tenant }) });
    }
    router.push("/dashboard");
  }

  return <form onSubmit={onSubmit} className="space-y-4">
    <input className="w-full rounded border p-2" placeholder="Organization Name" value={tenant} onChange={(e)=>setTenant(e.target.value)} required />
    <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
    <input type="password" className="w-full rounded border p-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
    {error && <p className="text-sm text-red-600">{error}</p>}
    <Button type="submit">Create account</Button>
  </form>;
}
