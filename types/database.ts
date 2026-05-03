export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: { Row: { id: string; name: string; created_at: string; owner_id: string } };
      integrations: {
        Row: {
          id: string;
          tenant_id: string;
          provider: "facebook" | "telegram";
          external_id: string;
          metadata: Json;
          created_at: string;
        };
      };
      messages: {
        Row: {
          id: string;
          tenant_id: string;
          provider: "facebook" | "telegram";
          sender: string;
          content: string;
          received_at: string;
          raw_payload: Json;
          shift: "day" | "night";
        };
      };
    };
  };
}
