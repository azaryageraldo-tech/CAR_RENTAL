import React from 'react';
import Header from './components/public/Header';
import Hero from './components/public/Hero';
import CarListSection from './components/public/CarListSection';
import AboutUs from './components/public/AboutUs';
import Testimonials from './components/public/Testimonials';
import Faq from './components/public/Faq';
import Contact from './components/public/Contact';
import Footer from './components/public/Footer';

function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <CarListSection />
        <AboutUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
export default LandingPage;