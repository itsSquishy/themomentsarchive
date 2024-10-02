import Navbar from "@/components/navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
      <footer className="w-full h-12 flex items-center justify-center border-t mx-auto text-center text-xs gap-8 pt-16 pb-2">
          <p className="font-bold hover:underline">
            &copy; 2024 The Moments Archive{" "}
          </p>
      </footer>
    </>
  );
}
