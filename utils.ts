type AspectRatio = "1x1.91" | "1x1" | "4x5" | "1.91x1";

export function getAspectRatioByUserAgent(ua?: string | null): AspectRatio {
  if (!ua) {
    return "1.91x1";
  }

  // iMessage
  if (
    ua.includes("iPhone") ||
    ua.includes("NetworkingExtension") ||
    ua.includes("com.apple.WebKit.Networking") ||
    // see https://medium.com/@siggi/apples-imessage-impersonates-twitter-facebook-bots-when-scraping-cef85b2cbb7d
    ua.includes("facebookexternalhit/1.1 Facebot Twitterbot/1.0")
  ) {
    return "1x1.91";
  }

  // LinkedIn, Telegram, Slack
  if (
    ua.includes("LinkedInBot") ||
    ua.includes("TelegramBot") ||
    ua.includes("Slack")
  ) {
    return "1x1";
  }

  // instagram and facebook
  if (ua.includes("facebookexternalhit")) {
    return "4x5";
  }

  return "1.91x1";
}

export function getImageSizeByAspectRatio(aspectRatio: AspectRatio): {
  width: number;
  height: number;
} {
  if (aspectRatio === "1x1.91") {
    return { width: 630, height: 1200 };
  }

  if (aspectRatio === "1x1") {
    return { width: 1200, height: 1200 };
  }

  if (aspectRatio === "4x5") {
    return { width: 504, height: 630 };
  }

  return { width: 1200, height: 630 };
}
