import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.get("password"), 10);
  this.set("password", hashed);
  next();
});

userSchema.methods.compare = function (pw: string) {
  return bcrypt.compare(pw, this.get("password"));
};

export default model("User", userSchema);
