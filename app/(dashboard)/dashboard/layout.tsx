import Sidebar from '@/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full lg:w-3/4 lg:ml-64 2xl:w-3/4 2xl:ml-64 min-w-0">
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Sidebar />
        <main className="p-6 h-full w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
