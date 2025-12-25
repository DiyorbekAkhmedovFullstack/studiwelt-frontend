import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'react-hot-toast';
import { toastService } from '../toastService';

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  }),
}));

describe('toastService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('show', () => {
    it('should call toast with message and default options', () => {
      toastService.show('Test message');

      expect(toast).toHaveBeenCalledWith('Test message', {
        duration: 4000,
        position: 'top-right',
      });
    });

    it('should merge custom options with defaults', () => {
      toastService.show('Test message', { duration: 5000 });

      expect(toast).toHaveBeenCalledWith('Test message', {
        duration: 5000,
        position: 'top-right',
      });
    });
  });

  describe('success', () => {
    it('should call toast.success with message and default options', () => {
      toastService.success('Success message');

      expect(toast.success).toHaveBeenCalledWith('Success message', {
        duration: 4000,
        position: 'top-right',
      });
    });

    it('should merge custom options with defaults', () => {
      toastService.success('Success message', { position: 'bottom-center' });

      expect(toast.success).toHaveBeenCalledWith('Success message', {
        duration: 4000,
        position: 'bottom-center',
      });
    });
  });

  describe('error', () => {
    it('should call toast.error with message and default options', () => {
      toastService.error('Error message');

      expect(toast.error).toHaveBeenCalledWith('Error message', {
        duration: 4000,
        position: 'top-right',
      });
    });
  });

  describe('info', () => {
    it('should call toast with message and default options', () => {
      toastService.info('Info message');

      expect(toast).toHaveBeenCalledWith('Info message', {
        duration: 4000,
        position: 'top-right',
      });
    });
  });

  describe('warning', () => {
    it('should call toast with message and default options', () => {
      toastService.warning('Warning message');

      expect(toast).toHaveBeenCalledWith('Warning message', {
        duration: 4000,
        position: 'top-right',
      });
    });
  });

  describe('loading', () => {
    it('should call toast.loading with message and default options', () => {
      toastService.loading('Loading...');

      expect(toast.loading).toHaveBeenCalledWith('Loading...', {
        duration: 4000,
        position: 'top-right',
      });
    });
  });

  describe('dismiss', () => {
    it('should call toast.dismiss without argument', () => {
      toastService.dismiss();

      expect(toast.dismiss).toHaveBeenCalledWith(undefined);
    });

    it('should call toast.dismiss with toast ID', () => {
      toastService.dismiss('toast-123');

      expect(toast.dismiss).toHaveBeenCalledWith('toast-123');
    });
  });
});
