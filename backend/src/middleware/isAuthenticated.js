export const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) res.status(403).end();
  else next();
};
