import supabase from "@/config/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, phone, display_name } = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          phone,
          display_name,
          isVerified: false,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
    if (data) {
      return NextResponse.json({ id: data.user?.id });
    }
    return NextResponse.json({ id: data.user?.id });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
