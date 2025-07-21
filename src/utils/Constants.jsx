// lucide-react

import { TbAirConditioning, TbRefresh, TbView360Number } from "react-icons/tb";
import { Md360, MdAttachMoney, MdCompareArrows, MdDashboard, MdLocationOn, MdOutline360, MdToday } from "react-icons/md";

// react-icons/fa
import {
  FaGlobe,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaQuestionCircle,
  FaUtensils,
  FaYoutube,
  FaBed,
  FaWheelchair,
  FaUserGraduate,
  FaMotorcycle,
  FaCar,
  FaTv,
  FaRupeeSign,
  FaHandsHelping,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaFan,
  FaSnowflake,
  FaSearchLocation,
  FaBalanceScale,
} from "react-icons/fa";

// react-icons/fa6
import {
  FaDumbbell,
  FaSquareXTwitter,
  FaRegClock,
  FaPersonSwimming,
  FaRegBuilding,
  FaElevator,
  FaUserTie,
  FaBullhorn,
  FaTag,
  FaBell
} from "react-icons/fa6";

// react-icons/md
import {
  MdTableRestaurant,
  MdTransgender,
  MdWork,
  MdOutlineElectricRickshaw,
  MdOutlineCleaningServices,
  MdOutlineLocalLaundryService,
  MdOutlinePets,
  MdOutlineBalcony,
  MdElectricMeter,
  MdElevator,
  MdViewInAr,
  MdFastfood,
  MdAcUnit,
  MdSmokeFree,
  MdElectricBike,
  MdNoDrinks,
  MdMusicOff,
  MdPets,
  MdFoodBank,


} from "react-icons/md";

// react-icons/ci
import { CiWallet } from "react-icons/ci";

// react-icons/sl
import { SlCalender } from "react-icons/sl";

// react-icons/cg
import { CgSandClock } from "react-icons/cg";

// react-icons/gi
import {
  GiTheater,
  GiOfficeChair,
  GiCctvCamera,
  GiPartyPopper,
  GiHotMeal,
  GiCampCookingPot,
  GiWaterRecycling,
  GiCooler,
  GiWashingMachine,
} from "react-icons/gi";

// react-icons/io
import { IoIosAdd, IoIosSearch, IoIosWater } from "react-icons/io";

// react-icons/io5
import {
  IoMan,
  IoManOutline,
  IoWifiOutline,
  IoManSharp,
} from "react-icons/io5";

// react-icons/pi
import {
  PiOvenLight,
  PiPicnicTable,
  PiTable,
} from "react-icons/pi";

// react-icons/lu
import {
  LuRefreshCcw,
  LuSofa,
  LuCircleParking,
  LuToilet,
  LuHeater,
} from "react-icons/lu";

// react-icons/lia
import { LiaBedSolid } from "react-icons/lia";

// react-icons/bi
import { BiFridge, BiSolidFridge } from "react-icons/bi";

// react-icons/bs
import { BsBookshelf } from "react-icons/bs";

// react-icons/ri
import {
  RiBookShelfFill,
  RiHomeSmileFill,
  RiRefreshFill,
  RiMapPinLine,
} from "react-icons/ri";

