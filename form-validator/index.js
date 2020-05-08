// get the form element
const form = document.querySelector('#form');
// get the username input
const username = document.querySelector('#username');
// get the email input
const email = document.querySelector('#email');
// get the password input
const password = document.querySelector('#password');
// get confirm password input
const password2 = document.querySelector('#password2');

// Show input error message
function showError(input, message) {
  // Get the parent element of all inputs
  const formControl = input.parentElement;
  // Add the class error for styling and an error message
  formControl.classList.add('error');
  // Use the current formControl to select the small element
  const small = formControl.querySelector('small');
  // set the small elements textContent to the message passed in to the function
  small.textContent = message;
}

// Show input success outline
function showSuccess(input) {
  // Get the parent element of all inputs
  const formControl = input.parentElement;
  // Add the class success for styling
  formControl.classList.add('success');
}

// A function to get the input.id of each field
function getFieldName(input) {
  // taking the first letter of the field id and making it uppercase
  // then concat the rest of the input.id using the slice method - starting at the 2nd position (1) of the string
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check if email is valid with RegEx
function checkEmail(input) {
  // Regular expression for matching an email address format
  const mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // check if the email is in a valid format
  // if the input value is a valid format - call showSuccess function
  if (mailformat.test(input.value.trim())) {
    showSuccess(input);
  } else {
    // otherwise - display error styling and error message
    showError(input, `${getFieldName(input)} is not valid`);
  }

  // Run the test method to take in the email and see if it passes - if it does, it will return true, if it doesn't it will return false
  // return mailformat.test(String(email).toLowerCase());
}

// Check required input fields - takes in an array of inputs
function checkRequired(inputArr) {
  // loop thorugh the array of inputs
  inputArr.forEach(function (input) {
    // if input value is empty - display error styling and error message
    if (input.value.trim() === '') {
      // display error styling and error message. Ex. Email is required
      showError(input, `${getFieldName(input)} is required`);
    } else {
      // else - display success styling
      showSuccess(input);
    }
  });
}

// Check input length - takes in the input, min character length and max character length
function checkLength(input, min, max) {
  // if the input value is less than the min required length
  if (input.value.length < min) {
    // display error styling with a min character message
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    // if the input values is more than the max required length
  } else if (input.value.length > max) {
    // display error styling with a max character message
    showError(
      input,
      `${getFieldName(input)} must be at less than ${max} characters`
    );
  } else {
    // otherwise - display success styling
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  // check if input1 and input2 are not equal
  if (input1.value !== input2.value) {
    // display error styling and error message
    showError(input2, 'Passwords do not match');
  }
}

// Form event listener
form.addEventListener('submit', function (event) {
  // prevent the default form action to refresh the page
  event.preventDefault();
  // Call checkRequired function with the array of inputs
  checkRequired([username, email, password, password2]);
  // Call checkLength function - check the username input with a min of 3 characters and a max of 15 caharacters
  checkLength(username, 3, 15);
  // Call checkLength function - check the password input with a min of 6 characters and a max of 25 characters
  checkLength(password, 6, 25);
  // Call checkEmail function - check if the email is in a valid format
  checkEmail(email);
  // Call checkPasswordsMatch function - if the input values of password 1 and 2 values are equal
  checkPasswordsMatch(password, password2);
});
