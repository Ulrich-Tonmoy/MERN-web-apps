import { isTokenValid } from "utils";

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    res.status(401).json({ message: "Authentication invalid" });
  }

  try {
    const { name, userId, role }: any = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication invalid" });
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ message: "Unauthorized to access this route" });
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
