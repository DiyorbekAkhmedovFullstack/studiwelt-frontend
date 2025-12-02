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
        "Munich is Germany's economic powerhouse and one of the safest cities in Europe. It offers a high quality of life but comes with the highest cost of living in the country.",
      costOfLiving: '~€1,100 / Month',
      transit: 'MVG Network',
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
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl: 'https://www.stk.uni-muenchen.de',
    },

    exam: {
      required: true,
      description:
        'The "Aufnahmeprüfung" is mandatory. It tests German (B2/C1) and Mathematics.',
      nextDate: 'Feb 12, 2024',
      exampleTestsUrl: '#',
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
        'Berlin is the vibrant capital of Germany, known for its diverse culture, history, and thriving tech scene. The city offers a moderate cost of living compared to Munich.',
      costOfLiving: '~€950 / Month',
      transit: 'BVG Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.M,
      COURSE_TYPES.W,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl: 'https://www.tu-berlin.de/studienkolleg',
    },

    exam: {
      required: true,
      description:
        'Entrance examination tests German language skills (B2/C1 level) and subject-specific knowledge.',
      nextDate: 'Feb 20, 2024',
      exampleTestsUrl: '#',
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
        'Hamburg is a major port city in northern Germany, known for its maritime heritage, cultural landmarks, and high quality of life.',
      costOfLiving: '~€1,000 / Month',
      transit: 'HVV Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.studienkolleg-hamburg.de',
      websiteUrl: 'https://www.studienkolleg-hamburg.de',
    },

    exam: {
      required: true,
      description:
        'Entrance exam covering German language and mathematics is required for all applicants.',
      nextDate: 'Feb 15, 2024',
      exampleTestsUrl: '#',
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
        'Karlsruhe is a technology hub in southwestern Germany, home to the renowned Karlsruhe Institute of Technology (KIT).',
      costOfLiving: '~€850 / Month',
      transit: 'KVV Network',
    },

    courses: [
      COURSE_TYPES.T,
      { ...COURSE_TYPES.M, code: 'M-Kurs (Ext)' },
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.kit.edu/studienkolleg',
      websiteUrl: 'https://www.kit.edu/studienkolleg',
    },

    exam: {
      required: true,
      description:
        'Technical entrance examination focusing on mathematics and physics for T-Kurs students.',
      exampleTestsUrl: '#',
    },
  },

  leipzig: {
    id: 'leipzig',
    slug: 'leipzig',
    name: 'Studienkolleg Leipzig',
    location: 'Leipzig',
    city: 'Leipzig',
    state: 'Sachsen',
    badge: 'Sachsen',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        'Leipzig is a vibrant cultural center in Saxony with affordable living costs and a thriving student community.',
      costOfLiving: '~€750 / Month',
      transit: 'LVB Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.M,
      COURSE_TYPES.W,
      { ...COURSE_TYPES.S, code: 'S/G-Kurs' },
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl: 'https://www.uni-leipzig.de/studienkolleg',
    },

    exam: {
      required: true,
      description: 'Entrance examination in German and course-specific subjects.',
      exampleTestsUrl: '#',
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
        'Heidelberg is a picturesque university town known for its historic castle, charming old town, and academic excellence.',
      costOfLiving: '~€900 / Month',
      transit: 'VRN Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      { ...COURSE_TYPES.G, code: 'G/S-Kurs' },
      COURSE_TYPES.W,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-heidelberg.de/studienkolleg',
      websiteUrl: 'https://www.uni-heidelberg.de/studienkolleg',
    },

    exam: {
      required: true,
      description: 'Entrance exam testing German proficiency and subject knowledge.',
      exampleTestsUrl: '#',
    },
  },

  halle: {
    id: 'halle',
    slug: 'halle',
    name: 'Studienkolleg Halle(Saale)',
    location: 'Halle(Saale)',
    city: 'Halle',
    state: 'Sachsen-Anhalt',
    badge: 'Sachsen-Anhalt',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        'Halle is an affordable university city in central Germany with a rich cultural heritage and excellent academic programs.',
      costOfLiving: '~€700 / Month',
      transit: 'HAVAG Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-halle.de/studienkolleg',
      websiteUrl: 'https://www.uni-halle.de/studienkolleg',
    },

    exam: {
      required: true,
      description: 'Mandatory entrance examination in German and mathematics.',
      exampleTestsUrl: '#',
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
        'Darmstadt is a center of science and technology, hosting many research institutions and the Technical University of Darmstadt.',
      costOfLiving: '~€850 / Month',
      transit: 'HEAG Network',
    },

    courses: [
      COURSE_TYPES.T,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'direct',
      methodDisplay: 'Direct Application',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.tu-darmstadt.de/studienkolleg',
      websiteUrl: 'https://www.tu-darmstadt.de/studienkolleg',
    },

    exam: {
      required: true,
      description: 'Technical entrance exam for prospective engineering students.',
      exampleTestsUrl: '#',
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
        "Frankfurt is Germany's financial capital, a cosmopolitan city with excellent infrastructure and diverse international community.",
      costOfLiving: '~€1,050 / Month',
      transit: 'RMV Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl: 'https://www.studienkolleg-frankfurt.de',
    },

    exam: {
      required: true,
      description: 'Comprehensive entrance examination covering German and core subjects.',
      exampleTestsUrl: '#',
    },
  },

  hannover: {
    id: 'hannover',
    slug: 'hannover',
    name: 'Studienkolleg Hannover',
    location: 'Hannover',
    city: 'Hannover',
    state: 'Niedersachsen',
    badge: 'Niedersachsen',
    institutionType: 'Public Institution',

    cityInfo: {
      description:
        'Hannover is a major city in Lower Saxony, known for its trade fairs, green spaces, and balanced cost of living.',
      costOfLiving: '~€900 / Month',
      transit: 'üstra Network',
    },

    courses: [
      COURSE_TYPES.M,
      COURSE_TYPES.T,
      COURSE_TYPES.W,
      COURSE_TYPES.G,
    ],

    application: {
      method: 'assist',
      methodDisplay: 'Uni-Assist',
      status: 'open',
      statusText: 'Accepting Applications',
      winterDeadline: 'Jan 15',
      summerDeadline: 'Jul 15',
      applicationUrl: 'https://www.uni-assist.de',
      websiteUrl: 'https://www.studienkolleg-hannover.de',
    },

    exam: {
      required: true,
      description: 'Entrance exam testing German language proficiency and subject knowledge.',
      exampleTestsUrl: '#',
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
