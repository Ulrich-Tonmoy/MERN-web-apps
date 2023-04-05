import { isTokenValid } from "../utils";

const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({ message: "Authentication invalid" });
  }
  try {
    const payload: any = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload?.user?.userId,
      role: payload?.user?.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication invalid" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401).json({ message: "Unauthorized to access this route" });
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
