import { useParams, Link } from 'react-router-dom';
import { LandingNavbar } from '../components/landing/LandingNavbar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SEO, getStateSEO } from '../components/common/SEO';

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
  saarland: {
    id: 'saarland',
    name: 'Saarland',
    germanName: 'Saarland',
    capital: 'Saarbrücken',
    population: '0.99 million',
    area: '2,570 km²',
    motto: 'Großes entsteht immer im Kleinen.',
    description:
      'Saarland is a hidden gem in southwestern Germany, bordering France and Luxembourg. Known for its "savoir-vivre" lifestyle, it combines industrial heritage with lush nature and a rapidly growing IT research sector centered around the CISPA Helmholtz Center.',
    image: '/states/saarland.jpg',
    universities: [
      {
        name: 'Saarland University (UdS)',
        germanRank: 42,
        type: 'university',
        city: 'Saarbrücken',
        students: 17000,
        notable: 'Leading in Computer Science (Max Planck Institutes) & European Law',
      },
    ],
    studienkollegs: [],
    culture: [
      {
        title: 'Saarschleife',
        description:
          'The Great Loop of the Saar river at Mettlach. A breathtaking natural wonder and the state\'s most iconic landmark, best viewed from the Cloef viewpoint.',
        icon: '🏞️',
      },
      {
        title: 'Savoir Vivre',
        description:
          'A unique French-influenced lifestyle. Saarlanders enjoy good food ("Hauptsach gudd gess"), wine, and a relaxed pace of life unlike anywhere else in Germany.',
        icon: '🍷',
      },
      {
        title: 'Völklinger Hütte',
        description:
          'A UNESCO World Heritage site. This massive former ironworks plant has been preserved as a fascinating cultural center, exhibition space, and industrial museum.',
        icon: '🏭',
      },
      {
        title: 'Schwenken',
        description:
          'The local art of grilling on a swinging grill (Schwenker). It is more than just cooking; it is a social religion and the center of summer gatherings.',
        icon: '🍖',
      },
      {
        title: 'Silicon Saarland',
        description:
          'Home to the CISPA Helmholtz Center and Max Planck Institutes, the state is a global hotspot for cybersecurity and AI research, attracting talent worldwide.',
        icon: '💻',
      },
      {
        title: 'Three-Country Corner',
        description:
          'Bordering France and Luxembourg, the region offers a truly European experience. You can hike across borders and experience three cultures in one day.',
        icon: '🇪🇺',
      },
    ],
    keyNumbers: [
      { value: '0.99M', label: 'Population', context: 'Smallest area state' },
      { value: '6.8%', label: 'Unemployment', context: 'Transitioning economy' },
      { value: '€38B', label: 'GDP', context: 'High per capita' },
      { value: '17%', label: 'Int\'l Students', context: 'At Saarland Univ.' },
    ],
    majorEmployers: [
      { name: 'ZF', sector: 'Automotive', hq: 'Saarbrücken' },
      { name: 'Bosch', sector: 'Engineering', hq: 'Homburg' },
      { name: 'Villeroy & Boch', sector: 'Ceramics', hq: 'Mettlach' },
      { name: 'Dillinger Hütte', sector: 'Steel', hq: 'Dillingen' },
      { name: 'Saarland Univ.', sector: 'Research', hq: 'Saarbrücken' },
      { name: 'Globus', sector: 'Retail', hq: 'St. Wendel' },
    ],
  },
  'rhineland-palatinate': {
    id: 'rhineland-palatinate',
    name: 'Rhineland-Palatinate',
    germanName: 'Rheinland-Pfalz',
    capital: 'Mainz',
    population: '4.1 million',
    area: '19,854 km²',
    motto: 'Wir machen es einfach.',
    description:
      'Rhineland-Palatinate is the land of vineyards and forests. Home to the romantic Rhine Valley, Germany\'s oldest city Trier, and global chemical giant BASF, it offers a perfect balance of high-tech industry and relaxed lifestyle.',
    image: '/states/Rhineland-Palatinate.jpg',
    universities: [
      {
        name: 'Johannes Gutenberg University Mainz',
        germanRank: 23,
        type: 'university',
        city: 'Mainz',
        students: 31000,
        notable: 'One of Germany\'s largest and most diverse universities',
      },
      {
        name: 'RPTU Kaiserslautern-Landau',
        germanRank: 45,
        type: 'technical',
        city: 'Kaiserslautern',
        students: 20000,
        notable: 'Leading in AI and Computer Science (DFKI headquarters)',
      },
      {
        name: 'University of Trier',
        germanRank: 55,
        type: 'university',
        city: 'Trier',
        students: 11000,
        notable: 'Strong focus on humanities and social sciences',
      },
      {
        name: 'University of Koblenz',
        germanRank: 90,
        type: 'university',
        city: 'Koblenz',
        students: 9000,
        notable: 'Young university with strong regional integration',
      },
    ],
    studienkollegs: [
      {
        name: 'ISSK Mainz',
        city: 'Mainz',
        courses: ['G', 'M', 'T', 'W', 'S'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Kaiserslautern',
        city: 'Kaiserslautern',
        courses: ['T', 'W'],
        type: 'applied',
      },
    ],
    culture: [
      {
        title: 'Wine Country',
        description:
          'Produces 70% of Germany\'s wine. The Deutsche Weinstraße (German Wine Route) offers picturesque villages, world-class Riesling, and endless autumn festivals.',
        icon: '🍇',
      },
      {
        title: 'Roman Legacy',
        description:
          'Trier, founded by Romans in 16 BC, is Germany\'s oldest city. The Porta Nigra and other monuments stand as UNESCO World Heritage sites.',
        icon: '🏛️',
      },
      {
        title: 'Romantic Rhine',
        description:
          'The Middle Rhine Valley with its steep vineyards, the legendary Lorelei rock, and the highest density of castles in the world.',
        icon: '🏰',
      },
      {
        title: 'Mainzer Fastnacht',
        description:
          'One of the largest carnival celebrations in Germany. A "fifth season" of parades, political satire, and street parties starting every November.',
        icon: '🎭',
      },
      {
        title: 'Palatinate Forest',
        description:
          'Germany\'s largest contiguous forest area and a UNESCO Biosphere Reserve. A paradise for hikers, climbers, and nature lovers.',
        icon: '🌲',
      },
      {
        title: 'Chemical Valley',
        description:
          'Home to Ludwigshafen and BASF, the world\'s largest chemical plant. The region is a global powerhouse for chemistry and pharmaceuticals.',
        icon: '⚗️',
      },
    ],
    keyNumbers: [
      { value: '4.1M', label: 'Population', context: '6th largest state' },
      { value: '4.6%', label: 'Unemployment', context: 'Below national average' },
      { value: '€172B', label: 'GDP', context: 'Export-strong economy' },
      { value: '€0', label: 'Tuition Fees', context: 'For all students' },
    ],
    majorEmployers: [
      { name: 'BASF', sector: 'Chemicals', hq: 'Ludwigshafen' },
      { name: 'Boehringer Ingelheim', sector: 'Pharma', hq: 'Ingelheim' },
      { name: 'Debeka', sector: 'Insurance', hq: 'Koblenz' },
      { name: 'BioNTech', sector: 'Biotech', hq: 'Mainz' },
      { name: 'Schott AG', sector: 'Glass', hq: 'Mainz' },
      { name: 'Daimler Truck', sector: 'Automotive', hq: 'Wörth' },
    ],
  },
  hesse: {
    id: 'hesse',
    name: 'Hesse',
    germanName: 'Hessen',
    capital: 'Wiesbaden',
    population: '6.3 million',
    area: '21,100 km²',
    motto: 'An Hessen führt kein Weg vorbei.',
    description:
      'Hesse is the heart of Germany and Europe\'s financial capital. With Frankfurt\'s skyline, the dense forests of the Taunus, and the historic charm of towns like Marburg, it offers a dynamic mix of global business and rich tradition.',
    image: '/states/hesse.jpg',
    universities: [
      {
        name: 'Goethe University Frankfurt',
        germanRank: 15,
        type: 'university',
        city: 'Frankfurt',
        students: 45000,
        notable: 'Strong in Finance, Law, and Economics (House of Finance)',
      },
      {
        name: 'Technical University of Darmstadt',
        germanRank: 25,
        type: 'technical',
        city: 'Darmstadt',
        students: 25000,
        notable: 'First autonomous university in Germany, specialized in engineering',
      },
      {
        name: 'Justus Liebig University Giessen',
        germanRank: 40,
        type: 'university',
        city: 'Giessen',
        students: 28000,
        notable: 'Famous for Life Sciences and Cultural Studies',
      },
      {
        name: 'University of Marburg',
        germanRank: 48,
        type: 'university',
        city: 'Marburg',
        students: 22000,
        notable: 'World\'s oldest Protestant university, founded in 1527',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Frankfurt',
        city: 'Frankfurt',
        courses: ['M', 'T', 'W', 'G'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Darmstadt',
        city: 'Darmstadt',
        courses: ['T', 'G'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Mittelhessen',
        city: 'Marburg',
        courses: ['M', 'T', 'W', 'G', 'S'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Kassel',
        city: 'Kassel',
        courses: ['T', 'W'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Mainhattan',
        description:
          'Frankfurt is the only German city with a massive skyline. It is the financial heart of the Eurozone, home to the ECB and the Stock Exchange.',
        icon: '🏙️',
      },
      {
        title: 'Apfelwein',
        description:
          'The state\'s national drink. "Ebbelwoi" is a tart cider traditionally served in a Bembel (stone jug) and drunk from a ribbed glass (Geripptes).',
        icon: '🍎',
      },
      {
        title: 'Brothers Grimm',
        description:
          'Jacob and Wilhelm Grimm lived and worked in Kassel and Hanau. Their world-famous fairy tales (Cinderella, Hansel & Gretel) originate here.',
        icon: '📚',
      },
      {
        title: 'Rheingau',
        description:
          'One of Germany\'s most prestigious wine regions, known globally for its Riesling. A landscape of rolling vineyards, castles, and the Rhine river.',
        icon: '🥂',
      },
      {
        title: 'Documenta',
        description:
          'The world\'s most important exhibition of modern art, taking place every five years in Kassel. It transforms the entire city into a living museum.',
        icon: '🎨',
      },
      {
        title: 'Spa Towns',
        description:
          'Wiesbaden and Bad Homburg are famous historic spa towns. Their thermal springs and casinos have attracted royalty and visitors for centuries.',
        icon: '🧖',
      },
    ],
    keyNumbers: [
      { value: '6.3M', label: 'Population', context: '5th largest state' },
      { value: '4.9%', label: 'Unemployment', context: 'Strong job market' },
      { value: '€323B', label: 'GDP', context: 'Highest GDP per capita' },
      { value: '14%', label: 'Int\'l Students', context: 'Global hub' },
    ],
    majorEmployers: [
      { name: 'Lufthansa', sector: 'Aviation', hq: 'Frankfurt' },
      { name: 'Deutsche Bank', sector: 'Finance', hq: 'Frankfurt' },
      { name: 'Merck', sector: 'Pharma', hq: 'Darmstadt' },
      { name: 'Fraport', sector: 'Logistics', hq: 'Frankfurt' },
      { name: 'Opel (Stellantis)', sector: 'Automotive', hq: 'Rüsselsheim' },
      { name: 'Fresenius', sector: 'Healthcare', hq: 'Bad Homburg' },
    ],
  },
  thuringia: {
    id: 'thuringia',
    name: 'Thuringia',
    germanName: 'Thüringen',
    capital: 'Erfurt',
    population: '2.1 million',
    area: '16,171 km²',
    motto: 'Das ist Thüringen.',
    description:
      'Thuringia is known as the "Green Heart of Germany" due to its vast forests. It is a state of immense cultural significance, home to Weimar Classicism, the Bauhaus movement, and Martin Luther\'s Wartburg, blending history with modern optical and tech industries.',
    image: '/states/thuringia.jpg',
    universities: [
      {
        name: 'Friedrich Schiller University Jena',
        germanRank: 28,
        type: 'university',
        city: 'Jena',
        students: 17500,
        notable: 'Historic university associated with Goethe, Schiller, and Hegel',
      },
      {
        name: 'Ilmenau University of Technology',
        germanRank: 60,
        type: 'technical',
        city: 'Ilmenau',
        students: 5000,
        notable: 'Strong focus on media technology and engineering',
      },
      {
        name: 'Bauhaus University Weimar',
        germanRank: 70,
        type: 'university',
        city: 'Weimar',
        students: 4000,
        notable: 'World-renowned for architecture, art, and design',
      },
      {
        name: 'University of Erfurt',
        germanRank: 85,
        type: 'university',
        city: 'Erfurt',
        students: 6000,
        notable: 'Specialized in humanities and social sciences',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Nordhausen',
        city: 'Nordhausen',
        courses: ['T', 'M', 'W', 'G', 'S'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Weimar Classicism',
        description:
          'Home to Goethe and Schiller, Weimar was the intellectual center of Europe in the 18th century. The city boasts multiple UNESCO World Heritage sites.',
        icon: '🎭',
      },
      {
        title: 'Bauhaus',
        description:
          'The revolutionary Bauhaus art school was founded in Weimar in 1919 by Walter Gropius, shaping modern architecture and design worldwide.',
        icon: '🏗️',
      },
      {
        title: 'Wartburg Castle',
        description:
          'Located in Eisenach, this is where Martin Luther translated the New Testament into German. A symbol of German unity and a UNESCO site.',
        icon: '🏰',
      },
      {
        title: 'Thuringian Bratwurst',
        description:
          'The "Rostbratwurst" is a protected regional specialty with a 600-year history. Grilling it over charcoal is a beloved local tradition.',
        icon: '🌭',
      },
      {
        title: 'Green Heart',
        description:
          'The Thuringian Forest offers endless hiking trails, including the famous Rennsteig, and transforms into a winter sports paradise in snowy months.',
        icon: '🌲',
      },
      {
        title: 'Erfurt\'s Merchants\' Bridge',
        description:
          'The Krämerbrücke is the longest inhabited bridge in Europe, lined with charming half-timbered houses, artisan shops, and cafes.',
        icon: '🌉',
      },
    ],
    keyNumbers: [
      { value: '2.1M', label: 'Population', context: 'Centrally located' },
      { value: '5.8%', label: 'Unemployment', context: 'Stable economy' },
      { value: '€75B', label: 'GDP', context: 'Growing tech sector' },
      { value: '€0', label: 'Tuition Fees', context: 'Low cost of living' },
    ],
    majorEmployers: [
      { name: 'Carl Zeiss Meditec', sector: 'Optics/MedTech', hq: 'Jena' },
      { name: 'Jenoptik', sector: 'Photonics', hq: 'Jena' },
      { name: 'TEAG', sector: 'Energy', hq: 'Erfurt' },
      { name: 'Amazon', sector: 'Logistics', hq: 'Erfurt' },
      { name: 'Stadtwerke Erfurt', sector: 'Utilities', hq: 'Erfurt' },
      { name: 'Funke Medien', sector: 'Media', hq: 'Erfurt' },
    ],
  },
  saxony: {
    id: 'saxony',
    name: 'Saxony',
    germanName: 'Sachsen',
    capital: 'Dresden',
    population: '4.1 million',
    area: '18,416 km²',
    motto: 'So geht sächsisch.',
    description:
      'Saxony is the dynamic cultural and economic center of Eastern Germany. From the "Silicon Saxony" tech hub in Dresden to the trendy creative scene in Leipzig and the natural wonders of the Elbe Sandstone Mountains, it offers a unique blend of innovation and history.',
    image: '/states/saxony.jpg',
    universities: [
      {
        name: 'TU Dresden',
        germanRank: 11,
        type: 'technical',
        city: 'Dresden',
        students: 32000,
        notable: 'University of Excellence, one of the largest technical universities in Germany',
      },
      {
        name: 'Leipzig University',
        germanRank: 22,
        type: 'university',
        city: 'Leipzig',
        students: 31000,
        notable: 'Second oldest university in Germany (1409), alma mater of Goethe and Nietzsche',
      },
      {
        name: 'Chemnitz University of Technology',
        germanRank: 58,
        type: 'technical',
        city: 'Chemnitz',
        students: 10000,
        notable: 'Strong focus on automotive and mechanical engineering',
      },
      {
        name: 'TU Bergakademie Freiberg',
        germanRank: 72,
        type: 'technical',
        city: 'Freiberg',
        students: 4000,
        notable: 'World\'s oldest university of mining and metallurgy',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Sachsen',
        city: 'Leipzig',
        courses: ['M', 'T', 'W', 'G', 'S'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Silicon Saxony',
        description:
          'Europe\'s largest microelectronics cluster is based in Dresden. One in every three chips produced in Europe is made here, driving global innovation.',
        icon: '💻',
      },
      {
        title: 'Saxon Switzerland',
        description:
          'The Elbe Sandstone Mountains offer dramatic rock formations and the famous Bastei Bridge. A paradise for climbers and hikers just south of Dresden.',
        icon: '🧗',
      },
      {
        title: 'Baroque Splendor',
        description:
          'Dresden, known as "Florence on the Elbe," features world-class architecture like the Frauenkirche, Zwinger Palace, and Semperoper.',
        icon: '🏛️',
      },
      {
        title: 'City of Music',
        description:
          'Leipzig is the city of Bach, Mendelssohn, and Wagner. The St. Thomas Boys Choir and the Gewandhaus Orchestra are world-renowned.',
        icon: '🎻',
      },
      {
        title: 'Christmas Markets',
        description:
          'The Dresden Striezelmarkt is Germany\'s oldest Christmas market (1434). The region is famous for Ore Mountain wood crafts and Nutcrackers.',
        icon: '🎄',
      },
      {
        title: 'Meissen Porcelain',
        description:
          'Europe\'s first hard-paste porcelain was invented here. The "White Gold" from Meissen remains a symbol of ultimate luxury and craftsmanship.',
        icon: '☕',
      },
    ],
    keyNumbers: [
      { value: '4.1M', label: 'Population', context: 'Most populous in East' },
      { value: '5.7%', label: 'Unemployment', context: 'Leading Eastern state' },
      { value: '€146B', label: 'GDP', context: 'Strong industrial base' },
      { value: '16%', label: 'Int\'l Students', context: 'At TU Dresden' },
    ],
    majorEmployers: [
      { name: 'Volkswagen', sector: 'Automotive', hq: 'Zwickau' },
      { name: 'DHL Hub', sector: 'Logistics', hq: 'Leipzig' },
      { name: 'Infineon', sector: 'Semiconductors', hq: 'Dresden' },
      { name: 'BMW', sector: 'Automotive', hq: 'Leipzig' },
      { name: 'GlobalFoundries', sector: 'Semiconductors', hq: 'Dresden' },
      { name: 'Porsche', sector: 'Automotive', hq: 'Leipzig' },
    ],
  },
  'north-rhine-westphalia': {
    id: 'north-rhine-westphalia',
    name: 'North Rhine-Westphalia',
    germanName: 'Nordrhein-Westfalen',
    capital: 'Düsseldorf',
    population: '17.9 million',
    area: '34,110 km²',
    motto: 'Germany\'s Economic Powerhouse',
    description:
      'NRW is Germany\'s most populous state, a unique fusion of industrial heritage and modern innovation. From the vibrant Rhine cities of Cologne and Düsseldorf to the transformed Ruhr region, it offers a dense network of universities and career opportunities.',
    image: '/states/nrw.jpg',
    universities: [
      {
        name: 'RWTH Aachen University',
        germanRank: 5,
        type: 'technical',
        city: 'Aachen',
        students: 47000,
        notable: 'Germany\'s largest technical university, a global leader in engineering',
      },
      {
        name: 'University of Bonn',
        germanRank: 5,
        type: 'university',
        city: 'Bonn',
        students: 38000,
        notable: 'Produced 2 Nobel Prize winners recently, University of Excellence',
      },
      {
        name: 'University of Cologne',
        germanRank: 12,
        type: 'university',
        city: 'Cologne',
        students: 50000,
        notable: 'One of the oldest (1388) and largest universities in Germany',
      },
      {
        name: 'University of Münster',
        germanRank: 20,
        type: 'university',
        city: 'Münster',
        students: 45000,
        notable: 'Famous for its high quality of life and bicycle-friendly campus',
      },
      {
        name: 'Ruhr University Bochum',
        germanRank: 35,
        type: 'university',
        city: 'Bochum',
        students: 43000,
        notable: 'First new university founded in West Germany after WWII',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Mettingen',
        city: 'Mettingen',
        courses: ['T', 'M', 'W', 'G'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Bochum',
        city: 'Bochum',
        courses: ['T'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Cologne Cathedral',
        description:
          'The Kölner Dom is a Gothic masterpiece and Germany\'s most visited landmark. A UNESCO World Heritage site that took 632 years to complete.',
        icon: '⛪',
      },
      {
        title: 'Carnival',
        description:
          'The "Fifth Season" sees millions celebrating on the streets of Cologne, Düsseldorf, and Mainz. A time of parades, costumes, and pure joy.',
        icon: '🎭',
      },
      {
        title: 'Industrial Culture',
        description:
          'The Ruhr area transformed from coal mines to culture. Sites like Zeche Zollverein in Essen show how industry became art and leisure.',
        icon: '🏭',
      },
      {
        title: 'Düsseldorf Fashion',
        description:
          'Known as Germany\'s fashion capital, Düsseldorf boasts the elegant Königsallee ("Kö") shopping boulevard and a vibrant art scene.',
        icon: '👗',
      },
      {
        title: 'Beethoven\'s City',
        description:
          'Bonn is the birthplace of Ludwig van Beethoven. His legacy is celebrated in museums, festivals, and the historic atmosphere of the former capital.',
        icon: '🎹',
      },
      {
        title: 'Football Passion',
        description:
          'Football is a religion here. Home to legendary clubs like Borussia Dortmund and Schalke 04, the region has the highest density of stadiums in Europe.',
        icon: '⚽',
      },
    ],
    keyNumbers: [
      { value: '17.9M', label: 'Population', context: 'Most populous state' },
      { value: '7.2%', label: 'Unemployment', context: 'Diverse economy' },
      { value: '€793B', label: 'GDP', context: 'Highest in Germany' },
      { value: '22%', label: 'Int\'l Background', context: 'Multicultural society' },
    ],
    majorEmployers: [
      { name: 'Deutsche Telekom', sector: 'Telecommunications', hq: 'Bonn' },
      { name: 'DHL Group', sector: 'Logistics', hq: 'Bonn' },
      { name: 'E.ON', sector: 'Energy', hq: 'Essen' },
      { name: 'Bayer', sector: 'Pharma/Chem', hq: 'Leverkusen' },
      { name: 'ThyssenKrupp', sector: 'Industrial', hq: 'Essen' },
      { name: 'Ford', sector: 'Automotive', hq: 'Cologne' },
    ],
  },
  'saxony-anhalt': {
    id: 'saxony-anhalt',
    name: 'Saxony-Anhalt',
    germanName: 'Sachsen-Anhalt',
    capital: 'Magdeburg',
    population: '2.2 million',
    area: '20,451 km²',
    motto: '#moderndenken',
    description:
      'Saxony-Anhalt is a region of cultural awakening and modern innovation. From the cradle of the Reformation in Wittenberg to the birthplace of the Bauhaus movement in Dessau, it offers a rich history alongside a growing high-tech and renewable energy sector.',
    image: '/states/saxony-anhalt.jpg',
    universities: [
      {
        name: 'Martin Luther University Halle-Wittenberg',
        germanRank: 32,
        type: 'university',
        city: 'Halle (Saale)',
        students: 20000,
        notable: 'One of the oldest universities in Germany, rich in tradition and research',
      },
      {
        name: 'Otto von Guericke University Magdeburg',
        germanRank: 48,
        type: 'university',
        city: 'Magdeburg',
        students: 14000,
        notable: 'Strong focus on engineering, computer science, and medicine',
      },
    ],
    studienkollegs: [
      {
        name: 'Landesstudienkolleg Sachsen-Anhalt',
        city: 'Halle (Saale)',
        courses: ['T', 'M', 'W', 'G', 'S'],
        type: 'university',
      },
      {
        name: 'Studienkolleg Köthen',
        city: 'Köthen',
        courses: ['T', 'W', 'G'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Bauhaus Dessau',
        description:
          'The iconic Bauhaus building in Dessau is a UNESCO World Heritage site. It was the center of modern design and architecture in the 1920s.',
        icon: '🏗️',
      },
      {
        title: 'Lutherstadt Wittenberg',
        description:
          'The birthplace of the Reformation. Martin Luther nailed his 95 Theses to the door of the Castle Church here, changing history forever.',
        icon: '📜',
      },
      {
        title: 'Harz Mountains',
        description:
          'A mountain range full of legends, witches, and the Brocken peak. The Harz Narrow Gauge Railways offer a nostalgic steam train ride through the forests.',
        icon: '🚂',
      },
      {
        title: 'Quedlinburg',
        description:
          'A remarkably preserved medieval town with over 1,300 half-timbered houses. Walking through its streets feels like stepping back in time.',
        icon: '🏘️',
      },
      {
        title: 'Halle (Saale)',
        description:
          'A cultural capital known for the composer George Frideric Handel and the vibrant Nebra Sky Disc, the world\'s oldest map of the stars.',
        icon: '🎼',
      },
      {
        title: 'Garden Kingdom',
        description:
          'The Dessau-Wörlitz Garden Realm is a stunning cultural landscape of English-style parks and palaces, recognized by UNESCO.',
        icon: '🌳',
      },
    ],
    keyNumbers: [
      { value: '2.2M', label: 'Population', context: 'Rich cultural heritage' },
      { value: '6.9%', label: 'Unemployment', context: 'Improving economy' },
      { value: '€70B', label: 'GDP', context: 'Strong chemical industry' },
      { value: '€0', label: 'Tuition Fees', context: 'Low living costs' },
    ],
    majorEmployers: [
      { name: 'Deutsche Bahn', sector: 'Transport', hq: 'Regional Hub' },
      { name: 'DHL Hub', sector: 'Logistics', hq: 'Leipzig/Halle' },
      { name: 'Univ. Klinikum Halle', sector: 'Healthcare', hq: 'Halle' },
      { name: 'Ameos', sector: 'Healthcare', hq: 'Aschersleben' },
      { name: 'Stadtwerke Halle', sector: 'Utilities', hq: 'Halle' },
      { name: 'TotalEnergies', sector: 'Chemicals', hq: 'Leuna' },
    ],
  },
  'lower-saxony': {
    id: 'lower-saxony',
    name: 'Lower Saxony',
    germanName: 'Niedersachsen',
    capital: 'Hanover',
    population: '8.1 million',
    area: '47,614 km²',
    motto: 'Klar.',
    description:
      'Lower Saxony stretches from the North Sea coast to the Harz mountains. It is a land of wide horizons, automotive giants like Volkswagen, and world-class research universities, offering a high quality of life and diverse landscapes.',
    image: '/states/lower_saxony.jpg',
    universities: [
      {
        name: 'University of Göttingen',
        germanRank: 10,
        type: 'university',
        city: 'Göttingen',
        students: 28000,
        notable: 'Produced over 40 Nobel Prize winners, highly prestigious',
      },
      {
        name: 'Leibniz University Hannover',
        germanRank: 38,
        type: 'university',
        city: 'Hanover',
        students: 29000,
        notable: 'Member of TU9, leading in engineering and technology',
      },
      {
        name: 'TU Braunschweig',
        germanRank: 55,
        type: 'technical',
        city: 'Braunschweig',
        students: 17000,
        notable: 'Oldest technical university in Germany, focus on mobility and aviation',
      },
      {
        name: 'Clausthal University of Technology',
        germanRank: 80,
        type: 'technical',
        city: 'Clausthal-Zellerfeld',
        students: 4000,
        notable: 'Unique focus on energy, raw materials, and material science',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Niedersachsen',
        city: 'Hanover',
        courses: ['M', 'T', 'W', 'G', 'S'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Autostadt Wolfsburg',
        description:
          'A massive automotive theme park and museum adjacent to the Volkswagen factory. A pilgrimage site for car enthusiasts from around the world.',
        icon: '🚗',
      },
      {
        title: 'Lüneburg Heath',
        description:
          'A unique landscape of purple heather blooming in late summer. Historic towns like Lüneburg offer medieval charm and salt-mining history.',
        icon: '🌾',
      },
      {
        title: 'East Frisian Islands',
        description:
          'The seven islands in the Wadden Sea UNESCO World Heritage site are famous for their sandy beaches, lighthouses, and traditional tea culture.',
        icon: '🏝️',
      },
      {
        title: 'Goslar Old Town',
        description:
          'A UNESCO World Heritage site with over 1,500 half-timbered houses and the Imperial Palace (Kaiserpfalz), reflecting its wealth from mining.',
        icon: '⚒️',
      },
      {
        title: 'Hanover Fair',
        description:
          'The world\'s largest industrial trade fair takes place here every year, showcasing the latest innovations in technology and engineering.',
        icon: '🏭',
      },
      {
        title: 'Meyer Werft',
        description:
          'Located in Papenburg, this shipyard builds the world\'s largest cruise ships. Seeing these giants navigate the narrow Ems river is a spectacle.',
        icon: '🚢',
      },
    ],
    keyNumbers: [
      { value: '8.1M', label: 'Population', context: '4th largest state' },
      { value: '5.9%', label: 'Unemployment', context: 'Stable market' },
      { value: '€339B', label: 'GDP', context: 'Strong auto sector' },
      { value: '€0', label: 'Tuition Fees', context: 'Semester contribution only' },
    ],
    majorEmployers: [
      { name: 'Volkswagen', sector: 'Automotive', hq: 'Wolfsburg' },
      { name: 'Continental', sector: 'Automotive', hq: 'Hanover' },
      { name: 'Talanx', sector: 'Insurance', hq: 'Hanover' },
      { name: 'Salzgitter AG', sector: 'Steel', hq: 'Salzgitter' },
      { name: 'Rossmann', sector: 'Retail', hq: 'Burgwedel' },
      { name: 'Sartorius', sector: 'Pharma/Bio', hq: 'Göttingen' },
    ],
  },
  brandenburg: {
    id: 'brandenburg',
    name: 'Brandenburg',
    germanName: 'Brandenburg',
    capital: 'Potsdam',
    population: '2.5 million',
    area: '29,480 km²',
    motto: 'Es kann so einfach sein.',
    description:
      'Brandenburg surrounds Berlin and is a land of lakes, forests, and Prussian history. From the palaces of Potsdam to the Spreewald canals and the new Tesla Gigafactory, it offers a high quality of life with easy access to the capital.',
    image: '/states/brandenburg.jpg',
    universities: [
      {
        name: 'University of Potsdam',
        germanRank: 30,
        type: 'university',
        city: 'Potsdam',
        students: 22000,
        notable: 'Largest university in the state, strong in humanities and science',
      },
      {
        name: 'BTU Cottbus-Senftenberg',
        germanRank: 65,
        type: 'technical',
        city: 'Cottbus',
        students: 7000,
        notable: 'Leading in energy, environment, and materials research',
      },
      {
        name: 'European University Viadrina',
        germanRank: 75,
        type: 'university',
        city: 'Frankfurt (Oder)',
        students: 5000,
        notable: 'Focus on international relations, law, and economics',
      },
      {
        name: 'Film University Babelsberg',
        germanRank: 150,
        type: 'university',
        city: 'Potsdam',
        students: 1000,
        notable: 'Germany\'s oldest and largest film school',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg at University of Potsdam',
        city: 'Potsdam',
        courses: ['T', 'M', 'W', 'G', 'S'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Sanssouci Palace',
        description:
          'Frederick the Great\'s summer palace in Potsdam is a Rococo masterpiece. The park and palace complex is a UNESCO World Heritage site.',
        icon: '🏰',
      },
      {
        title: 'Spreewald',
        description:
          'A UNESCO biosphere reserve where the Spree river branches into hundreds of small canals. Famous for punt boat rides and Spreewald gherkins.',
        icon: '🛶',
      },
      {
        title: 'Babelsberg Studio',
        description:
          'The oldest large-scale film studio in the world. Masterpieces like "Metropolis" and modern blockbusters like "Inglourious Basterds" were filmed here.',
        icon: '🎬',
      },
      {
        title: 'Tropical Islands',
        description:
          'Housed in a former airship hangar, this is the world\'s largest indoor water park, featuring a rainforest, beach, and lagoon.',
        icon: '🌴',
      },
      {
        title: 'Cecilienhof',
        description:
          'The site of the Potsdam Conference in 1945, where Truman, Churchill, and Stalin decided the future of Germany and Europe.',
        icon: '🤝',
      },
      {
        title: '3000 Lakes',
        description:
          'Brandenburg is one of the most water-rich states in Germany, with over 3,000 lakes offering endless opportunities for swimming and sailing.',
        icon: '⛵',
      },
    ],
    keyNumbers: [
      { value: '2.5M', label: 'Population', context: 'Surrounds Berlin' },
      { value: '6.0%', label: 'Unemployment', context: 'Growing tech sector' },
      { value: '€88B', label: 'GDP', context: 'Driven by new industry' },
      { value: '€0', label: 'Tuition Fees', context: 'Semester contribution only' },
    ],
    majorEmployers: [
      { name: 'Tesla', sector: 'Automotive', hq: 'Grünheide' },
      { name: 'ZF', sector: 'Automotive', hq: 'Brandenburg a.d.H.' },
      { name: 'Rolls-Royce', sector: 'Aerospace', hq: 'Dahlewitz' },
      { name: 'BASF', sector: 'Chemicals', hq: 'Schwarzheide' },
      { name: 'AOK Nordost', sector: 'Insurance', hq: 'Potsdam' },
      { name: 'Höffner', sector: 'Retail', hq: 'Schönefeld' },
    ],
  },
  berlin: {
    id: 'berlin',
    name: 'Berlin',
    germanName: 'Berlin',
    capital: 'Berlin',
    population: '3.7 million',
    area: '891 km²',
    motto: 'Arm, aber sexy.',
    description:
      'Berlin is the capital of Germany and a global hub for culture, politics, and science. Known for its vibrant start-up scene, diverse international community, and rich history, it is one of the most exciting cities in Europe to live and study.',
    image: '/states/berlin.jpg',
    universities: [
      {
        name: 'Freie Universität Berlin',
        germanRank: 4,
        type: 'university',
        city: 'Berlin',
        students: 33000,
        notable: 'University of Excellence, strong in humanities and social sciences',
      },
      {
        name: 'Humboldt-Universität zu Berlin',
        germanRank: 7,
        type: 'university',
        city: 'Berlin',
        students: 36000,
        notable: 'The mother of all modern universities, alma mater of 29 Nobel laureates',
      },
      {
        name: 'Technische Universität Berlin',
        germanRank: 18,
        type: 'technical',
        city: 'Berlin',
        students: 34000,
        notable: 'Member of TU9, leading in engineering and computer science',
      },
      {
        name: 'Charité - Universitätsmedizin Berlin',
        germanRank: 6,
        type: 'university',
        city: 'Berlin',
        students: 8000,
        notable: 'One of the largest and most prestigious university hospitals in Europe',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg at FU Berlin',
        city: 'Berlin',
        courses: ['M', 'T', 'W', 'G'],
        type: 'university',
      },
      {
        name: 'Studienkolleg at TU Berlin',
        city: 'Berlin',
        courses: ['T', 'W'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Brandenburg Gate',
        description:
          'The city\'s most famous landmark and a symbol of German reunification. It stands at the heart of the capital, witnessing centuries of history.',
        icon: '🏛️',
      },
      {
        title: 'Start-up Capital',
        description:
          'Berlin is Europe\'s Silicon Valley, home to unicorns like Zalando and N26. The city attracts entrepreneurs and digital nomads from all over the world.',
        icon: '🚀',
      },
      {
        title: 'Museum Island',
        description:
          'A UNESCO World Heritage site in the Spree river, hosting five world-class museums including the Pergamon and the Altes Museum.',
        icon: '🏺',
      },
      {
        title: 'Club Culture',
        description:
          'Berlin\'s nightlife is legendary. Clubs like Berghain and the diverse techno scene have made the city a global destination for music lovers.',
        icon: '🔊',
      },
      {
        title: 'East Side Gallery',
        description:
          'The longest remaining section of the Berlin Wall, now an open-air gallery featuring murals by artists from around the world.',
        icon: '🎨',
      },
      {
        title: 'Currywurst',
        description:
          'Berlin\'s signature street food. Steamed and fried pork sausage seasoned with curry ketchup, best enjoyed at a local "Imbiss".',
        icon: '🌭',
      },
    ],
    keyNumbers: [
      { value: '3.7M', label: 'Population', context: 'Germany\'s largest city' },
      { value: '8.8%', label: 'Unemployment', context: 'Dynamic job market' },
      { value: '€179B', label: 'GDP', context: 'Service-driven economy' },
      { value: '24%', label: 'Int\'l Students', context: 'Highly international' },
    ],
    majorEmployers: [
      { name: 'Deutsche Bahn', sector: 'Transport', hq: 'Berlin' },
      { name: 'Charité', sector: 'Healthcare', hq: 'Berlin' },
      { name: 'Vivantes', sector: 'Healthcare', hq: 'Berlin' },
      { name: 'BVG', sector: 'Transport', hq: 'Berlin' },
      { name: 'Zalando', sector: 'Tech/Fashion', hq: 'Berlin' },
      { name: 'Siemens Energy', sector: 'Energy', hq: 'Berlin' },
    ],
  },
  bremen: {
    id: 'bremen',
    name: 'Bremen',
    germanName: 'Bremen',
    capital: 'Bremen',
    population: '0.68 million',
    area: '419 km²',
    motto: 'Drei Worte: Hanseatisch, herzlich, hippen.',
    description:
      'Bremen is a Hanseatic city with a proud maritime history and a future in aerospace. Known for the Town Musicians and its UNESCO World Heritage market square, it combines tradition with cutting-edge research in space technology and polar science.',
    image: '/states/bremen.jpg',
    universities: [
      {
        name: 'University of Bremen',
        germanRank: 25,
        type: 'university',
        city: 'Bremen',
        students: 19000,
        notable: 'Strong in climate research, marine sciences, and engineering',
      },
      {
        name: 'Constructor University',
        germanRank: 45,
        type: 'university',
        city: 'Bremen',
        students: 1500,
        notable: 'Private, English-speaking campus university with a global student body',
      },
      {
        name: 'Hochschule Bremen',
        germanRank: 80,
        type: 'applied',
        city: 'Bremen',
        students: 8700,
        notable: 'City University of Applied Sciences with strong international networks',
      },
      {
        name: 'Hochschule Bremerhaven',
        germanRank: 95,
        type: 'applied',
        city: 'Bremerhaven',
        students: 3000,
        notable: 'Focus on maritime technologies and wind energy',
      },
    ],
    studienkollegs: [],
    culture: [
      {
        title: 'Town Musicians',
        description:
          'The bronze statue of the donkey, dog, cat, and rooster from the Brothers Grimm fairy tale. Touching the donkey\'s legs is said to bring good luck.',
        icon: '🐴',
      },
      {
        title: 'Schnoor Quarter',
        description:
          'Bremen\'s oldest district. A maze of narrow cobblestone streets and tiny houses dating back to the 15th century, now filled with arts and crafts.',
        icon: '🏘️',
      },
      {
        title: 'UNESCO Town Hall',
        description:
          'The Gothic Town Hall and the Roland Statue are symbols of civic autonomy and freedom, recognized as a UNESCO World Heritage site.',
        icon: '🏛️',
      },
      {
        title: 'Aerospace Hub',
        description:
          'Bremen is the "City of Space". The European Service Module for the NASA Orion spacecraft is built here at Airbus.',
        icon: '🚀',
      },
      {
        title: 'Beck\'s Brewery',
        description:
          'Home to one of the world\'s most famous beers. The brewery on the river Weser has been exporting its green bottles since 1873.',
        icon: '🍺',
      },
      {
        title: 'Maritime Mile',
        description:
          'The Schlachte embankment along the Weser river is a popular promenade with beer gardens, restaurants, and historic ships.',
        icon: '⚓',
      },
    ],
    keyNumbers: [
      { value: '0.68M', label: 'Population', context: 'Two cities (HB & BHV)' },
      { value: '10.5%', label: 'Unemployment', context: 'Industrial transition' },
      { value: '€38B', label: 'GDP', context: 'Strong logistics/space' },
      { value: '13%', label: 'Int\'l Students', context: 'Diverse community' },
    ],
    majorEmployers: [
      { name: 'Mercedes-Benz', sector: 'Automotive', hq: 'Bremen' },
      { name: 'Airbus', sector: 'Aerospace', hq: 'Bremen' },
      { name: 'BLG Logistics', sector: 'Logistics', hq: 'Bremen' },
      { name: 'ArcelorMittal', sector: 'Steel', hq: 'Bremen' },
      { name: 'AB InBev', sector: 'Beverages', hq: 'Bremen' },
      { name: 'OHB SE', sector: 'Space Tech', hq: 'Bremen' },
    ],
  },
  'mecklenburg-vorpommern': {
    id: 'mecklenburg-vorpommern',
    name: 'Mecklenburg-Vorpommern',
    germanName: 'Mecklenburg-Vorpommern',
    capital: 'Schwerin',
    population: '1.6 million',
    area: '23,211 km²',
    motto: 'MV tut gut.',
    description:
      'Mecklenburg-Vorpommern is a coastal paradise with over 2,000 lakes and islands like Rügen and Usedom. It combines a relaxed lifestyle with historic Hanseatic cities and cutting-edge research in marine biology and renewable energy.',
    image: '/states/mecklenburg-vorpommern.jpg',
    universities: [
      {
        name: 'University of Rostock',
        germanRank: 40,
        type: 'university',
        city: 'Rostock',
        students: 13000,
        notable: 'Oldest university in the Baltic Sea region (1419), strong in interdisciplinary research',
      },
      {
        name: 'University of Greifswald',
        germanRank: 45,
        type: 'university',
        city: 'Greifswald',
        students: 10000,
        notable: 'Internationally oriented research university, strong in life sciences and plasma physics',
      },
      {
        name: 'Hochschule Wismar',
        germanRank: 90,
        type: 'applied',
        city: 'Wismar',
        students: 8000,
        notable: 'Technology, Business, and Design with a strong maritime focus',
      },
      {
        name: 'Hochschule Stralsund',
        germanRank: 110,
        type: 'applied',
        city: 'Stralsund',
        students: 2500,
        notable: 'Young campus university focusing on renewable energy and tourism',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Wismar',
        city: 'Wismar',
        courses: ['T', 'W', 'GD', 'SW'],
        type: 'applied',
      },
    ],
    culture: [
      {
        title: 'Schwerin Castle',
        description:
          'Located on an island in Lake Schwerin, this romantic palace is nicknamed the "Neuschwanstein of the North" and houses the state parliament.',
        icon: '🏰',
      },
      {
        title: 'Baltic Coast',
        description:
          'With islands like Rügen and Usedom, the state boasts Germany\'s most beautiful beaches and the iconic chalk cliffs painted by Caspar David Friedrich.',
        icon: '🏖️',
      },
      {
        title: 'Hanseatic Heritage',
        description:
          'The historic centers of Stralsund and Wismar are UNESCO World Heritage sites, reflecting the wealth and power of the Hanseatic League.',
        icon: '🧱',
      },
      {
        title: 'Müritz National Park',
        description:
          'A land of a thousand lakes. The largest terrestrial national park in Germany offers pristine nature, canoeing, and eagle watching.',
        icon: '🛶',
      },
      {
        title: 'Hanse Sail',
        description:
          'One of the world\'s largest maritime festivals, bringing hundreds of tall ships and millions of visitors to Rostock every summer.',
        icon: '⛵',
      },
      {
        title: 'Backsteingotik',
        description:
          'The distinctive "Brick Gothic" architecture characterizes the region, with massive red-brick churches and city gates dominating the skylines.',
        icon: '⛪',
      },
    ],
    keyNumbers: [
      { value: '1.6M', label: 'Population', context: 'Lowest density' },
      { value: '7.3%', label: 'Unemployment', context: 'Tourism driven' },
      { value: '€50B', label: 'GDP', context: 'Growing renewables' },
      { value: '€0', label: 'Tuition Fees', context: 'High quality of life' },
    ],
    majorEmployers: [
      { name: 'AIDA Cruises', sector: 'Tourism', hq: 'Rostock' },
      { name: 'Nordex', sector: 'Wind Energy', hq: 'Rostock' },
      { name: 'Univ. Med. Greifswald', sector: 'Healthcare', hq: 'Greifswald' },
      { name: 'Liebherr', sector: 'Manufacturing', hq: 'Rostock' },
      { name: 'Neptun Werft', sector: 'Shipbuilding', hq: 'Rostock' },
      { name: 'BioCon Valley', sector: 'Life Science', hq: 'Greifswald' },
    ],
  },
  'schleswig-holstein': {
    id: 'schleswig-holstein',
    name: 'Schleswig-Holstein',
    germanName: 'Schleswig-Holstein',
    capital: 'Kiel',
    population: '2.9 million',
    area: '15,799 km²',
    motto: 'Der echte Norden.',
    description:
      'The "True North" of Germany, situated between the North Sea and the Baltic Sea. Schleswig-Holstein is known for its maritime heritage, wind energy leadership, and the UNESCO World Heritage Wadden Sea.',
    image: '/states/schleswig-holstein.jpg',
    universities: [
      {
        name: 'Kiel University (CAU)',
        germanRank: 25,
        type: 'university',
        city: 'Kiel',
        students: 27000,
        notable: 'Strong focus on marine sciences, nano science, and life sciences',
      },
      {
        name: 'University of Lübeck',
        germanRank: 55,
        type: 'university',
        city: 'Lübeck',
        students: 5000,
        notable: 'Ranked #1 for Medicine in CHE ranking, research-intensive',
      },
      {
        name: 'Flensburg University of Applied Sciences',
        germanRank: 100,
        type: 'applied',
        city: 'Flensburg',
        students: 4000,
        notable: 'Located on a shared campus near the Danish border, focus on energy',
      },
      {
        name: 'FH Kiel',
        germanRank: 85,
        type: 'applied',
        city: 'Kiel',
        students: 7500,
        notable: 'Largest university of applied sciences in the state',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Schleswig-Holstein',
        city: 'Kiel',
        courses: ['TI', 'WW', 'GD', 'SW'],
        type: 'applied',
      },
    ],
    culture: [
      {
        title: 'Wadden Sea',
        description:
          'A UNESCO World Heritage site and the largest unbroken system of intertidal sand and mud flats in the world. A unique ecosystem teeming with life.',
        icon: '🦀',
      },
      {
        title: 'Holstentor',
        description:
          'The iconic Brick Gothic city gate of Lübeck, a symbol of the Hanseatic League and a UNESCO World Heritage site.',
        icon: '🏰',
      },
      {
        title: 'Kiel Week',
        description:
          'The largest sailing event in the world and a massive summer festival (Kieler Woche) that attracts millions of visitors.',
        icon: '⛵',
      },
      {
        title: 'Lübeck Marzipan',
        description:
          'A world-famous sweet treat protected by EU law. Niederegger is the most famous producer, founded in 1806.',
        icon: '🍬',
      },
      {
        title: 'Sylt',
        description:
          'Germany\'s "Hamptons". An island in the North Sea known for its distinctive shape, long sandy beaches, and thatched-roof houses.',
        icon: '🏖️',
      },
      {
        title: 'Viking Heritage',
        description:
          'Haithabu (Hedeby) was a major Viking trading settlement. Today, a museum and reconstructed village showcase this fascinating history.',
        icon: '⚔️',
      },
    ],
    keyNumbers: [
      { value: '2.9M', label: 'Population', context: 'Between two seas' },
      { value: '5.6%', label: 'Unemployment', context: 'Strong SME sector' },
      { value: '€112B', label: 'GDP', context: 'Green energy leader' },
      { value: '€0', label: 'Tuition Fees', context: 'High standard of living' },
    ],
    majorEmployers: [
      { name: 'UKSH', sector: 'Healthcare', hq: 'Kiel/Lübeck' },
      { name: 'Dräger', sector: 'Medical Tech', hq: 'Lübeck' },
      { name: 'Thyssenkrupp Marine', sector: 'Shipbuilding', hq: 'Kiel' },
      { name: 'Bartels-Langness', sector: 'Retail', hq: 'Kiel' },
      { name: 'Possehl Group', sector: 'Conglomerate', hq: 'Lübeck' },
      { name: 'Freenet', sector: 'Telecom', hq: 'Büdelsdorf' },
    ],
  },
  hamburg: {
    id: 'hamburg',
    name: 'Hamburg',
    germanName: 'Hamburg',
    capital: 'Hamburg',
    population: '1.9 million',
    area: '755 km²',
    motto: 'Tor zur Welt.',
    description:
      'Hamburg is Germany\'s "Gateway to the World" - a city of bridges, water, and trade. As a major European port and media hub, it offers a cosmopolitan atmosphere, a high standard of living, and a thriving scene for science and innovation.',
    image: '/states/hamburg.jpg',
    universities: [
      {
        name: 'University of Hamburg',
        germanRank: 13,
        type: 'university',
        city: 'Hamburg',
        students: 43000,
        notable: 'University of Excellence, renowned for climate research and manuscript cultures',
      },
      {
        name: 'Hamburg University of Technology (TUHH)',
        germanRank: 62,
        type: 'technical',
        city: 'Hamburg',
        students: 7800,
        notable: 'Highly specialized in engineering, aviation, and logistics',
      },
      {
        name: 'HAW Hamburg',
        germanRank: 78,
        type: 'applied',
        city: 'Hamburg',
        students: 17000,
        notable: 'Second largest university in Hamburg, strong focus on design and media',
      },
      {
        name: 'HafenCity University',
        germanRank: 120,
        type: 'university',
        city: 'Hamburg',
        students: 2400,
        notable: 'Specialized in architecture and metropolitan development',
      },
    ],
    studienkollegs: [
      {
        name: 'Studienkolleg Hamburg',
        city: 'Hamburg',
        courses: ['M', 'T', 'W', 'G'],
        type: 'university',
      },
    ],
    culture: [
      {
        title: 'Elbphilharmonie',
        description:
          'A dazzling concert hall built on top of an old warehouse. Its wave-like glass facade has become the new symbol of the city.',
        icon: '🎵',
      },
      {
        title: 'Speicherstadt',
        description:
          'The world\'s largest warehouse district and a UNESCO World Heritage site. Red-brick Gothic buildings crisscrossed by narrow canals.',
        icon: '🧱',
      },
      {
        title: 'Port of Hamburg',
        description:
          'Germany\'s largest port. Boat tours offer close-up views of massive container ships, historic vessels, and the busy container terminals.',
        icon: '🚢',
      },
      {
        title: 'Miniatur Wunderland',
        description:
          'The world\'s largest model railway system. A magical world that attracts more visitors than any other tourist attraction in Germany.',
        icon: '🚂',
      },
      {
        title: 'Reeperbahn',
        description:
          'The famous entertainment mile in the St. Pauli district. Known for its nightlife, theaters, and musical history (The Beatles started here).',
        icon: '🎸',
      },
      {
        title: 'Alster Lakes',
        description:
          'Two artificial lakes in the heart of the city (Binnenalster and Außenalster). Popular for sailing, rowing, and relaxing on the banks.',
        icon: '⛵',
      },
    ],
    keyNumbers: [
      { value: '1.9M', label: 'Population', context: 'Second largest city' },
      { value: '7.6%', label: 'Unemployment', context: 'Strong trade hub' },
      { value: '€144B', label: 'GDP', context: 'High per capita' },
      { value: '12%', label: 'Int\'l Students', context: 'Global connections' },
    ],
    majorEmployers: [
      { name: 'Airbus', sector: 'Aerospace', hq: 'Hamburg-Finkenwerder' },
      { name: 'Lufthansa Technik', sector: 'Aviation', hq: 'Hamburg' },
      { name: 'Asklepios', sector: 'Healthcare', hq: 'Hamburg' },
      { name: 'Hapag-Lloyd', sector: 'Logistics', hq: 'Hamburg' },
      { name: 'Beiersdorf', sector: 'Consumer Goods', hq: 'Hamburg' },
      { name: 'Otto Group', sector: 'E-commerce', hq: 'Hamburg' },
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
        <SEO title="State Not Found" noIndex />
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

  const seoProps = getStateSEO(state.name, state.germanName);

  return (
    <div className="min-h-screen bg-page overflow-x-hidden">
      <SEO {...seoProps} />
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
                Discover {state.name} Culture
              </h2>
              <p className="text-text-muted max-w-[600px] mx-auto">
                Experience the unique traditions, festivals, and lifestyle that make {state.name} special.
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
      {state.studienkollegs.length > 0 && (
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
      )}

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
