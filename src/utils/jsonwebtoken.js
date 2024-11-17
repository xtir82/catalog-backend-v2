import jwt from "jsonwebtoken";

const generateToken = (user) => {
    console.log(user)
  const token = jwt.sign(
    {
      usuario: user.email,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  return token;
};

export default generateToken;
