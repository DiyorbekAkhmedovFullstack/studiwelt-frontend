import { api } from './api';

export type CheckoutSessionResponse = {
  session: {
    sessionId: string;
    url: string;
  };
};

export type Payment = {
  id: number;
  userId: number;
  providerSessionId: string;
  status: string;
  amount: number;
  currency: string;
  productType: string;
  createdAt: string;
  completedAt: string | null;
};

export type PaymentsResponse = {
  payments: Payment[];
};

export type HasStudentAccessResponse = {
  hasPaid: boolean;
};

export const paymentService = {
  createStudentUpgradeSession: () =>
    api.post<CheckoutSessionResponse>('/api/payments/create-student-upgrade-session', {}),

  getMyPayments: () =>
    api.get<PaymentsResponse>('/api/payments/my-payments'),

  hasStudentAccess: () =>
    api.get<HasStudentAccessResponse>('/api/payments/has-student-access'),
};
