import jwt from "jsonwebtoken";

export const generateTokenPair = (payload: Object) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "2d",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
