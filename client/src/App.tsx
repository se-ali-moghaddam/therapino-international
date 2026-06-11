import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import PrivacyPage from './pages/PrivacyPage';
import OnboardingWizard from './components/onboarding/OnboardingWizard';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import PsychologistsPage from './pages/PsychologistsPage';
import PsychologistProfilePage from './pages/PsychologistProfilePage';
import ResourcesPage from './pages/ResourcesPage';
import ProgressPage from './pages/ProgressPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import VideoSessionPage from './pages/VideoSessionPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<PrivacyPage />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/psychologists/:id" element={<PsychologistProfilePage />} />
        <Route path="/session/:id" element={<VideoSessionPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfilePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
