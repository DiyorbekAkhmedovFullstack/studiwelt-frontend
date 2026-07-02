import { getAllStudienkollegs, type StudienkollegData } from './studienkollegData';

// === Interfaces ===

export interface University {
  name: string;
  type: 'university' | 'technical' | 'applied' | 'arts' | 'music';
  city: string;
  students: number;
  description: string;
  programs?: string[];
  website?: string;
}

export interface CulturalHighlight {
  title: string;
  description: string;
  icon: string;
}

export interface KeyNumber {
  value: string;
  label: string;
  context: string;
}

export interface Employer {
  name: string;
  sector: string;
  hq: string;
}

export interface StateData {
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
  culture: CulturalHighlight[];
  keyNumbers: KeyNumber[];
  majorEmployers: Employer[];
}

// === State-Studienkolleg mapping ===
// Maps state slugs to the `state` field values used in studienkollegData.ts
const STATE_STUDIENKOLLEG_MAP: Record<string, string> = {
  bavaria: 'Bavaria',
  berlin: 'Berlin',
  hamburg: 'Hamburg',
  'baden-wurttemberg': 'Baden-Württemberg',
  saxony: 'Sachsen',
  'saxony-anhalt': 'Sachsen-Anhalt',
  hesse: 'Hessen',
  'lower-saxony': 'Niedersachsen',
};

