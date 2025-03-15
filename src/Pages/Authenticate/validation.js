export const validationRules = {
    name: {
      required: "Name is required"
    },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format"
      }
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters"
      }
    },
    confirmPassword: {
      required: "Confirm password is required"
    },
    agreeTerms: {
      required: "You must agree to the terms"
    }
  };