// react-icons/fi
import {
  FiShield,
  FiCheckCircle,
  FiGift,
  FiWifi,
  FiActivity,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { BsFillHouseGearFill } from "react-icons/bs";
import { RiFridgeLine } from "react-icons/ri";
import { TbShoe } from "react-icons/tb";
import { MdMan3 } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { GiHolyWater } from "react-icons/gi";
import { GiWaterTank } from "react-icons/gi";
import { RiWaterFlashLine } from "react-icons/ri";
// react-icons/go
import { GoDeviceCameraVideo, GoMegaphone } from "react-icons/go";

// react-icons/im
import { ImManWoman, ImPower } from "react-icons/im";

import { HiOutlineRefresh } from "react-icons/hi";


export const typeMap = [
  { type: 1, label: "Single Sharing" },
  { type: 2, label: "Two Sharing" },
  { type: 3, label: "Three Sharing" },
  { type: 4, label: "Four Sharing" },
  { type: 5, label: "Five Sharing" },
];

export const categoryMap = [
  { category: 0, label: "Boys" },
  { category: 1, label: "Girls" },
  { category: 2, label: "Co-Live" },
];
export const categoryValues = ["Boys", "Girls", "Boys & Girls"]
export const whyChooseUs = [
  {
    id: 1,
    title: "Verified Listings",
    description: "All properties are personally verified by our team",
    icon: <FiStar size={24} />,
  },

  {
    id: 2,
    title: "360° Virtual Tours",
    description:
      "Explore PG accommodations virtually from the comfort of your home.",
    icon: <TbView360Number size={24} />,
  },
  {
    id: 3,
    title: "Neighborhood Exploration",
    description: "Discover nearby gyms, ATMs and popular landmarks.",
    icon: <FaMapMarkerAlt size={24} />,
  },
  {
    id: 4,
    title: "Food Menu Availability",
    description: "Access detailed food menus offered at PGs.",
    icon: <FaUtensils size={24} />,
  },
  {
    id: 5,
    title: "Regular Data Updates",
    description: "Listings refreshed every 15 days for accuracy.",
    icon: <TbRefresh size={24} />,
  },
  {
    id: 6,
    title: "Comparison Tool",
    description: "Easily compare multiple PG options side by side.",
    icon: <MdCompareArrows size={24} />,
  },
  {
    id: 7,
    title: "Wide Selection",
    description: "From budget PGs to luxury apartments",
    icon: <FaBed size={24} />,
  },
  {
    id: 8,
    title: "24/7 Support",
    description: "Our team is always ready to help you",
    icon: <FiUser size={24} />,
  },
];
export const howItWorks = [
  {
    step: "1",
    title: "Discover",
    desc: "Explore a diverse selection of verified PG accommodations that suit your needs.",
  },
  {
    step: "2",
    title: "Evaluate",
    desc: "Review detailed information, including amenities, photos, and pricing.",
  },
  {
    step: "3",
    title: "Connect",
    desc: "Seamlessly reach out to property owners and find your perfect place.",
  },
];
export const filterOptions = [
  {
    id: 0,
    title: "location",
    options: [
      { value: "", label: "Locality" },
      { value: "Madhapur", label: "Madhapur" },
      { value: "Gachibowli", label: "Gachibowli" },
      { value: "Hitech City", label: "Hitech City" },
      { value: "KPHB", label: "KPHB" },
      { value: "Ameerpet", label: "Ameerpet" },
    ],
  },
  {
    id: 1,
    title: "category",
    options: [
      { value: "", label: "Category" },
      { value: 0, label: "Mens" },
      { value: 1, label: "Womens" },
      { value: 2, label: "Co-Living" },
    ],
  },
  {
    id: 2,
    title: "sharing",
    options: [
      { value: "", label: "Sharing" },
      { value: 0, label: "1 Sharing" },
      { value: 1, label: "2 Sharing" },
      { value: 2, label: "3 Sharing" },
      { value: 3, label: "4 Sharing" },
      { value: 4, label: "5 Sharing" },
      { value: 5, label: "6 Sharing" },
    ],
  },
  {
    id: 3,
    title: "roomType",
    options: [
      { value: "", label: "Room Type" },
      { value: 0, label: "AC" },
      { value: 1, label: "Non-AC" },
    ],
  },
];

export const tenantOptions = [
  { label: "Students", value: 0, icon: <FaUserGraduate /> },
  {
    label: "Working Professionals",
    value: 1,
    icon: <MdWork />,
  },
];
export const tenantsValues = ["Students", "Working Professionals", "Students & Working Professionals"]

export const parkingOptions = [
  { label: "Two Wheeler", value: 40, icon: <FaMotorcycle /> },
  { label: "Three Wheeler", value: 41, icon: <MdOutlineElectricRickshaw /> },
  { label: "Four Wheeler", value: 42, icon: <FaCar /> },
];

export const signUpFeaturesForClient = [
  {
    text: "Sit Back While We Handle Your Listings – Dedicated Relationship Managers at Your Service.",
    icon: <FaUserTie />,
  },
  {
    text: "Always Up-to-Date – We Keep Your Listings Fresh and Relevant!",
    icon: <HiOutlineRefresh />,
  },
  {
    text: "Boost Your Presence – Verified Tags and Premium Positioning That Stand Out.",
    icon: <FaTag />,
  },
  {
    text: "Transparent Pricing – All-Inclusive Plans Starting at ₹1,999/- with No Hidden Fees.",
    icon: <MdAttachMoney />,
  },
  {
    text: "Your Digital Toolkit – Smart Lead Management and Owner Dashboard Included.",
    icon: <MdDashboard />,
  },
  {
    text: "Limited Time Offer: 100% Free Until Year-End 2025!",
    icon: <FiGift />,
  },
  {
    text: "Go Beyond Listings – Reach Tenants on Facebook, Google, YouTube, and Instagram!",
    icon: <GoMegaphone />,
  },
  {
    text: "Showcase Your Property Better – Add Virtual Tours, Amenities, and Dynamic Pricing.",
    icon: <Md360 />,
  },
];
export const loginSignUpFeatures = [
  {
    text: "Find Your Perfect Stay – Search by Location, Name and More.",
    icon: <FaSearchLocation />,
  },
  {
    text: "Compare with Confidence – Side-by-Side Listing Comparisons Made Easy.",
    icon: <MdCompareArrows />,
  },
  {
    text: "Tour From Anywhere – Experience 360° Virtual Walkthroughs Before You Visit.",
    icon: <MdOutline360 />,
  },
  {
    text: "Live Where It Matters – Discover Gyms, ATMs, Cafés & Hotspots Nearby.",
    icon: <MdLocationOn />,
  },
  {
    text: "Stay for a Day or a Month – Flexible Rental Options That Suit Your Needs.",
    icon: <MdToday />,
  },
  {
    text: "See What’s Served – Browse Weekly Food Menus with Veg & Non-Veg Options.",
    icon: <FaUtensils />,
  },
  {
    text: "Never Miss a Deal – Save Listings and Get Notified on Price Drops or Availability.",
    icon: <FaBell />,
  },
];
export const executives = [
  {
    name: "Sai Siva Krishna Dil Nalla",
    title: "Founder",
    department: "BTech",
    image: "/assets/Images/profiles/dil.webp",
    bio: "Started the platform with a simple goal — to make finding accommodation easier and more reliable. Focuses on new ideas and long-term vision for the product.",
    social: {
      linkedin: "https://www.linkedin.com/in/dilnalla?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "dilnalla7@gmail.com",
      github: "https://github.com/dilnalla",
      twitter: "https://x.com/dilnalla7?t=sFZR4BNiDaeAvjLA_ymtzQ&s=09",
    },
  },
  {
    name: "Chandu Nakka",
    title: "CEO",
    department: "BTech",
    image: "/assets/Images/profiles/Chandu.webp",
    bio: "Leads strategic planning, business development, and overall company operations. With a strong focus on user satisfaction, he drives the platform's mission to simplify accommodation discovery through innovation.",
    social: {
      linkedin: "https://www.linkedin.com/in/chandu-nakka?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "nchandu6468@gmail.com",
      github: "http://github.com/Nakkachandu123",
      twitter: "https://x.com/ChanduCher53716?t=oqETnKCuxWOInauZc-easQ&s=08",
    },
  },
];

export const leadershipTeam = [
  {
    name: "Aravind Malothu",
    title: "Secretary",
    department: "BTech",
    image: "/assets/Images/profiles/aravind.webp",
    bio: "Responsible for managing daily operations and team coordination. Focuses on ensuring smooth workflow across departments. Supports the team and helps the business run steadily",
    social: {
      linkedin: "https://www.linkedin.com/in/aravind-malothu-7b971b212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      email: "aravindavi2003@gmail.com",
      github: "https://github.com/appleboy-aravind",
      twitter: "https://x.com/AppleboyAravind?t=XDNjcpzj4Q2-Tu5p7cfFiA&s=08",
    },
  },
  {
    name: "Leela Prasad Bantu",
    title: "Tech Lead",
    department: "BTech",
    image: "/assets/Images/profiles/leelaprasad.webp",
    bio: "Oversees the entire website development, manages the codebase, and ensures everything runs smoothly across the platform. Focused on building reliable systems and guiding the tech team.",
    social: {
      linkedin: "https://www.linkedin.com/in/leela-prasad-bantu-73362824a/",
      email: "leelaprasad1607@gmail.com",
      github: "https://github.com/Leelaprasad001",
      twitter: "https://x.com/LeelaPrasad01?t=rntrYcLfjUYVDf_JxwqP7g&s=09",
    },
  },
  {
    name: "Bhavani Sankar Kondaka",
    title: "Software Developer",
    department: "BTech",
    image: "/assets/Images/profiles/sankar.webp",
    bio: "Works on developing and improving features across the Staymap website. Supports the technical team by writing clean, efficient code and helping deliver a great experience for users.",
    social: {
      linkedin: "https://www.linkedin.com/in/bhavani-sankar-kondaka-278388227/",
      email: "kondakabhavanisankar@gmail.com",
      github: "https://github.com/BhavaniSankar123",
      twitter: "https://x.com/SankarKondaka?t=6jG00OILSJblBKfP4AXb6Q&s=08",
    },
  },
];

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export const hoverCard = {
  scale: 1.03,
  y: -10,
  boxShadow:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

export const NoHeadFootRoutes = [
  "/login",
  "/signup",
  "/forgotpassword",
  "/postproperty",
  "/adminlogin",
  "/adminpage",
];
// export const NoPropertyRoutes = ["/", "/about", "/property"];

export const PropertyRoutes = ["/", "/about"];
export const secretKey = "staymap123";

export const NoPropertyRoutes = (pathname) => {
  // Matches exact "/", "/about", or any path starting with "/property/"
  return (
    PropertyRoutes.includes(pathname) ||
    pathname.startsWith("/property/")
  );
};
export const facilities = [
  { id: 8, name: "Power Backup", icon: <ImPower /> },
  { id: 7, name: "Wifi", icon: <IoWifiOutline /> },
  { id: 22, name: "Room Cleaning", icon: <MdOutlineCleaningServices /> },
  { id: 38, name: "Self Cooking", icon: <GiCampCookingPot /> },
  { id: 14, name: "Washing Machine", icon: <GiWashingMachine /> },
  { id: 9, name: "Laundry", icon: <MdOutlineLocalLaundryService /> },
  { id: 2, name: "Attached Washroom", icon: <LuToilet /> },
  { id: 16, name: "Geyser", icon: <LuHeater /> },
  { id: 13, name: "Refrigerator", icon: <BiSolidFridge /> },
  { id: 10, name: "Gym", icon: <FaDumbbell /> },
  { id: 12, name: "Separate EB Meter", icon: <MdElectricMeter /> },
  { id: 18, name: "TV", icon: <FaTv /> },
  { id: 28, name: "Oven", icon: <PiOvenLight /> },
  { id: 17, name: "RO Water", icon: <GiWaterRecycling /> },
  { id: 20, name: "Wheelchair Friendly", icon: <FaWheelchair /> },
  { id: 37, name: "Pet Friendly", icon: <MdOutlinePets /> },
  { id: 21, name: "Lift", icon: <MdElevator /> },
  { id: 25, name: "Swimming Pool", icon: <FaPersonSwimming /> },
  { id: 29, name: "Security", icon: <IoManOutline /> },
  { id: 1, name: "Attached Balcony", icon: <MdOutlineBalcony /> },
  { id: 3, name: "Storage Shelf", icon: <BsBookshelf /> },
  { id: 4, name: "Spacious Cupboard", icon: <RiBookShelfFill /> },
  { id: 5, name: "Cooler", icon: <GiCooler /> },
  { id: 6, name: "Hot & Delicious Meals", icon: <GiHotMeal /> },
];

export const exploreItems = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
];

export const profileItems = [
  { label: "My Favourites", href: "/favourites" },
  { label: "Login / Register", href: "/login" },
  { label: "Logout", href: "/" },
];
export const quickLinks = [
  {
    label: "Browse Properties",
    href: "/"
  },
  {
    label: "List Your Property",
    href: "/postproperty"
  },
  {
    label: "Virtual Tours",
    href: "https://youtube.com/@staymap2024",
  },
  {
    label: "Compare properties",
    href: "/404"
  },





];

export const contactInfo = [
  {
    label: "Support Line",
    icon: <FaPhone size={20} />,
    text: "+91 62813 33937",
  },
  {
    label: "Email",
    icon: <FaEnvelope size={20} />,
    text: "support@staymap.in",
  },
  {
    label: "Adderss",
    icon: <FaMapMarkerAlt size={20} />,
    text: "Madhapur, Hyderabad",
  },
];
export const popularLocalities = [
  "Madhapur",
  "Gachibowli",
  "Hitech City",
  "Ameerpet",
  "KPHB",
  "Secunderabad",
];

export const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebook size={20} />,
    href: "https://www.facebook.com/profile.php?id=61574788827250",
  },
  {
    name: "Twitter",
    icon: <FaSquareXTwitter size={20} />,
    href: "https://x.com/staymap_tweets",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={20} />,
    href: "https://www.instagram.com/staymap.in/",
  },
  {
    name: "Youtube",
    icon: <FaYoutube size={20} />,
    href: "https://youtube.com/@staymap2024?si=nJS4ZTkZa_tjZDxm",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedin size={20} />,
    href: "http://www.linkedin.com/in/staymap-india-366a3b358"
  },
];

