import { NextResponse } from "next/server";

export function middleware(req) {
  let verify = req.cookies.get("accessToken");
  const url = req.url;
  const clientUrl = req.nextUrl.clone();

  if (!verify && url.includes("/employee")) {
    return NextResponse.redirect(`${clientUrl.origin}/`);
  }
}