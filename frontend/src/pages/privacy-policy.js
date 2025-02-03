// privacy-policy.js

// Get the privacy policy link element
const privacyPolicyLink = document.querySelector('a[href="/privacy"]');

// Add a click event listener to the link
privacyPolicyLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link behavior
  
  // Load the privacy policy content
  loadPrivacyPolicyContent();
});

function loadPrivacyPolicyContent() {
  // Fetch the privacy policy content (you can replace this with your own content)
  const privacyPolicyContent = `
    <h1>Privacy Policy</h1>
    <p>This is a sample privacy policy for a personal project.</p>
    <p>We respect your privacy and are committed to protecting your personal information.</p>
  `;

  // Create a new modal or display the content on the page
  showContentModal(privacyPolicyContent);
}

function showContentModal(content) {
  // Create a new modal element
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the content to the modal
  modal.innerHTML = content;

  // Append the modal to the document body
  document.body.appendChild(modal);

  // Add an event listener to close the modal when clicked outside
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  });
}