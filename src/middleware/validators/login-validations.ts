export default {
  email: {
    isEmail: true,
    errorMessage: 'Invalid email'
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: 'Password should be at least 8 chars'
    }
  }
}
