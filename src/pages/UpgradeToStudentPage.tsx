import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { DashboardLayout } from "../components/dashboard";
import {
  paymentService,
  type StudentUpgradePrice,
} from "../services/paymentService";
import { toastService } from "../services/toastService";
import { Ui, Icon } from "../lib/icons";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export function UpgradeToStudentPage() {
  const { t } = useTranslation("upgrade");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<StudentUpgradePrice | null>(null);

  useEffect(() => {
    paymentService
      .getStudentUpgradePrice()
      .then((res) => setPrice(res.price))
      .catch(() => setPrice(null));
  }, []);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await paymentService.createStudentUpgradeSession();
      window.location.href = response.session.url;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t('common:toast.checkoutFailed');
      toastService.error(message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pricing Card */}
        <div
          style={{ width: "100%", maxWidth: "420px" }}
          className="bg-surface rounded-[24px] shadow-card"
        >
          {/* Header */}
          <div className="p-8 pb-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("pricing.plan")}
              </span>
              <span className="px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                {t("pricing.badge")}
              </span>
            </div>

            {/* Price — sourced from the Dodo product (single source of truth) */}
            <div className="flex items-baseline gap-1 mb-2">
              {price ? (
                <>
                  <span className="text-[64px] font-serif font-bold leading-none tracking-tight">
                    {CURRENCY_SYMBOLS[price.currency] ?? `${price.currency} `}
                    {Math.floor(price.amountCents / 100)}
                  </span>
                  <span className="text-2xl text-text-muted font-serif">
                    .{String(price.amountCents % 100).padStart(2, "0")}
                  </span>
                </>
              ) : (
                <span className="inline-block h-[56px] w-28 rounded-lg bg-border/40 animate-pulse" />
              )}
            </div>

            <p className="text-text-muted text-sm mb-6">{t("pricing.terms")}</p>
          </div>

          {/* Divider */}
          <div className="mx-8 h-px bg-border" />

          {/* Features */}
          <div className="p-8 pt-6 space-y-4">
            <FeatureItem text={t("features.lessons.title")} />
            <FeatureItem text={t("features.activities.title")} />
            <FeatureItem text={t("features.lifetime.title")} />
            <FeatureItem text={t("features.devices.title")} />
          </div>

          {/* CTA */}
          <div className="p-8 pt-0">
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-4 px-6 bg-text-main text-white rounded-2xl font-semibold text-[15px] hover:bg-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(166,123,91,0.25)] flex items-center justify-center gap-2"
            >
              {loading ? (
                t("cta.processing")
              ) : (
                <>
                  {t("cta.button")}
                  <Ui.ArrowRight size={18} stroke={2.5} />
                </>
              )}
            </button>
          </div>

          {/* Trust badge */}
          <div className="px-8 pb-6 flex items-center justify-center gap-2 text-xs text-text-muted">
            <Ui.Lock className="w-4 h-4" />
            {t("trust.provider")}
          </div>
        </div>

        {/* Activation Code Section */}
        <div className="mt-8 w-full max-w-[420px]">
          <ActivationCodeSection />
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            to="/course"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-colors text-sm"
          >
            <Ui.ArrowLeft size={16} />
            {t("backToCourse")}
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ActivationCodeSection() {
  const { t } = useTranslation("upgrade");
  const [expanded, setExpanded] = useState(false);
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);

  const a = t("activationCode", { returnObjects: true }) as Record<string, string>;

  const handleRedeem = async () => {
    const trimmed = code.trim();
    if (!trimmed) {
      toastService.error(a.emptyError);
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
      toastService.error(a.formatError);
      return;
    }

    setRedeeming(true);
    try {
      await paymentService.redeemActivationCode(trimmed);
      toastService.success(a.success, { duration: 5000 });
      setCode("");
      setExpanded(false);
      window.location.href = "/course";
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to redeem code";
      toastService.error(message);
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <div className="bg-surface rounded-[24px] shadow-card border border-border/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between gap-3 hover:bg-highlight/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon.News className="w-4 h-4 text-primary" stroke={2} />
          </div>
          <div>
            <span className="text-sm font-semibold text-text-main">{a.title}</span>
            <p className="text-xs text-text-muted mt-0.5">{a.subtitle}</p>
          </div>
        </div>
        {expanded ? <Ui.ChevronUp size={18} className="text-text-muted shrink-0" /> : <Ui.ChevronDown size={18} className="text-text-muted shrink-0" />}
      </button>

      {expanded && (
        <div className="px-6 pb-5 pt-1 border-t border-border/40">
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleRedeem(); }}
              placeholder={a.placeholder}
              maxLength={100}
              disabled={redeeming}
              className="flex-1 rounded-lg border border-border-soft bg-surface px-4 py-2.5 text-[14px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleRedeem}
              disabled={redeeming || !code.trim()}
              className="px-5 py-2.5 bg-primary text-white rounded-lg text-[14px] font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              {redeeming ? a.redeeming : a.button}
            </button>
          </div>
          <p className="mt-2 text-xs text-text-muted">{a.hint}</p>
        </div>
      )}
    </div>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center `shrink-0">
        <Ui.Check size={12} stroke={3} className="text-success" />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}
