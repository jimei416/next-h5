import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export class AuthError extends Error {}

export async function setUserCookie(token: string) {
  NextResponse.next().cookies.set("token", token);
}
