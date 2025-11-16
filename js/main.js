// Wait until the whole HTML document has been loaded and parsed
document.addEventListener("DOMContentLoaded", function () {
  // Initialise the contact form and gallery functions
  setupContactForm();
  setupGallery();
  // Initialise toggle button for extra details
  setupDetailsToggle();
  // Back to top button
  setupBackToTop();
});

// client-side validation for the contact form.

function setupContactForm() {
  // Look up the form element once the DOM is ready.
  var form = document.getElementById("contact-form");
  // If the form isn't on the page, don't do anything.
  if (!form) return;

  // References to the input fields we want to validate.
  var nameInput = document.getElementById("contact-name");
  var emailInput = document.getElementById("contact-email");
  var messageInput = document.getElementById("contact-message");

  // References to the elements where we show validation errors.
  var nameError = document.getElementById("error-contact-name");
  var emailError = document.getElementById("error-contact-email");
  var messageError = document.getElementById("error-contact-message");

  // Element where we show the overall status (e.g. success message).
  var statusEl = document.getElementById("contact-status");

  // Run validation when the form is submitted.
  form.addEventListener("submit", function (event) {
    // Stop the browser from doing a normal form submit / page reload.
    event.preventDefault();

    // Clear previous errors and status.
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    statusEl.textContent = "";

    // Tracks whether any validation has failed.
    var hasError = false;

    // Basic required checks.
    if (!nameInput.value.trim()) {
      // Name must not be empty.
      nameError.textContent = "Please enter your name.";
      if (!hasError) {
        // Focus the first field that has an error.
        nameInput.focus();
      }
      hasError = true;
    }

    if (!emailInput.value.trim()) {
      // Email is required.
      emailError.textContent = "Please enter your email address.";
      if (!hasError) {
        emailInput.focus();
      }
      hasError = true;
    } else if (!isValidEmail(emailInput.value.trim())) {
      // Email must match a basic pattern.
      emailError.textContent = "Please enter a valid email address.";
      if (!hasError) {
        emailInput.focus();
      }
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      // Message must not be empty.
      messageError.textContent = "Please enter a message.";
      if (!hasError) {
        messageInput.focus();
      }
      hasError = true;
    }

    // If we found any validation errors, stop here.
    if (hasError) {
      return;
    }

    // This is where we would send the message to the server if this was a real listing page.
    form.reset();
    statusEl.textContent = "Your message has been sent to the seller.";
  });

  // Small helper to check if an email address looks valid enough.
  function isValidEmail(value) {
    // Simple email pattern matching. Look for 
    var emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(value);
  }
};

// Toggle the extra "More details" section within the key details panel.

function setupDetailsToggle() {
  // Look up the toggle button and extra details container.
  var toggle = document.getElementById("details-toggle");
  var extraDetails = document.getElementById("extra-details");

  // If either is missing, do nothing.
  if (!toggle || !extraDetails) {
    return;
  }

  toggle.addEventListener("click", function () {
    // Check the current expanded state from the aria attribute.
    var isExpanded = toggle.getAttribute("aria-expanded") === "true";

    // Flip the state.
    var newExpanded = !isExpanded;

    // Update aria-expanded for screen readers.
    toggle.setAttribute("aria-expanded", newExpanded ? "true" : "false");

    // Show or hide the extra details block.
    extraDetails.hidden = !newExpanded;

    // Update button text so it reads naturally in both states.
    toggle.textContent = newExpanded ? "View fewer details" : "View more details";
  });
};

// Show a back-to-top button after scrolling, and scroll smoothly on click.

function setupBackToTop() {
  var button = document.getElementById("back-to-top");
  if (!button) {
    return;
  }

  // Toggle visibility based on scroll position.
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  });

  // Scroll smoothly to the top when the button is clicked.
  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
};
