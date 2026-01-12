// A/B Testing Framework for Elite Service Hub
// Tracks variants, assigns users, and logs conversions

export interface ABTest {
  id: string;
  name: string;
  variants: ABVariant[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-100, total should be 100
  config: Record<string, any>;
}

export interface ABAssignment {
  testId: string;
  variantId: string;
  userId: string;
  assignedAt: Date;
}

export interface ABConversion {
  testId: string;
  variantId: string;
  userId: string;
  conversionType: string;
  value?: number;
  convertedAt: Date;
}

// Storage keys
const STORAGE_KEY = 'esh_ab_assignments';

// Get or create user ID
export const getUserId = (): string => {
  let userId = localStorage.getItem('esh_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('esh_user_id', userId);
  }
  return userId;
};

// Get all assignments for current user
export const getUserAssignments = (): Record<string, string> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

// Save assignment
export const saveAssignment = (testId: string, variantId: string): void => {
  const assignments = getUserAssignments();
  assignments[testId] = variantId;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
};

// Assign variant based on weights
export const assignVariant = (test: ABTest): ABVariant => {
  const userId = getUserId();
  const assignments = getUserAssignments();
  
  // Check if user already assigned
  if (assignments[test.id]) {
    const existingVariant = test.variants.find(v => v.id === assignments[test.id]);
    if (existingVariant) return existingVariant;
  }
  
  // Assign new variant based on weights
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const variant of test.variants) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      saveAssignment(test.id, variant.id);
      
      // Log assignment to backend (if connected)
      logAssignment(test.id, variant.id, userId);
      
      return variant;
    }
  }
  
  // Fallback to first variant
  const fallback = test.variants[0];
  saveAssignment(test.id, fallback.id);
  return fallback;
};

// Log assignment to backend
const logAssignment = async (testId: string, variantId: string, userId: string): Promise<void> => {
  try {
    // TODO: Send to Supabase when connected
    console.log('[AB Test] Assignment:', { testId, variantId, userId });
    
    // For now, store in localStorage
    const logs = JSON.parse(localStorage.getItem('esh_ab_logs') || '[]');
    logs.push({
      type: 'assignment',
      testId,
      variantId,
      userId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('esh_ab_logs', JSON.stringify(logs));
  } catch (error) {
    console.error('[AB Test] Failed to log assignment:', error);
  }
};

// Track conversion
export const trackConversion = async (
  testId: string,
  conversionType: string,
  value?: number
): Promise<void> => {
  const userId = getUserId();
  const assignments = getUserAssignments();
  const variantId = assignments[testId];
  
  if (!variantId) {
    console.warn('[AB Test] No variant assigned for test:', testId);
    return;
  }
  
  try {
    // TODO: Send to Supabase when connected
    console.log('[AB Test] Conversion:', { testId, variantId, userId, conversionType, value });
    
    // Store in localStorage
    const logs = JSON.parse(localStorage.getItem('esh_ab_logs') || '[]');
    logs.push({
      type: 'conversion',
      testId,
      variantId,
      userId,
      conversionType,
      value,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('esh_ab_logs', JSON.stringify(logs));
  } catch (error) {
    console.error('[AB Test] Failed to log conversion:', error);
  }
};

// Example test configurations
export const AB_TESTS: Record<string, ABTest> = {
  homepage_hero: {
    id: 'homepage_hero',
    name: 'Homepage Hero CTA',
    variants: [
      {
        id: 'control',
        name: 'Control - "Get Started"',
        weight: 50,
        config: {
          primaryCTA: 'Get Started',
          secondaryCTA: 'Learn More'
        }
      },
      {
        id: 'variant_a',
        name: 'Variant A - "Find a Contractor"',
        weight: 50,
        config: {
          primaryCTA: 'Find a Contractor',
          secondaryCTA: 'How It Works'
        }
      }
    ],
    startDate: new Date('2026-01-01'),
    isActive: true
  },
  lead_form_layout: {
    id: 'lead_form_layout',
    name: 'Lead Form Layout',
    variants: [
      {
        id: 'control',
        name: 'Control - Side by Side',
        weight: 50,
        config: {
          layout: 'split',
          showTrust: true
        }
      },
      {
        id: 'variant_a',
        name: 'Variant A - Centered',
        weight: 50,
        config: {
          layout: 'centered',
          showTrust: false
        }
      }
    ],
    startDate: new Date('2026-01-01'),
    isActive: true
  }
};

// Hook for using A/B tests in components
export const useABTest = (testId: string) => {
  const test = AB_TESTS[testId];
  if (!test || !test.isActive) {
    return test?.variants[0] || null;
  }
  
  return assignVariant(test);
};
