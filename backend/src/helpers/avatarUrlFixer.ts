// Utility function to fix individual avatar URLs
// Use this if you need to manually fix a specific user's avatar URL

export function fixAvatarUrl(url: string): string {
  if (!url) return url;

  // Convert /raw/upload/ to /image/upload/
  if (url.includes("/raw/upload/")) {
    return url.replace("/raw/upload/", "/image/upload/");
  }

  return url;
}

// Example usage:
// const brokenUrl = "https://res.cloudinary.com/drtmxi7rn/raw/upload/v1754700346/voccaria/avatars/68966f4f4ee31f9b6ffddb43/tmp-2-1754700345674"
// const fixedUrl = fixAvatarUrl(brokenUrl);
// console.log(fixedUrl); // "https://res.cloudinary.com/drtmxi7rn/image/upload/v1754700346/voccaria/avatars/68966f4f4ee31f9b6ffddb43/tmp-2-1754700345674"
