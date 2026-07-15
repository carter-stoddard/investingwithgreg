import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of Invest with Greg.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    title: "Agreement to terms",
    body: (
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of
        investingwithgreg.com (the &ldquo;Site&rdquo;) and any paid services offered by Invest with Greg
        (&ldquo;Greg,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By submitting the application form,
        purchasing a tier, or otherwise using the Site, you agree to these Terms. If you do not agree,
        do not use the Site.
      </p>
    ),
  },
  {
    title: "Eligibility",
    body: (
      <p>
        You must be at least 18 years old and legally able to enter into a binding contract to use
        the Site or purchase any tier. By using the Site, you represent that you meet these
        requirements.
      </p>
    ),
  },
  {
    title: "What we offer",
    body: (
      <>
        <p>The Site offers three tiers of educational access:</p>
        <ul>
          <li><strong>Portfolio Drop ($60):</strong> a one-time delivery of Greg&apos;s current holdings and position sizes, plus answers to a few quick questions.</li>
          <li><strong>Insider Access ($90):</strong> everything in Portfolio Drop, plus Greg&apos;s watchlist and four weeks of Q&amp;A access.</li>
          <li><strong>1:1 Deep Dive ($150):</strong> everything in Insider Access, plus a 30-minute one-on-one call with Greg.</li>
        </ul>
        <p>
          Greg may update the contents of each tier at any time. Pricing and features in effect at the
          time of your purchase will be honored for that purchase.
        </p>
      </>
    ),
  },
  {
    title: "Not financial advice",
    body: (
      <>
        <p>
          Greg is not a licensed financial advisor, broker, or investment professional. All content
          delivered through the Site or any tier, including stock mentions, portfolio holdings,
          watchlists, and conversation during a 1-on-1 call, is for educational and informational
          purposes only. Nothing constitutes a recommendation to buy or sell any security, a
          solicitation, or personalized investment advice.
        </p>
        <p>
          Past performance is not indicative of future results. All investing involves risk, including
          the potential loss of your entire investment. You are solely responsible for your own
          financial decisions. Always do your own research and consult a licensed professional before
          acting on anything you learn here.
        </p>
      </>
    ),
  },
  {
    title: "Payment",
    body: (
      <p>
        All purchases are processed in U.S. dollars. Prices are listed on the Site and confirmed
        before checkout. You authorize us (and our payment processor) to charge your chosen payment
        method for the amount displayed.
      </p>
    ),
  },
  {
    title: "Refunds",
    body: (
      <p>
        Because each tier delivers digital content and Greg&apos;s personal time,{" "}
        <strong>all sales are final and no refunds are issued</strong> once content has been sent or a
        call has been booked. If you believe there has been a billing error, contact us within 7 days at{" "}
        <a href="mailto:gregwstoddard@gmail.com">gregwstoddard@gmail.com</a> and we will review the
        matter in good faith.
      </p>
    ),
  },
  {
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Share, resell, republish, or redistribute any content you receive (portfolio details, watchlists, call recordings, notes, screenshots).</li>
          <li>Scrape or systematically copy any part of the Site.</li>
          <li>Use the Site to harass, defame, or impersonate Greg or anyone else.</li>
          <li>Attempt to bypass security measures, payment systems, or rate limits.</li>
          <li>Use the Site for anything illegal.</li>
        </ul>
        <p>
          We may suspend or terminate your access without refund if you breach these rules.
        </p>
      </>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        All content on the Site and in any tier, including text, graphics, charts, branding, and the
        structure of Greg&apos;s portfolio analysis, is owned by Greg and protected by U.S. and
        international copyright laws. You receive a personal, non-transferable license to view and
        use the content for your own decisions. You receive no other rights.
      </p>
    ),
  },
  {
    title: "Disclaimers",
    body: (
      <p>
        The Site and all tiers are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
        warranties of any kind, express or implied, including warranties of merchantability, fitness
        for a particular purpose, accuracy, or non-infringement. We do not warrant that the Site will
        be uninterrupted, error-free, or that any specific outcome will result from using it.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the maximum extent permitted by law, Greg will not be liable for any indirect, incidental,
        consequential, special, or punitive damages, or for any loss of profits, revenue, or
        investment losses arising out of or related to your use of the Site or any tier. Our total
        liability to you for any claim is limited to the amount you paid us in the 12 months before
        the claim arose.
      </p>
    ),
  },
  {
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold Greg harmless from any claim, loss, or expense (including
        reasonable attorneys&apos; fees) arising from your breach of these Terms, your misuse of the
        Site, or your investment decisions.
      </p>
    ),
  },
  {
    title: "Termination",
    body: (
      <p>
        You may stop using the Site at any time. We may suspend or terminate your access at any time,
        for any reason, including breach of these Terms. Sections that by their nature should survive
        termination (intellectual property, disclaimers, limitation of liability, indemnification,
        governing law) will continue to apply.
      </p>
    ),
  },
  {
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the State of California, without regard to its
        conflict of laws principles. Any dispute will be resolved exclusively in the state or federal
        courts located in California, and you consent to that jurisdiction.
      </p>
    ),
  },
  {
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;last updated&rdquo; date at the top
        reflects the current version. Continued use of the Site after changes are posted means you
        accept the new Terms.
      </p>
    ),
  },
  {
    title: "Contact",
    body: (
      <p>
        Questions about these Terms?{" "}
        <a href="mailto:gregwstoddard@gmail.com">gregwstoddard@gmail.com</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & Conditions"
      title="The rules of the road."
      intro="Plain language for what you get, what you owe, and how we protect each other. Read once and you're set."
      updated="May 27, 2026"
      sections={sections}
    />
  );
}
