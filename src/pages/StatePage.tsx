import { useParams, Link } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// State data interface
interface University {
  name: string;
  germanRank: number;
  type: 'university' | 'technical' | 'applied';
  city: string;
  students: number;
  notable: string;
}

interface Studienkolleg {
  name: string;
  city: string;
  courses: string[];
  type: 'university' | 'applied';
}

interface CulturalHighlight {
  title: string;
  description: string;
  icon: string;
}

interface KeyNumber {
  value: string;
  label: string;
  context: string;
}

interface Employer {
  name: string;
  sector: string;
  hq: string;
}

interface StateData {
  id: string;
  name: string;
  germanName: string;
  capital: string;
  population: string;
  area: string;
  motto: string;
  description: string;
  image: string;
  universities: University[];
  studienkollegs: Studienkolleg[];
  culture: CulturalHighlight[];
  keyNumbers: KeyNumber[];
  majorEmployers: Employer[];
}

// Bavaria state data
const statesData: Record<string, StateData> = {
  bavaria: {
    id: 'bavaria',
    name: 'Bavaria',
    germanName: 'Bayern',
    capital: 'Munich',
    population: '13.2 million',
    area: '70,550 km²',
    motto: 'Freistaat Bayern',
    description:
      'Bavaria is Germany\'s largest state by area and second-largest by population. Known for its rich cultural heritage, world-class universities, and strong economy, Bavaria offers international students an exceptional blend of tradition and innovation.',
    image: '/states/bavaria.jpg',
    universities: [
      {
        name: 'Ludwig Maximilian University of Munich (LMU)',
        germanRank: 2,
        type: 'university',
        city: 'Munich',
        students: 54616,
        notable: 'University of Excellence, strongest in Arts & Humanities, Law, Psychology',
      },
      {
        name: 'Technical University of Munich (TUM)',
        germanRank: 1,
        type: 'technical',
        city: 'Munich',
        students: 50000,
        notable: 'University of Excellence, #1 in Engineering & Technology in Germany',
      },
      {
        name: 'Friedrich-Alexander University Erlangen-Nuremberg (FAU)',
        germanRank: 13,
        type: 'university',
        city: 'Erlangen & Nuremberg',
        students: 39658,
        notable: 'Second most innovative university in Europe',
      },
      {
        name: 'University of Würzburg',
        germanRank: 20,
        type: 'university',
        city: 'Würzburg',
        students: 27149,
        notable: 'Historic university with Nobel Prize laureates',
      },
      {
        name: 'University of Regensburg',
        germanRank: 33,
        type: 'university',
        city: 'Regensburg',
        students: 20702,
        notable: 'Modern campus, strong in law and medicine',
      },
      {
        name: 'University of Augsburg',
        germanRank: 56,
        type: 'university',
        city: 'Augsburg',
        students: 19975,
        notable: 'Growing university with new medical faculty',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg München',
        city: 'Munich',
        courses: ['G', 'M', 'T', 'W'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Coburg',
        city: 'Coburg',
        courses: ['TI', 'WW'],
        type: 'applied',
      },
    ],
    culture: [
      {
        title: 'Oktoberfest',
        description:
          'The world\'s largest folk festival, held annually in Munich since 1810. Over 6 million visitors celebrate with traditional beer, food, and Bavarian music.',
        icon: '🍺',
      },
      {
        title: 'Neuschwanstein Castle',
        description:
          'The fairy-tale castle that inspired Disney\'s Sleeping Beauty Castle. Built by King Ludwig II, it welcomes 1.3 million visitors annually and became a UNESCO World Heritage Site in 2025.',
        icon: '🏰',
      },
      {
        title: 'Traditional Dress',
        description:
          'Lederhosen for men and Dirndl for women are still worn at festivals and celebrations. This traditional clothing represents Bavarian identity and pride.',
        icon: '👗',
      },
      {
        title: 'Alpine Culture',
        description:
          'Yodeling, Schuhplattler dancing, and the greeting "Servus" are unique to Bavaria. The region\'s Catholic traditions and distinctive Bairisch dialect set it apart.',
        icon: '⛰️',
      },
      {
        title: 'Beer Gardens',
        description:
          'Biergärten are outdoor areas where people enjoy beer, food, and socializing. A cornerstone of Bavarian social life, especially during summer months.',
        icon: '🌳',
      },
      {
        title: 'Culinary Traditions',
        description:
          'Famous for Weisswurst (white sausage), Brezen (pretzels), Schweinshaxe, and world-renowned beer brewing traditions dating back centuries.',
        icon: '🥨',
      },
    ],
    keyNumbers: [
      { value: '13.2M', label: 'Population', context: '2nd largest state' },
      { value: '2.9%', label: 'Unemployment', context: 'Lowest in Germany' },
      { value: '€632B', label: 'GDP', context: 'Would be EU\'s 7th economy' },
      { value: '40,000+', label: 'Int\'l Students', context: 'Per year' },
    ],
    majorEmployers: [
      { name: 'BMW', sector: 'Automotive', hq: 'Munich' },
      { name: 'Siemens', sector: 'Engineering', hq: 'Munich' },
      { name: 'Allianz', sector: 'Insurance', hq: 'Munich' },
      { name: 'Audi', sector: 'Automotive', hq: 'Ingolstadt' },
      { name: 'Adidas', sector: 'Sportswear', hq: 'Herzogenaurach' },
      { name: 'Infineon', sector: 'Semiconductors', hq: 'Neubiberg' },
    ],
  },
  'baden-wurttemberg': {
    id: 'baden-wurttemberg',
    name: 'Baden-Württemberg',
    germanName: 'Baden-Württemberg',
    capital: 'Stuttgart',
    population: '11.1 million',
    area: '35,751 km²',
    motto: 'Wir können alles. Außer Hochdeutsch.',
    description:
      'Baden-Württemberg is Germany\'s innovation powerhouse, home to global automotive giants, world-renowned universities, and the enchanting Black Forest. The state combines cutting-edge technology with deep-rooted Swabian traditions.',
    image: '/states/baden-wurtemberg.jpg',
    universities: [
      {
        name: 'Heidelberg University',
        germanRank: 3,
        type: 'university',
        city: 'Heidelberg',
        students: 29000,
        notable: 'Germany\'s oldest university (1386), Excellence in Medicine & Life Sciences',
      },
      {
        name: 'Karlsruhe Institute of Technology (KIT)',
        germanRank: 6,
        type: 'technical',
        city: 'Karlsruhe',
        students: 22500,
        notable: 'University of Excellence, leading in Engineering & Natural Sciences',
      },
      {
        name: 'University of Tübingen',
        germanRank: 8,
        type: 'university',
        city: 'Tübingen',
        students: 27000,
        notable: 'Excellence in Theology, Medicine, Law & Humanities',
      },
      {
        name: 'University of Freiburg',
        germanRank: 10,
        type: 'university',
        city: 'Freiburg',
        students: 25000,
        notable: 'Founded 1457, strong international orientation & research profile',
      },
      {
        name: 'University of Stuttgart',
        germanRank: 24,
        type: 'technical',
        city: 'Stuttgart',
        students: 24000,
        notable: 'Top engineering school with Mercedes-Benz & Bosch partnerships',
      },
      {
        name: 'University of Mannheim',
        germanRank: 35,
        type: 'university',
        city: 'Mannheim',
        students: 12000,
        notable: 'Germany\'s leading business school',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Heidelberg',
        city: 'Heidelberg',
        courses: ['G', 'M', 'T', 'W', 'S'],
        type: 'university',
      },
      {
        name: 'Studienkolleg KIT Karlsruhe',
        city: 'Karlsruhe',
        courses: ['T'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Konstanz',
        city: 'Konstanz',
        courses: ['T', 'W'],
        type: 'applied',
      },
    ],
    culture: [
      {
        title: 'Black Forest',
        description:
          'Germany\'s largest continuous forest, known for cuckoo clocks, cherry gâteau, and 17 Michelin-starred restaurants. A region of dark woods, healing spas, and ancient traditions.',
        icon: '🌲',
      },
      {
        title: 'Swabian Cuisine',
        description:
          'Home of Spätzle (egg noodles) and Maultaschen (Swabian ravioli). The region\'s hearty dishes reflect centuries of farming tradition and culinary creativity.',
        icon: '🍝',
      },
      {
        title: 'Bollenhut',
        description:
          'The iconic Black Forest hat with large red (unmarried) or black (married) pompoms. A symbol of regional identity still worn during festivals and special occasions.',
        icon: '🎩',
      },
      {
        title: 'Fastnacht Carnival',
        description:
          'The Swabian-Alemannic carnival tradition with elaborate wooden masks, colorful costumes, and centuries-old customs distinct from Rhineland Karneval.',
        icon: '🎭',
      },
      {
        title: 'Dialects',
        description:
          'Four distinct dialects: Schwäbisch, Badisch, Alemannisch, and Fränkisch. The locals affectionately call their state "Ländle" (little land).',
        icon: '💬',
      },
      {
        title: 'Craftsmanship',
        description:
          'Traditional Black Forest clockmaking, precision instruments, and jewelry. The region produces the majority of Germany\'s clocks, watches, and custom jewelry.',
        icon: '⏰',
      },
    ],
    keyNumbers: [
      { value: '11.1M', label: 'Population', context: '3rd largest state' },
      { value: '3.4%', label: 'Unemployment', context: '2nd lowest in Germany' },
      { value: '€524B', label: 'GDP', context: '3rd highest in Germany' },
      { value: '€1,695', label: 'Tuition/Semester', context: 'For non-EU students' },
    ],
    majorEmployers: [
      { name: 'Mercedes-Benz', sector: 'Automotive', hq: 'Stuttgart' },
      { name: 'Porsche', sector: 'Automotive', hq: 'Stuttgart' },
      { name: 'Bosch', sector: 'Engineering', hq: 'Gerlingen' },
      { name: 'SAP', sector: 'Software', hq: 'Walldorf' },
      { name: 'Schwarz Group', sector: 'Retail (Lidl)', hq: 'Neckarsulm' },
      { name: 'Carl Zeiss', sector: 'Optics', hq: 'Oberkochen' },
    ],
  },
};

// Icons
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const AreaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const getRankBadgeColor = (rank: number) => {
  if (rank <= 3) return 'bg-amber-100 text-amber-700 border-amber-200';
  if (rank <= 10) return 'bg-blue-100 text-blue-700 border-blue-200';
  if (rank <= 25) return 'bg-green-100 text-green-700 border-green-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
};

const getTypeLabel = (type: University['type']) => {
  switch (type) {
    case 'university':
      return 'Research University';
    case 'technical':
      return 'Technical University';
    case 'applied':
      return 'University of Applied Sciences';
  }
};

export function StatePage() {
  const { stateId } = useParams<{ stateId: string }>();
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation();
  const [uniRef, uniVisible] = useScrollAnimation();
  const [cultureRef, cultureVisible] = useScrollAnimation();
  const [kollegRef, kollegVisible] = useScrollAnimation();
  const [factsRef, factsVisible] = useScrollAnimation();

  const state = stateId ? statesData[stateId] : null;

  if (!state) {
    return (
      <div className="min-h-screen bg-page">
        <LandingNavbar />
        <div className="pt-32 text-center">
          <h1 className="text-3xl font-bold mb-4">State Not Found</h1>
          <p className="text-text-muted mb-8">The state you're looking for doesn't exist yet.</p>
          <Link to="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
          >
            <ArrowLeftIcon />
            <span>Back to Map</span>
          </Link>

          <div
            ref={heroRef}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
              <img
                src={state.image}
                alt={state.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-text">
                  {state.germanName}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-4 py-1 bg-primary-light text-primary rounded-full text-xs font-semibold mb-4 tracking-wider">
                GERMAN STATE
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {state.name}
              </h1>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                {state.description}
              </p>
              <p className="text-sm italic text-primary font-medium">"{state.motto}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={statsRef}
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <LocationIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">Capital</p>
              <p className="text-lg font-semibold">{state.capital}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <UsersIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">Population</p>
              <p className="text-lg font-semibold">{state.population}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <AreaIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">Area</p>
              <p className="text-lg font-semibold">{state.area}</p>
            </div>
            <div className="bg-page rounded-xl p-5 text-center shadow-soft">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary-light rounded-full mb-3">
                <BookIcon />
              </div>
              <p className="text-sm text-text-muted mb-1">Universities</p>
              <p className="text-lg font-semibold">{state.universities.length}+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={uniRef}
            className={`transition-all duration-700 ${uniVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-4 tracking-wider">
                HIGHER EDUCATION
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Top Universities in {state.name}
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                {state.name} is home to some of Germany's most prestigious universities, including two "Universities of Excellence."
              </p>
            </div>

            <div className="grid gap-4">
              {state.universities.map((uni, index) => (
                <div
                  key={uni.name}
                  className="bg-surface rounded-xl p-5 md:p-6 shadow-soft hover:shadow-card transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Rank Badge */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 font-bold text-lg ${getRankBadgeColor(uni.germanRank)}`}
                      >
                        #{uni.germanRank}
                      </div>
                      <div className="md:hidden">
                        <h3 className="font-semibold text-lg">{uni.name}</h3>
                        <p className="text-sm text-text-muted">{getTypeLabel(uni.type)}</p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="hidden md:block font-semibold text-lg mb-1">{uni.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                        <span className="hidden md:inline">{getTypeLabel(uni.type)}</span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1">
                          <LocationIcon />
                          {uni.city}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <UsersIcon />
                          {uni.students.toLocaleString()} students
                        </span>
                      </div>
                      <p className="text-sm text-primary mt-2">{uni.notable}</p>
                    </div>

                    {/* Rank Label */}
                    <div className="hidden lg:block text-right">
                      <div className="flex items-center gap-2 text-text-muted">
                        <TrophyIcon />
                        <span className="text-sm font-medium">Germany Rank</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={cultureRef}
            className={`transition-all duration-700 ${cultureVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold mb-4 tracking-wider">
                CULTURE & TRADITIONS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Discover Bavarian Culture
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                Experience the unique traditions, festivals, and lifestyle that make Bavaria special.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.culture.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-page rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Studienkolleg Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={kollegRef}
            className={`transition-all duration-700 ${kollegVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-4 tracking-wider">
                FOR INTERNATIONAL STUDENTS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Studienkollegs in {state.name}
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                Preparatory colleges that help international students qualify for German universities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
              {state.studienkollegs.map((kolleg) => (
                <div
                  key={kolleg.name}
                  className="bg-surface rounded-xl p-6 shadow-soft border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center flex-shrink-0">
                      <BookIcon />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{kolleg.name}</h3>
                      <p className="text-sm text-text-muted mb-3">
                        {kolleg.city} • {kolleg.type === 'university' ? 'For Universities' : 'For Applied Sciences'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {kolleg.courses.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-primary-light text-primary text-xs font-medium rounded-full"
                          >
                            {course}-Kurs
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/about-studienkolleg"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                Learn more about Studienkolleg
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div
            ref={factsRef}
            className={`transition-all duration-700 ${factsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            {/* Key Numbers Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-16">
              {state.keyNumbers.map((item) => (
                <div key={item.label} className="bg-page p-6 md:p-8 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-text mb-1 tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-sm font-medium text-text mb-1">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.context}</div>
                </div>
              ))}
            </div>

            {/* Major Employers */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-text-muted uppercase tracking-wide">
                Major Employers
              </h3>

              {/* Desktop: Table */}
              <table className="hidden sm:table w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-text-muted">
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Sector</th>
                    <th className="pb-3 font-medium text-right">Headquarters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {state.majorEmployers.map((employer) => (
                    <tr key={employer.name} className="text-sm">
                      <td className="py-3 font-medium text-text">{employer.name}</td>
                      <td className="py-3 text-text-muted">{employer.sector}</td>
                      <td className="py-3 text-text-muted text-right">{employer.hq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile: Stacked cards */}
              <div className="sm:hidden grid grid-cols-2 gap-3">
                {state.majorEmployers.map((employer) => (
                  <div key={employer.name} className="bg-page rounded-lg p-4 border border-border">
                    <div className="font-medium text-text mb-1">{employer.name}</div>
                    <div className="text-xs text-text-muted">
                      {employer.sector} · {employer.hq}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Study in {state.name}?
          </h2>
          <p className="text-text-muted mb-8 max-w-[500px] mx-auto">
            Start preparing for your Studienkolleg entrance exam with our comprehensive 30-day German course.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors shadow-soft"
            >
              Start Learning
            </Link>
            <Link
              to="/about-studienkolleg"
              className="px-6 py-3 bg-surface text-text rounded-lg font-medium hover:bg-gray-100 transition-colors border border-border"
            >
              Learn About Studienkolleg
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} Studiwelt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
