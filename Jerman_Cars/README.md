#Supabase Admin Login Functionality

#Description:
This feature provides a secure login interface for admin users utilizing Supabase authentication. It meets competition requirements by allowing the admin to log in with email and password credentials, ensuring that only authorized personnel can access the dashboard. Upon successful authentication, the user is redirected to the dashboard, while any login errors are communicated through a user-friendly error message. A node backend was initialized and server.js was created to manage backend authenticated requests. In order for feature to function, website admin will have to signup and create a project on supabase, place anon-key and supabase-project-url from supabase in server.js file then using supabase GUI create a user with the desired e-mail and password.

External Libraries
@supabase/supabase-js  - Used to implement secure login functionality through Supabase's authentication services, providing easy access to the database and user management.

Expressjs

#Tools Used
Supabase GUI - For managing the database and authentication services.

Code
auth.js
This file contains the logic for handling user authentication. It communicates with the Supabase backend to validate login credentials.
admin-login.html
This is the front-end for the admin-login
Server.js
This is the serverside file running on node.js which handles the authentication request

server.js:
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = 'supabase-project-url'; // Replace with your Supabase project URL
const supabaseKey = 'supabase-anon-key'; // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  res.status(200).json({ message: 'Login successful', user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


auth.js:
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

admin-login.html:
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>BOXCAR | HTML Template</title>
<!-- Stylesheets -->
<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/slick-theme.css">
<link rel="stylesheet" type="text/css" href="css/slick.css">
<link href="css/mmenu.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">

<link rel="shortcut icon" href="images/favicon.png" type="image/x-icon">
<link rel="icon" href="images/favicon.png" type="image/x-icon">
<!-- Responsive -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
<!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script><![endif]-->
<!--[if lt IE 9]><script src="js/respond.js"></script><![endif]-->
</head>

<body>

<div class="boxcar-wrapper">

    <!-- Main Header-->
	<header class="boxcar-header header-style-v1 style-two inner-header cus-style-1">
        <div class="header-inner">
            <div class="inner-container">
                         <!-- Main box -->
                         <div class="c-box">
                            <div class="logo-inner">
                                <div class="logo"><a href="index.html"><img src="images/logo.png" alt="" title="Boxcar"></a></div>
                             
                  
                    
                            </div>
        
                          <!--Nav Box-->
        <div class="nav-out-bar">    
            <nav class="nav main-menu">
                <ul class="navigation" id="navbar">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="inventory-sidebar-cards.html">Cars</a></li>
                    <li><a href="about.html">About</a></li>
      
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <!-- Main Menu End-->
                    </div>

                    <div class="right-box">
                        <a href="login.html" title="" class="box-account"> 
                            <div class="icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_147_6490)">
                                    <path d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z" fill="white"/>
                                    <path d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_147_6490">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                              Sign in</a>
                        <div class="btn">
                            <a href="add-listing-page.html" class="header-btn-two btn-anim">Add Listing</a>
                        </div>
                        <div class="mobile-navigation">
                            <a href="#nav-mobile" title="">
                               <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="22" height="2" fill="white"/>
                                    <rect y="9" width="22" height="2" fill="white"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- Mobile Menu  -->
            </div>
        </div>

        <!-- Header Search -->
        <div class="search-popup">
            <span class="search-back-drop"></span>
            <button class="close-search"><span class="fa fa-times"></span></button>
        
            <div class="search-inner">
                <form method="post" action="index.html">
                    <div class="form-group">
                        <input type="search" name="search-field" value="" placeholder="Search..." required="">
                        <button type="submit"><i class="fa fa-search"></i></button>
                    </div>
                </form>
            </div>
        </div>
        <!-- End Header Search -->

        <div id="nav-mobile"></div>
	</header>
    <!-- End header-section -->

    <!-- login-section -->
    <section class="login-section layout-radius">
        <div class="inner-container">
            <div class="right-box">
                <div class="form-sec">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Admin Sign in</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div class="form-box">
                                <form id="login-form">
                                    <div class="form_boxes">
                                        <label>Email or Username</label>
                                        <input type="text" name="email" placeholder="E-Mail" />
                                    </div>
                                    <div class="form_boxes">
                                        <label>Password</label>
                                        <input type="password" name="password" placeholder="********" />
                                    </div>
                                    <div id="error-message" style="color: red; display: none;"></div> <!-- Error message container -->
                                    <div class="form-submit">
                                        <button type="submit" class="theme-btn">Login <img src="images/arrow.svg" alt="" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End login-section -->

   <!-- main footer -->
   <footer class="boxcar-footer footer-style-one cus-st-1">
    <div class="widgets-section">
        <div class="boxcar-container">
            <div class="row">
                <!-- Footer COlumn -->
                <div class="footer-column-two col-lg-9 col-md-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-3 col-md-6 col-sm-12">
                            <div class="footer-widget links-widget wow fadeInUp">
                                <h4 class="widget-title">Useful Links</h4>
                                <div class="widget-content">
                                    <ul class="user-links style-two">
                                        <li><a href="#">About Us</a></li>
                                        <li><a href="#">FAQs</a></li>
                                        <li><a href="#">Contact Us</a></li>
                                    </ul>                                
                                </div>
                            </div>
                        </div>
                      
                     
                    </div>
                </div>
                <!-- footer column -->
                <div class="footer-column col-lg-3 col-md-12 col-sm-12">
                    <div class="footer-widget social-widget wow fadeInUp" data-wow-delay="400ms">
                     <h4 class="widget-title">Vehicles Type</h4>
                        <div class="widget-content">
                        
                      
                            <div class="social-icons">
                                <h6 class="title">Connect With Us</h6>
                                <ul>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  Footer Bottom -->
    <div class="footer-bottom">
        <div class="boxcar-container">
            <div class="inner-container">
                <div class="copyright-text wow fadeInUp">© <a href="#">2024 jermancars All rights reserved.</a></div>

                <ul class="footer-nav wow fadeInUp" data-wow-delay="200ms">
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Privacy Notice</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<!-- End boxcar-footer -->

</div><!-- End Page Wrapper -->

<!-- Scroll To Top -->
<div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-angle-up"></span></div>

<script src="js/jquery.js"></script> 
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/slick.min.js"></script>
<script src="js/slick-animation.min.js"></script>
<script src="js/jquery.fancybox.js"></script>
<script src="js/wow.js"></script>
<script src="js/appear.js"></script>
<script src="js/mixitup.js"></script>
<script src="js/knob.js"></script>
<script src="js/mmenu.js"></script>
<script src="js/main.js"></script>
<script src="js/auth.js" defer></script>
</body>
</html>