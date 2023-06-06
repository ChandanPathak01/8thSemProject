export const loginAdmin = async (email, password) => {
  // Perform the login request to the server
  try {
    const response = await fetch('http://localhost:8000/auth/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Check if login was successful
    if (response.ok) {
      return {
        success: true,
        message: 'Login successful',
        token: data.token, // Assuming the server returns a token upon successful login
      };
    } else {
      return {
        success: false,
        message: data.message, // Assuming the server returns an error message upon unsuccessful login
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
};
