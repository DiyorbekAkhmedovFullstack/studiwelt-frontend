import { useState } from 'react';
import type { ReactNode } from 'react';

type TenseTab = {
  id: string;
  label: string;
  formula: string;
  description: ReactNode;
  example: ReactNode;
  extraInfo?: ReactNode;
};

type TabbedTensesProps = {
  tabs: TenseTab[];
  defaultTab?: string;
};

/**
 * Tabbed interface for displaying different tense forms
 * with formulas, descriptions, and examples
 */
export function TabbedTenses({ tabs, defaultTab }: TabbedTensesProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-200
              ${
                activeTab === tab.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-transparent text-text-muted border border-[#E3D4C5] hover:border-primary'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeContent && (
        <div className="animate-[fadeIn_0.4s_ease-in-out]">
          {/* Formula */}
          <code className="text-sm block font-mono bg-[#F4F4F4] px-3 py-3 rounded-lg border-l-4 border-[#6B8C6E] mb-4">
            {activeContent.formula}
          </code>

          {/* Description */}
          <p className="text-base mb-3 leading-relaxed">{activeContent.description}</p>

          {/* Example */}
          <p className="text-base italic font-serif mb-4">
            {activeContent.example}
          </p>

          {/* Extra Info */}
          {activeContent.extraInfo && (
            <div className="mt-4 pt-4 border-t border-dashed border-[#EEE]">
              {activeContent.extraInfo}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
