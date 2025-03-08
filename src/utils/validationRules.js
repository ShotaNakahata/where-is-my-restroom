export const validationRules = {
  name: {
    required: "Name is required"
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "Invalid email format (must include @)"
    }
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters"
    }
  },
  confirmPassword: (watch) => ({
    required: "Confirm password is required",
    validate: (value) => value === watch("password") || "Passwords do not match"
  })
};
