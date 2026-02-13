import { createClient } from '../utils/http.js';

// Initialize API clients with proper configuration
const createOpenAIClient = () => {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please check your .env file.');
  }
  
  return createClient({
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    baseUrl: 'https://api.openai.com/v1',
    maxRetries: 2,
    retryDelay: 2000
  });
};

const createZaiClient = () => {
  if (!import.meta.env.VITE_ZAI_API_KEY) {
    throw new Error('ZAI API key is not configured. Please check your .env file.');
  }
  
  return createClient({
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_ZAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    baseUrl: 'https://api.zaiservice.com/v1',
    maxRetries: 3,
    retryDelay: 1000
  });
};

const createSupabaseClient = () => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    throw new Error('Supabase configuration is incomplete. Please check your .env file.');
  }
  
  // This is a lightweight wrapper for Supabase client
  // In a real implementation, you might use the official Supabase JS client
  return createClient({
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
    maxRetries: 3,
    retryDelay: 1000
  });
};

/**
 * OpenAI API Service
 */
export class OpenAIService {
  constructor() {
    this.client = createOpenAIClient();
  }
  
  /**
   * Create chat completion
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Response data
   */
  async createChatCompletion(params) {
    try {
      this.client.validateApiKey(import.meta.env.VITE_OPENAI_API_KEY, 'OpenAI');
      this.client.validateParams(params, ['messages', 'model']);
      
      const response = await this.client.post('/chat/completions', {
        model: params.model || 'gpt-3.5-turbo',
        messages: params.messages,
        temperature: params.temperature || 0.7,
        max_tokens: params.max_tokens || 1000,
        top_p: params.top_p || 1.0,
        frequency_penalty: params.frequency_penalty || 0,
        presence_penalty: params.presence_penalty || 0
      });
      
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Enhance error messages
      if (error.message.includes('HTTP 400')) {
        if (error.message.includes('messages')) {
          throw new Error('Invalid message format: Messages must be an array with role and content');
        } else if (error.message.includes('model')) {
          throw new Error('Invalid model specified: Please use a valid OpenAI model name');
        }
      }
      
      throw error;
    }
  }
}

/**
 * ZAI Service API Service
 */
export class ZAIService {
  constructor() {
    this.client = createZaiClient();
  }
  
  /**
   * Get service estimates
   * @param {Object} params - Request parameters
   * @returns {Promise<Object>} Response data
   */
  async getServiceEstimate(params) {
    try {
      this.client.validateApiKey(import.meta.env.VITE_ZAI_API_KEY, 'ZAI');
      this.client.validateParams(params, ['serviceType', 'projectDetails']);
      
      const response = await this.client.post('/estimates', {
        service_type: params.serviceType,
        project_details: params.projectDetails,
        location: params.location || 'Jensen Beach, FL',
        square_footage: params.squareFootage,
        budget_range: params.budgetRange
      });
      
      return response;
    } catch (error) {
      console.error('ZAI API Error:', error);
      
      if (error.message.includes('HTTP 400')) {
        throw new Error('Invalid estimate request: Please check your project details and try again');
      }
      
      throw error;
    }
  }
}

/**
 * Supabase API Service
 */
export class SupabaseService {
  constructor() {
    this.client = createSupabaseClient();
  }
  
  /**
   * Submit a form submission
   * @param {Object} formData - Form data to submit
   * @returns {Promise<Object>} Response data
   */
  async submitForm(formData) {
    try {
      this.client.validateParams(formData, ['name', 'email', 'service']);
      
      const response = await this.client.post('/form_submissions', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service,
        message: formData.message || null,
        project_details: formData.projectDetails || null,
        created_at: new Date().toISOString()
      });
      
      return response;
    } catch (error) {
      console.error('Supabase Error:', error);
      
      if (error.message.includes('HTTP 400')) {
        throw new Error('Form submission failed: Please check all required fields');
      }
      
      throw error;
    }
  }
  
  /**
   * Get project gallery items
   * @param {string} serviceType - Filter by service type
   * @returns {Promise<Array>} Gallery items
   */
  async getGalleryItems(serviceType = null) {
    try {
      let endpoint = '/gallery';
      
      if (serviceType) {
        endpoint += `?service_type=eq.${encodeURIComponent(serviceType)}`;
      }
      
      const response = await this.client.get(endpoint);
      return response;
    } catch (error) {
      console.error('Supabase Gallery Error:', error);
      
      if (error.message.includes('HTTP 400')) {
        throw new Error('Could not load gallery: Invalid service type specified');
      }
      
      throw error;
    }
  }
}

// Create singleton instances
const openaiService = new OpenAIService();
const zaiService = new ZAIService();
const supabaseService = new SupabaseService();

export { openaiService, zaiService, supabaseService };
