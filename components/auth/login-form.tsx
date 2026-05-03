"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  return <form onSubmit={onSubmit} className="space-y-4">
    <input className="w-full rounded border p-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
    <input type="password" className="w-full rounded border p-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    {error && <p className="text-sm text-red-600">{error}</p>}
    <Button type="submit">Login</Button>
  </form>;
}
