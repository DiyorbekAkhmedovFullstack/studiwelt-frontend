import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { PublicLayout } from '../components/common/PublicLayout';

// Critical pages - load immediately (above the fold)
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-page">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="mt-4 text-text-muted">Loading...</p>
    </div>
  </div>
);

// Lazy load all other pages (code splitting)
const RegistrationSuccessPage = lazy(() => import('../pages/RegistrationSuccessPage').then(m => ({ default: m.RegistrationSuccessPage })));
const VerifyAccountPage = lazy(() => import('../pages/VerifyAccountPage').then(m => ({ default: m.VerifyAccountPage })));
const VerifyEmailPage = lazy(() => import('../pages/VerifyEmailPage').then(m => ({ default: m.VerifyEmailPage })));
const VerificationSuccessPage = lazy(() => import('../pages/VerificationSuccessPage').then(m => ({ default: m.VerificationSuccessPage })));
const AlreadyVerifiedPage = lazy(() => import('../pages/AlreadyVerifiedPage').then(m => ({ default: m.AlreadyVerifiedPage })));
const MfaVerifyPage = lazy(() => import('../pages/MfaVerifyPage').then(m => ({ default: m.MfaVerifyPage })));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('../pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const UnauthorizedPage = lazy(() => import('../pages/UnauthorizedPage').then(m => ({ default: m.UnauthorizedPage })));
const CoursePage = lazy(() => import('../pages/CoursePage').then(m => ({ default: m.CoursePage })));
const LessonPage = lazy(() => import('../pages/LessonPage').then(m => ({ default: m.LessonPage })));
const LessonDeckPage = lazy(() => import('../pages/LessonDeckPage').then(m => ({ default: m.LessonDeckPage })));
const LessonGrammarPage = lazy(() => import('../pages/LessonGrammarPage').then(m => ({ default: m.LessonGrammarPage })));
const LessonCtestPage = lazy(() => import('../pages/LessonCtestPage').then(m => ({ default: m.LessonCtestPage })));
const AdminLessonsPage = lazy(() => import('../pages/AdminLessonsPage').then(m => ({ default: m.AdminLessonsPage })));
const AdminLessonDetailPage = lazy(() => import('../pages/AdminLessonDetailPage').then(m => ({ default: m.AdminLessonDetailPage })));
const AdminLessonDeckPage = lazy(() => import('../pages/AdminLessonDeckPage').then(m => ({ default: m.AdminLessonDeckPage })));
const ReadingExercisePage = lazy(() => import('../pages/ReadingExercisePage').then(m => ({ default: m.ReadingExercisePage })));
const ReadingResultsPage = lazy(() => import('../pages/ReadingResultsPage').then(m => ({ default: m.ReadingResultsPage })));
const AdminReadingsPage = lazy(() => import('../pages/AdminReadingsPage').then(m => ({ default: m.AdminReadingsPage })));
const AdminReadingFormPage = lazy(() => import('../pages/AdminReadingFormPage').then(m => ({ default: m.AdminReadingFormPage })));
const GrammarResultsPage = lazy(() => import('../pages/GrammarResultsPage').then(m => ({ default: m.GrammarResultsPage })));
const AdminGrammarQuestionsPage = lazy(() => import('../pages/AdminGrammarQuestionsPage').then(m => ({ default: m.AdminGrammarQuestionsPage })));
const AdminGrammarQuestionFormPage = lazy(() => import('../pages/AdminGrammarQuestionFormPage').then(m => ({ default: m.AdminGrammarQuestionFormPage })));
const CtestResultsPage = lazy(() => import('../pages/CtestResultsPage').then(m => ({ default: m.CtestResultsPage })));
const AdminCtestPage = lazy(() => import('../pages/AdminCtestPage').then(m => ({ default: m.AdminCtestPage })));
const AdminActivationCodesPage = lazy(() => import('../pages/AdminActivationCodesPage').then(m => ({ default: m.AdminActivationCodesPage })));
const DeckResultsPage = lazy(() => import('../pages/DeckResultsPage').then(m => ({ default: m.DeckResultsPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const StudienkollegDetailPage = lazy(() => import('../pages/StudienkollegDetailPage').then(m => ({ default: m.StudienkollegDetailPage })));
const AboutStudienkollegPage = lazy(() => import('../pages/AboutStudienkollegPage').then(m => ({ default: m.AboutStudienkollegPage })));
const ApplicationPage = lazy(() => import('../pages/ApplicationPage').then(m => ({ default: m.ApplicationPage })));
const UpgradeToStudentPage = lazy(() => import('../pages/UpgradeToStudentPage').then(m => ({ default: m.UpgradeToStudentPage })));
const PaymentSuccessPage = lazy(() => import('../pages/PaymentSuccessPage').then(m => ({ default: m.PaymentSuccessPage })));
const PaymentCancelPage = lazy(() => import('../pages/PaymentCancelPage').then(m => ({ default: m.PaymentCancelPage })));
const EntranceExamPage = lazy(() => import('../pages/EntranceExamPage').then(m => ({ default: m.EntranceExamPage })));
const FSPPage = lazy(() => import('../pages/FSPPage').then(m => ({ default: m.FSPPage })));
const StatePage = lazy(() => import('../pages/StatePage').then(m => ({ default: m.StatePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<GuestRoute element={<LoginPage />} />} />
        <Route path="/register" element={<GuestRoute element={<RegisterPage />} />} />
        <Route path="/registration-success" element={<RegistrationSuccessPage />} />
        {/* Email verification links: support both /verify/account (email) and /verify-account (internal) */}
        <Route path="/verify/account" element={<VerifyAccountPage />} />
        <Route path="/verify-account" element={<VerifyAccountPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/verification-success" element={<VerificationSuccessPage />} />
        <Route path="/already-verified" element={<AlreadyVerifiedPage />} />
        <Route path="/mfa" element={<MfaVerifyPage />} />
        <Route path="/forgot-password" element={<GuestRoute element={<ForgotPasswordPage />} />} />
        {/* Password reset links: support both /verify/password (email) and /reset-password (internal) */}
        <Route path="/verify/password" element={<ResetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/course"
          element={<ProtectedRoute element={<CoursePage />} />}
        />

        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />

        <Route
          path="/upgrade"
          element={<ProtectedRoute element={<UpgradeToStudentPage />} />}
        />

        <Route
          path="/payment/success"
          element={<ProtectedRoute element={<PaymentSuccessPage />} />}
        />

        <Route
          path="/payment/cancel"
          element={<ProtectedRoute element={<PaymentCancelPage />} />}
        />

        <Route
          path="/course/:lessonNumber"
          element={<ProtectedRoute element={<LessonPage />} />}
        />
        <Route
          path="/course/:lessonNumber/deck"
          element={<ProtectedRoute element={<LessonDeckPage />} />}
        />
        <Route
          path="/course/:lessonNumber/deck/results"
          element={<ProtectedRoute element={<DeckResultsPage />} />}
        />

        <Route
          path="/course/:lessonNumber/reading/:readingId"
          element={<ProtectedRoute element={<ReadingExercisePage />} />}
        />
        <Route
          path="/course/:lessonNumber/reading/:readingId/results"
          element={<ProtectedRoute element={<ReadingResultsPage />} />}
        />

        <Route
          path="/course/:lessonNumber/grammar"
          element={<ProtectedRoute element={<LessonGrammarPage />} />}
        />
        <Route
          path="/course/:lessonNumber/grammar/results"
          element={<ProtectedRoute element={<GrammarResultsPage />} />}
        />

        <Route
          path="/course/:lessonNumber/ctest"
          element={<ProtectedRoute element={<LessonCtestPage />} />}
        />
        <Route
          path="/course/:lessonNumber/ctest/results"
          element={<ProtectedRoute element={<CtestResultsPage />} />}
        />

        <Route
          path="/admin/lessons"
          element={
            <ProtectedRoute requiredRole="ADMIN" element={<AdminLessonsPage />} />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminLessonDetailPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/deck"
          element={
            <ProtectedRoute requiredRole="ADMIN" element={<AdminLessonDeckPage />} />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/readings"
          element={
            <ProtectedRoute requiredRole="ADMIN" element={<AdminReadingsPage />} />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/readings/new"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminReadingFormPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/readings/:readingId/edit"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminReadingFormPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/grammar"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminGrammarQuestionsPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/grammar/questions/new"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminGrammarQuestionFormPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/grammar/questions/:questionId/edit"
          element={
            <ProtectedRoute
              requiredRole="ADMIN"
              element={<AdminGrammarQuestionFormPage />}
            />
          }
        />

        <Route
          path="/admin/lessons/:lessonNumber/ctest"
          element={
            <ProtectedRoute requiredRole="ADMIN" element={<AdminCtestPage />} />
          }
        />

        <Route
          path="/admin/activation-codes"
          element={
            <ProtectedRoute requiredRole="ADMIN" element={<AdminActivationCodesPage />} />
          }
        />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Public marketing pages */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-studienkolleg" element={<AboutStudienkollegPage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/entrance-exam" element={<EntranceExamPage />} />
          <Route path="/fsp" element={<FSPPage />} />
          <Route path="/studienkolleg/:id" element={<StudienkollegDetailPage />} />
          <Route path="/state/:stateId" element={<StatePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