export const footerLinks = [
  { text: "About Us", href: "/about" },
  { text: "Sitemap", href: "/404" },
  { text: "Terms & Conditions", href: "/404" },
  { text: "Privacy Policy", href: "/404" },
  { text: "Careers", href: "/careers" },
  { text: "Help Center", href: "/help" },
];
export const jobPositions = [
  {
    id: 1,
    title: "Backend Developer",
    location: "Hyderabad, India",
    category: "engineering",
    available: false,
  },
  {
    id: 2,
    title: "Branch Manager",
    location: "Hyderabad, India",
    category: "management",
    available: false,
  },
  {
    id: 3,
    title: "Client Onboarding Executive",
    location: "Hyderabad, India",
    category: "operations",
    available: false,
  },
  {
    id: 4,
    title: "Cybersecurity Specialist",
    location: "Hyderabad, India",
    category: "engineering",
    available: false,
  },
  {
    id: 5,
    title: "Fullstack Developer",
    location: "Hyderabad, India",
    category: "engineering",
    available: false,
  },
  {
    id: 6,
    title: "HR Manager",
    location: "Hyderabad, India",
    category: "hr",
    available: false,
  },
  {
    id: 7,
    title: "Legal Advisor",
    location: "Hyderabad, India",
    category: "legal",
    available: false,
  },
  {
    id: 8,
    title: "Marketing Executive",
    location: "Hyderabad, India",
    category: "marketing",
    available: false,
  },
  {
    id: 9,
    title: "UI/UX Designer",
    location: "Remote",
    category: "design",
    available: false,
  },
  {
    id: 10,
    title: "Data Analyst",
    location: "Hyderabad, India",
    category: "analytics",
    available: false,
  },
  {
    id: 11,
    title: "Database Administrator",
    location: "Hyderabad, India",
    category: "engineering",
    available: false,
  },
  {
    id: 12,
    title: "Finance Manager",
    location: "Hyderabad, India",
    category: "finance",
    available: false,
  },
  {
    id: 13,
    title: "Frontend Developer",
    location: "Hyderabad, India",
    category: "engineering",
    available: false,
  },
  {
    id: 14,
    title: "Photographer & 360° Videographer",
    location: "Hyderabad, India",
    category: "creative",
    available: false,
  },
  {
    id: 15,
    title: "Relationship Manager",
    location: "Hyderabad, India",
    category: "operations",
    available: false,
  },
  {
    id: 16,
    title: "Research and Analysis Specialist",
    location: "Hyderabad, India",
    category: "analytics",
    available: false,
  },
  {
    id: 17,
    title: "Social Media Manager",
    location: "Hyderabad, India",
    category: "marketing",
    available: false,
  },
  {
    id: 18,
    title: "Customer Support Executive",
    location: "Hyderabad, India",
    category: "operations",
    available: false,
  }
];

