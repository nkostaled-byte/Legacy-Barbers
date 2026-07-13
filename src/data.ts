/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  accent: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: string;
  avatar: string;
}

export const CINEMATIC_IMAGES = {
  exterior: "/src/assets/images/barber_exterior_1783896130462.jpg",
  doors: "/src/assets/images/barber_doors_1783896140452.jpg",
  interior: "/src/assets/images/barber_interior_1783896150149.jpg",
  chair: "/src/assets/images/barber_chair_1783896160829.jpg",
};

export const SERVICES: Service[] = [
  {
    id: "precision-cuts",
    title: "Precision Cuts",
    subtitle: "SARTORIAL HAIR DESIGN",
    description: "Bespoke scissor work and scissor-over-comb techniques tailored to your head structure, finished with a straight razor neck shave and styling.",
    price: "R 1,700",
    duration: "45 Mins",
    accent: "01"
  },
  {
    id: "luxury-beard",
    title: "Luxury Beard Grooming",
    subtitle: "SCULPT & SHAPE",
    description: "Architectural shaping, premium beard oil infusion, hot steam treatment, and crisp razor-edge definition to elevate your facial structure.",
    price: "R 1,450",
    duration: "40 Mins",
    accent: "02"
  },
  {
    id: "hot-towel",
    title: "Hot Towel Shaves",
    subtitle: "THE ORIGINAL RITUAL",
    description: "Classic straight razor shave with double pre-shave oil massage, hot infused towels, custom-whipped shaving cream, and cold stone closing.",
    price: "R 2,000",
    duration: "50 Mins",
    accent: "03"
  },
  {
    id: "hair-treatments",
    title: "Hair Treatments",
    subtitle: "REJUVENATE & NOURISH",
    description: "Deep clarifying scalp massage, tea tree oil steaming, hair-strengthening tonics, and premium conditioning wash to revitalize hair follicles.",
    price: "R 1,150",
    duration: "30 Mins",
    accent: "04"
  },
  {
    id: "kids-haircuts",
    title: "Kids Haircuts",
    subtitle: "THE NEXT GENERATION",
    description: "Junior precision haircutting with tailored gentle care, premium non-toxic styling, and an introduction to the grooming legacy.",
    price: "R 990",
    duration: "30 Mins",
    accent: "05"
  }
];

export const BARBERS: Barber[] = [
  {
    id: "arthur",
    name: "Arthur Pendelton",
    role: "Master Barber & Founder",
    rating: "5.0 ★ (1,240+ bookings)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: "sophia",
    name: "Sophia Sterling",
    role: "Senior Artisanal Barber",
    rating: "4.9 ★ (890+ bookings)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: "marcus",
    name: "Marcus Vane",
    role: "Modern Precision Specialist",
    rating: "4.9 ★ (720+ bookings)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
  }
];
