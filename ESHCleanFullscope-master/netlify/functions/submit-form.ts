exports.handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const formData = event.body ? JSON.parse(event.body) : {};
    const formName = formData['form-name'] || 'unknown';
    
    console.log(`Form submission received: ${formName}`, formData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        redirectTo: '/thanks.html',
      }),
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form' }),
    };
  }
};