export const jobDetails = {
  "Backend Developer": {
    title: "Backend Developer",
    location: "Hyderabad, India",
    description: "We're looking for an experienced Backend Developer to join our team and help build scalable systems for our accommodation platform.",
    responsibilities: [
      "Design and implement backend services and APIs",
      "Optimize database queries and improve performance",
      "Ensure system security and data protection",
      "Collaborate with frontend developers to integrate user-facing elements",
      "Participate in code reviews and architectural discussions"
    ],
    requirements: [
      "3+ years of backend development experience",
      "Proficiency in Node.js and Python",
      "Experience with database systems (SQL and NoSQL)",
      "Knowledge of cloud platforms like AWS or Azure",
      "Understanding of RESTful API design principles",
      "Familiarity with containerization and microservices architecture"
    ],
    status: "No longer available"
  },
  "Branch Manager": {
    title: "Branch Manager",
    location: "Hyderabad, India",
    description: "Lead our Hyderabad branch operations and drive business growth in the region.",
    responsibilities: [
      "Oversee daily operations of the branch",
      "Manage and mentor branch staff",
      "Develop and implement business strategies",
      "Ensure customer satisfaction and service quality",
      "Monitor branch financial performance",
      "Coordinate with other departments and senior management"
    ],
    requirements: [
      "5+ years of management experience",
      "Proven track record in operations management",
      "Excellent leadership and people skills",
      "Strong business acumen and problem-solving abilities",
      "Experience in the hospitality or real estate sector is a plus",
      "Bachelor's degree in Business Administration or related field"
    ],
    status: "No longer available"
  },
  "Client Onboarding Executive": {
    title: "Client Onboarding Executive",
    location: "Hyderabad, India",
    description: "Play a key role in expanding our network of partner accommodations by evaluating and onboarding new properties.",
    responsibilities: [
      "Visit and evaluate potential PG accommodations",
      "Collect detailed information about properties",
      "Create comprehensive listings on our platform",
      "Build relationships with property owners",
      "Ensure quality standards are met for all listings",
      "Provide feedback to improve our onboarding process"
    ],
    requirements: [
      "1+ years in field operations or real estate",
      "Excellent communication and interpersonal skills",
      "Attention to detail and strong observational skills",
      "Ability to work independently and manage time effectively",
      "Knowledge of Hyderabad's local areas and neighborhoods",
      "Own transportation preferred"
    ],
    status: "No longer available"
  },
  "Cybersecurity Specialist": {
    title: "Cybersecurity Specialist",
    location: "Hyderabad, India",
    description: "Protect our platform and user data from emerging security threats in the digital accommodation space.",
    responsibilities: [
      "Implement and maintain security measures",
      "Monitor systems for security breaches",
      "Conduct vulnerability assessments and penetration testing",
      "Develop security policies and procedures",
      "Respond to security incidents and lead investigations",
      "Educate staff on security best practices"
    ],
    requirements: [
      "3+ years in cybersecurity roles",
      "Certifications like CEH, CISSP, or CISM preferred",
      "Knowledge of OWASP Top 10 vulnerabilities",
      "Experience with security tools and frameworks",
      "Understanding of compliance requirements (GDPR, etc.)",
      "Strong problem-solving and analytical skills"
    ],
    status: "No longer available"
  },
  "Fullstack Developer": {
    title: "Fullstack Developer",
    location: "Hyderabad, India",
    description: "Build end-to-end features for our accommodation platform using modern web technologies.",
    responsibilities: [
      "Develop both frontend and backend components",
      "Create responsive UIs with React",
      "Build scalable APIs with Node.js",
      "Optimize application performance",
      "Collaborate with designers and product managers",
      "Write clean, maintainable, and tested code"
    ],
    requirements: [
      "2+ years of fullstack development experience",
      "Proficiency in React and Node.js",
      "Experience with databases (MongoDB, PostgreSQL)",
      "Knowledge of RESTful API design",
      "Familiarity with Git and agile methodologies",
      "Bachelor's degree in Computer Science or equivalent"
    ],
    status: "No longer available"
  },
  "HR Manager": {
    title: "HR Manager",
    location: "Hyderabad, India",
    description: "Oversee all human resources activities and foster a positive work culture at our growing company.",
    responsibilities: [
      "Manage recruitment and onboarding processes",
      "Develop and implement HR policies",
      "Handle employee relations and performance management",
      "Coordinate training and development programs",
      "Administer compensation and benefits",
      "Ensure compliance with labor laws"
    ],
    requirements: [
      "5+ years of HR experience",
      "Degree in Human Resources or related field",
      "Knowledge of employment laws and regulations",
      "Excellent interpersonal and communication skills",
      "Experience with HR software systems",
      "Ability to handle confidential information"
    ],
    status: "No longer available"
  },
  "Legal Advisor": {
    title: "Legal Advisor",
    location: "Hyderabad, India",
    description: "Provide expert legal guidance to support our business operations and ensure compliance.",
    responsibilities: [
      "Review and draft contracts and agreements",
      "Ensure compliance with relevant laws and regulations",
      "Handle legal disputes and litigation matters",
      "Advise on intellectual property protection",
      "Develop company policies and procedures",
      "Stay updated on legal developments"
    ],
    requirements: [
      "LLB or equivalent law degree",
      "3+ years of corporate legal experience",
      "Membership in good standing with the bar council",
      "Strong knowledge of contract law",
      "Excellent research and analytical skills",
      "Ability to explain complex legal concepts"
    ],
    status: "No longer available"
  },
  "Marketing Executive": {
    title: "Marketing Executive",
    location: "Hyderabad, India",
    description: "Develop and execute marketing strategies to promote our platform and attract users.",
    responsibilities: [
      "Plan and implement marketing campaigns",
      "Manage digital marketing channels",
      "Analyze market trends and customer insights",
      "Coordinate with creative teams for content",
      "Monitor campaign performance metrics",
      "Build partnerships and collaborations"
    ],
    requirements: [
      "2+ years in marketing roles",
      "Experience with digital marketing tools",
      "Strong analytical and creative skills",
      "Excellent communication abilities",
      "Knowledge of SEO and social media marketing",
      "Bachelor's degree in Marketing or related field"
    ],
    status: "No longer available"
  },
  "UI/UX Designer": {
    title: "UI/UX Designer",
    location: "Remote",
    description: "Create intuitive and visually appealing interfaces for our accommodation platform.",
    responsibilities: [
      "Design user interfaces and experiences",
      "Create wireframes and prototypes",
      "Conduct user research and testing",
      "Collaborate with developers and product managers",
      "Maintain design systems and guidelines",
      "Stay updated on design trends and best practices"
    ],
    requirements: [
      "2+ years of UI/UX design experience",
      "Proficiency in Figma and Adobe XD",
      "Strong portfolio of design projects",
      "Understanding of user-centered design",
      "Knowledge of frontend development basics",
      "Excellent visual design skills"
    ],
    status: "No longer available"
  },
  "Data Analyst": {
    title: "Data Analyst",
    location: "Hyderabad, India",
    description: "Transform data into actionable insights to drive business decisions for our platform.",
    responsibilities: [
      "Collect and analyze platform data",
      "Create reports and visualizations",
      "Identify trends and patterns",
      "Support data-driven decision making",
      "Develop and maintain dashboards",
      "Collaborate with various teams"
    ],
    requirements: [
      "2+ years in data analysis roles",
      "Proficiency in SQL and Excel",
      "Experience with BI tools (Tableau, Power BI)",
      "Knowledge of statistical analysis",
      "Strong problem-solving skills",
      "Bachelor's degree in a quantitative field"
    ],
    status: "No longer available"
  },
  "Database Administrator": {
    title: "Database Administrator",
    location: "Hyderabad, India",
    description: "Maintain and optimize our database systems to ensure reliable performance.",
    responsibilities: [
      "Install and configure database systems",
      "Monitor and optimize performance",
      "Implement backup and recovery plans",
      "Ensure data security and integrity",
      "Troubleshoot database issues",
      "Plan for capacity growth"
    ],
    requirements: [
      "3+ years of DBA experience",
      "Expertise in MongoDB and PostgreSQL",
      "Knowledge of database security",
      "Experience with cloud databases",
      "Strong problem-solving skills",
      "Relevant certifications preferred"
    ],
    status: "No longer available"
  },
  "Finance Manager": {
    title: "Finance Manager",
    location: "Hyderabad, India",
    description: "Oversee financial operations and provide strategic guidance for our growing business.",
    responsibilities: [
      "Prepare financial reports and forecasts",
      "Manage budgeting and cash flow",
      "Oversee accounting operations",
      "Ensure regulatory compliance",
      "Analyze financial performance",
      "Develop financial strategies"
    ],
    requirements: [
      "5+ years in finance roles",
      "CA or MBA in Finance preferred",
      "Strong analytical skills",
      "Knowledge of financial regulations",
      "Experience with financial software",
      "Excellent leadership abilities"
    ],
    status: "No longer available"
  },
  "Frontend Developer": {
    title: "Frontend Developer",
    location: "Hyderabad, India",
    description: "Build engaging user interfaces for our accommodation platform using modern web technologies.",
    responsibilities: [
      "Develop responsive web interfaces",
      "Implement UI components with React",
      "Optimize frontend performance",
      "Ensure cross-browser compatibility",
      "Collaborate with designers",
      "Write clean and maintainable code"
    ],
    requirements: [
      "2+ years of frontend experience",
      "Proficiency in React and JavaScript",
      "Experience with Tailwind CSS",
      "Knowledge of REST APIs",
      "Familiarity with Git",
      "Bachelor's in Computer Science or equivalent"
    ],
    status: "No longer available"
  },
  "Photographer & 360° Videographer": {
    title: "Photographer & 360° Videographer",
    location: "Hyderabad, India",
    description: "Capture high-quality visual content of accommodations to showcase on our platform.",
    responsibilities: [
      "Photograph PG accommodations professionally",
      "Create 360° virtual tours",
      "Edit and process images/videos",
      "Maintain equipment inventory",
      "Travel to various locations",
      "Ensure consistent visual quality"
    ],
    requirements: [
      "2+ years photography experience",
      "Portfolio demonstrating skills",
      "Experience with 360° cameras",
      "Knowledge of photo editing software",
      "Own professional equipment",
      "Ability to work independently"
    ],
    status: "No longer available"
  },
  "Relationship Manager": {
    title: "Relationship Manager",
    location: "Hyderabad, India",
    description: "Build and maintain strong relationships with our accommodation partners.",
    responsibilities: [
      "Serve as primary contact for partners",
      "Address partner concerns and requests",
      "Monitor partner performance",
      "Identify opportunities for improvement",
      "Conduct regular check-ins",
      "Gather partner feedback"
    ],
    requirements: [
      "2+ years in client-facing roles",
      "Excellent communication skills",
      "Problem-solving attitude",
      "Knowledge of hospitality industry",
      "Ability to build rapport",
      "Bachelor's degree preferred"
    ],
    status: "No longer available"
  },
  "Research and Analysis Specialist": {
    title: "Research and Analysis Specialist",
    location: "Hyderabad, India",
    description: "Conduct market research and analysis to support strategic business decisions.",
    responsibilities: [
      "Gather and analyze market data",
      "Identify industry trends",
      "Prepare research reports",
      "Support strategic planning",
      "Monitor competitors",
      "Present findings to stakeholders"
    ],
    requirements: [
      "2+ years in research roles",
      "Strong analytical skills",
      "Proficiency in research methodologies",
      "Excellent written communication",
      "Attention to detail",
      "Bachelor's in Business or related field"
    ],
    status: "No longer available"
  },
  "Social Media Manager": {
    title: "Social Media Manager",
    location: "Hyderabad, India",
    description: "Develop and execute social media strategies to enhance our brand presence.",
    responsibilities: [
      "Create engaging content",
      "Manage social media accounts",
      "Monitor online conversations",
      "Analyze performance metrics",
      "Run social media campaigns",
      "Stay updated on trends"
    ],
    requirements: [
      "2+ years in social media management",
      "Experience with major platforms",
      "Content creation skills",
      "Analytical mindset",
      "Creative thinking",
      "Bachelor's in Marketing or related"
    ],
    status: "No longer available"
  },
  "Customer Support Executive": {
    title: "Customer Support Executive",
    location: "Hyderabad, India",
    description: "Provide excellent support to our users and help resolve their inquiries and issues.",
    responsibilities: [
      "Respond to customer inquiries",
      "Troubleshoot platform issues",
      "Maintain customer records",
      "Escalate complex issues",
      "Provide product information",
      "Collect customer feedback"
    ],
    requirements: [
      "1+ years in customer support",
      "Excellent communication skills",
      "Patience and empathy",
      "Problem-solving abilities",
      "Basic technical knowledge",
      "Flexibility to work shifts"
    ],
    status: "No longer available"
  }
};

