import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel";
import config from "../config/config";

// Small helper so we're not repeating the decode-token logic in every handler
const getUserIdFromToken = (req: Request): string | null => {
  const token = req.cookies?.accessToken;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, config.jwtAccessSecret as string) as JwtPayload;
    return decoded.id;
  } catch {
    return null;
  }
};

// POST /address - add a new address
export const handleAddAddress = async (req: Request, res: Response) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Token not found or invalid" });
    }

    const { streetAddress, city, state, zipcode, country } = req.body;

    if (!streetAddress || !city || !state || !zipcode || !country) {
      return res.status(400).json({ success: false, message: "All address fields are required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.addresses?.push({ streetAddress, city, state, zipcode, country });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.error("addAddress error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// PUT /address/:addressId - edit an existing address
export const handleUpdateAddress = async (
  req: Request<{ addressId: string }>,
  res: Response
) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Token not found or invalid" });
    }

    const { addressId } = req.params;
    const { streetAddress, city, state, zipcode, country } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const address = user.addresses?.id(addressId);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (streetAddress !== undefined) address.streetAddress = streetAddress;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (zipcode !== undefined) address.zipcode = zipcode;
    if (country !== undefined) address.country = country;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.error("updateAddress error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE /address/:addressId - remove an address
export const handleDeleteAddress = async (
  req: Request<{ addressId: string }>,
  res: Response
) => {
  try {
    const userId = getUserIdFromToken(req);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Token not found or invalid" });
    }

    const { addressId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const address = user.addresses?.id(addressId);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    address.deleteOne();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (err) {
    console.error("deleteAddress error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};