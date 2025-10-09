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
    try {
      const {
        error,
        data: res,
        message,
      } = await getCurrentSession(accessToken);
      if (error || !res) throw new Error(message);
      if (!res.ok || !(await res.json())) {
        throw new Error(message);
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("access_token");
      if (error instanceof Error) {
        return response;
      }
      return response;
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/login", "/dashboard/:path*"], // optional optimization
// };