export const categories = [
  { id: "all", name: "All" },
  { id: "engineering", name: "Engineering" },
  { id: "management", name: "Management" },
  { id: "operations", name: "Operations" },
  { id: "marketing", name: "Marketing" },
  { id: "design", name: "Design" },
  { id: "analytics", name: "Analytics" },
  { id: "hr", name: "Human Resources" },
  { id: "finance", name: "Finance" },
  { id: "legal", name: "Legal" },
  { id: "creative", name: "Creative" }
];
export const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    icon: <FaQuestionCircle className="mr-2" />,
  },
  {
    id: "account",
    name: "Account Help",
    icon: <FaQuestionCircle className="mr-2" />,
  },
  {
    id: "technical",
    name: "Technical Support",
    icon: <FaQuestionCircle className="mr-2" />,
  },
  {
    id: "billing",
    name: "Billing & Payments",
    icon: <FaQuestionCircle className="mr-2" />,
  },
];
export const allFaqs = {
  general: [
    {
      id: "gen1",
      question: "What services do you offer?",
      answer:
        "We offer Property listings with 360° virtual tours, detailed amenities and daily rent options. Users can explore neighbourhood hotspots, compare Properties and view food menus. Owners get a Relationship Manager to handle uploads and digital marketing. Listings are updated every 15 days.",
    },
    {
      id: "gen2",
      question: "How do I get started with your services?",
      answer:
        "Users can search Properties by locality or name, apply filters and explore via virtual tours. Listings can be saved or compared easily. Owners can start with our ₹1,999/- per month plan. A Relationship Manager will assist with uploads and promotion. It’s simple, fast, and fully guided.",
    },
    {
      id: "gen3",
      question: "What are your working hours?",
      answer:
        "We’re available every day from 9:00 AM to 9:00 PM for all support needs. Our 24/7 Live Chat is always active for instant help. Whether you're searching for a Property or listing one, we’re here to assist you throughout the day.",
    },
  ],
  account: [
    {
      id: "acc1",
      question: "How do I reset my password?",
      answer:
        'Click on "Forgot Password" on the login page and follow the instructions sent to your registered email address.',
    },
    {
      id: "acc2",
      question: "Can I change my account email?",
      answer:
        "No, you cannot change your account email",
    },
  ],
  technical: [
    {
      id: "tech1",
      question: "What browsers do you support?",
      answer:
        "We support all modern browsers including Chrome, Firefox, Safari, Edge, and Opera with the latest versions.",
    },
    {
      id: "tech2",
      question: "How do I report a bug?",
      answer:
        "If you notice any issues or bugs while using the website, you can report them directly through our Help Center or email us at support@staymap.in with a screenshot and brief description. Our tech team will look into it immediately. We appreciate your help in making the platform better!.",
    },
  ],
  billing: [
    {
      id: "bill1",
      question: "What payment methods do you accept?",
      answer:
        "We accept a wide range of payment options for your convenience. These include UPI, debit/credit cards, net banking, and popular digital wallets. All transactions are secure and encrypted. You'll receive instant confirmation upon successful payment. Need help? Our support team is just a click away.",
    },
    {
      id: "bill2",
      question: "Can I get an invoice for my payment?",
      answer:
        "Yes, you will automatically receive a digital invoice on your registered email after a successful payment. It includes all necessary details like plan, amount, date, and GST (if applicable). Need help? Just reach out to our support team.",
    },
  ],
};

export const homeCarousel = [
  {
    id: 1,
    title: "Modern Student Housing",
    image: "/assets/Images/HomeCoursels/1.png",
  },
  {
    id: 2,
    title: "Cozy City Stays",
    image: "assets/Images/HomeCoursels/2.webp",
  },
  {
    id: 3,
    title: "Luxury Apartments",
    image: "assets/Images/HomeCoursels/2.webp",
  },
];
export const PgCarousel = [
  {
    id: 1,
    title: "Modern Student Housing",
    image: "/assets/Images/PgCarousels/1.webp",
  },
  {
    id: 2,
    title: "Cozy City Stays",
    image: "assets/Images/PgCarousels/2.webp",
  },
  {
    id: 3,
    title: "Luxury Apartments",
    image: "assets/Images/PgCarousels/3.webp",
  },
];
export const electric_charges = ["Extra", "Included"]

export const electric_form = [
  { id: "electric-included", label: "Included", value: "1" },
  { id: "electric-extra", label: "Extra", value: "0" },
]
export const pricing = {
  ac: {
    single: 15000,
    double: 10000,
    triple: 9000,
    four: 7000,
    five: 5000,
  },
  nonAc: {
    single: 12000,
    double: 8000,
    triple: 7000,
    four: 6000,
    five: 4000,
  },
};
export const amenities = [
  { name: "WIFI", icon: <FiWifi className="inline mr-1" /> },
  { name: "AC", icon: <MdAcUnit className="inline mr-1" /> },
  { name: "GYM", icon: <FiActivity className="inline mr-1" /> },
  { name: "+More" },
];
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const scaleUp = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

export const iconPulse = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

// In PgCard.jsx

export const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <FaChevronLeft size={14} />
    </div>
  );
};

export const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute right-2 top-1/2 transform -translate-y-1/2  cursor-pointer bg-white p-2 rounded-full shadow"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <FaChevronRight size={14} />
    </div>
  );
};

