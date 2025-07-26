// the type is not exported by @vercel/og or next/og, so we need to define it ourselves
type FontOptions = {
  data: Buffer | ArrayBuffer;
  name: string;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  style?: "normal" | "italic";
  lang?: string;
};

// it's good to have a separate function to fetch your static assets such as icons, background images, fonts, etc.
export async function fetchAssets() {
  const [interSemiBold, interRegular] = await Promise.all([
    fetch(
      new URL("../../../../public/fonts/Inter-SemiBold.woff", import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL("../../../../public/fonts/Inter-Regular.woff", import.meta.url)
    ).then((res) => res.arrayBuffer()),
  ]);

  return {
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
    ] as FontOptions[],
  };
}
