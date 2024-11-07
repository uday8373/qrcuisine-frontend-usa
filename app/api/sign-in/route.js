import supabase from "@/config/supabase";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request) {
  try {
    const headers = {
      ...corsHeaders,
    };

    const { email, password } = await request.json();

    // Sign in using Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message, code: "AUTH_FAILED" },
        { status: 401, headers }
      );
    }

    const user = data?.user;

    if (!user?.user_metadata?.isVerified) {
      return NextResponse.json(
        {
          error: "User is unverified",
          code: "USER_UNVERIFIED",
        },
        { status: 403, headers }
      );
    }

    return NextResponse.json(
      { message: "User is verified", data },
      { status: 200, headers }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "An error occurred", code: "INTERNAL_ERROR" },
      { status: 500, headers: corsHeaders }
    );
  }
}
