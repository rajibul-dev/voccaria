import React from "react";

import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  name: string;
  verificationLink: string;
}

export default function VerificationEmail({
  name,
  verificationLink,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Account Verification Link</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification link</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {name},</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please click on the following
            verification link to complete your registration:
          </Text>
        </Row>
        <Row>
          <Button
            href={`${verificationLink}`}
            style={{
              fontSize: "24px",
              color: "#fff",
              padding: "16px 32px",
              backgroundColor: "#f1278a",
              borderRadius: "5px",
            }}
          >
            Verification link
          </Button>
        </Row>
        <Row>
          <Text>If it wasn&apos;t you, please ignore this email.</Text>
        </Row>
      </Section>
    </Html>
  );
}
