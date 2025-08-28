import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, generateToken, User } from "@/lib/auth";
import { z } from "zod";
import { sendMail } from "@/lib/mail";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = loginSchema.parse(body);

    // Authenticate user
    const user = await authenticateUser(
      validatedData.email,
      validatedData.password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: "Account is deactivated" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // ✅ Send login alert email
    await sendMail(
      user.email,
      "🔔 New Login Alert - FormaFit",
      `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background: #2196F3; color: white; padding: 15px; text-align: center;">
            <h2>New Login Detected</h2>
          </div>
          <div style="padding: 20px; color: #333;">
            <p>Hello <b>${user.name}</b>,</p>
            <p>We noticed a new login to your account on <b>${new Date().toLocaleString()}</b>.</p>
            <p>If this was you, no further action is required ✅.</p>
            <p>If this wasn’t you, please <a href="#" style="color: #2196F3;">reset your password</a> immediately.</p>
          </div>
          <div style="background: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555;">
            © ${new Date().getFullYear()} FormaFit | All Rights Reserved
          </div>
        </div>
      </div>
      `
    );

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
