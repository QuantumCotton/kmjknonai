/**
 * HTTP utility with error handling and retry logic
 * Addresses HTTP 400 Bad Request errors and provides resilience
 */

// Default configuration
const DEFAULT_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryBackoffFactor: 2,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
};

/**
 * Validate API key format and presence
 * @param {string} apiKey - The API key to validate
 * @param {string} serviceName - Name of the service for error messages
 * @returns {boolean} True if valid
 * @throws {Error} If API key is invalid
 */
function validateApiKey(apiKey, serviceName = 'API') {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error(`${serviceName} key is missing or invalid`);
  }
  
  if (apiKey === 'your_openai_api_key_here' || 
      apiKey === 'your_zai_api_key_here' || 
      apiKey === 'your_supabase_project_url' || 
      apiKey === 'your_supabase_anon_key') {
    throw new Error(`${serviceName} key must be replaced with actual value`);
  }
  
  return true;
}

/**
 * Validate request parameters
 * @param {Object} params - Parameters to validate
 * @param {Array<string>} required - Required parameter names
 * @throws {Error} If required parameters are missing
 */
function validateParams(params, required = []) {
  if (!params || typeof params !== 'object') {
    throw new Error('Parameters must be an object');
  }
  
  for (const param of required) {
    if (params[param] === undefined || params[param] === null || params[param] === '') {
      throw new Error(`Required parameter '${param}' is missing or empty`);
    }
  }
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Parse error response to extract meaningful message
 * @param {Response} response - Fetch response object
 * @returns {string} Error message
 */
async function parseErrorResponse(response) {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      return errorData.error?.message || 
             errorData.message || 
             JSON.stringify(errorData);
    }
    return await response.text();
  } catch (e) {
    return `HTTP error ${response.status}: ${response.statusText}`;
  }
}

/**
 * Enhanced fetch with retry logic and error handling
 * @param {string} url - Request URL
 * @param {Object} options - Fetch options
 * @param {Object} config - Configuration for retries and timeouts
 * @returns {Promise<Response>} - Fetch response
 * @throws {Error} - Enhanced error with details
 */
async function enhancedFetch(url, options = {}, config = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  let lastError;
  let retryCount = 0;
  
  // Validate URL
  if (!url || typeof url !== 'string') {
    throw new Error('URL is required and must be a string');
  }
  
  try {
    new URL(url); // This will throw if URL is invalid
  } catch (e) {
    throw new Error(`Invalid URL: ${url}`);
  }
  
  // Set up request options
  const fetchOptions = {
    ...options,
    headers: {
      ...finalConfig.headers,
      ...(options.headers || {})
    },
    signal: options.signal || AbortSignal.timeout(finalConfig.timeout)
  };
  
  // If body is an object and not FormData, stringify it
  if (fetchOptions.body && typeof fetchOptions.body === 'object' && 
      !(fetchOptions.body instanceof FormData) && 
      !fetchOptions.headers['Content-Type'].includes('multipart/form-data')) {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }
  
  while (retryCount <= finalConfig.maxRetries) {
    try {
      const response = await fetch(url, fetchOptions);
      
      // Handle 400 Bad Request errors specifically
      if (response.status === 400) {
        const errorText = await parseErrorResponse(response);
        throw new Error(`HTTP 400 Bad Request: ${errorText}`);
      }
      
      // Handle other HTTP errors
      if (!response.ok) {
        const errorText = await parseErrorResponse(response);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      return response;
      
    } catch (error) {
      lastError = error;
      
      // Don't retry if it's an AbortError (timeout or user abort)
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${finalConfig.timeout}ms`);
      }
      
      // Don't retry on 400 errors if they're validation errors
      if (error.message.includes('HTTP 400 Bad Request')) {
        if (error.message.includes('missing') || 
            error.message.includes('invalid') ||
            error.message.includes('required')) {
          throw error; // Don't retry validation errors
        }
      }
      
      // If this is the last attempt, throw the error
      if (retryCount === finalConfig.maxRetries) {
        break;
      }
      
      // Calculate delay with exponential backoff
      const delay = finalConfig.retryDelay * 
                   Math.pow(finalConfig.retryBackoffFactor, retryCount);
      
      console.warn(`Request failed (attempt ${retryCount + 1}/${finalConfig.maxRetries + 1}): ${error.message}. Retrying in ${delay}ms...`);
      await sleep(delay);
      retryCount++;
    }
  }
  
  // If we get here, all retries failed
  throw lastError;
}

/**
 * GET request with error handling
 * @param {string} url - Request URL
 * @param {Object} params - Query parameters
 * @param {Object} config - Configuration
 * @returns {Promise<any>} - Response data
 */
async function get(url, params = {}, config = {}) {
  const urlObj = new URL(url);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      urlObj.searchParams.append(key, value);
    }
  });
  
  const response = await enhancedFetch(urlObj.toString(), { method: 'GET' }, config);
  return response.json();
}

/**
 * POST request with error handling
 * @param {string} url - Request URL
 * @param {Object} data - Request body data
 * @param {Object} config - Configuration
 * @returns {Promise<any>} - Response data
 */
async function post(url, data = {}, config = {}) {
  const response = await enhancedFetch(
    url, 
    { 
      method: 'POST',
      body: data
    }, 
    config
  );
  
  return response.json();
}

/**
 * PUT request with error handling
 * @param {string} url - Request URL
 * @param {Object} data - Request body data
 * @param {Object} config - Configuration
 * @returns {Promise<any>} - Response data
 */
async function put(url, data = {}, config = {}) {
  const response = await enhancedFetch(
    url, 
    { 
      method: 'PUT',
      body: data
    }, 
    config
  );
  
  return response.json();
}

/**
 * DELETE request with error handling
 * @param {string} url - Request URL
 * @param {Object} config - Configuration
 * @returns {Promise<any>} - Response data
 */
async function del(url, config = {}) {
  const response = await enhancedFetch(
    url, 
    { method: 'DELETE' }, 
    config
  );
  
  // DELETE may return 204 with no content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
}

/**
 * Create a configured HTTP client instance
 * @param {Object} config - Configuration for the client
 * @returns {Object} HTTP client with methods
 */
function createClient(config = {}) {
  const clientConfig = { ...DEFAULT_CONFIG, ...config };
  
  return {
    get: (url, params) => get(url, params, clientConfig),
    post: (url, data) => post(url, data, clientConfig),
    put: (url, data) => put(url, data, clientConfig),
    delete: (url) => del(url, clientConfig),
    validateApiKey,
    validateParams
  };
}

export {
  validateApiKey,
  validateParams,
  enhancedFetch,
  get,
  post,
  put,
  del,
  createClient
};

export default {
  validateApiKey,
  validateParams,
  enhancedFetch,
  get,
  post,
  put,
  del,
  createClient
};
