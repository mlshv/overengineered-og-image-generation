import { fetchMockedUserData } from "@/app/(server-actions)/actions";
import { NextRequest } from "next/server";

export const runtime = "edge";

/*
pro tip: we can't get search params in opengraph-image.tsx, so we're using api route instead
see: https://github.com/vercel/next.js/discussions/56314
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const id = (await params).id;
  // note: don't try to get aspect ratio from user agent,
  // as the generated image will be cached by Vercel for all future requests by any UA
  const aspectRatio = searchParams.get("aspect_ratio") ?? "1.91x1";

  if (!id) {
    return new Response("Not found", { status: 404 });
  }

  const imported = await import(`./${aspectRatio}`);
  const generate = imported.generate;

  // pro tip: passing user as a promise allows you to fetch
  // it in parallel with other assets that might be fetched in `generate`
  const userPromise = fetchMockedUserData(id);

  return await generate({
    userPromise,
  });
}
