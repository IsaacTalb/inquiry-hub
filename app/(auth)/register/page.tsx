import { Card } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return <Card className="mx-auto max-w-md"><h1 className="mb-4 text-xl font-semibold">Register</h1><RegisterForm /></Card>;
}
