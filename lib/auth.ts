import type { RoleName } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return session;
}

export async function getCurrentRole(): Promise<RoleName> {
  const session = await getCurrentSession();

  if (!session?.user) {
    return "guest";
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return "guest";
  }

  const { data } = await supabase
    .from("user_roles")
    .select("role_name")
    .eq("user_id", session.user.id)
    .maybeSingle();

  return (data?.role_name as RoleName | undefined) ?? "guest";
}