export const days = [
  { id: "sunday", name: "Sunday" },
  { id: "monday", name: "Monday" },
  { id: "tuesday", name: "Tuesday" },
  { id: "wednesday", name: "Wednesday" },
  { id: "thursday", name: "Thursday" },
  { id: "friday", name: "Friday" },
  { id: "saturday", name: "Saturday" },
];
export const meals = [
  { id: "breakfast", name: "Breakfast", time: "07:30 - 08:00" },
  { id: "lunch", name: "Lunch", time: "12:30 - 14:30" },
  { id: "dinner", name: "Dinner", time: "19:30 - 21:00" },
];
export const menuData = {
  sunday: {
    breakfast: ["Carrot Idli", "Tea", "Peanut Chutney", "Sambar"],
    lunch: ["Chapati", "Dondakaya Vepudu", "Lemon Rice", "Pickle"],
    dinner: ["Plain Rice", "Pumpkin Sambar", "Tomato Raita", "Curd"],
  },
  monday: {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Onion Pulao", "Brinjal Sambar", "Salad"],
    dinner: ["Veg Sagoo", "Plain Rice", "Fryums"],
  },
  tuesday: {
    breakfast: ["Carrot Idli", "Tea", "Peanut Chutney", "Sambar"],
    lunch: ["Chapati", "Dondakaya Vepudu", "Lemon Rice", "Pickle"],
    dinner: ["Plain Rice", "Pumpkin Sambar", "Tomato Raita", "Curd"],
  },
  wednesday: {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Onion Pulao", "Brinjal Sambar", "Salad"],
    dinner: ["Veg Sagoo", "Plain Rice", "Fryums"],
  },
  thursday: {
    breakfast: ["Carrot Idli", "Tea", "Peanut Chutney", "Sambar"],
    lunch: ["Chapati", "Dondakaya Vepudu", "Lemon Rice", "Pickle"],
    dinner: ["Plain Rice", "Pumpkin Sambar", "Tomato Raita", "Curd"],
  },
  friday: {
    breakfast: ["Poha", "Tea", "Banana"],
    lunch: ["Onion Pulao", "Brinjal Sambar", "Salad"],
    dinner: ["Veg Sagoo", "Plain Rice", "Fryums"],
  },
  saturday: {
    breakfast: ["Carrot Idli", "Tea", "Peanut Chutney", "Sambar"],
    lunch: ["Chapati", "Dondakaya Vepudu", "Lemon Rice", "Pickle"],
    dinner: ["Plain Rice", "Pumpkin Sambar", "Tomato Raita", "Curd"],
  },

};
export const features = [
  { key: "availableFrom", title: "Available From", icon: <SlCalender /> },
  { key: "electricCharges", title: "Electric Charges", icon: <ImPower /> },
  { key: "fixedDeposit", title: "Deposit Money", icon: <CiWallet /> },
  { key: "lockInPeriod", title: "Lock-in Period", icon: <CgSandClock /> },
  { key: "maintenanceAmount", title: "Maintenance Amount", icon: <CiWallet /> },
  { key: "noOfFloors", title: "No Of Floors", icon: <FaRegBuilding /> },
  { key: "operatingSince", title: "Operating Since", icon: <FaRegClock /> },
  { key: "category", title: "Available For", icon: <MdTransgender /> },
];
export const sharingMap = [
  { key: 0, share: "1 share" },
  { key: 1, share: "2 share" },
  { key: 2, share: "3 share" },
  { key: 3, share: "4 share" },
  { key: 4, share: "5 share" },
  { key: 5, share: "6 share" }
];

export const roomTypes = [
  { key: "acWithFood", label: "AC with Food" },
  { key: "acWithoutFood", label: "AC without Food" },
  { key: "nonAcWithFood", label: "Non-AC with Food" },
  { key: "nonAcWithoutFood", label: "Non-AC without Food" },
];

export const Features = [
  {
    icon: <MdTransgender />,
    title: "Available For",
    value: "Boys & Girls",
  },
  {
    icon: <ImPower />,
    title: "Electricity Charges",
    value: "NA",
  },
  {
    icon: <CiWallet />,
    title: "Depoit Money",
    value: "2,000/-",
  },
  {
    icon: <CiWallet />,
    title: "Maintainance Amount",
    value: "1,000/-",
  },
  {
    icon: <SlCalender />,
    title: "Available from",
    value: "March 20",
  },
  {
    icon: <CgSandClock />,
    title: "Lock-in Period",
    value: "3 Months",
  },
  {
    icon: <FaRegBuilding />,
    title: "No of Floors",
    value: "4",
  },
  {
    icon: <FaRegClock />,
    title: "Operating Since",
    value: "2024",
  },
];

export const shareprices = [
  {
    shareType: "1 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "7,000/-",
        dailyRent: "400/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "5,000/-",
        dailyRent: "300/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "10,000/-",
        dailyRent: "600/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "8,000/-",
        dailyRent: "500/-",
      },
    ],
  },
  {
    shareType: "2 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "9,000/-",
        dailyRent: "500/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "7,000/-",
        dailyRent: "400/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "12,000/-",
        dailyRent: "700/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "10,000/-",
        dailyRent: "600/-",
      },
    ],
  },
  {
    shareType: "3 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "11,000/-",
        dailyRent: "600/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "9,000/-",
        dailyRent: "500/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "13,000/-",
        dailyRent: "800/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "11,000/-",
        dailyRent: "700/-",
      },
    ],
  },
  {
    shareType: "4 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "12,000/-",
        dailyRent: "700/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "9,000/-",
        dailyRent: "500/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "13,000/-",
        dailyRent: "800/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "11,000/-",
        dailyRent: "700/-",
      },
    ],
  },
  {
    shareType: "5 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "10,000/-",
        dailyRent: "700/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "8,000/-",
        dailyRent: "500/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "13,000/-",
        dailyRent: "800/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "11,000/-",
        dailyRent: "700/-",
      },
    ],
  },
  {
    shareType: "6 share",
    data: [
      {
        accommodation: "Non-Ac (Including Food)",
        monthlyRent: "12,000/-",
        dailyRent: "700/-",
      },
      {
        accommodation: "Non-Ac (Excluding Food)",
        monthlyRent: "9,000/-",
        dailyRent: "500/-",
      },
      {
        accommodation: "Ac (Including Food)",
        monthlyRent: "13,000/-",
        dailyRent: "800/-",
      },
      {
        accommodation: "Ac (Excluding Food)",
        monthlyRent: "11,000/-",
        dailyRent: "700/-",
      },
    ],
  },
];
export const comparisonData = [
  { label: "Locality", key: "locality" },
  { label: "Price Range", key: "priceRange" },
  { label: "Room Types", key: "roomTypes" },
  { label: "AC Available", key: "acAvailable" },
  { label: "Beds Available", key: "bedsAvailable" },
  { label: "Amenities", key: "amenities", format: (val) => val.join(", ") },
  {
    label: "Verified",
    key: "verified",
    format: (val) => (val ? "Yes" : "No"),
  },
];
// export const days1 = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];
export const sharingdata = [
  {
    accommodation: "Non-Ac (Including Food)",
    monthlyRent: "7,000/-",
    dailyRent: "400/-",
  },
  {
    accommodation: "Non-Ac (Excluding Food)",
    monthlyRent: "5,000/-",
    dailyRent: "300/-",
  },
  {
    accommodation: "Ac (Including Food)",
    monthlyRent: "10,000/-",
    dailyRent: "600/-",
  },
  {
    accommodation: "Ac (Excluding Food)",
    monthlyRent: "8,000/-",
    dailyRent: "500/-",
  },
];


