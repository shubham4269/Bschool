import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ApplyModal from './components/ApplyModal';
import WhatsAppButton from './components/WhatsAppButton';
import { ApplyModalProvider } from './context/ApplyModalContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DynamicCoursePage from './pages/DynamicCoursePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import TermsAndConditions from './pages/TermsAndConditions';
import AdminDashboard from './pages/AdminDashboard';
import TheBlog from './pages/TheBlog';
import BlogDetail from './pages/BlogDetail';
import AdminBlogs from './pages/AdminBlogs';
import AdminBlogForm from './pages/AdminBlogForm';
import AcademicPartners from './pages/AcademicPartners';
import AdminPartners from './pages/AdminPartners';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin && <ApplyModal />}
      {!isAdmin && <WhatsAppButton />}
      <main>
        <Routes>
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/academic-partners" element={<AcademicPartners />} />
          {/* Blog routes */}
          <Route path="/the-latest" element={<TheBlog />} />
          <Route path="/the-latest/:slug" element={<BlogDetail />} />
          {/* Dynamic service and specialization pages */}
          <Route path="/service/:slug" element={<DynamicCoursePage type="service" />} />
          <Route path="/specialization/:slug" element={<DynamicCoursePage type="specialization" />} />
          {/* Legacy routes — redirect old URLs to new dynamic ones */}
          <Route path="/mba-admission" element={<Navigate to="/service/mba-admission" replace />} />
          <Route path="/pgdm-admission" element={<Navigate to="/service/pgdm-admission" replace />} />
          <Route path="/mba-without-cat" element={<Navigate to="/service/mba-without-cat" replace />} />
          <Route path="/direct-mba-admission" element={<Navigate to="/service/direct-mba-admission" replace />} />
          <Route path="/executive-mba" element={<Navigate to="/service/executive-mba" replace />} />
          <Route path="/distance-online-mba" element={<Navigate to="/service/distance-online-mba" replace />} />
          <Route path="/mba-marketing" element={<Navigate to="/specialization/mba-marketing" replace />} />
          <Route path="/mba-finance" element={<Navigate to="/specialization/mba-finance" replace />} />
          <Route path="/mba-hr" element={<Navigate to="/specialization/mba-hr" replace />} />
          <Route path="/mba-business-analytics" element={<Navigate to="/specialization/mba-business-analytics" replace />} />
          <Route path="/mba-operations" element={<Navigate to="/specialization/mba-operations" replace />} />
          <Route path="/mba-digital-marketing" element={<Navigate to="/specialization/mba-digital-marketing" replace />} />
          <Route path="/mba-international-business" element={<Navigate to="/specialization/mba-international-business" replace />} />
          {/* Legal pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/blogs/create" element={<AdminBlogForm />} />
          <Route path="/admin/blogs/edit/:id" element={<AdminBlogForm />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="*" element={<Home />} />
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
