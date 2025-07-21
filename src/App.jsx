import { Suspense, lazy, useRef } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { ToastProvider } from '@components/ToastProvider';
import ServerHealthChecker from '@components/ServerHealthChecker';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import BackToTop from '@components/BackToTop';
import Property from '@components/Property';
import { NoHeadFootRoutes, NoPropertyRoutes } from '@utils/Constants';
import AuthGuard from '@utils/AuthGuard';
import "./firebaseConfig";
import Loader from '@components/Loader'

const HeroSection = lazy(() => import('@pages/HeroSection'));
const SignUp = lazy(() => import('@pages/Signup'));
const LogIn = lazy(() => import('@pages/Login'));
const ForgotPassword = lazy(() => import('@pages/ForgotPassword'));
const IndividualPGDetails = lazy(() => import('@pages/IndividualPGDetails'));
const ContactUs = lazy(() => import('@pages/ContactUs'));
const AboutUs = lazy(() => import('@pages/AboutUs'));
const OurTeam = lazy(() => import('@pages/OurTeam'));
const UserPostProperty = lazy(() => import('@pages/UserPostProperty'));
const Favourites = lazy(() => import('@pages/Favourites'));
const MyListings = lazy(() => import('@pages/MyListings'));
const HelpCenter = lazy(() => import('@pages/HelpCenter'));
const CareersPage = lazy(() => import('@pages/CareersPage'));
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'));
const AdminPostProperty = lazy(() => import('@pages/AdminPages/AdminPostProperty'));
const AdminDashboard = lazy(() => import('@pages/AdminPages/AdminDashboard'));
const AdminLogin = lazy(() => import('@pages/AdminPages/AdminLogin'));
const VerifiedProperties = lazy(() => import('@pages/AdminPages/VerifiedProperties'));
const PostedProperties = lazy(() => import('@pages/AdminPages/PostedProperties'));
const UserRequests = lazy(() => import('@pages/AdminPages/UserRequests'));
const SavedProperties = lazy(() => import('@pages/AdminPages/SavedProperties'));

const App = () => {
  const location = useLocation();
  const searchInputRef = useRef(null);
  return (
    <ToastProvider>
      <ServerHealthChecker />
      {!NoHeadFootRoutes.includes(location.pathname) && (<Navbar />)}
      <div className="relative">
        <BackToTop />
        <div className="max-w-8xl mx-auto p-0">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HeroSection />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/team" element={<OurTeam />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/careers" element={<CareersPage />} />

              <Route path="/postproperty" element={<AuthGuard><UserPostProperty /></AuthGuard>} />
              <Route path="/favourites" element={<AuthGuard><Favourites /></AuthGuard>} />
              <Route path="/mylistings" element={<AuthGuard requiredRole="1" ><MyListings /></AuthGuard>} />
              <Route path="/property/:id" element={<AuthGuard><IndividualPGDetails /></AuthGuard>} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AuthGuard requiredRole="2"><AdminDashboard /></AuthGuard>} />
              <Route path="/admin/postedproperties" element={<AuthGuard requiredRole="2"><PostedProperties /></AuthGuard>} />
              <Route path="/admin/verifiedproperties" element={<AuthGuard requiredRole="2"><VerifiedProperties /></AuthGuard>} />
              <Route path="/admin/savedproperties" element={<AuthGuard requiredRole="2"><SavedProperties /></AuthGuard>} />
              <Route path="/admin/postproperty" element={<AuthGuard requiredRole="2"><AdminPostProperty isEditMode={false} /></AuthGuard>} />
              <Route path="/admin/editproperty/:id" element={<AuthGuard requiredRole="2"><AdminPostProperty isEditMode={true} /></AuthGuard>} />
              <Route path="/admin/userrequests" element={<AuthGuard requiredRole="2"><UserRequests /></AuthGuard>} />
            </Routes>
          </Suspense>
        </div>
      </div>
      {NoPropertyRoutes(location.pathname) && (
        <Property searchInputRef={searchInputRef} />
      )}
      {!NoHeadFootRoutes.includes(location.pathname) && <Footer />}
    </ToastProvider>
  );
};

export default App;