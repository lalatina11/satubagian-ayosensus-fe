import { NextResponse, type NextRequest } from "next/server";
import { getCurrentSession } from "./lib/actions";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies;
  const accessToken = cookie.get("access_token")?.value;

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (accessToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const res = await getCurrentSession(accessToken);

    if (!res.ok || !(await res.json())) {
      // ✅ Fix starts here
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"], // optional optimization
// };
