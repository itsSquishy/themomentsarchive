import Hero from "@/components/hero";
import FeaturesBento from "@/components/features-bento";
import HowItWorks from "@/components/how-it-works";
import Navbar from "@/components/navbar";

export default async function Index() {
  return (
    <>
    <Navbar />
    <div className="max-w-7xl">
      <main className="flex-1 flex flex-col gap-2 px-5">
        <Hero />
        <FeaturesBento />
        <h2 className="font-bold text-2xl mb-4">How it works for guests</h2>
        <HowItWorks />
        
        <footer className="w-full h-12 flex items-center justify-center border-t mx-auto text-center text-xs gap-8 pt-16 pb-2">
              <p className="font-bold hover:underline">
                &copy; 2024 The Moments Archive{" "}
              </p>
        </footer>
      </main>
    </div>
    </>
  );
}
