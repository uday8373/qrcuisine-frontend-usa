import supabase from "@/config/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { mobile, password, name } = await request.json();

  if (!mobile || !password || !name) {
    return NextResponse.json(
      { error: "Mobile number and password are required." },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from("verified_users")
      .select("id")
      .eq("mobile", mobile)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Mobile number is already registered." },
        { status: 409 } // Conflict status code
      );
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const { data: newUser, error: insertError } = await supabase
      .from("verified_users")
      .insert([{ mobile, password: hashedPassword, name }])
      .select("id")
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: "Failed to create a new user." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "User created successfully.",
      userId: newUser.id,
    });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
