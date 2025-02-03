// terms-conditions.js

// Get the terms and conditions link element
const termsConditionsLink = document.querySelector('a[href="/terms"]');

// Add a click event listener to the link
termsConditionsLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link behavior
  
  // Load the terms and conditions content
  loadTermsConditionsContent();
});

function loadTermsConditionsContent() {
  // Fetch the terms and conditions content (you can replace this with your own content)
  const termsConditionsContent = `
    <h1>Terms & Conditions</h1>
    <p>This is a sample terms and conditions for a personal project.</p>
    <p>By using this website, you agree to our terms and conditions.</p>
  `;

  // Create a new modal or display the content on the page
  showContentModal(termsConditionsContent);
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