import { track } from "@vercel/analytics";

export type SectionId =
  | "about"
  | "mission"
  | "objective"
  | "lesson-options"
  | "pricing"
  | "scheduling"
  | "contact"
  | "testimonials"
  | "patreon";

export type ExternalLinkSource = SectionId | "socials" | "footer";

export type ExternalDestination =
  | "calendly"
  | "mia_discord_profile"
  | "discord_server"
  | "patreon"
  | "youtube"
  | "twitch"
  | "tip_page"
  | "private_paid_lesson_application_form"
  | "raji_personal_website";

export type ProductId =
  | "recording_review"
  | "lesson_30"
  | "lesson_60"
  | "lesson_30_pack_4"
  | "lesson_60_pack_4";

export const analytics = {
  sectionViewed(section: SectionId) {
    track("section_viewed", {
      section,
    });
  },

  sectionNavigationClicked(section: SectionId) {
    track("section_navigation_clicked", {
      section,
    });
  },

  externalLinkClicked(
    destination: ExternalDestination,
    sourceSection: ExternalLinkSource,
  ) {
    track("external_link_clicked", {
      destination,
      source_section: sourceSection,
    });
  },

  checkoutStarted(
    productId: ProductId,
    amount: number,
    currency: string = "USD",
  ) {
    track("checkout_started", {
      product_id: productId,
      amount,
      currency,
    });
  },

  paypalApproved(
    productId: ProductId,
    amount: number,
    currency: string = "USD",
  ) {
    track("paypal_approved", {
      product_id: productId,
      amount,
      currency,
    });
  },

  paymentCompleted(
    productId: ProductId,
    amount: number,
    currency: string = "USD",
  ) {
    track("payment_completed", {
      product_id: productId,
      amount,
      currency,
    });
  },

  paymentFailed(productId: ProductId) {
    track("payment_failed", {
      product_id: productId,
    });
  },

  contactSubmitted() {
    track("contact_submitted");
  },
};
