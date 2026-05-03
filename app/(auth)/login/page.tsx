import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return <Card className="mx-auto max-w-md"><h1 className="mb-4 text-xl font-semibold">Login</h1><LoginForm /></Card>;
}
