import { Schema } from "mongoose";
import crypto from "node:crypto";

const hashpassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "RSA-SHA1")
    .toString("hex");

   return {salt,hash}
};

const checkPassword = (password, salt, hash) => {};

const applyPasswordValidatingAndHashing = (Schema) => {
  Schema.pre("save", function (next) {
    if (!this.isModified("hash")) return next();

    const { hash, salt } = hashpassword(this.hash);
    this.hash = hash;
    this.salt = salt;
    next();
  });
};

export { hashpassword, checkPassword, applyPasswordValidatingAndHashing };
