import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const { first_name, last_name, age, email, role } = user
  const token = jwt.sign(
    {
        first_name,
        last_name,
        age,
        email,
        role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  return token;
};

export default generateToken;