// === State data ===
export const statesData: Record<string, StateData> = {
  // ═══════════════════════════════════════════════════════════════
  // BAVARIA (Bayern) — fully researched with 15 institutions
  // ═══════════════════════════════════════════════════════════════
  bavaria: {
    id: 'bavaria',
    name: 'Bavaria',
    germanName: 'Bayern',
    capital: 'Munich',
    population: '13.2 million',
    area: '70,550 km²',
    motto: 'Freistaat Bayern',
    description:
      'Bavaria is Germany\'s largest state by area and a global economic powerhouse. Home to world-class universities, cutting-edge research institutions, and global industry leaders like BMW, Siemens, and Audi, it offers international students an exceptional blend of Alpine tradition and high-tech innovation. With 33 higher education institutions — including two Universities of Excellence — Bavaria is one of Europe\'s premier study destinations.',
    image: '/states/bavaria.jpg',
    universities: [
      // ── Research Universities (Universitäten) ──
      {
        name: 'Ludwig Maximilian University of Munich (LMU)',
        type: 'university',
        city: 'Munich',
        students: 54000,
        description:
          'One of Germany\'s most prestigious universities and a University of Excellence. LMU is renowned for its strength in physics, medicine, law, and business — with over 50 Nobel laureates among its alumni and faculty.',
        programs: ['Computer Science', 'Business Administration', 'Medicine', 'Physics', 'Psychology', 'Law'],
        website: 'https://www.lmu.de/en',
      },
      {
        name: 'Technical University of Munich (TUM)',
        type: 'technical',
        city: 'Munich',
        students: 50000,
        description:
          'Germany\'s #1 technical university and a University of Excellence. TUM ranks among the top in Europe for engineering, computer science, and natural sciences, with strong industry partnerships with BMW, Siemens, and Audi.',
        programs: ['Mechanical Engineering', 'Computer Science', 'Electrical Engineering', 'Aerospace', 'Information Engineering', 'Management & Technology'],
        website: 'https://www.tum.de/en',
      },
      {
        name: 'Friedrich-Alexander University Erlangen-Nuremberg (FAU)',
        type: 'university',
        city: 'Erlangen & Nuremberg',
        students: 40000,
        description:
          'One of Germany\'s most innovative universities, FAU offers 260+ degree programs across five faculties. It is renowned for its strong ties to industry, with particular strength in medical engineering, AI, and materials science.',
        programs: ['Computer Science (AI)', 'Medical Engineering', 'Materials Science', 'International Business', 'Business Administration', 'Data Science'],
        website: 'https://www.fau.eu',
      },
      {
        name: 'Julius Maximilian University of Würzburg',
        type: 'university',
        city: 'Würzburg',
        students: 26000,
        description:
          'One of the oldest universities in the German-speaking world (1402). JMU is renowned for its medical faculty and interdisciplinary research centers, including the Helmholtz Institute for RNA-based Infection Research.',
        programs: ['Medicine', 'AI & Data Science', 'Psychology', 'Biomedicine', 'Chemistry', 'Pharmacy'],
        website: 'https://www.uni-wuerzburg.de/en/',
      },
      {
        name: 'University of Regensburg',
        type: 'university',
        city: 'Regensburg',
        students: 20000,
        description:
          'A modern campus university in a UNESCO World Heritage city. With 12 faculties and 380 international partner universities, UR is the largest university in Eastern Bavaria, excelling in informatics, medicine, and business.',
        programs: ['Informatics & Data Science', 'Business Administration', 'Medicine', 'International Economics', 'Law'],
        website: 'https://www.uni-regensburg.de/en/',
      },
      {
        name: 'University of Augsburg',
        type: 'university',
        city: 'Augsburg',
        students: 19000,
        description:
          'A comprehensive research university with eight faculties, including a new Medical Faculty (2016). The university maintains strong international connections with 240+ researchers from 60+ countries.',
        programs: ['Applied Computer Science', 'Business Administration', 'Medicine', 'International Management', 'Physics'],
        website: 'https://www.uni-augsburg.de/en/',
      },
      {
        name: 'University of Bamberg (Otto-Friedrich-Universität)',
        type: 'university',
        city: 'Bamberg',
        students: 13000,
        description:
          'Specializes in international business, applied computer science, and European studies. Bamberg has the highest study-abroad rate in Bavaria (40% of graduates), with 300 partner universities in 60 countries.',
        programs: ['International Business', 'Applied Computer Science', 'European Economic Studies', 'International Information Systems Management', 'Software Systems Science'],
        website: 'https://www.uni-bamberg.de/en/',
      },
      {
        name: 'University of Bayreuth',
        type: 'university',
        city: 'Bayreuth',
        students: 13000,
        description:
          'A young research university known for unique interdisciplinary programs. Bayreuth is a global leader in African Studies and offers distinctive programs in Global Change Ecology, Health Economics, and Polymer Chemistry.',
        programs: ['Computer Science', 'International Economy & Development', 'Health Economics', 'Global Change Ecology', 'Polymer Chemistry', 'Sport & Media'],
        website: 'https://www.uni-bayreuth.de/en/',
      },
      {
        name: 'University of Passau',
        type: 'university',
        city: 'Passau',
        students: 11000,
        description:
          'Renowned for its exceptional international orientation — 19% international students, 327+ partner universities. Passau offers unique programs in European Studies, Development Studies, and International Cultural and Business Studies.',
        programs: ['Computer Science', 'International Cultural & Business Studies', 'European Studies', 'Business Administration', 'Development Studies', 'Governance & Public Policy'],
        website: 'https://www.uni-passau.de/en/',
      },
      // ── Universities of Applied Sciences (Hochschulen für angewandte Wissenschaften) ──
      {
        name: 'Munich University of Applied Sciences (HM)',
        type: 'applied',
        city: 'Munich',
        students: 18000,
        description:
          'Bavaria\'s second largest university of applied sciences. HM offers 80+ programs across 14 departments, covering technology, engineering, business, social sciences, and design — with strong industry partnerships with BMW and Siemens.',
        programs: ['Mechanical Engineering', 'Computer Science', 'Business Administration', 'Electrical Engineering', 'Industrial Engineering', 'Aviation'],
        website: 'https://hm.edu/en/',
      },
      {
        name: 'Technische Hochschule Nürnberg Georg Simon Ohm',
        type: 'applied',
        city: 'Nuremberg',
        students: 13000,
        description:
          'One of Germany\'s largest universities of applied sciences, named after physicist Georg Simon Ohm. Offers programs across engineering, business, social sciences, and design with 160+ international partnerships.',
        programs: ['Computer Science', 'Business Administration', 'Mechanical Engineering', 'Electrical Engineering', 'Architecture', 'Applied Chemistry'],
        website: 'https://www.th-nuernberg.de/en/',
      },
      {
        name: 'Technische Hochschule Ingolstadt',
        type: 'applied',
        city: 'Ingolstadt',
        students: 6000,
        description:
          'A dynamic technical university in Audi\'s home city. TH Ingolstadt is renowned for its automotive engineering program and close industry ties with Audi, Continental, and other automotive giants.',
        programs: ['Automotive Engineering', 'International Business', 'Mechanical Engineering', 'Electrical Engineering', 'Computer Science', 'Aviation Engineering'],
        website: 'https://www.thi.de/',
      },
      {
        name: 'Technische Hochschule Augsburg',
        type: 'applied',
        city: 'Augsburg',
        students: 6000,
        description:
          'A technical university of applied sciences with strong industry connections. TH Augsburg excels in engineering, computer science, and additive manufacturing, with close ties to KUKA (robotics) and MAN Energy Solutions.',
        programs: ['Mechanical Engineering', 'Computer Science', 'Additive Manufacturing', 'Industrial Engineering', 'Electrical Engineering'],
        website: 'https://www.th-augsburg.de/',
      },
      {
        name: 'Ostbayerische Technische Hochschule Regensburg (OTH)',
        type: 'applied',
        city: 'Regensburg',
        students: 11000,
        description:
          'One of Bavaria\'s largest universities of applied sciences, offering 69+ degree programs. OTH Regensburg is particularly strong in engineering, architecture, and business, with excellent industry connections.',
        programs: ['Industrial Engineering', 'Computer Science', 'Architecture', 'Business Administration', 'Mechanical Engineering', 'Social Work'],
        website: 'https://www.oth-regensburg.de/',
      },
      // ── Art & Music Academies ──
      {
        name: 'Hochschule für Musik und Theater München (HMTM)',
        type: 'music',
        city: 'Munich',
        students: 800,
        description:
          'One of Germany\'s most prestigious music and performing arts academies. HMTM offers programs in music, theatre, and dance, with close connections to the Bavarian State Opera and Orchestra.',
        programs: ['Instrumental Performance', 'Vocal Performance', 'Theatre Acting', 'Conducting', 'Music Education', 'Jazz'],
        website: 'https://www.mmt.mhn.de/',
      },
    ],
    culture: [
      {
        title: 'Oktoberfest',
        description:
          'The world\'s largest folk festival, held annually in Munich since 1810. Over 6 million visitors celebrate with traditional beer, food, and Bavarian music on the Theresienwiese.',
        icon: 'beer',
      },
      {
        title: 'Neuschwanstein Castle',
        description:
          'The fairy-tale castle built by King Ludwig II that inspired Disney\'s Sleeping Beauty Castle. It welcomes 1.3 million visitors annually and is one of the most photographed landmarks in Germany.',
        icon: 'castle',
      },
      {
        title: 'Traditional Dress',
        description:
          'Lederhosen for men and Dirndl for women are still worn at festivals and celebrations. This traditional clothing represents Bavarian identity and pride, and has become a global symbol of German culture.',
        icon: 'dress',
      },
      {
        title: 'Alpine Culture',
        description:
          'Yodeling, Schuhplattler dancing, and the greeting "Servus" are unique to Bavaria. The region\'s Catholic traditions and distinctive Bairisch dialect set it apart from the rest of Germany.',
        icon: 'mountain',
      },
      {
        title: 'Beer Gardens',
        description:
          'Biergärten are outdoor areas where people enjoy beer, food, and socializing under chestnut trees. A cornerstone of Bavarian social life, especially during the warm summer months.',
        icon: 'tree',
      },
      {
        title: 'Culinary Traditions',
        description:
          'Famous for Weisswurst (white sausage eaten before noon), Brezen (pretzels), Schweinshaxe, and world-renowned beer brewing traditions dating back centuries. Bavaria has the highest density of breweries in the world.',
        icon: 'pretzel',
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

  // ═══════════════════════════════════════════════════════════════
  // BADEN-WÜRTTEMBERG — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Heidelberg University', type: 'university', city: 'Heidelberg', students: 29000, description: 'Germany\'s oldest university (1386), Excellence in Medicine & Life Sciences', programs: ['Medicine', 'Computer Science', 'Physics', 'Molecular Biology', 'Data Science', 'International Business'], website: 'https://www.uni-heidelberg.de/en' },
      { name: 'Karlsruhe Institute of Technology (KIT)', type: 'technical', city: 'Karlsruhe', students: 22500, description: 'University of Excellence, leading in Engineering & Natural Sciences', programs: ['Computer Science', 'Mechanical Engineering', 'Industrial Engineering', 'Electrical Engineering', 'Materials Science', 'Data Science'], website: 'https://www.kit.edu/english' },
      { name: 'University of Tübingen', type: 'university', city: 'Tübingen', students: 27000, description: 'Excellence in Theology, Medicine, Law & Humanities', programs: ['Medicine', 'Computer Science', 'Psychology', 'Neuroscience', 'International Business', 'Law'], website: 'https://www.uni-tuebingen.de/en' },
      { name: 'University of Freiburg', type: 'university', city: 'Freiburg', students: 25000, description: 'Founded 1457, strong international orientation & research profile', programs: ['Computer Science', 'Medicine', 'Environmental Sciences', 'Physics', 'Economics', 'Biology'], website: 'https://www.uni-freiburg.de/en' },
      { name: 'University of Stuttgart', type: 'technical', city: 'Stuttgart', students: 24000, description: 'Top engineering school with Mercedes-Benz & Bosch partnerships', programs: ['Mechanical Engineering', 'Computer Science', 'Information Technology', 'Civil Engineering', 'Automotive Engineering', 'Electrical Engineering'], website: 'https://www.uni-stuttgart.de/en' },
      { name: 'University of Mannheim', type: 'university', city: 'Mannheim', students: 12000, description: 'Germany\'s leading business school', programs: ['Business Administration', 'Economics', 'International Business', 'Finance', 'Management', 'Psychology'], website: 'https://www.uni-mannheim.de/en' },
    ],
    culture: [
      { title: 'Black Forest', description: 'Germany\'s largest continuous forest, known for cuckoo clocks, cherry gâteau, and 17 Michelin-starred restaurants. A region of dark woods, healing spas, and ancient traditions.', icon: 'evergreen' },
      { title: 'Swabian Cuisine', description: 'Home of Spätzle (egg noodles) and Maultaschen (Swabian ravioli). The region\'s hearty dishes reflect centuries of farming tradition and culinary creativity.', icon: 'pasta' },
      { title: 'Bollenhut', description: 'The iconic Black Forest hat with large red (unmarried) or black (married) pompoms. A symbol of regional identity still worn during festivals and special occasions.', icon: 'hat' },
      { title: 'Fastnacht Carnival', description: 'The Swabian-Alemannic carnival tradition with elaborate wooden masks, colorful costumes, and centuries-old customs distinct from Rhineland Karneval.', icon: 'theater' },
      { title: 'Dialects', description: 'Four distinct dialects: Schwäbisch, Badisch, Alemannisch, and Fränkisch. The locals affectionately call their state "Ländle" (little land).', icon: 'speech' },
      { title: 'Craftsmanship', description: 'Traditional Black Forest clockmaking, precision instruments, and jewelry. The region produces the majority of Germany\'s clocks, watches, and custom jewelry.', icon: 'clock' },
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

  // ═══════════════════════════════════════════════════════════════
  // SAARLAND — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Saarland University (UdS)', type: 'university', city: 'Saarbrücken', students: 17000, description: 'Leading in Computer Science (Max Planck Institutes) & European Law', programs: ['Computer Science', 'Cybersecurity', 'Data Science & AI', 'International Business', 'Bioinformatics', 'Materials Science'], website: 'https://www.uni-saarland.de/en' },
    ],
    culture: [
      { title: 'Saarschleife', description: 'The Great Loop of the Saar river at Mettlach. A breathtaking natural wonder and the state\'s most iconic landmark, best viewed from the Cloef viewpoint.', icon: 'nature' },
      { title: 'Savoir Vivre', description: 'A unique French-influenced lifestyle. Saarlanders enjoy good food ("Hauptsach gudd gess"), wine, and a relaxed pace of life unlike anywhere else in Germany.', icon: 'wine' },
      { title: 'Völklinger Hütte', description: 'A UNESCO World Heritage site. This massive former ironworks plant has been preserved as a fascinating cultural center, exhibition space, and industrial museum.', icon: 'factory' },
      { title: 'Schwenken', description: 'The local art of grilling on a swinging grill (Schwenker). It is more than just cooking; it is a social religion and the center of summer gatherings.', icon: 'meat' },
      { title: 'Silicon Saarland', description: 'Home to the CISPA Helmholtz Center and Max Planck Institutes, the state is a global hotspot for cybersecurity and AI research, attracting talent worldwide.', icon: 'laptop' },
      { title: 'Three-Country Corner', description: 'Bordering France and Luxembourg, the region offers a truly European experience. You can hike across borders and experience three cultures in one day.', icon: 'flag' },
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

  // ═══════════════════════════════════════════════════════════════
  // RHINELAND-PALATINATE — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Johannes Gutenberg University Mainz', type: 'university', city: 'Mainz', students: 31000, description: 'One of Germany\'s largest and most diverse universities', programs: ['Computer Science', 'Medicine', 'Physics', 'International Business', 'Chemistry', 'Biology'], website: 'https://www.uni-mainz.de/en' },
      { name: 'RPTU Kaiserslautern-Landau', type: 'technical', city: 'Kaiserslautern', students: 20000, description: 'Leading in AI and Computer Science (DFKI headquarters)', programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Data Science', 'Mathematics', 'Industrial Engineering'], website: 'https://rptu.de/en' },
      { name: 'University of Trier', type: 'university', city: 'Trier', students: 11000, description: 'Strong focus on humanities and social sciences', programs: ['International Business', 'Computer Science', 'Environmental Sciences', 'Economics', 'Law'], website: 'https://www.uni-trier.de/en' },
      { name: 'University of Koblenz', type: 'university', city: 'Koblenz', students: 9000, description: 'Young university with strong regional integration', programs: ['Computer Science', 'Business Administration', 'Environmental Sciences', 'Psychology', 'Education'], website: 'https://www.uni-koblenz.de/en' },
    ],
    culture: [
      { title: 'Wine Country', description: 'Produces 70% of Germany\'s wine. The Deutsche Weinstraße (German Wine Route) offers picturesque villages, world-class Riesling, and endless autumn festivals.', icon: 'grapes' },
      { title: 'Roman Legacy', description: 'Trier, founded by Romans in 16 BC, is Germany\'s oldest city. The Porta Nigra and other monuments stand as UNESCO World Heritage sites.', icon: 'monument' },
      { title: 'Romantic Rhine', description: 'The Middle Rhine Valley with its steep vineyards, the legendary Lorelei rock, and the highest density of castles in the world.', icon: 'castle' },
      { title: 'Mainzer Fastnacht', description: 'One of the largest carnival celebrations in Germany. A "fifth season" of parades, political satire, and street parties starting every November.', icon: 'theater' },
      { title: 'Palatinate Forest', description: 'Germany\'s largest contiguous forest area and a UNESCO Biosphere Reserve. A paradise for hikers, climbers, and nature lovers.', icon: 'evergreen' },
      { title: 'Chemical Valley', description: 'Home to Ludwigshafen and BASF, the world\'s largest chemical plant. The region is a global powerhouse for chemistry and pharmaceuticals.', icon: 'chemistry' },
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

  // ═══════════════════════════════════════════════════════════════
  // HESSE — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Goethe University Frankfurt', type: 'university', city: 'Frankfurt', students: 45000, description: 'Strong in Finance, Law, and Economics (House of Finance)', programs: ['Finance', 'Business Administration', 'Computer Science', 'Medicine', 'International Economics', 'Law'], website: 'https://www.uni-frankfurt.de/en' },
      { name: 'Technical University of Darmstadt', type: 'technical', city: 'Darmstadt', students: 25000, description: 'First autonomous university in Germany, specialized in engineering', programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Industrial Engineering', 'Materials Science', 'Civil Engineering'], website: 'https://www.tu-darmstadt.de/en' },
      { name: 'Justus Liebig University Giessen', type: 'university', city: 'Giessen', students: 28000, description: 'Famous for Life Sciences and Cultural Studies', programs: ['Medicine', 'Veterinary Medicine', 'Business Administration', 'Psychology', 'Agricultural Sciences', 'Nutritional Sciences'], website: 'https://www.uni-giessen.de/en' },
      { name: 'University of Marburg', type: 'university', city: 'Marburg', students: 22000, description: 'World\'s oldest Protestant university, founded in 1527', programs: ['Medicine', 'Computer Science', 'Business Administration', 'Psychology', 'Chemistry', 'International Business'], website: 'https://www.uni-marburg.de/en' },
    ],
    culture: [
      { title: 'Mainhattan', description: 'Frankfurt is the only German city with a massive skyline. It is the financial heart of the Eurozone, home to the ECB and the Stock Exchange.', icon: 'skyline' },
      { title: 'Apfelwein', description: 'The state\'s national drink. "Ebbelwoi" is a tart cider traditionally served in a Bembel (stone jug) and drunk from a ribbed glass (Geripptes).', icon: 'apple' },
      { title: 'Brothers Grimm', description: 'Jacob and Wilhelm Grimm lived and worked in Kassel and Hanau. Their world-famous fairy tales (Cinderella, Hansel & Gretel) originate here.', icon: 'books' },
      { title: 'Rheingau', description: 'One of Germany\'s most prestigious wine regions, known globally for its Riesling. A landscape of rolling vineyards, castles, and the Rhine river.', icon: 'cheers' },
      { title: 'Documenta', description: 'The world\'s most important exhibition of modern art, taking place every five years in Kassel. It transforms the entire city into a living museum.', icon: 'art' },
      { title: 'Spa Towns', description: 'Wiesbaden and Bad Homburg are famous historic spa towns. Their thermal springs and casinos have attracted royalty and visitors for centuries.', icon: 'spa' },
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

  // ═══════════════════════════════════════════════════════════════
  // THURINGIA — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Friedrich Schiller University Jena', type: 'university', city: 'Jena', students: 17500, description: 'Historic university associated with Goethe, Schiller, and Hegel', programs: ['Medicine', 'Computer Science', 'Business Administration', 'Optics & Photonics', 'Physics', 'Molecular Biology'], website: 'https://www.uni-jena.de/en' },
      { name: 'Ilmenau University of Technology', type: 'technical', city: 'Ilmenau', students: 5000, description: 'Strong focus on media technology and engineering', programs: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Media Technology', 'Information Systems', 'Automotive Engineering'], website: 'https://www.tu-ilmenau.de/en' },
      { name: 'Bauhaus University Weimar', type: 'university', city: 'Weimar', students: 4000, description: 'World-renowned for architecture, art, and design', programs: ['Architecture', 'Computer Science (Media)', 'Urban Planning', 'Media Arts', 'Civil Engineering', 'Product Design'], website: 'https://www.uni-weimar.de/en' },
      { name: 'University of Erfurt', type: 'university', city: 'Erfurt', students: 6000, description: 'Specialized in humanities and social sciences', programs: ['International Relations', 'Public Policy', 'Education', 'Psychology', 'Economics'], website: 'https://www.uni-erfurt.de/en' },
    ],
    culture: [
      { title: 'Weimar Classicism', description: 'Home to Goethe and Schiller, Weimar was the intellectual center of Europe in the 18th century. The city boasts multiple UNESCO World Heritage sites.', icon: 'theater' },
      { title: 'Bauhaus', description: 'The revolutionary Bauhaus art school was founded in Weimar in 1919 by Walter Gropius, shaping modern architecture and design worldwide.', icon: 'construction' },
      { title: 'Wartburg Castle', description: 'Located in Eisenach, this is where Martin Luther translated the New Testament into German. A symbol of German unity and a UNESCO site.', icon: 'castle' },
      { title: 'Thuringian Bratwurst', description: 'The "Rostbratwurst" is a protected regional specialty with a 600-year history. Grilling it over charcoal is a beloved local tradition.', icon: 'sausage' },
      { title: 'Green Heart', description: 'The Thuringian Forest offers endless hiking trails, including the famous Rennsteig, and transforms into a winter sports paradise in snowy months.', icon: 'evergreen' },
      { title: 'Erfurt\'s Merchants\' Bridge', description: 'The Krämerbrücke is the longest inhabited bridge in Europe, lined with charming half-timbered houses, artisan shops, and cafes.', icon: 'bridge' },
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

  // ═══════════════════════════════════════════════════════════════
  // SAXONY — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'TU Dresden', type: 'technical', city: 'Dresden', students: 32000, description: 'University of Excellence, one of the largest technical universities in Germany', programs: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'International Management', 'Physics', 'Civil Engineering'], website: 'https://tu-dresden.de/en' },
      { name: 'Leipzig University', type: 'university', city: 'Leipzig', students: 31000, description: 'Second oldest university in Germany (1409), alma mater of Goethe and Nietzsche', programs: ['Business Administration', 'Computer Science', 'Medicine', 'Psychology', 'Physics', 'International Relations'], website: 'https://www.uni-leipzig.de/en' },
      { name: 'Chemnitz University of Technology', type: 'technical', city: 'Chemnitz', students: 10000, description: 'Strong focus on automotive and mechanical engineering', programs: ['Automotive Engineering', 'Computer Science', 'Mechanical Engineering', 'Industrial Engineering', 'Electrical Engineering', 'Management'], website: 'https://www.tu-chemnitz.de/en' },
      { name: 'TU Bergakademie Freiberg', type: 'technical', city: 'Freiberg', students: 4000, description: 'World\'s oldest university of mining and metallurgy', programs: ['Mining Engineering', 'Materials Science', 'Environmental Engineering', 'Geology', 'International Business & Resources', 'Mechanical Engineering'], website: 'https://tu-freiberg.de/en' },
    ],
    culture: [
      { title: 'Silicon Saxony', description: 'Europe\'s largest microelectronics cluster is based in Dresden. One in every three chips produced in Europe is made here, driving global innovation.', icon: 'laptop' },
      { title: 'Saxon Switzerland', description: 'The Elbe Sandstone Mountains offer dramatic rock formations and the famous Bastei Bridge. A paradise for climbers and hikers just south of Dresden.', icon: 'climbing' },
      { title: 'Baroque Splendor', description: 'Dresden, known as "Florence on the Elbe," features world-class architecture like the Frauenkirche, Zwinger Palace, and Semperoper.', icon: 'monument' },
      { title: 'City of Music', description: 'Leipzig is the city of Bach, Mendelssohn, and Wagner. The St. Thomas Boys Choir and the Gewandhaus Orchestra are world-renowned.', icon: 'violin' },
      { title: 'Christmas Markets', description: 'The Dresden Striezelmarkt is Germany\'s oldest Christmas market (1434). The region is famous for Ore Mountain wood crafts and Nutcrackers.', icon: 'christmas' },
      { title: 'Meissen Porcelain', description: 'Europe\'s first hard-paste porcelain was invented here. The "White Gold" from Meissen remains a symbol of ultimate luxury and craftsmanship.', icon: 'coffee' },
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

  // ═══════════════════════════════════════════════════════════════
  // NORTH RHINE-WESTPHALIA — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'RWTH Aachen University', type: 'technical', city: 'Aachen', students: 47000, description: 'Germany\'s largest technical university, a global leader in engineering', programs: ['Computer Science', 'Mechanical Engineering', 'Automotive Engineering', 'Electrical Engineering', 'Industrial Engineering', 'Software Systems Engineering'], website: 'https://www.rwth-aachen.de' },
      { name: 'University of Bonn', type: 'university', city: 'Bonn', students: 38000, description: 'University of Excellence, produced multiple Nobel Prize winners', programs: ['Computer Science', 'Economics', 'Medicine', 'Physics', 'Agricultural Sciences', 'Law'], website: 'https://www.uni-bonn.de/en' },
      { name: 'University of Cologne', type: 'university', city: 'Cologne', students: 50000, description: 'One of the oldest (1388) and largest universities in Germany', programs: ['Business Administration', 'Economics', 'Computer Science', 'Medicine', 'Psychology', 'International Business'], website: 'https://www.uni-koeln.de/en' },
      { name: 'University of Münster', type: 'university', city: 'Münster', students: 45000, description: 'Famous for its high quality of life and bicycle-friendly campus', programs: ['Business Administration', 'Computer Science', 'Medicine', 'Psychology', 'Law', 'Economics'], website: 'https://www.uni-muenster.de/en' },
      { name: 'Ruhr University Bochum', type: 'university', city: 'Bochum', students: 43000, description: 'First new university founded in West Germany after WWII', programs: ['Computer Science', 'Mechanical Engineering', 'Medicine', 'Psychology', 'Economics', 'Electrical Engineering'], website: 'https://www.ruhr-uni-bochum.de/en' },
    ],
    culture: [
      { title: 'Cologne Cathedral', description: 'The Kölner Dom is a Gothic masterpiece and Germany\'s most visited landmark. A UNESCO World Heritage site that took 632 years to complete.', icon: 'church' },
      { title: 'Carnival', description: 'The "Fifth Season" sees millions celebrating on the streets of Cologne, Düsseldorf, and Mainz. A time of parades, costumes, and pure joy.', icon: 'theater' },
      { title: 'Industrial Culture', description: 'The Ruhr area transformed from coal mines to culture. Sites like Zeche Zollverein in Essen show how industry became art and leisure.', icon: 'factory' },
      { title: 'Düsseldorf Fashion', description: 'Known as Germany\'s fashion capital, Düsseldorf boasts the elegant Königsallee ("Kö") shopping boulevard and a vibrant art scene.', icon: 'dress' },
      { title: 'Beethoven\'s City', description: 'Bonn is the birthplace of Ludwig van Beethoven. His legacy is celebrated in museums, festivals, and the historic atmosphere of the former capital.', icon: 'piano' },
      { title: 'Football Passion', description: 'Football is a religion here. Home to legendary clubs like Borussia Dortmund and Schalke 04, the region has the highest density of stadiums in Europe.', icon: 'soccer' },
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

  // ═══════════════════════════════════════════════════════════════
  // SAXONY-ANHALT — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Martin Luther University Halle-Wittenberg', type: 'university', city: 'Halle (Saale)', students: 20000, description: 'One of the oldest universities in Germany, rich in tradition and research', programs: ['Medicine', 'Computer Science', 'Business Administration', 'Pharmacy', 'Law', 'Agricultural Sciences'], website: 'https://www.uni-halle.de/en' },
      { name: 'Otto von Guericke University Magdeburg', type: 'university', city: 'Magdeburg', students: 14000, description: 'Strong focus on engineering, computer science, and medicine', programs: ['Computer Science', 'Industrial Engineering', 'Medicine', 'Mechanical Engineering', 'Electrical Engineering', 'Business Administration'], website: 'https://www.ovgu.de/en' },
    ],
    culture: [
      { title: 'Bauhaus Dessau', description: 'The iconic Bauhaus building in Dessau is a UNESCO World Heritage site. It was the center of modern design and architecture in the 1920s.', icon: 'construction' },
      { title: 'Lutherstadt Wittenberg', description: 'The birthplace of the Reformation. Martin Luther nailed his 95 Theses to the door of the Castle Church here, changing history forever.', icon: 'scroll' },
      { title: 'Harz Mountains', description: 'A mountain range full of legends, witches, and the Brocken peak. The Harz Narrow Gauge Railways offer a nostalgic steam train ride through the forests.', icon: 'train' },
      { title: 'Quedlinburg', description: 'A remarkably preserved medieval town with over 1,300 half-timbered houses. Walking through its streets feels like stepping back in time.', icon: 'houses' },
      { title: 'Halle (Saale)', description: 'A cultural capital known for the composer George Frideric Handel and the Nebra Sky Disc, the world\'s oldest known depiction of the cosmos.', icon: 'music' },
      { title: 'Garden Kingdom', description: 'The Dessau-Wörlitz Garden Realm is a stunning cultural landscape of English-style parks and palaces, recognized by UNESCO.', icon: 'tree' },
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

  // ═══════════════════════════════════════════════════════════════
  // LOWER SAXONY — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'University of Göttingen', type: 'university', city: 'Göttingen', students: 28000, description: 'Produced over 40 Nobel Prize winners, highly prestigious', programs: ['Computer Science', 'International Business', 'Medicine', 'Physics', 'Molecular Biology', 'Agricultural Sciences'], website: 'https://www.uni-goettingen.de/en' },
      { name: 'Leibniz University Hannover', type: 'university', city: 'Hanover', students: 29000, description: 'Member of TU9, leading in engineering and technology', programs: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Industrial Engineering', 'International Business'], website: 'https://www.uni-hannover.de/en' },
      { name: 'TU Braunschweig', type: 'technical', city: 'Braunschweig', students: 17000, description: 'Oldest technical university in Germany, focus on mobility and aviation', programs: ['Automotive Engineering', 'Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Architecture', 'Aviation Engineering'], website: 'https://www.tu-braunschweig.de/en' },
      { name: 'Clausthal University of Technology', type: 'technical', city: 'Clausthal-Zellerfeld', students: 4000, description: 'Unique focus on energy, raw materials, and material science', programs: ['Mining Engineering', 'Materials Science', 'Petroleum Engineering', 'Computer Science', 'Environmental Engineering', 'Mechanical Engineering'], website: 'https://www.tu-clausthal.de/en' },
    ],
    culture: [
      { title: 'Autostadt Wolfsburg', description: 'A massive automotive theme park and museum adjacent to the Volkswagen factory. A pilgrimage site for car enthusiasts from around the world.', icon: 'car' },
      { title: 'Lüneburg Heath', description: 'A unique landscape of purple heather blooming in late summer. Historic towns like Lüneburg offer medieval charm and salt-mining history.', icon: 'wheat' },
      { title: 'East Frisian Islands', description: 'The seven islands in the Wadden Sea UNESCO World Heritage site are famous for their sandy beaches, lighthouses, and traditional tea culture.', icon: 'island' },
      { title: 'Goslar Old Town', description: 'A UNESCO World Heritage site with over 1,500 half-timbered houses and the Imperial Palace (Kaiserpfalz), reflecting its wealth from mining.', icon: 'tools' },
      { title: 'Hanover Fair', description: 'The world\'s largest industrial trade fair takes place here every year, showcasing the latest innovations in technology and engineering.', icon: 'factory' },
      { title: 'Meyer Werft', description: 'Located in Papenburg, this shipyard builds the world\'s largest cruise ships. Seeing these giants navigate the narrow Ems river is a spectacle.', icon: 'ship' },
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

  // ═══════════════════════════════════════════════════════════════
  // BRANDENBURG — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'University of Potsdam', type: 'university', city: 'Potsdam', students: 22000, description: 'Largest university in the state, strong in humanities and science', programs: ['Computer Science', 'Business Administration', 'International Relations', 'Psychology', 'Public Administration', 'Data Science'], website: 'https://www.uni-potsdam.de/en' },
      { name: 'BTU Cottbus-Senftenberg', type: 'technical', city: 'Cottbus', students: 7000, description: 'Leading in energy, environment, and materials research', programs: ['Environmental Engineering', 'Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Industrial Engineering', 'Architecture'], website: 'https://www.b-tu.de/en' },
      { name: 'European University Viadrina', type: 'university', city: 'Frankfurt (Oder)', students: 5000, description: 'Focus on international relations, law, and economics', programs: ['International Business', 'Law', 'European Studies', 'International Relations', 'Economics'], website: 'https://www.europa-uni.de/en' },
      { name: 'Film University Babelsberg', type: 'university', city: 'Potsdam', students: 1000, description: 'Germany\'s oldest and largest film school', programs: ['Film Production', 'Screenwriting', 'Animation', 'Media Studies', 'Producing', 'Cinematography'], website: 'https://www.filmuniversitaet.de/en' },
    ],
    culture: [
      { title: 'Sanssouci Palace', description: 'Frederick the Great\'s summer palace in Potsdam is a Rococo masterpiece. The park and palace complex is a UNESCO World Heritage site.', icon: 'castle' },
      { title: 'Spreewald', description: 'A UNESCO biosphere reserve where the Spree river branches into hundreds of small canals. Famous for punt boat rides and Spreewald gherkins.', icon: 'canoe' },
      { title: 'Babelsberg Studio', description: 'The oldest large-scale film studio in the world. Masterpieces like "Metropolis" and modern blockbusters like "Inglourious Basterds" were filmed here.', icon: 'film' },
      { title: 'Tropical Islands', description: 'Housed in a former airship hangar, this is the world\'s largest indoor water park, featuring a rainforest, beach, and lagoon.', icon: 'palm' },
      { title: 'Cecilienhof', description: 'The site of the Potsdam Conference in 1945, where Truman, Churchill, and Stalin decided the future of Germany and Europe.', icon: 'handshake' },
      { title: '3000 Lakes', description: 'Brandenburg is one of the most water-rich states in Germany, with over 3,000 lakes offering endless opportunities for swimming and sailing.', icon: 'sailboat' },
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

  // ═══════════════════════════════════════════════════════════════
  // BERLIN — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Freie Universität Berlin', type: 'university', city: 'Berlin', students: 33000, description: 'University of Excellence, strong in humanities and social sciences', programs: ['Computer Science', 'Business Administration', 'International Relations', 'Political Science', 'Psychology', 'Law'], website: 'https://www.fu-berlin.de/en' },
      { name: 'Humboldt-Universität zu Berlin', type: 'university', city: 'Berlin', students: 36000, description: 'The mother of all modern universities, alma mater of 29 Nobel laureates', programs: ['Computer Science', 'Business Administration', 'Medicine', 'Economics', 'Psychology', 'Materials Science'], website: 'https://www.hu-berlin.de/en' },
      { name: 'Technische Universität Berlin', type: 'technical', city: 'Berlin', students: 34000, description: 'Member of TU9, leading in engineering and computer science', programs: ['Computer Science', 'Mechanical Engineering', 'Industrial Engineering', 'Electrical Engineering', 'Civil Engineering', 'Innovation Management'], website: 'https://www.tu.berlin/en' },
      { name: 'Charité - Universitätsmedizin Berlin', type: 'university', city: 'Berlin', students: 8000, description: 'One of the largest and most prestigious university hospitals in Europe', programs: ['Medicine', 'Molecular Medicine', 'Epidemiology', 'International Health', 'Medical Neuroscience', 'Dentistry'], website: 'https://www.charite.de/en' },
    ],
    culture: [
      { title: 'Brandenburg Gate', description: 'The city\'s most famous landmark and a symbol of German reunification. It stands at the heart of the capital, witnessing centuries of history.', icon: 'monument' },
      { title: 'Start-up Capital', description: 'Berlin is Europe\'s Silicon Valley, home to unicorns like Zalando and N26. The city attracts entrepreneurs and digital nomads from all over the world.', icon: 'rocket' },
      { title: 'Museum Island', description: 'A UNESCO World Heritage site in the Spree river, hosting five world-class museums including the Pergamon and the Altes Museum.', icon: 'pottery' },
      { title: 'Club Culture', description: 'Berlin\'s nightlife is legendary. Clubs like Berghain and the diverse techno scene have made the city a global destination for music lovers.', icon: 'speaker' },
      { title: 'East Side Gallery', description: 'The longest remaining section of the Berlin Wall, now an open-air gallery featuring murals by artists from around the world.', icon: 'art' },
      { title: 'Currywurst', description: 'Berlin\'s signature street food. Steamed and fried pork sausage seasoned with curry ketchup, best enjoyed at a local "Imbiss".', icon: 'sausage' },
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

  // ═══════════════════════════════════════════════════════════════
  // BREMEN — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'University of Bremen', type: 'university', city: 'Bremen', students: 19000, description: 'Strong in climate research, marine sciences, and engineering', programs: ['Computer Science', 'International Business', 'Marine Sciences', 'Engineering', 'Physics', 'Economics'], website: 'https://www.uni-bremen.de/en' },
      { name: 'Constructor University', type: 'university', city: 'Bremen', students: 1500, description: 'Private, English-speaking campus university with a global student body', programs: ['Computer Science', 'Software & Data Technology', 'International Business', 'Data Science', 'Psychology', 'Biochemistry'], website: 'https://constructor.university' },
      { name: 'Hochschule Bremen', type: 'applied', city: 'Bremen', students: 8700, description: 'City University of Applied Sciences with strong international networks', programs: ['International Business', 'Global Management', 'Aviation Management', 'Tourism Management', 'Logistics', 'Computer Science'], website: 'https://www.hs-bremen.de/en' },
      { name: 'Hochschule Bremerhaven', type: 'applied', city: 'Bremerhaven', students: 3000, description: 'Focus on maritime technologies and wind energy', programs: ['Maritime Engineering', 'Renewable Energy', 'Tourism Management', 'Computer Science', 'Logistics', 'Wind Energy'], website: 'https://www.hs-bremerhaven.de/en' },
    ],
    culture: [
      { title: 'Town Musicians', description: 'The bronze statue of the donkey, dog, cat, and rooster from the Brothers Grimm fairy tale. Touching the donkey\'s legs is said to bring good luck.', icon: 'horse' },
      { title: 'Schnoor Quarter', description: 'Bremen\'s oldest district. A maze of narrow cobblestone streets and tiny houses dating back to the 15th century, now filled with arts and crafts.', icon: 'houses' },
      { title: 'UNESCO Town Hall', description: 'The Gothic Town Hall and the Roland Statue are symbols of civic autonomy and freedom, recognized as a UNESCO World Heritage site.', icon: 'monument' },
      { title: 'Aerospace Hub', description: 'Bremen is the "City of Space". The European Service Module for the NASA Orion spacecraft is built here at Airbus.', icon: 'rocket' },
      { title: 'Beck\'s Brewery', description: 'Home to one of the world\'s most famous beers. The brewery on the river Weser has been exporting its green bottles since 1873.', icon: 'beer' },
      { title: 'Maritime Mile', description: 'The Schlachte embankment along the Weser river is a popular promenade with beer gardens, restaurants, and historic ships.', icon: 'anchor' },
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

  // ═══════════════════════════════════════════════════════════════
  // MECKLENBURG-VORPOMMERN — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'University of Rostock', type: 'university', city: 'Rostock', students: 13000, description: 'Oldest university in the Baltic Sea region (1419), strong in interdisciplinary research', programs: ['Medicine', 'Computer Science', 'Marine Biology', 'Mechanical Engineering', 'Renewable Energy', 'Business Administration'], website: 'https://www.uni-rostock.de/en' },
      { name: 'University of Greifswald', type: 'university', city: 'Greifswald', students: 10000, description: 'Internationally oriented research university, strong in life sciences and plasma physics', programs: ['Medicine', 'Computer Science', 'Physics', 'Biology', 'Business Administration', 'Law'], website: 'https://www.uni-greifswald.de/en' },
      { name: 'Hochschule Wismar', type: 'applied', city: 'Wismar', students: 8000, description: 'Technology, Business, and Design with a strong maritime focus', programs: ['Computer Science', 'Business Administration', 'Maritime Engineering', 'Architecture', 'Electrical Engineering', 'Design'], website: 'https://www.hs-wismar.de/en' },
      { name: 'Hochschule Stralsund', type: 'applied', city: 'Stralsund', students: 2500, description: 'Young campus university focusing on renewable energy and tourism', programs: ['Renewable Energy', 'Computer Science', 'International Management', 'Tourism Management', 'Maritime Engineering', 'Electrical Engineering'], website: 'https://www.hochschule-stralsund.de/en' },
    ],
    culture: [
      { title: 'Schwerin Castle', description: 'Located on an island in Lake Schwerin, this romantic palace is nicknamed the "Neuschwanstein of the North" and houses the state parliament.', icon: 'castle' },
      { title: 'Baltic Coast', description: 'With islands like Rügen and Usedom, the state boasts Germany\'s most beautiful beaches and the iconic chalk cliffs painted by Caspar David Friedrich.', icon: 'beach' },
      { title: 'Hanseatic Heritage', description: 'The historic centers of Stralsund and Wismar are UNESCO World Heritage sites, reflecting the wealth and power of the Hanseatic League.', icon: 'bricks' },
      { title: 'Müritz National Park', description: 'A land of a thousand lakes. The largest terrestrial national park in Germany offers pristine nature, canoeing, and eagle watching.', icon: 'canoe' },
      { title: 'Hanse Sail', description: 'One of the world\'s largest maritime festivals, bringing hundreds of tall ships and millions of visitors to Rostock every summer.', icon: 'sailboat' },
      { title: 'Backsteingotik', description: 'The distinctive "Brick Gothic" architecture characterizes the region, with massive red-brick churches and city gates dominating the skylines.', icon: 'church' },
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

  // ═══════════════════════════════════════════════════════════════
  // SCHLESWIG-HOLSTEIN — converted from old data
  // ═══════════════════════════════════════════════════════════════
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
      { name: 'Kiel University (CAU)', type: 'university', city: 'Kiel', students: 27000, description: 'Strong focus on marine sciences, nano science, and life sciences', programs: ['Computer Science', 'Medicine', 'Marine Sciences', 'International Business', 'Physics', 'Sustainability Studies'], website: 'https://www.uni-kiel.de/en' },
      { name: 'University of Lübeck', type: 'university', city: 'Lübeck', students: 5000, description: 'Ranked #1 for Medicine in CHE ranking, research-intensive', programs: ['Medicine', 'Computer Science', 'Biomedicine', 'Medical Informatics', 'Psychology', 'Mathematics'], website: 'https://www.uni-luebeck.de/en' },
      { name: 'Flensburg University of Applied Sciences', type: 'applied', city: 'Flensburg', students: 4000, description: 'Located on a shared campus near the Danish border, focus on energy', programs: ['International Business', 'Renewable Energy', 'Computer Science', 'Tourism Management', 'Engineering'], website: 'https://www.hs-flensburg.de/en' },
      { name: 'FH Kiel', type: 'applied', city: 'Kiel', students: 7500, description: 'Largest university of applied sciences in the state', programs: ['Computer Science', 'Business Administration', 'Mechanical Engineering', 'Electrical Engineering', 'International Business', 'Renewable Energy'], website: 'https://www.fh-kiel.de/en' },
    ],
    culture: [
      { title: 'Wadden Sea', description: 'A UNESCO World Heritage site and the largest unbroken system of intertidal sand and mud flats in the world. A unique ecosystem teeming with life.', icon: 'seafood' },
      { title: 'Holstentor', description: 'The iconic Brick Gothic city gate of Lübeck, a symbol of the Hanseatic League and a UNESCO World Heritage site.', icon: 'castle' },
      { title: 'Kiel Week', description: 'The largest sailing event in the world and a massive summer festival (Kieler Woche) that attracts millions of visitors.', icon: 'sailboat' },
      { title: 'Lübeck Marzipan', description: 'A world-famous sweet treat protected by EU law. Niederegger is the most famous producer, founded in 1806.', icon: 'candy' },
      { title: 'Sylt', description: 'Germany\'s "Hamptons". An island in the North Sea known for its distinctive shape, long sandy beaches, and thatched-roof houses.', icon: 'beach' },
      { title: 'Viking Heritage', description: 'Haithabu (Hedeby) was a major Viking trading settlement. Today, a museum and reconstructed village showcase this fascinating history.', icon: 'swords' },
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

  // ═══════════════════════════════════════════════════════════════
  // HAMBURG — converted from old data
  // ═══════════════════════════════════════════════════════════════
  hamburg: {
    id: 'hamburg',
    name: 'Hamburg',
    germanName: 'Hamburg',
    capital: 'Hamburg',
    population: '1.9 million',
    area: '755 km²',
    motto: 'Tor zur Welt.',
    description:
      'Hamburg is Germany\'s "Gateway to the World" — a city of bridges, water, and trade. As a major European port and media hub, it offers a cosmopolitan atmosphere, a high standard of living, and a thriving scene for science and innovation.',
    image: '/states/hamburg.jpg',
    universities: [
      { name: 'University of Hamburg', type: 'university', city: 'Hamburg', students: 43000, description: 'University of Excellence, renowned for climate research and manuscript cultures', programs: ['Computer Science', 'International Business', 'Medicine', 'Physics', 'Law', 'Economics'], website: 'https://www.uni-hamburg.de/en' },
      { name: 'Hamburg University of Technology (TUHH)', type: 'technical', city: 'Hamburg', students: 7800, description: 'Highly specialized in engineering, aviation, and logistics', programs: ['Computer Science', 'Aerospace Engineering', 'Mechanical Engineering', 'Materials Science', 'Information Systems', 'Logistics'], website: 'https://www.tuhh.de' },
      { name: 'HAW Hamburg', type: 'applied', city: 'Hamburg', students: 17000, description: 'Second largest university in Hamburg, strong focus on design and media', programs: ['Computer Science', 'Business Administration', 'Mechanical Engineering', 'Automotive Engineering', 'Aeronautical Engineering', 'Media Design'], website: 'https://www.haw-hamburg.de/en' },
      { name: 'HafenCity University', type: 'university', city: 'Hamburg', students: 2400, description: 'Specialized in architecture and metropolitan development', programs: ['Architecture', 'Urban Planning', 'Civil Engineering', 'Real Estate', 'Metropolitan Culture', 'Resource Efficiency'], website: 'https://www.hcu-hamburg.de/en' },
    ],
    culture: [
      { title: 'Elbphilharmonie', description: 'A dazzling concert hall built on top of an old warehouse. Its wave-like glass facade has become the new symbol of the city.', icon: 'note' },
      { title: 'Speicherstadt', description: 'The world\'s largest warehouse district and a UNESCO World Heritage site. Red-brick Gothic buildings crisscrossed by narrow canals.', icon: 'bricks' },
      { title: 'Port of Hamburg', description: 'Germany\'s largest port. Boat tours offer close-up views of massive container ships, historic vessels, and the busy container terminals.', icon: 'ship' },
      { title: 'Miniatur Wunderland', description: 'The world\'s largest model railway system. A magical world that attracts more visitors than any other tourist attraction in Germany.', icon: 'train' },
      { title: 'Reeperbahn', description: 'The famous entertainment mile in the St. Pauli district. Known for its nightlife, theaters, and musical history (The Beatles started here).', icon: 'guitar' },
      { title: 'Alster Lakes', description: 'Two artificial lakes in the heart of the city (Binnenalster and Außenalster). Popular for sailing, rowing, and relaxing on the banks.', icon: 'sailboat' },
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

// === Helper functions ===

export function getStateStudienkollegs(stateId: string): StudienkollegData[] {
  const stateName = STATE_STUDIENKOLLEG_MAP[stateId];
  if (!stateName) return [];
  return getAllStudienkollegs().filter((sk) => sk.state === stateName);
}
