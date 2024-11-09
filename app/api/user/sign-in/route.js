import supabase from "@/config/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { mobile, password } = await request.json();

  if (!mobile || !password) {
    return NextResponse.json(
      { error: "Mobile number and password are required." },
      { status: 400 }
    );
  }

  try {
    // Fetch the user by mobile number
    const { data: existingUser, error: fetchError } = await supabase
      .from("verified_users")
      .select("id, password")
      .eq("mobile", mobile)
      .single();

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 } // Not Found status code
      );
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 } // Unauthorized status code
      );
    }

    return NextResponse.json({
      message: "Sign-in successful.",
      userId: existingUser.id,
    });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
