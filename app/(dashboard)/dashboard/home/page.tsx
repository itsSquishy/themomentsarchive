import { createClient } from '@/utils/supabase/server';
export default async function DashboardPage() {
    // Fetch data from Supabase
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    return (
      <>
        <main className="flex-1 flex flex-col gap-6 px-4">
          <h2 className="font-bold text-3xl mb-4">Hello, {user?.user_metadata.first_name} 👋</h2>
        </main>
      </>
    );
  }
