export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'defaultSecretKey', // Fallback only for development
};
