import Link from "next/link"

export default function PolicyPage() {
  return (
    <div className="prose">
      <h1>Privacy Policy for Elias Floreteng&#39;s Personal Website</h1>
      <p>
        <em>
          Last Updated: <time dateTime="2024-03-02">2024-03-02</time>
        </em>
      </p>
      <p>
        Welcome to Elias Floreteng&#39;s personal website! We highly value your
        privacy and want you to feel comfortable while using our services. This
        Privacy Policy explains how we collect, use, and safeguard your personal
        information.
      </p>

      <h2>Information We Collect:</h2>
      <p>
        When you visit Elias Floreteng&#39;s website, we may request your
        consent to access your Google Account through the OAuth consent screen.
        If granted, this access will be used solely for the purpose of
        optionally retrieving data from your Google Calendar.
      </p>

      <h2>How We Use Your Information:</h2>
      <ol>
        <li>
          <p>
            <strong>Google Calendar Access:</strong> If you choose to grant
            access, we will only retrieve information from your Google Calendar
            that is necessary for the specific functionality of the website,
            such as displaying upcoming events or managing appointments.
          </p>
        </li>
        <li>
          <p>
            <strong>Website Analytics:</strong> We may collect anonymized data
            for website analytics to understand user behavior and improve our
            services. This information does not personally identify you.
          </p>
        </li>
        <li>
          <p>
            <strong>Communication:</strong> If you contact us through the
            website, we may use your provided contact information to respond to
            your inquiries or feedback.
          </p>
        </li>
      </ol>

      <h2>Information Sharing:</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personal information
        to external parties. Your data will only be used for the purposes
        outlined in this Privacy Policy.
      </p>

      <h2>Security Measures:</h2>
      <p>
        We implement reasonable security measures to protect your information
        from unauthorized access, disclosure, alteration, or destruction.
      </p>

      <h2>Your Choices:</h2>
      <p>
        You have the option to decline granting access to your Google Account.
        However, please note that this may limit the functionality of certain
        features on the website.
      </p>

      <h2>Updates to the Privacy Policy:</h2>
      <p>
        We may update this Privacy Policy periodically. Any changes will be
        reflected on this page with the updated date.
      </p>

      <h2>Contact Us:</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact Elias Floreteng (contact information can be found on the page{" "}
        <Link href="/experience">Experience</Link>).
      </p>
      <p>
        By using Elias Floreteng&#39;s personal website, you agree to the terms
        outlined in this Privacy Policy. Thank you for trusting us with your
        information!
      </p>
    </div>
  )
}
