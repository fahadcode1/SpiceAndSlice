import crypto from "crypto";
import bcrypt from "bcryptjs";
import Mailjet from "node-mailjet";
import { IUser } from "../models/userModel";

// generate 4 digit otp
const generateOtp = () => {
  return crypto.randomInt(1000, 10000).toString();
};

const buildOtpEmailHtml = (otp: string, appName: string) => `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background-color:#f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:#111827; padding:24px 32px;">
              <span style="color:#ffffff; font-size:18px; font-weight:600;">${appName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 12px; color:#111827; font-size:20px;">Verify your email</h2>
              <p style="margin:0 0 24px; color:#4b5563; font-size:14px; line-height:1.5;">
                Use the code below to verify your email address. This code expires in <strong>10 minutes</strong>.
              </p>
              <div style="background:#f3f4f6; border-radius:6px; padding:20px; text-align:center; margin-bottom:24px;">
                <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#111827;">${otp}</span>
              </div>
              <p style="margin:0; color:#9ca3af; font-size:12px; line-height:1.5;">
                If you didn't request this code, you can safely ignore this email. Never share this code with anyone — ${appName} will never ask you for it.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px; background:#f9fafb; border-top:1px solid #e5e7eb;">
              <p style="margin:0; color:#9ca3af; font-size:11px;">© ${new Date().getFullYear()} ${appName}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_SECRET_KEY as string
);

export const sendEmailVerificationOtp = async (user: IUser) => {
  const otp = generateOtp();
  console.log(otp);
  const hashedOtp = await bcrypt.hash(otp, 10);
  const emailToSend = user.pendingEmail || user.email;
  console.log(emailToSend);

  user.emailOtp = hashedOtp;
  user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  const appName = process.env.APP_NAME || "Spice and Slice";

  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_FROM_EMAIL as string,
          Name: appName,
        },
        To: [
          {
            Email: emailToSend,
          },
        ],
        Subject: `${otp} is your verification code`,
        TextPart: `Your ${appName} verification code is ${otp}. It expires in 10 minutes. Do not share it with anyone.`,
        HTMLPart: buildOtpEmailHtml(otp, appName),
      },
    ],
  });
};