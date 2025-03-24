function validation(values) {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Name validation
  if (!values.name.trim()) {
    errors.name = "Full Name is required";
  }

  // Email validation
  const trimmedEmail = values.email.trim();
  if (!trimmedEmail) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(trimmedEmail)) {
    errors.email = "Invalid email format";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number";
  }

  // Confirm Password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms and Conditions validation
  if (values.iAgree !== true) {
    errors.iAgree = "You must agree to the terms and conditions";
  }

  return errors;
}

export default validation;
