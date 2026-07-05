// Studienkolleg Course Types
export type CourseType = {
  code: string;
  name: string;
  description: string;
  subjects: string;
};

// Studienkolleg Full Data
export type StudienkollegData = {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;
  state: string;
  badge: string;
  institutionType: string;

  // City Information
  cityInfo: {
    description: string;
    costOfLiving: string;
    transit: string;
  };

  // Courses offered
  courses: CourseType[];

  // Application Information
  application: {
    method: 'assist' | 'direct';
    methodDisplay: string;
    status: 'open' | 'closed';
    statusText: string;
    winterDeadline: string;
    summerDeadline: string;
    applicationUrl: string;
    websiteUrl: string;
  };

  // Entrance Exam
  exam: {
    required: boolean;
    description: string;
    nextDate?: string;
    exampleTestsUrl?: string;
  };
};

// Course definitions
export const COURSE_TYPES: Record<string, CourseType> = {
  T: {
    code: 'T-Kurs',
    name: 'Technical Course',
    description: 'For Engineering & Math',
    subjects: 'Math + Physics',
  },
  M: {
    code: 'M-Kurs',
    name: 'Medical Course',
    description: 'For Medicine & Biology',
    subjects: 'Biology + Chem',
  },
  W: {
    code: 'W-Kurs',
    name: 'Economics Course',
    description: 'For Economics',
    subjects: 'Math + Econ',
  },
  G: {
    code: 'G-Kurs',
    name: 'Humanities Course',
    description: 'For Humanities',
    subjects: 'History + Lit',
  },
  S: {
    code: 'S-Kurs',
    name: 'Language Course',
    description: 'For Languages',
    subjects: 'Literature + History',
  },
};