export const days1 = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
export const sharingOptions = [0, 1, 2, 3, 4, 5];
export const roomTypeOptions = [
  { value: 0, label: 'AC', icon: <FaSnowflake /> },
  { value: 1, label: 'Non-AC', icon: <FaFan /> }
];
export const tenantsPreferredOptions = [
  { value: 0, label: 'Students' },
  { value: 1, label: 'Working professionals' }
];
export const parkingAvailabilityOptions = [
  { value: 0, label: 'Two wheeler', icon: <FaMotorcycle /> },
  { value: 1, label: 'Three wheeler', icon: <FaCar /> },
  { value: 2, label: 'Four wheeler', icon: <FaCar /> }
];
export const foodOptions = [
  { value: 0, label: 'Yes' },
  { value: 1, label: 'No' },
  { value: 2, label: 'Outside food allowed' }
];
export const categoryOptions = [
  { value: 0, label: 'Boys' },
  { value: 1, label: 'Girls' },
  { value: 2, label: 'Co-Living' }
];
export const facilityOptions = [
  {
    id: 0,
    icon: <TbAirConditioning />,
    label: "Air Conditioner",
  },
  {
    id: 1,
    icon: <MdOutlineBalcony />,
    label: "Attached Balcony",
  },
  {
    id: 2,
    icon: <LuToilet />,
    label: "Attached Washrooms",
  },
  {
    id: 3,
    icon: <RiBookShelfFill />,
    label: "Storage Shelf",
  },
  {
    id: 4,
    icon: <BsBookshelf />, // For cupboards
    label: "Spacious Cupboards",
  },
  {
    id: 5,
    icon: <GiCooler />, // Specific cooler icon
    label: "Cooler",
  },
  {
    id: 6,
    icon: <GiHotMeal />,
    label: "Hot & Delicious Meals",
  },
  {
    id: 7,
    icon: <IoWifiOutline />,
    label: "High Speed Wifi",
  },
  {
    id: 8,
    icon: <ImPower />,
    label: "Power Backup",
  },
  {
    id: 9,
    icon: <MdOutlineLocalLaundryService />,
    label: "Laundry Services",
  },
  {
    id: 10,
    icon: <CgGym />, // More specific gym icon
    label: "Gym",
  },
  {
    id: 11,
    icon: <BsFillHouseGearFill />, // For housekeeping
    label: "Housekeeping",
  },
  {
    id: 12,
    icon: <ImPower />,
    label: "Electricity Charges",
  },
  {
    id: 13,
    icon: <RiFridgeLine />, // For refrigerator
    label: "Refrigerator",
  },
  {
    id: 14,
    icon: <GiWashingMachine />,
    label: "Washing Machine",
  },
  {
    id: 15,
    icon: <GiCctvCamera />,
    label: "CCTV",
  },
  {
    id: 16,
    icon: <GiHolyWater />, // For geyser
    label: "Geyser",
  },
  {
    id: 17,
    icon: <GiWaterTank />,
    label: "Water Purifier",
  },
  {
    id: 18,
    icon: <FaTv />,
    label: "TV",
  },
  {
    id: 19,
    icon: <MdTableRestaurant />,
    label: "Study Table",
  },
  {
    id: 20,
    icon: <FaWheelchair />,
    label: "Wheelchair Friendly",
  },
  {
    id: 21,
    icon: <FaElevator />,
    label: "Lift",
  },
  {
    id: 22,
    icon: <MdOutlineCleaningServices />,
    label: "Cleaning Services",
  },
  {
    id: 23,
    icon: <IoIosWater />, // Could use a better tanker icon if available
    label: "Tanker",
  },
  {
    id: 24,
    icon: <IoIosWater />, // Could use a better underground icon
    label: "Underground water",
  },
  {
    id: 25,
    icon: <FaPersonSwimming />,
    label: "Swimming Pool",
  },
  {
    id: 26,
    icon: <IoMan />,
    label: "Supervisor",
  },
  {
    id: 27,
    icon: <RiWaterFlashLine />,
    label: "Water Cooler",
  },
  {
    id: 28,
    icon: <PiOvenLight />,
    label: "Oven",
  },
  {
    id: 29,
    icon: <MdMan3 />, // Better security icon
    label: "Security",
  },
  {
    id: 30,
    icon: <LiaBedSolid />,
    label: "Beds",
  },
  {
    id: 31,
    icon: <PiPicnicTable />,
    label: "Dining Table",
  },
  {
    id: 32,
    icon: <LuSofa />,
    label: "Sofa",
  },
  {
    id: 33,
    icon: <GiOfficeChair />,
    label: "Chair",
  },
  {
    id: 34,
    icon: <TbShoe />, // Shoe rack icon
    label: "Shoe Rack",
  },
  {
    id: 35,
    icon: <PiTable />,
    label: "Bedside Table",
  },
  {
    id: 36,
    icon: <BiFridge />,
    label: "Mini Fridge",
  },
  {
    id: 37,
    icon: <MdOutlinePets />,
    label: "Keeping Pets",
  },
  {
    id: 38,
    icon: <GiCampCookingPot />,
    label: "Self Cooking",
  },
  {
    id: 39,
    icon: <GiTheater />,
    label: "Home Theatre",
  },
  {
    id: 40,
    icon: <LuCircleParking />,
    label: "2 Wheeler Parking",
  },
  {
    id: 41,
    icon: <LuCircleParking />,
    label: "3 Wheeler Parking",
  },
  {
    id: 42,
    icon: <LuCircleParking />,
    label: "4 Wheeler Parking",
  },
];
export const pgrules = [
  { id: 0, name: 'visitorPolicies', label: 'Visitor policies', icon: <IoManSharp /> },
  { id: 1, name: 'smoking', label: 'Smoking', icon: <MdSmokeFree /> },
  { id: 2, name: 'drinking', label: 'Drinking', icon: <MdNoDrinks /> },
  { id: 3, name: 'loudMusic', label: 'Loud music', icon: <MdMusicOff /> },
  { id: 4, name: 'oppositeGender', label: 'Opposite gender', icon: <ImManWoman /> },
  { id: 5, name: 'parties', label: 'Parties', icon: <GiPartyPopper /> },
  { id: 6, name: 'keepingPets', label: 'Keeping pets', icon: <MdPets /> },
  { id: 7, name: 'electricalVehiclesCharging', label: 'EV charging', icon: <MdElectricBike /> },
  { id: 8, name: 'outsideFood', label: 'Outside food', icon: <MdFoodBank /> },
];
export const pgRules = [
  { id: 0, name: 'noticePeriod', label: 'Notice Peroid', icon: <CgSandClock /> },
  { id: 1, name: 'closingTime', label: 'Gate Closing Time', icon: <FaRegClock /> },
  { id: 2, name: 'visitorPolicies', label: 'Visitor policies', icon: <IoManSharp /> },
  { id: 3, name: 'smoking', label: 'Smoking', icon: <MdSmokeFree /> },
  { id: 4, name: 'drinking', label: 'Drinking', icon: <MdNoDrinks /> },
  { id: 5, name: 'loudMusic', label: 'Loud music', icon: <MdMusicOff /> },
  { id: 6, name: 'oppositeGender', label: 'Opposite gender', icon: <ImManWoman /> },
  { id: 7, name: 'parties', label: 'Parties', icon: <GiPartyPopper /> },
  { id: 8, name: 'keepingPets', label: 'Keeping pets', icon: <MdPets /> },
  { id: 9, name: 'electricalVehiclesCharging', label: 'EV charging', icon: <MdElectricBike /> },
  { id: 10, name: 'outsideFood', label: 'Outside food', icon: <MdFoodBank /> },
];

export const postpropertyRules =
  [
    {
      name: "visitor policies",
      label: "Visitor Policies",
      icon: <MdSmokeFree />,
    },
    { name: "smoking", label: "Smoking", icon: <MdSmokeFree /> },
    { name: "drinking", label: "Drinking", icon: <MdNoDrinks /> },
    {
      name: "loudMusic",
      label: "Loud music",
      icon: <MdMusicOff />,
    },
    {
      name: "oppositeGender",
      label: "Opposite gender",
      icon: <FaCheck />,
    },
    {
      name: "parties",
      label: "Parties",
      icon: <GiPartyPopper />,
    },
    {
      name: "keepingPets",
      label: "Keeping pets",
      icon: <MdPets />,
    },
    {
      name: "electricalVehiclesCharging",
      label: "EV charging",
      icon: <MdElectricBike />,
    },
    {
      name: "outsideFood",
      label: "Outside food",
      icon: <MdFoodBank />,
    },
  ];
export const properties = [
  {
    id: 1,
    icon: <IoIosSearch />,
    color: {
      background: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
    },
    title: " Find Your Ideal Accommodation",
    description: "Explore budget-friendly PG options with food and amenities.",
    btn: "Find Now",
  },
  {
    id: 2,
    icon: <IoIosAdd />,
    color: {
      background: "bg-green-50",
      border: "border-green-100",
      text: "text-green-600",
    },
    title: " List Your Property for Free",
    description: "Easily connect with the right tenants—no stress, no hassle",
    btn: "Post Property",
  },
  {
    id: 3,
    icon: <GoDeviceCameraVideo />,
    color: {
      background: "bg-blue-50",
      border: "border-blue-100",
      text: "text-blue-600",
    },
    title: " Experience Virtual Tours",
    description: "Explore all the properties remotely with 360° views",
    btn: "View Tours",
  },
];

