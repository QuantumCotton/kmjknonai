import React, { useState } from 'react';
import { supabaseService } from '../services/apiService.js';
import ApiErrorDisplay from './ErrorBoundary.jsx';

/**
 * Service form component with error handling and validation
 */
const ServiceForm = ({ serviceType, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    projectDetails: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Project details are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setSubmitError(null);
    
    try {
      const submissionData = {
        ...formData,
        service: serviceType
      };
      
      await supabaseService.submitForm(submissionData);
      setIsSubmitted(true);
      
      if (onSubmitSuccess) {
        onSubmitSuccess(submissionData);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      projectDetails: ''
    });
    setErrors({});
    setSubmitError(null);
    setIsSubmitted(false);
  };

  // Render success message
  if (isSubmitted) {
    return (
      <div className="form-success">
        <h3>Thank You!</h3>
        <p>Your request has been submitted successfully. We'll contact you shortly to discuss your {serviceType} project.</p>
        <button onClick={handleReset} className="new-request-button">
          Submit Another Request
        </button>
      </div>
    );
  }

  // Render form
  return (
    <div className="service-form-container">
      <h3>Get a Free Estimate</h3>
      <p>Fill out the form below and we'll get back to you as soon as possible.</p>
      
      {submitError && (
        <ApiErrorDisplay 
          error={submitError} 
          onRetry={handleSubmit}
        />
      )}
      
      <form onSubmit={handleSubmit} className="service-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="projectDetails">Project Details *</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleChange}
            className={errors.projectDetails ? 'error' : ''}
            rows={4}
            placeholder="Please describe your project in detail..."
          />
          {errors.projectDetails && <span className="error-text">{errors.projectDetails}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Additional Information</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional information or questions..."
          />
        </div>
        
        <div className="form-group">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Get Free Estimate'}
          </button>
        </div>
      </form>
    </div>
  );
};

ServiceForm.propTypes = {
  serviceType: PropTypes.string.isRequired,
  onSubmitSuccess: PropTypes.func
};

export default ServiceForm;
