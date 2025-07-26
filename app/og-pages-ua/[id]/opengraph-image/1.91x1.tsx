import { ImageResponse } from "next/og";

import { User } from "@/app/(server-actions)/actions";
import { getImageSizeByAspectRatio } from "@/utils";
import { fetchAssets } from "./assets";

export async function generate({
  userPromise,
}: {
  userPromise: Promise<User>;
}) {
  const [user, { fonts }] = await Promise.all([userPromise, fetchAssets()]);

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center bg-white w-full h-full p-12">
        <div
          tw="flex flex-col items-center justify-center h-full"
          style={{
            gap: 32,
          }}
        >
          <div tw="flex items-center justify-center">
            <div tw="flex rounded-full overflow-hidden w-64 h-64">
              <img src={user.avatar} alt={user.name} tw="h-full" />
            </div>
          </div>
          <div tw="flex flex-col items-center" style={{ gap: 24 }}>
            <div tw="flex flex-col items-center text-center font-bold text-7xl">
              <div>{user.name}</div>
              <div>invites you to join</div>
            </div>
            <div tw="text-4xl text-gray-500">
              Powered by Overengineered OpenGraph Image
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...getImageSizeByAspectRatio("1.91x1"),
      fonts,
    }
  );
}
