export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  details: string[];
  image?: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  avatarUrl: string;
}

export interface BookingState {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export const SERVICES: Service[] = [
  {
    id: "precision-cut",
    name: "Precision Cuts",
    description: "A tailored scissor and clipper experience mapped to your unique hair profile and cranial structure.",
    price: 75,
    duration: "45 Min",
    details: [
      "Personal structural hair analysis",
      "Signature double-wash with premium tea tree and mint oil",
      "Tailored cut & sculptural finish",
      "Styling tutorial & professional pomade application"
    ]
  },
  {
    id: "beard-grooming",
    name: "Luxury Beard Grooming",
    description: "A comprehensive sculpt and shape detailing process utilizing traditional razors and hot oils.",
    price: 60,
    duration: "30 Min",
    details: [
      "Ergonomic beard contour mapping",
      "Infused hot oil pre-shave massage",
      "Straight razor edge alignment",
      "Organic cedarwood and citrus oil conditioning"
    ]
  },
  {
    id: "towel-shave",
    name: "Hot Towel Shaves",
    description: "The ultimate classic straight razor shave experience. Complete facial rejuvenation and smooth precision.",
    price: 80,
    duration: "45 Min",
    details: [
      "Triple essential oil hot towel wrap",
      "Hand-whipped sandalwood warm lather",
      "Dual-pass traditional straight razor shave",
      "Post-shave cold towel closure & cooling rosewater mist"
    ]
  },
  {
    id: "kids-cut",
    name: "Kids Haircuts",
    description: "A refined grooming experience designed for the next generation of distinguished gentlemen.",
    price: 50,
    duration: "30 Min",
    details: [
      "Patient, professional style matching",
      "Gentle tear-free hair wash",
      "Clean cut and lightweight style trim",
      "Complimentary high-end style wax & classic soda"
    ]
  },
  {
    id: "hair-treatment",
    name: "Hair Treatments",
    description: "Scalp revitalization and deep-conditioning therapy engineered to strengthen follicles and restore luster.",
    price: 95,
    duration: "45 Min",
    details: [
      "Microscopic hair & scalp analysis",
      "Deep-cleansing charcoal clarifying wash",
      "Botanical keratin & oil restorative hair mask",
      "Relaxing warm steam scalp treatment & neck massage"
    ]
  }
];

export const BARBERS: Barber[] = [
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Master Barber & Founder",
    experience: "22 Years Experience",
    specialty: "Classic Scissor Cuts & Cranial Profiling",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "alistair",
    name: "Alistair Croft",
    role: "Senior Grooming Director",
    experience: "14 Years Experience",
    specialty: "Straight Razor Shaves & Beard Detailing",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "sophia",
    name: "Sophia Sterling",
    role: "Art Director & Lead Stylist",
    experience: "16 Years Experience",
    specialty: "Modern Textured Layers & Styling Precision",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const TIME_SLOTS: string[] = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:30 PM",
  "02:30 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM"
];
