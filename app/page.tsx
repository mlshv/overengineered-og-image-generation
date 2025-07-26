import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20">
      <h1 className="text-2xl font-bold">
        Overengineered OpenGraph image generation project
      </h1>

      <p className="my-4">
        Simple example: <br />
        <Link
          href="/og-pages/1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          /og-pages/1
        </Link>
      </p>

      <p className="my-4">
        Different images for different User Agents: <br />
        <Link
          href="/og-pages-ua/1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          /og-pages-ua/1
        </Link>
      </p>

      <p className="my-4">
        GitHub repo: <br />
        <Link
          href="https://github.com/mlshv/overengineered-og-image-generation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          https://github.com/mlshv/overengineered-og-image-generation
        </Link>
      </p>
    </div>
  );
}
