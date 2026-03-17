'use client';


import AntiInflamSection from "@/components/AntiInflamSection";
import DareToBeginSection from "@/components/DareToBeginSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductSection from "@/components/ProductSection";
import BeforeAfterSection from "@/components/Testmonials";


const SelectorWithApi = () => {
  return (
    <div >

      <Header />
      <Hero />
      <BeforeAfterSection />
      <AntiInflamSection />
      <ProductSection />
      <DareToBeginSection />
      <FAQSection />
      <Footer />

    </div>
  );
};

export default SelectorWithApi;
