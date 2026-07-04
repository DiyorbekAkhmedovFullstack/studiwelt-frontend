import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { toastService } from "../services/toastService";
import { DashboardLayout } from "../components/dashboard";
import {
  paymentService,
  type ActivationCode,
} from "../services/paymentService";
import { Ui, Icon } from "../lib/icons";

export function AdminActivationCodesPage() {
  const { t } = useTranslation();
  const [codes, setCodes] = useState<ActivationCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);

  const loadCodes = async () => {
    setLoading(true);
    try {
      const response = await paymentService.getActivationCodes();
      setCodes(response.codes);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load codes";
      toastService.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCodes();
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newCode.trim();
    if (!trimmed) {
      toastService.error("Code must not be empty");
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
      toastService.error("Code must contain only letters and numbers");
      return;
    }

    setAdding(true);
    try {
      await paymentService.addActivationCode(trimmed);
      toastService.success("Activation code created");
      setNewCode("");
      setShowAddForm(false);
      await loadCodes();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create code";
      toastService.error(message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number, code: string) => {
    if (!window.confirm(`Delete code "${code}"? This cannot be undone.`)) {
      return;
    }
    setDeleting(id);
    try {
      await paymentService.deleteActivationCode(id);
      toastService.success("Code deleted");
      await loadCodes();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete code";
      toastService.error(message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-text-muted mb-2">
              Admin
            </p>
            <h1 className="text-[2rem] font-serif font-bold text-text-main">
              Activation Codes
            </h1>
            <p className="mt-2 text-[15px] text-text-muted leading-relaxed">
              Manage activation codes that grant free Student access. Codes are case-sensitive and one-time use.
            </p>
          </div>
          {!showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-[14px] font-semibold text-white hover:bg-primary-hover transition-colors shrink-0"
            >
              <Ui.Plus size={16} stroke={2.5} />
              Add Code
            </button>
          )}
        </header>

        {/* Add Code Form */}
        {showAddForm && (
          <section className="rounded-[24px] bg-surface p-6 shadow-card border border-border/40">
            <h2 className="text-[1.1rem] font-serif font-bold text-text-main mb-2">
              New Activation Code
            </h2>
            <p className="text-[14px] text-text-muted mb-4">
              The code can contain letters and numbers only. It will be created as unused and ready to redeem.
            </p>
            <form onSubmit={handleAdd} className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g. STUDENT2026"
                  maxLength={100}
                  disabled={adding}
                  autoFocus
                  className="w-full rounded-lg border border-border-soft px-4 py-2.5 text-[15px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={adding || !newCode.trim()}
                className="rounded-lg bg-primary px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {adding ? "Creating..." : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewCode("");
                }}
                disabled={adding}
                className="rounded-lg border border-border-soft px-5 py-2.5 text-[14px] font-semibold text-text-main hover:bg-highlight disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
            </form>
          </section>
        )}

        {/* Codes List */}
        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner />
          </div>
        ) : codes.length === 0 ? (
          <section className="rounded-[24px] bg-surface p-12 shadow-card border border-border/40 text-center">
            <div className="w-16 h-16 rounded-full bg-highlight flex items-center justify-center mx-auto mb-4">
              <Icon.News className="w-7 h-7 text-text-muted" stroke={1.5} />
            </div>
            <h2 className="text-[1.2rem] font-serif font-bold text-text-main mb-2">
              No codes yet
            </h2>
            <p className="text-[14px] text-text-muted max-w-[400px] mx-auto">
              Create your first activation code to give users free Student access. Codes are one-time use and will be deleted after successful redemption.
            </p>
          </section>
        ) : (
          <section className="bg-surface rounded-[24px] shadow-card border border-border/40 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-text-muted">
                      Code
                    </th>
                    <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-text-muted">
                      Created
                    </th>
                    <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-text-muted">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-text-muted">
                      Used At
                    </th>
                    <th className="px-6 py-4 text-[13px] font-semibold uppercase tracking-wider text-text-muted text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {codes.map((code) => {
                    const isUsed = code.usedByUserId !== null;
                    return (
                      <tr
                        key={code.id}
                        className="border-b border-border/20 last:border-0 hover:bg-highlight/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-[14px] font-semibold text-text-main">
                            {code.code}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[14px] text-text-muted whitespace-nowrap">
                          {new Date(code.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {isUsed ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-danger/10 px-3 py-1 text-[12px] font-semibold text-danger">
                              <Ui.Close size={12} />
                              Used
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[12px] font-semibold text-success">
                              <Ui.Check size={12} />
                              Available
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-[14px] text-text-muted whitespace-nowrap">
                          {isUsed && code.usedAt
                            ? new Date(code.usedAt).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {!isUsed && (
                            <button
                              type="button"
                              onClick={() => handleDelete(code.id, code.code)}
                              disabled={deleting === code.id}
                              className="rounded-lg border border-border-soft px-3 py-1.5 text-[13px] font-medium text-danger hover:bg-danger/5 disabled:opacity-50 transition-colors"
                            >
                              {deleting === code.id ? "Deleting..." : "Delete"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
