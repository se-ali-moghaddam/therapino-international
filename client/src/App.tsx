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
import UserJourneyPage from './pages/UserJourneyPage';

// Therapist Dashboard Pages
import TherapistOverviewPage from './pages/therapist/TherapistOverviewPage';
import TherapistPatientsPage from './pages/therapist/TherapistPatientsPage';
import TherapistPatientProfilePage from './pages/therapist/TherapistPatientProfilePage';
import TherapistTimelinePage from './pages/therapist/TherapistTimelinePage';
import TherapistInsightsPage from './pages/therapist/TherapistInsightsPage';
import TherapistRiskPage from './pages/therapist/TherapistRiskPage';
import TherapistNotesPage from './pages/therapist/TherapistNotesPage';
import TherapistAssignmentsPage from './pages/therapist/TherapistAssignmentsPage';
import TherapistReportsPage from './pages/therapist/TherapistReportsPage';

// RTT Practitioner Dashboard Pages
import RTTOverviewPage from './pages/rtt/RTTOverviewPage';
import RTTClientsPage from './pages/rtt/RTTClientsPage';
import RTTBeliefsExplorerPage from './pages/rtt/RTTBeliefsExplorerPage';
import RTTemotionsPage from './pages/rtt/RTTemotionsPage';
import RTTChildhoodPage from './pages/rtt/RTTChildhoodPage';
import RTTSessionPrepPage from './pages/rtt/RTTSessionPrepPage';
import RTTPostSessionPage from './pages/rtt/RTTPostSessionPage';
import RTTAudioPage from './pages/rtt/RTTAudioPage';
import RTTProgressPage from './pages/rtt/RTTProgressPage';
import RTTReportsPage from './pages/rtt/RTTReportsPage';

// RTT Network Dashboard Pages
import NetworkOverviewPage from './pages/network/NetworkOverviewPage';
import NetworkCountriesPage from './pages/network/NetworkCountriesPage';
import NetworkOutcomesPage from './pages/network/NetworkOutcomesPage';
import NetworkAnalyticsPage from './pages/network/NetworkAnalyticsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<PrivacyPage />} />
        <Route path="/journey" element={<UserJourneyPage />} />

        {/* User Routes */}
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

        {/* Therapist Dashboard Routes */}
        <Route path="/therapist" element={<TherapistOverviewPage />} />
        <Route path="/therapist/patients" element={<TherapistPatientsPage />} />
        <Route path="/therapist/patients/:patientId" element={<TherapistPatientProfilePage />} />
        <Route path="/therapist/timeline" element={<TherapistTimelinePage />} />
        <Route path="/therapist/insights" element={<TherapistInsightsPage />} />
        <Route path="/therapist/risk" element={<TherapistRiskPage />} />
        <Route path="/therapist/notes" element={<TherapistNotesPage />} />
        <Route path="/therapist/assignments" element={<TherapistAssignmentsPage />} />
        <Route path="/therapist/reports" element={<TherapistReportsPage />} />

        {/* RTT Practitioner Dashboard Routes */}
        <Route path="/rtt" element={<RTTOverviewPage />} />
        <Route path="/rtt/clients" element={<RTTClientsPage />} />
        <Route path="/rtt/beliefs" element={<RTTBeliefsExplorerPage />} />
        <Route path="/rtt/emotions" element={<RTTemotionsPage />} />
        <Route path="/rtt/childhood" element={<RTTChildhoodPage />} />
        <Route path="/rtt/session-prep" element={<RTTSessionPrepPage />} />
        <Route path="/rtt/post-session" element={<RTTPostSessionPage />} />
        <Route path="/rtt/audio" element={<RTTAudioPage />} />
        <Route path="/rtt/progress" element={<RTTProgressPage />} />
        <Route path="/rtt/reports" element={<RTTReportsPage />} />

        {/* RTT Network Dashboard Routes */}
        <Route path="/network" element={<NetworkOverviewPage />} />
        <Route path="/network/countries" element={<NetworkCountriesPage />} />
        <Route path="/network/outcomes" element={<NetworkOutcomesPage />} />
        <Route path="/network/analytics" element={<NetworkAnalyticsPage />} />

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
