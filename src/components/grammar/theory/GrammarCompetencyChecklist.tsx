import { useState } from 'react';
import { Icon } from '../../../lib/icons';

type CompetencyItem = {
  skill: string;
  selfAssessment: 'not_started' | 'learning' | 'confident' | 'mastered';
};

type LessonGroup = {
  title: string;
  items: Omit<CompetencyItem, 'selfAssessment'>[];
};

export function GrammarCompetencyChecklist() {
  const lessonGroups: LessonGroup[] = [
    {
      title: 'Konnektoren & Verknüpfung',
      items: [
        { skill: 'Adversative Konnektoren korrekt wählen (aber, sondern, jedoch)' },
        { skill: 'Kausale Nuancen unterscheiden (weil, da, denn)' },
        { skill: 'Kohäsionsmittel für Textzusammenhang nutzen' },
      ],
    },
    {
      title: 'Nebensätze & Zeitformen',
      items: [
        { skill: 'Temporale Nebensätze mit korrekter Zeitenfolge (nachdem)' },
        { skill: 'Konditionalsätze (Realis, Irrealis) bilden' },
        { skill: 'Hypotaxen (komplexe Satzgefüge) konstruieren' },
      ],
    },
    {
      title: 'Register & Ausdruck',
      items: [
        { skill: 'Modalpartikeln in gesprochener Sprache verstehen' },
        { skill: 'Restriktive Ausdrücke register-angemessen verwenden' },
        { skill: 'Meinung ausdrücken mit formellen Redemitteln' },
      ],
    },
    {
      title: 'Morphologie & Wortschatz',
      items: [
        { skill: 'Adjektivendungen nach verschiedenen Artikeln deklinieren' },
        { skill: 'Komposita verstehen und Genus bestimmen' },
      ],
    },
  ];

  // Initialize state with all items set to 'not_started'
  const [assessments, setAssessments] = useState<Record<string, CompetencyItem['selfAssessment']>>(
    () => {
      const initial: Record<string, CompetencyItem['selfAssessment']> = {};
      lessonGroups.forEach((group) => {
        group.items.forEach((item) => {
          initial[item.skill] = 'not_started';
        });
      });
      return initial;
    }
  );

  const handleAssessmentChange = (
    key: string,
    value: CompetencyItem['selfAssessment']
  ) => {
    setAssessments((prev) => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: CompetencyItem['selfAssessment']) => {
    switch (status) {
      case 'not_started':
        return 'bg-[#F5F5F5] text-text-muted';
      case 'learning':
        return 'bg-[#FFF3E0] text-[#E65100]';
      case 'confident':
        return 'bg-[#E3F2FD] text-[#1565C0]';
      case 'mastered':
        return 'bg-[#E8F5E9] text-[#2E7D32]';
    }
  };

  const getStatusLabel = (status: CompetencyItem['selfAssessment']) => {
    switch (status) {
      case 'not_started':
        return 'Nicht begonnen';
      case 'learning':
        return 'Lerne';
      case 'confident':
        return 'Sicher';
      case 'mastered':
        return 'Beherrsche';
    }
  };

  // Calculate progress
  const totalItems = lessonGroups.reduce((sum, group) => sum + group.items.length, 0);
  const masteredItems = Object.values(assessments).filter(
    (status) => status === 'mastered'
  ).length;
  const confidentItems = Object.values(assessments).filter(
    (status) => status === 'confident'
  ).length;
  const progressPercentage = Math.round(
    ((masteredItems + confidentItems * 0.7) / totalItems) * 100
  );

  return (
    <section className="bg-surface rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-card p-5 sm:p-6 md:p-8 lg:p-10 mb-8 sm:mb-12 md:mb-16 border border-[rgba(0,0,0,0.02)]">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] font-serif mb-2 sm:mb-3">
        Selbsteinschätzung: Grammatik-Kompetenz
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-muted mb-5 sm:mb-6 leading-relaxed">
        Überprüfe deine <strong>Fortschritte</strong> systematisch. Ehrliche Selbsteinschätzung
        zeigt dir, welche Themen du noch vertiefen solltest.
      </p>

      {/* Progress Bar */}
      <div className="bg-[#FAF6F3] rounded-lg p-4 sm:p-5 mb-5 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-bold text-text-main">
            Gesamtfortschritt
          </span>
          <span className="text-xs sm:text-sm font-bold text-primary">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-[#E0E0E0] rounded-full h-3 sm:h-4">
          <div
            className="bg-primary h-3 sm:h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[0.65rem] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E8F5E9]" />
            <span>Beherrsche: {masteredItems}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E3F2FD]" />
            <span>Sicher: {confidentItems}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FFF3E0]" />
            <span>
              Lerne:{' '}
              {Object.values(assessments).filter((s) => s === 'learning').length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F5F5F5]" />
            <span>Offen: {totalItems - masteredItems - confidentItems - Object.values(assessments).filter((s) => s === 'learning').length}</span>
          </div>
        </div>
      </div>

      {/* Checklist by Groups */}
      <div className="space-y-5 sm:space-y-6">
        {lessonGroups.map((group, groupIdx) => (
          <div
            key={groupIdx}
            className="bg-[#F9F9F9] rounded-lg sm:rounded-xl p-4 sm:p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm sm:text-base font-bold text-text-main">
                {group.title}
              </h3>
            </div>

            <div className="space-y-3">
              {group.items.map((item, itemIdx) => {
                const key = item.skill;
                const currentStatus = assessments[key];

                return (
                  <div
                    key={itemIdx}
                    className="bg-white rounded-lg p-3 sm:p-4 border border-[#E0E0E0]"
                  >
                    <div className="mb-3">
                      <p className="text-xs sm:text-sm text-text-main">
                        {item.skill}
                      </p>
                    </div>

                    {/* Status Buttons */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          'not_started',
                          'learning',
                          'confident',
                          'mastered',
                        ] as CompetencyItem['selfAssessment'][]
                      ).map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleAssessmentChange(key, status)}
                          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded text-[0.65rem] sm:text-xs font-semibold transition-all ${
                            currentStatus === status
                              ? getStatusColor(status)
                              : 'bg-white border border-[#E0E0E0] text-text-muted hover:bg-[#F5F5F5]'
                          }`}
                        >
                          {getStatusLabel(status)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-5 sm:mt-6 bg-[#FFF9E5] rounded-lg p-4 sm:p-5 border-l-4 border-[#D9A441]">
        <div className="flex items-start gap-2 sm:gap-3">
          <Icon.Tip className="text-primary shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-xs sm:text-sm md:text-base font-bold text-text-main mb-1">
              Wie nutzt du diese Checkliste?
            </p>
            <ul className="space-y-1 text-[0.65rem] sm:text-xs md:text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>
                  <strong>Ehrlich sein:</strong> Selbstbetrug hilft nicht in der Prüfung
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>
                  <strong>Regelmäßig prüfen:</strong> Wiederhole alle 2 Wochen
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>
                  <strong>Schwächen fokussieren:</strong> "Lerne"-Items zuerst bearbeiten
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary font-bold flex-shrink-0">•</span>
                <span>
                  <strong>Ziel:</strong> 80%+ auf "Sicher" oder "Beherrsche" für Prüfung
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
