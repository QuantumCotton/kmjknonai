// Portfolio Management System for Contractor Sites

export interface PortfolioImage {
  id: string;
  contractorId: string;
  url: string;
  thumbnailUrl?: string;
  title: string;
  description?: string;
  projectType: 'kitchen' | 'bathroom' | 'other';
  tags: string[];
  beforeUrl?: string; // For before/after pairs
  uploadedAt: Date;
  isPublished: boolean;
  order: number;
}

export interface PortfolioProject {
  id: string;
  contractorId: string;
  title: string;
  description: string;
  projectType: 'kitchen' | 'bathroom' | 'other';
  completedDate: Date;
  budget?: string;
  duration?: string;
  images: PortfolioImage[];
  testimonial?: {
    name: string;
    text: string;
    rating: number;
  };
  isPublished: boolean;
}

// Mock data for KMJK Construction
export const KMJK_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj_1',
    contractorId: 'kmjk',
    title: 'Modern Coastal Kitchen',
    description: 'Complete kitchen renovation with custom cabinetry, quartz countertops, and high-end appliances. Beach-inspired design with white and blue accents.',
    projectType: 'kitchen',
    completedDate: new Date('2025-09-15'),
    budget: '$65,000',
    duration: '6 weeks',
    images: [
      {
        id: 'img_1',
        contractorId: 'kmjk',
        url: '/images/portfolio/kmjk/kitchen-1-after.jpg',
        beforeUrl: '/images/portfolio/kmjk/kitchen-1-before.jpg',
        title: 'Modern Coastal Kitchen - After',
        projectType: 'kitchen',
        tags: ['modern', 'coastal', 'white-cabinets', 'quartz'],
        uploadedAt: new Date('2025-09-16'),
        isPublished: true,
        order: 1
      }
    ],
    testimonial: {
      name: 'Sarah M.',
      text: 'KMJK transformed our dated kitchen into a stunning modern space. Professional, on-time, and exceeded expectations!',
      rating: 5
    },
    isPublished: true
  },
  {
    id: 'proj_2',
    contractorId: 'kmjk',
    title: 'Luxury Master Bathroom',
    description: 'Spa-like master bathroom with walk-in shower, freestanding tub, double vanity, and heated floors.',
    projectType: 'bathroom',
    completedDate: new Date('2025-08-20'),
    budget: '$42,000',
    duration: '4 weeks',
    images: [
      {
        id: 'img_2',
        contractorId: 'kmjk',
        url: '/images/portfolio/kmjk/bathroom-1-after.jpg',
        beforeUrl: '/images/portfolio/kmjk/bathroom-1-before.jpg',
        title: 'Luxury Master Bathroom - After',
        projectType: 'bathroom',
        tags: ['luxury', 'spa', 'walk-in-shower', 'freestanding-tub'],
        uploadedAt: new Date('2025-08-21'),
        isPublished: true,
        order: 1
      }
    ],
    testimonial: {
      name: 'Michael T.',
      text: 'Our master bathroom is now our favorite room! The attention to detail was incredible.',
      rating: 5
    },
    isPublished: true
  }
];

// Get portfolio for contractor
export const getContractorPortfolio = (contractorId: string): PortfolioProject[] => {
  // TODO: Fetch from Supabase when connected
  if (contractorId === 'kmjk') {
    return KMJK_PORTFOLIO;
  }
  return [];
};

// Get images by project type
export const getPortfolioByType = (
  contractorId: string,
  projectType: 'kitchen' | 'bathroom' | 'other'
): PortfolioImage[] => {
  const portfolio = getContractorPortfolio(contractorId);
  return portfolio
    .filter(p => p.projectType === projectType && p.isPublished)
    .flatMap(p => p.images)
    .sort((a, b) => a.order - b.order);
};

// Upload new portfolio image (placeholder for future Supabase integration)
export const uploadPortfolioImage = async (
  contractorId: string,
  file: File,
  metadata: Partial<PortfolioImage>
): Promise<PortfolioImage> => {
  // TODO: Upload to Supabase Storage
  console.log('[Portfolio] Upload image for contractor:', contractorId, file.name);
  
  // Mock response
  return {
    id: `img_${Date.now()}`,
    contractorId,
    url: URL.createObjectURL(file),
    title: metadata.title || file.name,
    description: metadata.description,
    projectType: metadata.projectType || 'other',
    tags: metadata.tags || [],
    uploadedAt: new Date(),
    isPublished: false,
    order: metadata.order || 0
  };
};

// Create new project
export const createProject = async (
  project: Omit<PortfolioProject, 'id'>
): Promise<PortfolioProject> => {
  // TODO: Save to Supabase
  console.log('[Portfolio] Create project:', project.title);
  
  return {
    ...project,
    id: `proj_${Date.now()}`
  };
};
