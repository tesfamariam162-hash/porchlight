import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AuthProvider } from './hooks/useAuth';
import { AdminApartmentsPage } from './pages/admin/AdminApartmentsPage';
import { AdminApartmentDetailPage } from './pages/admin/AdminApartmentDetailPage';
import { AddApartmentPage } from './pages/admin/AddApartmentPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminInquiriesPage } from './pages/admin/AdminInquiriesPage';
import { InquiryDetailPage } from './pages/admin/InquiryDetailPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AddCustomerPage } from './pages/admin/AddCustomerPage';
import { CustomerDetailPage } from './pages/admin/CustomerDetailPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { BedroomListingPage } from './pages/public/BedroomListingPage';
import { TourPage } from './pages/public/TourPage';
import { AboutPage } from './pages/public/AboutPage';
import { ApartmentDetailPage } from './pages/public/ApartmentDetailPage';
import { ApartmentsPage } from './pages/public/ApartmentsPage';
import { ContactPage } from './pages/public/ContactPage';
import { HomePage } from './pages/public/HomePage';
import { PrivacyPage, TermsPage } from './pages/public/LegalPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="apartments" element={<ApartmentsPage />} />
            <Route path="apartments/2-bedroom" element={<BedroomListingPage />} />
            <Route path="apartments/3-bedroom" element={<BedroomListingPage />} />
            <Route path="apartments/:id" element={<ApartmentDetailPage />} />

            <Route path="contact" element={<ContactPage />} />
            <Route path="tour" element={<TourPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="apartments" element={<AdminApartmentsPage />} />
            <Route path="apartments/new" element={<AddApartmentPage />} />
            <Route path="apartments/:id" element={<AdminApartmentDetailPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="customers/new" element={<AddCustomerPage />} />
            <Route path="customers/:id" element={<CustomerDetailPage />} />
            <Route path="inquiries" element={<AdminInquiriesPage />} />
            <Route path="inquiries/:id" element={<InquiryDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
