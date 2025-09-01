import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { createUser, generateToken } from "@/lib/auth";
import { sendMail } from "@/lib/mail";

// Allowed roles
const validRoles = ["ADMIN", "TRAINER", "CLIENT"];

// Simple disposable email blocklist (can be expanded or use a library)
const disposableDomains = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "yopmail.com",
];

// Utility validators
function isAlphaOnly(value: string) {
  return /^[A-Za-z\s]+$/.test(value);
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;

  const domain = email.split("@")[1].toLowerCase();
  return !disposableDomains.some((d) => domain.includes(d));
}

function isValidPhone(phone: string) {
  return /^[0-9]{7,15}$/.test(phone); // allow 7–15 digit numbers
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const role = formData.get("role") as string | null;
    const phone = formData.get("phone") as string | null;

    // 🔹 Required field validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔹 Type validations
    if (!isAlphaOnly(name)) {
      return NextResponse.json(
        { success: false, error: "Name must only contain letters and spaces" },
        { status: 400 }
      );
    }

    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid or disposable email" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone must contain only digits (7–15 length)",
        },
        { status: 400 }
      );
    }

    // Base user data
    const userData: any = {
      email,
      password, // 👈 hashed in createUser
      name,
      role,
      phone: phone || null,
    };

    // 🔹 Trainer-specific validations
    if (role === "TRAINER") {
      const experienceStr = formData.get("experience") as string | null;
      const hourlyRateStr = formData.get("hourlyRate") as string | null;
      const specializationStr = formData.get("specializations") as
        | string
        | null;

      if (!experienceStr || !hourlyRateStr || !specializationStr) {
        return NextResponse.json(
          { success: false, error: "Missing trainer details" },
          { status: 400 }
        );
      }

      if (!/^\d+$/.test(experienceStr)) {
        return NextResponse.json(
          { success: false, error: "Experience must be a number" },
          { status: 400 }
        );
      }

      const experience = Number(experienceStr);
      const hourlyRate = Number(hourlyRateStr);

      if (isNaN(experience) || experience < 0) {
        return NextResponse.json(
          { success: false, error: "Invalid experience value" },
          { status: 400 }
        );
      }

      if (isNaN(hourlyRate) || hourlyRate < 0) {
        return NextResponse.json(
          { success: false, error: "Invalid hourly rate" },
          { status: 400 }
        );
      }

      const specializations = specializationStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (specializations.length === 0) {
        return NextResponse.json(
          { success: false, error: "At least one specialization required" },
          { status: 400 }
        );
      }

      // Handle uploads
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      let documentation: string[] = [];
      const docFiles = formData.getAll("documentation") as File[];
      for (const file of docFiles) {
        if (file && file instanceof File) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = file.name || `doc-${Date.now()}`;
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, buffer);
          documentation.push(`/uploads/${fileName}`);
        }
      }

      if (documentation.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Trainer must upload at least one document",
          },
          { status: 400 }
        );
      }

      // Attach trainer data
      userData.experience = experience;
      userData.hourlyRate = hourlyRate;
      userData.specializations = specializations;
      userData.documentation = documentation;
    }

    // ✅ Create user
    const user = await createUser(userData);

    // Generate JWT
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // 🔹 Send Welcome Mail
    //   await sendMail(
    //     user.email,
    //     "Welcome to FormaFit 🎉",
    //     `<h2>Hello ${user.name},</h2>
    //  <p>Welcome aboard! We're excited to have you join as a <b>${user.role}</b>.</p>
    //  <p>You can now log in and start using FormaFit 🚀</p>`
    //   );
    await sendMail(
      user.email,
      "Welcome to FormaFit 🎉",
      `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
        <h1>🎉 Welcome to FormaFit</h1>
      </div>
      <div style="padding: 20px; color: #333;">
        <h2>Hello ${user.name},</h2>
        <p>We’re excited to have you join as a <b>${user.role}</b>.</p>
        <p>You can now log in and start your fitness journey with us 🚀</p>
        <a href="#" 
           style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; border-radius: 6px;">
          Get Started
        </a>
      </div>
      <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
        © ${new Date().getFullYear()} FormaFit | All Rights Reserved
      </div>
    </div>
  </div>
  `
    );

    return NextResponse.json({ success: true, user, token });
  } catch (err: any) {
    console.error("Registration Error:", err);

    if (err.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to register" },
      { status: 500 }
    );
  }
}