export const POSTED_PROPERTIES_STATUS = {
  0: "Property Posted",
  1: "In Progress",
  2: "Pending",
  3: "Verified",
  4: "Deleted"
}

export const CONTACT_INFO = [
  {
    id: 1,
    icon: <FaGlobe className="text-blue-600 text-xl" />,
    title: 'Our Website',
    link: 'https://www.staymap.in',
    linkText: 'staymap.in',
  },
  {
    id: 2,
    icon: <FaPhone className="text-blue-600 text-xl" />,
    title: 'Call Us',
    link: 'tel:6281333937',
    linkText: '+91 62813 33937',
  },
  {
    id: 3,
    icon: <FaEnvelope className="text-blue-600 text-xl" />,
    title: 'Email Us',
    link: 'mailto:support@staymap.in',
    linkText: 'support@staymap.in',
  },
];

export const USER_SUPPORT_TYPES = {
  0: "Help Request",
  1: "Feedback",
  2: "Raise Ticket",
  3: "others",
}

export const ADMIN_DASHBOARD_CARDS = [
  {
    title: "Post Property",
    path: "/admin/postproperty",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-300"
  },
  {
    title: "View Posted Properties",
    path: "/admin/postedproperties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-300"
  },
  {
    title: "View Saved Properties",
    path: "/admin/savedproperties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.92c.969 0 1.371 1.24.588 1.81l-3.978 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.978-2.89a1 1 0 00-1.176 0l-3.978 2.89c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.073 10.1c-.783-.57-.38-1.81.588-1.81h4.92a1 1 0 00.95-.69l1.518-4.674z" />
      </svg>

    ),
    color: "bg-yellow-100",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-300"
  },
  {
    title: "View Verified Properties",
    path: "/admin/verifiedproperties",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-300"
  },
  {
    title: "View User Requets",
    path: "/admin/userrequests",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "bg-orange-100",
    textColor: "text-orange-700",
    borderColor: "border-orange-300"
  },
];

export const ACTION_LOGS_TYPES = {
  CREATED_ACCOUNT: 0,
  RESET_PASSWORD: 1,
  LOGGED_IN: 2,
  LOGGED_OUT: 3,
  POSTED_PROPERTY: 4,
  VERIFIED_PROPERTY: 5,
  DELETED_PROPERTY: 6,
  INPROGRESS_PROPERTY: 7,
  PENDING_PROPERTY: 8,
  POSTED_PROPERTY_BY_ADMIN: 9,
  VIEWED_PROPERTY: 10,
  CONTACTED_OWNER: 11
}

export const defaultFormData = {
  propertyName: '',
  isSubmitted: false,
  ownerMobileNumber: '',
  supervisorMobileNumber: '',
  isWhatsappAvailable: false,
  address: {
    roadNumber: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    country: 'India',
    pincode: ''
  },
  locality: '',
  category: 0,
  sharing: [],
  roomType: [],
  tenantsPreferred: [],
  parkingAvailability: [],
  food: [],
  facilitiesAndServices: [],
  links: {
    gpsLocationLink: '',
    virtualTour: ''
  },
  isBedsAvailable: 0,
  isPlanAvailable: false,
  planDetails: {
    planName: '',
    duration: '',
    startDate: '',
    endDate: ''
  },
  metadata: {
    pgRules: {
      0: '',
      1: '',
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false
    },
    electricCharges: 0,
    availableFrom: '',
    lockInPeriod: '',
    noOfFloors: '',
    operatingSince: '',
    fixedDeposit: '',
    maintenanceAmount: ''
  },
  roomPricing: {
    monthly: {
      0: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      1: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      2: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      3: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      4: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      5: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
    },
    daily: {
      0: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      1: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      2: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      3: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      4: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
      5: { nonAcWithFood: '', nonAcWithoutFood: '', acWithFood: '', acWithoutFood: '' },
    }
  },
  foodMenu: {
    sunday: { breakfast: "", lunch: "", dinner: "" },
    monday: { breakfast: "", lunch: "", dinner: "" },
    tuesday: { breakfast: "", lunch: "", dinner: "" },
    wednesday: { breakfast: "", lunch: "", dinner: "" },
    thursday: { breakfast: "", lunch: "", dinner: "" },
    friday: { breakfast: "", lunch: "", dinner: "" },
    saturday: { breakfast: "", lunch: "", dinner: "" },
  },
  pictures: [],
  openSharing: null,
  openDay: null,
}
export const FormPayLoad = (formData, selectedClientId) => {
  const {
    propertyName,
    isSubmitted,
    ownerMobileNumber,
    supervisorMobileNumber,
    isWhatsappAvailable,
    address,
    locality,
    category,
    sharing,
    roomType,
    tenantsPreferred,
    parkingAvailability,
    food,
    facilitiesAndServices,
    links,
    isBedsAvailable,
    isPlanAvailable,
    planDetails,
    metadata,
    roomPricing,
    foodMenu,
    pictures,
  } = formData;

  return {
    clientId: selectedClientId,
    propertyName,
    isSubmitted: isSubmitted ? 1 : 0,
    ownerMobileNumber,
    supervisorMobileNumber,
    isWhatsappAvailable: isWhatsappAvailable ? 1 : 0,
    address: {
      roadNumber: address.roadNumber,
      landmark: address.landmark,
      city: address.city,
      district: address.district,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
    },
    locality,
    category: category,
    sharing: sharing.map(Number),
    roomType: roomType.map(Number),
    tenantsPreferred: tenantsPreferred.map(Number),
    parkingAvailability: parkingAvailability.map(Number),
    food: food.map(Number),
    facilitiesAndServices: facilitiesAndServices.map(Number),
    links,
    isBedsAvailable: isBedsAvailable,
    isPlanAvailable: isPlanAvailable ? 1 : 0,
    planDetails: {
      planName: planDetails.planName,
      duration: planDetails.duration,
      startDate: planDetails.startDate,
      endDate: planDetails.endDate,
    },
    metadata: {
      pgRules: {
        0: metadata.pgRules[0],
        1: metadata.pgRules[1],
        2: metadata.pgRules[2] || false,
        3: metadata.pgRules[3] || false,
        4: metadata.pgRules[4] || false,
        5: metadata.pgRules[5] || false,
        6: metadata.pgRules[6] || false,
        7: metadata.pgRules[7] || false,
        8: metadata.pgRules[8] || false,
        9: metadata.pgRules[9] || false,
        10: metadata.pgRules[10] || false,
      },
      electricCharges: Number(metadata.electricCharges) || 0,
      availableFrom: metadata.availableFrom,
      lockInPeriod: metadata.lockInPeriod,
      noOfFloors: Number(metadata.noOfFloors),
      operatingSince: metadata.operatingSince,
      fixedDeposit: Number(metadata.fixedDeposit),
      maintenanceAmount: Number(metadata.maintenanceAmount),
    },
    roomPricing: {
      monthly: Object.fromEntries(
        Object.entries(roomPricing.monthly).map(([key, val]) => [
          key,
          {
            nonAcWithFood: Number(val.nonAcWithFood) || 0,
            nonAcWithoutFood: Number(val.nonAcWithoutFood) || 0,
            acWithFood: Number(val.acWithFood) || 0,
            acWithoutFood: Number(val.acWithoutFood) || 0,
          },
        ])
      ),
      daily: Object.fromEntries(
        Object.entries(roomPricing.daily).map(([key, val]) => [
          key,
          {
            nonAcWithFood: Number(val.nonAcWithFood) || 0,
            nonAcWithoutFood: Number(val.nonAcWithoutFood) || 0,
            acWithFood: Number(val.acWithFood) || 0,
            acWithoutFood: Number(val.acWithoutFood) || 0,
          },
        ])
      ),
    },
    foodMenu,
    pictures: pictures.filter((pic) => pic !== ''),

  };
};

