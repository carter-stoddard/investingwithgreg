import { Hero } from "@/components/sections/Hero";
import { StockCalls } from "@/components/sections/StockCalls";
import { Pricing } from "@/components/sections/Pricing";
import { QualificationForm } from "@/components/sections/QualificationForm";
import { About } from "@/components/sections/About";
import { TikTokGallery } from "@/components/sections/TikTokGallery";
import { Footer } from "@/components/sections/Footer";
import { TopNav } from "@/components/sections/TopNav";
import { FormProvider } from "@/components/FormContext";

export default function Page() {
  return (
    <FormProvider>
      <TopNav />
      <main>
        <Hero />
        <StockCalls />
        <Pricing />
        <QualificationForm />
        <About />
        <TikTokGallery />
      </main>
      <Footer />
    </FormProvider>
  );
}
