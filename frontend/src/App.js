import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import { ApplyModalProvider } from './context/ApplyModalContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MBAAdmission from './pages/MBAAdmission';
import PGDMAdmission from './pages/PGDMAdmission';
import MBAWithoutCAT from './pages/MBAWithoutCAT';
import DirectMBAAdmission from './pages/DirectMBAAdmission';
import ExecutiveMBA from './pages/ExecutiveMBA';
import DistanceOnlineMBA from './pages/DistanceOnlineMBA';
import MBAMarketing from './pages/MBAMarketing';
import MBAFinance from './pages/MBAFinance';
import MBAHR from './pages/MBAHR';
import MBABusinessAnalytics from './pages/MBABusinessAnalytics';
import MBAOperations from './pages/MBAOperations';
import MBADigitalMarketing from './pages/MBADigitalMarketing';
import MBAInternationalBusiness from './pages/MBAInternationalBusiness';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminDashboard from './pages/AdminDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin && <ApplyModal />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mba-admission" element={<MBAAdmission />} />
          <Route path="/pgdm-admission" element={<PGDMAdmission />} />
          <Route path="/mba-without-cat" element={<MBAWithoutCAT />} />
          <Route path="/direct-mba-admission" element={<DirectMBAAdmission />} />
          <Route path="/executive-mba" element={<ExecutiveMBA />} />
          <Route path="/distance-online-mba" element={<DistanceOnlineMBA />} />
          <Route path="/mba-marketing" element={<MBAMarketing />} />
          <Route path="/mba-finance" element={<MBAFinance />} />
          <Route path="/mba-hr" element={<MBAHR />} />
          <Route path="/mba-business-analytics" element={<MBABusinessAnalytics />} />
          <Route path="/mba-operations" element={<MBAOperations />} />
          <Route path="/mba-digital-marketing" element={<MBADigitalMarketing />} />
          <Route path="/mba-international-business" element={<MBAInternationalBusiness />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <ApplyModalProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ApplyModalProvider>
  );
}

export default App;
