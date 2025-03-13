import crypto from "node:crypto";

// Hash the password with a randomly generated salt
const hashpassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex"); // Generate salt
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex"); // Hash password

  return { salt, hash };
};

// Check if entered password matches the stored hash
const checkPassword = (password, salt, hash) => {
  const validatedHashed = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === validatedHashed;
};

export { hashpassword, checkPassword };
