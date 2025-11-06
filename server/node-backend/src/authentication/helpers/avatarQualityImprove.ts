export function googleAvatarQualityImprove(avatarURL: string): string {
  return avatarURL.replace("s96-c", "s512-c");
}
