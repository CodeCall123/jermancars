document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const errorMessage = document.getElementById('error-message'); // Get the error message container

    // Clear previous error messages
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            window.location.href = `./dashboard.html`; // Redirect to relative /dashboard
        } else {
            console.error('Login failed:', data.error);
            errorMessage.textContent = 'Incorrect credentials'; // Set error message
            errorMessage.style.display = 'block'; // Show error message
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'An error occurred. Please try again later.'; // Generic error message
        errorMessage.style.display = 'block'; // Show error message
    }
});
