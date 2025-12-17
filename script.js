const form = document.getElementById('signup-form');

//This function show the error message based on the given input
function errorMessage(input, message) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');

  if (!errorDisplay) return;

  errorDisplay.innerText = message;
}

//This function clears the error message for the provided input
function clearError(input) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector('.error-message');

  if (!errorDisplay) return;

  errorDisplay.innerText = '';
}

//Here we store the rules for each input and their corresponding error messages
const validationMap = {
  email: [
    { rule: value => value.trim() !== '', message: 'Email is required'},
    { rule: value => value.includes('@'), message: 'Email must contain @'}
  ],
  fname: [
    { rule: value => value.trim() !== '', message: 'First name is required'},
    { rule: value => value.length >= 2, message: 'First name must be at least 2 characters long'}
  ],
  lname: [
    { rule: value => value.trim() !== '', message: 'Last name is required'},
    { rule: value => value.length >= 2, message: 'Last name must be at least 2 characters long'}
  ],
  password: [
    { rule: value => value.trim() !== '', message: 'Password is required'},
    { rule: value => value.length >= 6, message: 'Password must be at least 6 characters long'}
  ],
  number: [
    { rule: value => value.trim() !== '', message: 'Phone number is required'},
    { rule: value => /^05\d{8}$/.test(value), message: 'Phone number must start with 05 and be 10 digits long'}
  ],
  confirmPassword: [
    { rule: value => value.trim() !== '', message: 'Please confirm your password'},
    { rule: value => value === document.getElementById('password').value, message: 'Passwords do not match'}
  ]
};

//This function validates a single field based on the provided rules and calls the errorMessage function if validation fails
function validateField(input, rules) {
  for (const { rule, message } of rules) {
    if (!rule(input.value)) {
      errorMessage(input, message);
      return false;
    }
  }
  clearError(input);
  return true;
}

//This funciton iterates through all the fields in the validationMap and validates each one
//If all fields are valid, it shows a success alert
function validateForm() {
  let isFormValid = true;

  for (const field in validationMap) {
    const input = document.getElementById(field);
    const isFieldValid = validateField(input, validationMap[field]);

    if (!isFieldValid) {
      isFormValid = false;
    }
  }

  if (isFormValid) {
    alert('Form Submitted Successfully!');
  }
}

//Here we the form validation begins
form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
})
