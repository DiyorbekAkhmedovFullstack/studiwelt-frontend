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

export type StudentUpgradePrice = {
  amountCents: number;
  currency: string;
};

export type StudentUpgradePriceResponse = {
  price: StudentUpgradePrice;
};

export type ActivationCode = {
  id: number;
  code: string;
  createdAt: string;
  usedByUserId: number | null;
  usedAt: string | null;
};

export const paymentService = {
  getStudentUpgradePrice: () =>
    api.get<StudentUpgradePriceResponse>('/api/payments/student-upgrade-price'),

  createStudentUpgradeSession: () =>
    api.post<CheckoutSessionResponse>('/api/payments/create-student-upgrade-session', {}),

  getMyPayments: () =>
    api.get<PaymentsResponse>('/api/payments/my-payments'),

  hasStudentAccess: () =>
    api.get<HasStudentAccessResponse>('/api/payments/has-student-access'),

  // Activation codes
  redeemActivationCode: (code: string) =>
    api.post<{ hasPaid: boolean }>('/api/payments/redeem-activation-code', { code }),

  getActivationCodes: () =>
    api.get<{ codes: ActivationCode[] }>('/api/admin/activation-codes'),

  addActivationCode: (code: string) =>
    api.post<{ code: ActivationCode }>('/api/admin/activation-codes', { code }),

  deleteActivationCode: (id: number) =>
    api.delete<never>(`/api/admin/activation-codes/${id}`),
};
