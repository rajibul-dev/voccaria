import fetch from "node-fetch";

export async function googleAvatarQualityImprove(
  avatarURL: string
): Promise<string> {
  const sizes = [2048, 1024, 512, 256, 128, 96];

  for (const size of sizes) {
    const testURL = avatarURL.replace(/s\d+-c/, `s${size}-c`);
    const isValid = await testImageLoad(testURL);
    if (isValid) return testURL;
  }

  return avatarURL;
}

async function testImageLoad(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch (err) {
    return false;
  }
}