// All Studienkollegs Data
export const STUDIENKOLLEGS: Record<string, StudienkollegData> = {
  munich: {
    id: 'munich',
    slug: 'munich',
    name: 'Studienkolleg München',
    location: 'Munich, Bavaria',
    city: 'Munich',
    state: 'Bavaria',
    badge: 'Bayern',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Munich is Bavaria's capital and Germany's economic powerhouse, home to LMU and TUM as well as global giants like BMW and Siemens. It offers an exceptional quality of life and ranks among Europe's safest major cities, but has the highest cost of living in Germany.",
      costOfLiving: '~€1,200 / Month',
      transit: 'MVV Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.M,
      COURSE_TYPES.W,
      { ...COURSE_TYPES.G, code: 'S/G-Kurs' },
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jul 15, 2026',
      summerDeadline: 'Jan 15, 2027',
      applicationUrl:
        'https://www.studienkolleg-münchen.de/bewerben/bewerbung-an-der-universitaet',
      websiteUrl: 'https://www.studienkolleg-münchen.de',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmeprüfung is mandatory for all applicants (no exemption is possible). It tests German (B1+/B2) for every course, plus Mathematics for the T-, M- and W-Kurs; the S/G-Kurs tests German only. Held in early September (winter semester) and early February (summer semester) at Studienkolleg München, Infanteriestr. 7a. May be attempted up to three times in total.',
      nextDate: 'Sep 7, 2026',
      exampleTestsUrl:
        'https://www.studienkolleg-münchen.de/bewerben/aufnahme-in-das-studienkolleg/aufnahmepruefung-deutsch',
    },
  },

  berlin: {
    id: 'berlin',
    slug: 'berlin',
    name: 'Studienkolleg der TU Berlin',
    location: 'Berlin',
    city: 'Berlin',
    state: 'Berlin',
    badge: 'Berlin',
    institutionType: 'Technical University',

    cityInfo: {
      description:
        "Berlin is Germany's capital and largest city, famed for its diverse culture, turbulent history, and thriving startup and tech scene. Home to TU Berlin, Freie Universität and Humboldt-Universität, it offers a vibrant student life and remains far more affordable than Munich or Frankfurt.",
      costOfLiving: '~€1,000 / Month',
      transit: 'BVG Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.W,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications (SS 2027)',
      winterDeadline: 'Jun 30, 2027',
      summerDeadline: 'Nov 30, 2026',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl:
        'https://www.tu.berlin/en/international/students-1/preparatory-school',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all T- and W-Kurs applicants. It tests German (B2 level, four C-Tests) and Mathematics (~60 minutes each), and is held in August (winter semester) and January (summer semester) at the TU Berlin Studienkolleg, Straße des 17. Juni 145. It can be repeated once; results are published anonymously a few days later and classes begin the following Monday.',
      nextDate: 'Aug 28, 2026',
      exampleTestsUrl:
        'https://www.tu.berlin/en/international/students-1/preparatory-school/subjects-and-sample-tests',
    },
  },

  'fu-berlin': {
    id: 'fu-berlin',
    slug: 'fu-berlin',
    name: 'Studienkolleg der FU Berlin',
    location: 'Berlin',
    city: 'Berlin',
    state: 'Berlin',
    badge: 'Berlin',
    institutionType: 'Public University',

    cityInfo: {
      description:
        "Berlin is Germany's capital and largest city, celebrated for its layered history, diverse culture and thriving research scene. The Freie Universität, one of Germany's Excellence-status universities, sits in the leafy south-western district of Dahlem, offering a green campus and vibrant student life while remaining far more affordable than Munich or Frankfurt.",
      costOfLiving: '~€1,000 / Month',
      transit: 'BVG Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.M,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications (WS 2026/27)',
      winterDeadline: 'Jul 15, 2026',
      summerDeadline: 'No summer intake',
      applicationUrl:
        'https://www.fu-berlin.de/en/sites/studienkolleg/bewerbung/index.html',
      websiteUrl: 'https://www.fu-berlin.de/en/sites/studienkolleg/index.html',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for every applicant: there is no exemption, and its results form the ranking used to allocate the limited places. All courses sit a German C-Test (a 75-gap complementary test, 30 min); the T-, M- and W-Kurs add a Mathematics test (45 min), while the G-Kurs takes a chart-evaluation test instead. The full test lasts about 90 minutes and is held once a year in late August at the Freie Universität Berlin (Dahlem), on a separate day for each course. It may be repeated once. Applications run 1 June – 15 July for the winter semester only (no summer intake) and go exclusively through uni-assist.',
      nextDate: 'Aug 25–28, 2026',
      exampleTestsUrl:
        'https://www.fu-berlin.de/sites/studienkolleg/musterklausuren/index.html',
    },
  },

  hamburg: {
    id: 'hamburg',
    slug: 'hamburg',
    name: 'Studienkolleg Hamburg',
    location: 'Hamburg',
    city: 'Hamburg',
    state: 'Hamburg',
    badge: 'Hamburg',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Hamburg is Germany's second-largest city and a major port in northern Germany, renowned for its maritime heritage, musical and theatre scene, and high quality of life. Home to Universität Hamburg, it is pricier than Leipzig or Halle but more affordable than Munich.",
      costOfLiving: '~€1,000 / Month',
      transit: 'HVV Network',
    },

    courses: [
      COURSE_TYPES.G,
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications (SS 2027)',
      winterDeadline: 'Mar 1, 2027',
      summerDeadline: 'Sep 1, 2026',
      applicationUrl:
        'https://studienkolleg-hamburg.de/bewerbung/fachkurs/application-process/',
      websiteUrl: 'https://www.studienkolleg-hamburg.de',
    },

    exam: {
      required: false,
      description:
        'No entrance exam (Aufnahmeprüfung) is required. Admission is competitive and based on your German language certificate (B2 or higher) and your home-country school-leaving grades. You apply directly to Studienkolleg Hamburg with certified documents; places are allocated by the admissions office (Zulassungsstelle).',
    },
  },

  karlsruhe: {
    id: 'karlsruhe',
    slug: 'karlsruhe',
    name: 'Studienkolleg am KIT',
    location: 'Karlsruhe',
    city: 'Karlsruhe',
    state: 'Baden-Württemberg',
    badge: 'Baden-Württemberg',
    institutionType: 'Technical Institute',

    cityInfo: {
      description:
        "Karlsruhe is a technology hub in southwestern Germany, home to the renowned Karlsruhe Institute of Technology (KIT). Known as the 'Fächerstadt' (fan city) for its park-lined streets radiating from the palace, it is more affordable than Munich or Stuttgart and lies in the Upper Rhine valley near the French border.",
      costOfLiving: '~€850 / Month',
      transit: 'KVV Network',
    },

    courses: [
      COURSE_TYPES.T,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jul 15, 2026',
      summerDeadline: 'Jan 15, 2027',
      applicationUrl: 'https://www.stk.kit.edu/english/2382.php',
      websiteUrl: 'https://www.stk.kit.edu/english/index.php',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for T-Kurs applicants and consists of two parts taken on the same day (~3 hours total): an onSET C-Test in German (8 gap-fill texts, ~40 min; minimum B1 required, higher proficiency improves admission chances) and an ILIAS mathematics exam taken in person at KIT (curriculum up to 11th-grade German Gymnasium, no integral calculus). It can be repeated once in a later semester.',
      nextDate: 'Sep 1, 2026',
      exampleTestsUrl: 'https://www.stk.kit.edu/english/1629.php',
    },
  },

  leipzig: {
    id: 'leipzig',
    slug: 'leipzig',
    name: 'Studienkolleg Sachsen',
    location: 'Leipzig',
    city: 'Leipzig',
    state: 'Sachsen',
    badge: 'Sachsen',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Leipzig is a vibrant cultural and trade-fair city in Saxony with a thriving student community and the most affordable living costs among Germany's major Studienkolleg cities. Home to Universität Leipzig, it is pricier than Halle but far cheaper than Munich or Frankfurt.",
      costOfLiving: '~€800 / Month',
      transit: 'LVB Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.M,
      COURSE_TYPES.W,
      { ...COURSE_TYPES.G, code: 'G/S-Kurs' },
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'closed',
      statusText: 'Reopens Nov 1, 2026 (SS 2027)',
      winterDeadline: 'Jun 15, 2027',
      summerDeadline: 'Dec 15, 2026',
      applicationUrl:
        'https://www.stksachs.uni-leipzig.de/en/bewerben/schwerpunktkurse-fsp',
      websiteUrl: 'https://www.stksachs.uni-leipzig.de/en',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all Schwerpunktkurs applicants (no exemption, even with a language certificate). It consists of a German C-Test (digital, ~20 min) for all courses, plus a Mathematics test for M-, T- and W-Kurs applicants; the G/S-Kurs tests German only. Taken in person on a PC at Universität Leipzig (participation fee €50). Held end of August (winter semester) and end of February (summer semester). You apply via uni-assist to one of four Saxon universities (Leipzig, TU Dresden, TU Chemnitz, TU Freiberg), which issues the test invitation.',
      nextDate: 'Aug 28, 2026',
      exampleTestsUrl:
        'https://www.stksachs.uni-leipzig.de/en/bewerben/schwerpunktkurse-fsp',
    },
  },

  heidelberg: {
    id: 'heidelberg',
    slug: 'heidelberg',
    name: 'Studienkolleg Heidelberg',
    location: 'Heidelberg',
    city: 'Heidelberg',
    state: 'Baden-Württemberg',
    badge: 'Baden-Württemberg',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Heidelberg is a picturesque university town on the Neckar, famous for its historic castle, charming old town, and Germany's oldest university (founded 1386). A premium student city with strong academic prestige, it is pricier than Leipzig or Halle but cheaper than Munich.",
      costOfLiving: '~€900 / Month',
      transit: 'VRN Network',
    },

    courses: [
      COURSE_TYPES.G,
      COURSE_TYPES.M,
      COURSE_TYPES.S,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'closed',
      statusText: 'Reopens Nov 1, 2026 (SS 2027)',
      winterDeadline: 'Jun 30, 2027',
      summerDeadline: 'Dec 15, 2026',
      applicationUrl:
        'https://www.uni-heidelberg.de/en/study/application-enrolment/prerequisites-for-study/application-to-the-studienkolleg-application-documents',
      websiteUrl: 'https://www.isz.uni-heidelberg.de/en/studienkolleg',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmeprüfung is mandatory for all applicants (no exemption possible). It is identical for all five courses (G/M/S/T/W) and tests ONLY German, with no subject-specific knowledge or mathematics. Format: Part I Grammar & Vocabulary (45 min, levels A1→C1, includes C-Tests) and Part II Writing (45 min), each weighted 50%. Requires German B2/C1. Held in person at the Neue Universität, Heidelberg. Apply via heiCO (Heidelberg University portal) for a Baden-Württemberg university, which issues the invitation.',
      nextDate: 'Oct 5, 2026',
      exampleTestsUrl: 'https://www.isz.uni-heidelberg.de/en/entrance-stk-ksk',
    },
  },

  halle: {
    id: 'halle',
    slug: 'halle',
    name: 'Landesstudienkolleg Halle',
    location: 'Halle(Saale)',
    city: 'Halle',
    state: 'Sachsen-Anhalt',
    badge: 'Sachsen-Anhalt',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Halle (Saale) is an affordable university city in central Germany, home to the Martin-Luther-Universität Halle-Wittenberg. With a rich cultural heritage (Händel's birthplace) and one of the lowest costs of living among German Studienkolleg cities, it is notably cheaper than Leipzig or Berlin.",
      costOfLiving: '~€700 / Month',
      transit: 'HAVAG Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      { ...COURSE_TYPES.G, code: 'S/G-Kurs' },
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications (WS 2026/27)',
      winterDeadline: 'Jul 15, 2026',
      summerDeadline: 'Jan 15, 2027',
      applicationUrl:
        'https://www.uni-halle.de/ssc/bewerbungsinformationen/studienkolleg/',
      websiteUrl: 'https://www.studienkolleg.uni-halle.de',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all Fachkurs applicants (no online attendance possible). It consists of a German test (C-Test + short text production) for all courses, plus Mathematics for the T- and W-Kurs, Natural Sciences (Biology/Chemistry/Physics) for the M-Kurs, and English for the S/G-Kurs. Held in person in Halle (€30 cash fee): late January for the summer semester and early/mid-August for the winter semester. You apply via uni-assist to MLU Halle-Wittenberg (direct application to the Studienkolleg is NOT possible); requires German B2 minimum. From WS 2026/27 only Fachkurse are offered (the DSH language course was discontinued).',
      nextDate: 'Aug 17, 2026',
      exampleTestsUrl:
        'https://www.studienkolleg.uni-halle.de/aufnahmetest/',
    },
  },

  darmstadt: {
    id: 'darmstadt',
    slug: 'darmstadt',
    name: 'Studienkolleg Darmstadt',
    location: 'Darmstadt',
    city: 'Darmstadt',
    state: 'Hessen',
    badge: 'Hessen',
    institutionType: 'Technical University',

    cityInfo: {
      description:
        "Darmstadt is a center of science and technology in the Rhine-Main metropolitan region, home to TU Darmstadt, ESA's mission control centre (ESOC), and many research institutions. It offers a high quality of life at moderate costs, pricier than Halle but cheaper than Frankfurt or Munich.",
      costOfLiving: '~€900 / Month',
      transit: 'HEAG Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'closed',
      statusText: 'Reopens Sep 15, 2026 (SS 2027)',
      winterDeadline: 'Apr 15, 2027',
      summerDeadline: 'Oct 15, 2026',
      applicationUrl:
        'https://www.stk.tu-darmstadt.de/schwerpunktkurse_stk/gkurs_stk/bewerbung_gkurs_stk/index.en.jsp',
      websiteUrl:
        'https://www.stk.tu-darmstadt.de/studienkollegstart/startseite_stk.en.jsp',
    },

    exam: {
      required: true,
      description:
        'The entrance examination is mandatory for all applicants. It consists of a German C-Test (40 min, all applicants, minimum B1) plus an additional Mathematics test (40 min, T-Kurs only) or an additional German test (40 min, G-Kurs only: composition, reading comprehension, grammar/syntax). Held in January (for the summer semester) and June (for the winter semester). You must apply to TU Darmstadt (online portal) or a partner university (h_da, HSRM, Geisenheim, EHD via uni-assist); the university then issues the exam invitation.',
      nextDate: 'Jan 2027',
      exampleTestsUrl:
        'https://www.stk.tu-darmstadt.de/schwerpunktkurse_stk/tkurs_stk/aufnahmeverfahren_tkurs_stk/index.en.jsp',
    },
  },

  frankfurt: {
    id: 'frankfurt',
    slug: 'frankfurt',
    name: 'Studienkolleg Frankfurt',
    location: 'Frankfurt am Main',
    city: 'Frankfurt',
    state: 'Hessen',
    badge: 'Hessen',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Frankfurt am Main is Germany's financial capital and most international city, home to the European Central Bank, Goethe-Universität, and a cosmopolitan community. It is one of Germany's most expensive student cities, pricier than Berlin or Hamburg, though cheaper than Munich.",
      costOfLiving: '~€1,050 / Month',
      transit: 'RMV Network',
    },

    courses: [
      COURSE_TYPES.G,
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'closed',
      statusText: 'Reopens ~Sep 25, 2026 (SS 2027)',
      winterDeadline: 'May 1, 2027',
      summerDeadline: 'Nov 1, 2026',
      applicationUrl:
        'https://www.uni-frankfurt.de/43663284/Bewerbung___Zulassung',
      websiteUrl: 'https://www.uni-frankfurt.de/43662351/studienkolleg',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all applicants and tests ONLY German language skills (no subject-specific content). Since there are more applicants than places, admission is by ranking in this entrance exam: the higher your score, the better your chances. Held in January (for the summer semester) and June (for the winter semester). You apply via uni-assist to Goethe-Universität Frankfurt or Frankfurt UAS (the Studienkolleg is shared); the university then issues the exam invitation.',
      nextDate: 'Jan 16, 2027',
      exampleTestsUrl:
        'https://www.uni-frankfurt.de/38294330/Studienkolleg___Feststellungspr%C3%BCfung',
    },
  },

  hannover: {
    id: 'hannover',
    slug: 'hannover',
    name: 'Niedersächsisches Studienkolleg',
    location: 'Hannover',
    city: 'Hannover',
    state: 'Niedersachsen',
    badge: 'Niedersachsen',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        'Hannover is the capital of Lower Saxony and a major trade-fair city (Hannover Messe/CeBIT), known for its extensive green spaces, lakes, and balanced cost of living. Home to Leibniz Universität Hannover, it is more affordable than Munich or Frankfurt but pricier than Leipzig or Halle.',
      costOfLiving: '~€900 / Month',
      transit: 'GVH Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      { ...COURSE_TYPES.G, code: 'G/S-Kurs' },
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jul 15, 2026',
      summerDeadline: 'Jan 15, 2027',
      applicationUrl:
        'https://www.stk.uni-hannover.de/en/course-participation/application',
      websiteUrl: 'https://www.stk.uni-hannover.de/en/',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all Schwerpunktkurs applicants. It tests German (C-Test) for all courses, plus Mathematics for the T-, M- and W-Kurs, and Natural Sciences for the M-Kurs. Minimum German B1 required (applicants with higher certificates are invited first). Held twice yearly in Hannover: February (for the summer semester) and August/September (for the winter semester). You cannot apply directly to the Studienkolleg; apply to a Lower Saxony university (some via uni-assist), which forwards you to the Studienkolleg for the entrance test. Note: from 2026, the G/S-Kurs is only offered starting in the winter semester.',
      nextDate: 'Aug 31, 2026',
      exampleTestsUrl:
        'https://www.stk.uni-hannover.de/kursteilnahme/aufnahmetest',
    },
  },

  koethen: {
    id: 'koethen',
    slug: 'koethen',
    name: 'Landesstudienkolleg Köthen',
    location: 'Köthen, Saxony-Anhalt',
    city: 'Köthen',
    state: 'Sachsen-Anhalt',
    badge: 'Sachsen-Anhalt',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        "Köthen is a charming small city in Saxony-Anhalt, known as the 'World Capital of Homeopathy' for its history with Samuel Hahnemann, and as the city where Johann Sebastian Bach composed his Brandenburg Concertos. Home to the Anhalt University of Applied Sciences, it offers an intimate, bike-friendly campus atmosphere with the lowest cost of living among German Studienkolleg cities, while being just 50 km from Leipzig and Halle.",
      costOfLiving: '~€700 / Month',
      transit: 'MDV / NAH.Sachsen-Anhalt',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications (WiSe 2026/27)',
      winterDeadline: 'Jun 15, 2026',
      summerDeadline: 'Nov 15, 2026',
      applicationUrl: 'https://www.hs-anhalt.de/en/international/application-for-international-students/studienkolleg/application.html',
      websiteUrl: 'https://www.hs-anhalt.de/en/international/application-for-international-students/studienkolleg/home.html',
    },

    exam: {
      required: true,
      description:
        'The Aufnahmetest is mandatory for all applicants (€30 cash fee). It consists of a German C-Test for all courses, plus Mathematics for T- and W-Kurs applicants. The G-Kurs tests German only. Held in February (summer semester) and August (winter semester) about one week before classes start, at the Studienkolleg in Köthen. Aids such as dictionaries, calculators, and phones are not permitted. Admission is by ranking: higher scores earn the limited spots. After passing, enrolment happens the following Monday, and students receive their timetable and can apply for dorm housing.',
      nextDate: 'Aug 18, 2026',
      exampleTestsUrl:
        'https://www.hs-anhalt.de/en/international/application-for-international-students/studienkolleg/acceptance-test.html',
    },
  },
};

// Helper function to get studienkolleg by slug
export const getStudienkollegBySlug = (slug: string): StudienkollegData | undefined => {
  return STUDIENKOLLEGS[slug];
};

// Get all studienkollegs as array
export const getAllStudienkollegs = (): StudienkollegData[] => {
  return Object.values(STUDIENKOLLEGS);
};
