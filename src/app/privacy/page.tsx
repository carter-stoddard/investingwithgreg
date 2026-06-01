import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Invest with Greg collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    title: "Who we are",
    body: (
      <p>
        Invest with Greg (&ldquo;Greg,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) operates investingwithgreg.com
        (the &ldquo;Site&rdquo;) and offers paid access to portfolio information, watchlists, and 1-on-1
        consultations. This policy explains what data we collect when you use the Site, how we use it,
        and what choices you have.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>Information you provide.</strong> When you submit the application form, we collect your
          name, TikTok handle, phone number (if provided), the tier you&apos;re interested in, and the
          goals or context you share with Greg.
        </p>
        <p>
          <strong>Automatically collected.</strong> When you visit the Site, our analytics provider
          (Google Analytics 4) records standard web data like pages visited, referring URL, device type,
          browser, approximate location derived from IP, and time on page. Google sets cookies to do this.
        </p>
        <p>
          <strong>Communications.</strong> If you reply to any email from Greg, we keep that
          correspondence so we can follow up.
        </p>
        <p>
          We do not knowingly collect information from anyone under 16. The Site is intended for users
          18 and older.
        </p>
      </>
    ),
  },
  {
    title: "How we use your information",
    body: (
      <ul>
        <li>To respond to your application and deliver the tier you signed up for.</li>
        <li>To send transactional messages (confirmation of your submission, payment receipts, scheduling).</li>
        <li>To send marketing or follow-up communications about Greg&apos;s offers, content, and updates, when you have consented via the application form.</li>
        <li>To improve the Site, measure traffic, and understand what&apos;s working.</li>
        <li>To prevent abuse, spam, and fraud.</li>
        <li>To comply with legal obligations.</li>
      </ul>
    ),
  },
  {
    title: "Who we share information with",
    body: (
      <>
        <p>
          We do not sell your personal information. We share it only with the service providers that
          help us run the Site, and only for the purposes above:
        </p>
        <ul>
          <li><strong>Resend</strong> (email delivery) receives lead details so notifications can reach Greg.</li>
          <li><strong>Make.com</strong> (automation) may receive your submission so it can be added to Greg&apos;s lead spreadsheet.</li>
          <li><strong>Google Analytics 4</strong> receives usage data via cookies and pixel.</li>
          <li><strong>Vercel</strong> hosts the Site and processes basic request logs for security and performance.</li>
          <li>Future payment processors (e.g., Stripe) will process your payment details directly. We do not store full card numbers.</li>
        </ul>
        <p>We may also disclose information if required by law, court order, or to protect our rights.</p>
      </>
    ),
  },
  {
    title: "Cookies and tracking",
    body: (
      <p>
        We use cookies set by Google Analytics to understand site usage. You can block these by
        adjusting your browser settings or by using a browser extension. Blocking cookies will not
        prevent the Site from working.
      </p>
    ),
  },
  {
    title: "How long we keep your data",
    body: (
      <p>
        We keep application data for as long as you are an active customer and for up to 24 months
        after your last interaction with us, unless you ask us to delete it sooner. Email logs and
        analytics aggregates may be retained longer in line with the providers&apos; own policies.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>Request a copy of the personal information we hold about you.</li>
          <li>Correct information that is inaccurate.</li>
          <li>Ask us to delete your personal information.</li>
          <li>Opt out of marketing communications at any time.</li>
          <li>For California residents: opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information (we do not sell or share for cross-context advertising as defined under the CCPA).</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:gregwstoddard@gmail.com">gregwstoddard@gmail.com</a>. We&apos;ll respond within
          30 days.
        </p>
      </>
    ),
  },
  {
    title: "Security",
    body: (
      <p>
        We use HTTPS for all traffic, encrypted environment variables for API credentials, and rely on
        reputable third-party processors. No system is perfectly secure, so we cannot guarantee absolute
        security, but we take reasonable steps to protect your information.
      </p>
    ),
  },
  {
    title: "International users",
    body: (
      <p>
        The Site is operated from the United States. If you access it from outside the U.S., your
        information will be transferred to and processed in the U.S., where data protection laws may
        differ from your country.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top
        reflects the current version. Material changes will be announced on the Site or via email.
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        Questions about this policy or your data?{" "}
        <a href="mailto:gregwstoddard@gmail.com">gregwstoddard@gmail.com</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Your data, simply."
      intro="What we collect, why we collect it, and exactly what you can do about it. No fine print games."
      updated="May 27, 2026"
      sections={sections}
    />
  );
}
