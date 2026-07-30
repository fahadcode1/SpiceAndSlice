import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import config from "../config/config";
import { connectDb } from "../lib/db";
import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

async function seedOwner() {
  await connectDb();

  console.log("=== SEED OWNER CHECKPOINT ===")
  console.log("Email from config:", JSON.stringify(config.ownerEmail))
  console.log("Password from config:", JSON.stringify(config.ownerPassword))
  console.log("Password length:", config.ownerPassword?.length)

  const existingOwner = await userModel.findOne({ role: "OWNER" });
  if (existingOwner) {
    console.log(`Owner already exists: ${existingOwner.email}. Skipping.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(config.ownerPassword, 12);
  console.log("Generated hash:", passwordHash)

  const owner = await userModel.create({
    firstName: config.ownerFirstName,
    lastName: config.ownerLastName,
    email: config.ownerEmail,
    mobileNumber : config.ownerMobileNumber,
    pendingEmail: undefined,
    isVerifiedPendingEmail: false,
    isVerifiedEmail: true,
    isVerifiedMobileNumber: true,
    password: passwordHash,
    role: "OWNER",
  });

  console.log(`Owner account created: ${owner.email}`);
  console.log("Saved email in DB (after lowercase/trim):", owner.email)
  console.log("=== END SEED OWNER CHECKPOINT ===")
  process.exit(0);
}

seedOwner().catch((e) => {
  console.error(e);
  process.exit(1);
});