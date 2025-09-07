import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
  compare(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// Hash before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.compare = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);

// import { Schema, model } from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new Schema(
//   {
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ["admin", "user"], default: "user" },
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const hashed = await bcrypt.hash(this.get("password"), 10);
//   this.set("password", hashed);
//   next();
// });

// userSchema.methods.compare = function (pw: string) {
//   return bcrypt.compare(pw, this.get("password"));
// };

// export default model("User", userSchema);
