export const testData = {
  validUser: {
    username: process.env.APP_USERNAME ?? 'JAYTHA',
    password: process.env.APP_PASSWORD ?? 'JAYTHA',
  },
  invalidUser: {
    username: 'invalid@example.com',
    password: 'wrongpassword',
  },
};
