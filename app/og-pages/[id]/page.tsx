import { fetchMockedUserData } from "@/app/(server-actions)/actions";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { id } = await params;
	const user = await fetchMockedUserData(id);

	const title = `${user.name} invited you to join`;
	const description = "Powered by Overengineered OpenGraph Image";

	const metadata: Metadata = {
		title,
		description,
		openGraph: {
			images: [
				{
					alt: "You've been invited to join",
					url: `/og-pages/${id}/opengraph-image`,
					width: 1200,
					height: 630,
				},
			],
		},
	};

	return metadata;
}

export default async function Page({ params }: Props) {
	const { id } = await params;

	return (
		<main className="max-w-md mx-auto p-4 m-4 rounded-md shadow-sm">
			<h1 className="text-2xl font-bold">Page {id}</h1>
			<p className="my-2">
				This is a page with a dynamic opengraph image. The image is generated
				dynamically and is available at
			</p>
			<Link
				href={`/og-pages/${id}/opengraph-image`}
				className="text-blue-500 hover:underline"
			>
				{`/og-pages/${id}/opengraph-image`}
			</Link>
		</main>
	);
}
