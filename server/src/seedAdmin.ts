import User from "./models/User";

export async function seedAdmin() {
  const adminEmail = "admin@lms.com";
  const adminPassword = "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const admin = new User({
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });
    await admin.save();
    console.log("Default admin created:", adminEmail);
  } else {
    console.log("Admin already exists");
  }
}
