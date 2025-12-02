import { toast, type ToastOptions } from 'react-hot-toast';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

const defaultOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
};

function show(message: string, options?: ToastOptions) {
  return toast(message, { ...defaultOptions, ...options });
}

function success(message: string, options?: ToastOptions) {
  return toast.success(message, { ...defaultOptions, ...options });
}

function error(message: string, options?: ToastOptions) {
  return toast.error(message, { ...defaultOptions, ...options });
}

function info(message: string, options?: ToastOptions) {
  return toast(message, { ...defaultOptions, ...options });
}

function warning(message: string, options?: ToastOptions) {
  return toast(message, {
    ...defaultOptions,
    ...options,
  });
}

function loading(message: string, options?: ToastOptions) {
  return toast.loading(message, { ...defaultOptions, ...options });
}

function dismiss(toastId?: string) {
  toast.dismiss(toastId);
}

export const toastService = {
  show,
  success,
  error,
  info,
  warning,
  loading,
  dismiss,
};

export { toast };

