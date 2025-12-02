import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { RegistrationSuccessPage } from '../pages/RegistrationSuccessPage';
import { VerifyAccountPage } from '../pages/VerifyAccountPage';
import { VerificationSuccessPage } from '../pages/VerificationSuccessPage';
import { MfaVerifyPage } from '../pages/MfaVerifyPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';
import { CoursePage } from '../pages/CoursePage';
import { LessonPage } from '../pages/LessonPage';
import { LessonDeckPage } from '../pages/LessonDeckPage';
import { LessonGrammarPage } from '../pages/LessonGrammarPage';
import { LessonCtestPage } from '../pages/LessonCtestPage';
import { AdminLessonsPage } from '../pages/AdminLessonsPage';
import { AdminLessonDetailPage } from '../pages/AdminLessonDetailPage';
import { AdminLessonDeckPage } from '../pages/AdminLessonDeckPage';
import { ReadingExercisePage } from '../pages/ReadingExercisePage';
import { ReadingResultsPage } from '../pages/ReadingResultsPage';
import { AdminReadingsPage } from '../pages/AdminReadingsPage';
import { AdminReadingFormPage } from '../pages/AdminReadingFormPage';
import { GrammarResultsPage } from '../pages/GrammarResultsPage';
import { AdminGrammarQuestionsPage } from '../pages/AdminGrammarQuestionsPage';
import { AdminGrammarQuestionFormPage } from '../pages/AdminGrammarQuestionFormPage';
import { CtestResultsPage } from '../pages/CtestResultsPage';
import { AdminCtestPage } from '../pages/AdminCtestPage';
import { LandingPage } from '../pages/LandingPage';
import { DeckResultsPage } from '../pages/DeckResultsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { StudienkollegDetailPage } from '../pages/StudienkollegDetailPage';
import { UpgradeToStudentPage } from '../pages/UpgradeToStudentPage';
import { PaymentSuccessPage } from '../pages/PaymentSuccessPage';
import { PaymentCancelPage } from '../pages/PaymentCancelPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registration-success" element={<RegistrationSuccessPage />} />
      {/* Email verification links: support both /verify/account (email) and /verify-account (internal) */}
      <Route path="/verify/account" element={<VerifyAccountPage />} />
      <Route path="/verify-account" element={<VerifyAccountPage />} />
      <Route path="/verification-success" element={<VerificationSuccessPage />} />
      <Route path="/mfa" element={<MfaVerifyPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
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

      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route path="/" element={<LandingPage />} />
      <Route path="/studienkolleg/:id" element={<StudienkollegDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
