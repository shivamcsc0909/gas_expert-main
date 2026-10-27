import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Faqs from "@/components/Faqs";
import ServiceArea from "@/components/ServiceArea";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import AutoPopup from "@/components/AutoPopup";

export default function Home() {
  return (
    <div className="relative w-full">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <Faqs />
      <ServiceArea />
      <ContactForm />
      <Footer />
      <FloatingButton />
      <AutoPopup />
    </div>
  );
}
