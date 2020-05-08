// grab the form element
const form = document.querySelector('#form');
// grab the username input
const username = document.querySelector('#username');
// grab the email input
const email = document.querySelector('#email');
// grab the password input
const password = document.querySelector('#password');
// grab confirm password input
const password2 = document.querySelector('#password2');

// Show input error message
function showError(input, message) {
  // Get the parent element of all inputs
  const formControl = input.parentElement;
  // Overwrite the classes with an error
  formControl.className = 'form-control error';
  // Use the current form control to select the small element
  const small = formControl.querySelector('small');
  // set the small elements textContent to the message passed in to the function
  small.textContent = message;
}

// Form event listener
form.addEventListener('submit', function (event) {
  // pervent the default form action to refresh the page
  event.preventDefault();

  // if the username value is empty
  if (username.value === '') {
    // Show the error
    showError(username, 'Username is required');
  } else {
    // Success
    showSuccess(username);
  }
});
