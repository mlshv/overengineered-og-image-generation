import { ImageResponse } from "next/og";

import { fetchMockedUserData } from "@/app/(server-actions)/actions";

// Image metadata
export const alt = "You've been invited to join";
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";
export const runtime = "edge";

// Image generation
export default async function Image({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	// pro tip: use Promise.all to fetch multiple things in parallel
	const [user, interSemiBold, interRegular] = await Promise.all([
		fetchMockedUserData(id),
		fetch(new URL("../../../public/fonts/Inter-SemiBold.woff", import.meta.url)).then(res => res.arrayBuffer()),
		fetch(new URL("../../../public/fonts/Inter-Regular.woff", import.meta.url)).then(res => res.arrayBuffer()),
	]);

	return new ImageResponse(
		// ImageResponse JSX element
		<div
			// There are two options: inline styles or tailwind. I prefer tailwind.
			tw="flex items-center justify-center bg-white w-full h-full p-12" // You must use tw="..." instead of className="..." though
		>
			<div
				tw="flex flex-col items-center justify-center h-full"
				style={{
                    // gap className is not supported https://github.com/vercel/satori/issues/615#issue-2304347269
					gap: 32,
				}}
			>
				<div tw="flex items-center justify-center">
					<div tw="flex rounded-full overflow-hidden w-64 h-64">
						<img src={user.avatar} alt={user.name} tw="h-full object-cover" />
					</div>
				</div>
				<div tw="flex flex-col items-center" style={{ gap: 24 }}>
					<div tw="flex flex-col items-center font-bold text-7xl">
						<div>{user.name}</div>
						<div>invites you to join</div>
					</div>
					<div tw="text-4xl text-gray-500">
						Powered by Overengineered OpenGraph Image
					</div>
				</div>
			</div>
		</div>,
		// ImageResponse options
		{
			// For convenience, we can re-use the exported opengraph-image
			// size config to also set the ImageResponse's width and height.
			...size,
			fonts: [
				{
					name: "Inter",
					data: interRegular,
					style: "normal",
					weight: 400,
				},
				{
					name: "Inter",
					data: interSemiBold,
					style: "normal",
					weight: 600,
				},
			],
		},
	);
}
