export const userMessage = {
  id: {
    required: 'Id is required',
    invalid: 'Invalid id',
    notFound: "Couldn't find an user with that id",
  },
  firstName: {
    required: 'First Name is required',
    maxlength: 'First Name must be less than 30 characters',
  },
  lastName: {
    maxlength: 'Last Name must be less than 30 characters',
  },
  username: {
    required: 'Username is required',
    maxlength: 'Username must be less than 30 characters',
    exist: 'This username is not available',
    notFound: 'Could not find a user with that username',
  },
  email: {
    required: 'Email is required',
    invalid: 'Invalid email format',
    notFound: 'Email not found',
    exist: 'This email is not available',
  },
  usernameOrEmail: {
    required: 'Username or email is required',
    notfound: 'Username or email not found',
  },
  website: {
    invalid: 'Invalid URL',
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 6 characters',
    incorrect: 'Password incorrect',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    minlength: 'Password must be at least 6 characters',
    notMatch: 'Passwords must match',
  },
  newPassword: {
    required: 'New password is required',
    minlength: 'Password must be at least 6 characters',
    different: 'Your new password must be different from your previous password',
  },
  confirmNewPassword: {
    required: 'Confirm new password is required',
    minlength: 'Password must be at least 6 characters',
    notMatch: 'Passwords must match',
  },
  follow: {
    isCurrentUser: "You can't follow / unfollow yourself",
  },
};
