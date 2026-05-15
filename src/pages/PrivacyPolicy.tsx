export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f1f3f6', minHeight: '100vh', padding: '24px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#878787', marginBottom: 12 }}>
          <a href="/" style={{ color: '#e87000', textDecoration: 'none' }}>
            Home
          </a>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>Privacy Policy</span>
        </div>

        <div style={{ background: '#fff', borderRadius: 2, padding: '24px 20px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#212121', marginBottom: 4, marginTop: 0 }}>Privacy Policy</h1>
          <div style={{ fontSize: 13, color: '#878787', borderBottom: '1px solid #f0f0f0', paddingBottom: 20, marginBottom: 28 }}>Last Updated: May 2026</div>

          <Callout type="info">
            <strong>Note:</strong> In case of any discrepancy or difference, the English version will take precedence over any translation of this Privacy Policy.
          </Callout>

          <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.9, marginBottom: 20 }}>
            We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how <strong>KITCHEN SAATHI</strong> (operated
            by <strong>Shri Nathji Enterprises</strong>, hereinafter referred to as "KITCHEN SAATHI", "we", "our", "us") collects, uses, shares, or otherwise processes your personal data through the
            KITCHEN SAATHI website, its mobile application, and m-site (hereinafter referred to as the "Platform").
          </p>
          <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.9, marginBottom: 28 }}>
            By visiting this Platform, providing your information, or availing our product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy and the Terms of
            Use. If you do not agree, please do not use or access our Platform.
          </p>

          <Section title="1. Collection of Your Information">
            <p>
              When you use our Platform, we collect and store information provided by you from time to time. We collect and analyse your personal data relating to your buying behaviour, browsing
              patterns, preferences, and other information that you choose to provide while interacting with our Platform.
            </p>
            <p>We may collect the following categories of personal data:</p>
            <div style={{ overflowX: 'auto', marginTop: 8, marginBottom: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f7f9fc' }}>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCategories.map(([cat, ex], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#212121', width: '30%' }}>{cat}</td>
                      <td style={tdStyle}>{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>We may also collect information through your use of features such as voice commands and other interactive features available on the Platform.</p>
          </Section>

          <Section title="2. Use of Your Information">
            <p>We use your personal data to:</p>
            <BulletList
              items={[
                'Take and fulfil orders, deliver products and services, and process payments.',
                'Communicate with you about orders, products, services, and promotional offers.',
                'Assist business partners in handling and fulfilling orders.',
                'Enhance customer experience, resolve disputes, and troubleshoot problems.',
                'Inform you about online and offline offers, products, services, and updates.',
                'Customize and enhance your experience on the Platform.',
                'Detect and protect against error, fraud, and other criminal activity.',
                'Report to regulatory authorities wherever required.',
                'Conduct market research and surveys to improve our offerings.',
              ]}
            />
          </Section>

          <Section title="3. Cookies">
            <p>
              We use data collection devices such as "cookies" on certain pages of the Platform to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety.
              Cookies are small files placed on your device that assist us in providing our services. Cookies do not contain any of your personal data.
            </p>
            <BulletList
              items={[
                'Most cookies are session cookies, meaning they are automatically deleted from your device at the end of a session.',
                'You are always free to decline or delete our cookies if your browser permits, although in that case you may not be able to use certain features on the Platform.',
                'We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes.',
                'You can opt-out of Google Analytics at: https://tools.google.com/dlpage/gaoptout',
              ]}
            />
          </Section>

          <Section title="4. Sharing of Personal Data">
            <p>We may share personal data with:</p>

            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#212121', margin: '16px 0 8px' }}>4.1 Business Partners and Vendors</h3>
            <p>
              This may be required for: fulfilment of your orders; enhancing your experience; collecting payments; conducting market research; facilitating marketing and advertising activities;
              analysing data; fraud prevention; and providing customer service.
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#212121', margin: '16px 0 8px' }}>4.2 Legal and Regulatory Authorities</h3>
            <p>
              We may disclose personal data if required to do so by law, or in good faith belief that such disclosure is reasonably necessary to: respond to subpoenas, court orders, or other legal
              process; enforce our Terms of Use or Privacy Policy; or protect the rights, property, or personal safety of our users or the general public.
            </p>

            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#212121', margin: '16px 0 8px' }}>4.3 Business Transactions</h3>
            <p>
              We may share some or all of your personal data with another business entity should we plan to merge with, or be acquired by, that business entity, or in the case of any reorganization or
              restructuring of business.
            </p>

            <Callout type="info">
              We do <strong>not</strong> disclose your personal information to third parties for their marketing and advertising purposes without your explicit consent.
            </Callout>
          </Section>

          <Section title="5. Advertisements on Platform">
            <p>
              We may work with third-party advertising and analytics partners to display advertisements and measure the effectiveness of our marketing campaigns on the Platform and other websites.
              These partners may use cookies, pixels, and similar technologies to collect limited information about your interactions with our Platform, such as device information, browser type, pages
              visited, and browsing activity. This information does not include sensitive personal details such as your name, phone number, or payment information unless explicitly provided by you.
              You can control or disable personalised advertising through your browser settings, cookie preferences, or your device advertising settings. Please note that disabling personalised
              advertising may not completely stop advertisements, but the ads shown to you may be less relevant to your interests.
            </p>
          </Section>

          <Section title="6. Security Precautions">
            <p>
              We maintain reasonable physical, electronic, and procedural safeguards to protect your information. Whenever you access your account information, we offer the use of a secure server.
              Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorized access.
            </p>
            <Callout type="warning">
              Data transmission over the internet cannot always be guaranteed as completely secure. There will always remain certain inherent risks regarding use of the Platform. Users are responsible
              for ensuring the protection of login and password records for their account.
            </Callout>
          </Section>

          <Section title="7. Children's Information">
            <p>
              Use of our Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. We do not knowingly solicit or collect personal data from
              children under the age of 18 years. If you have shared any personal data of children under the age of 18 years, you represent that you have the authority to do so and permit us to use
              the information in accordance with this Privacy Policy.
            </p>
          </Section>

          <Section title="8. Data Retention">
            <p>
              We retain your personal data in accordance with applicable laws, for a period no longer than is required for the purpose for which it was collected or as required under any applicable
              law. However, we may retain data related to you if we believe it may be necessary to:
            </p>
            <BulletList
              items={[
                'Prevent fraud or future abuse.',
                'Enable KITCHEN SAATHI to exercise its legal rights and/or defend against legal claims.',
                'Comply with applicable law.',
                'Continue to retain your data in anonymised form for analytical and research purposes.',
              ]}
            />
          </Section>

          <Section title="9. Your Rights">
            <p>We take every reasonable step to ensure that your personal data is accurate and, where necessary, kept up to date. You have the following rights:</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10, margin: '12px 0 16px' }}>
              {[
                { right: 'Access & Correction', desc: "Access, correct, and update your personal data directly through the Platform's functionalities." },
                { right: 'Deletion', desc: 'Delete certain non-mandatory information by logging into your account under Profile & Settings.' },
                { right: 'Withdrawal of Consent', desc: 'Withdraw consent already provided by writing to us. Note: withdrawal will not be retroactive.' },
                { right: 'Opt-Out', desc: 'Opt out of receiving non-essential promotional/marketing communications from us at any time.' },
              ].map(({ right, desc }) => (
                <div key={right} style={{ border: '1px solid #e0e0e0', borderRadius: 4, padding: '14px 16px', background: '#fafafa' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#e87000', marginBottom: 6 }}>{right}</div>
                  <div style={{ fontSize: 12, color: '#4a4a4a', lineHeight: 1.6 }}>{desc}</div>
                </div>
              ))}
            </div>

            <p>
              To exercise your rights, you can write to us at{' '}
              <a href="mailto:privacy@KITCHEN SAATHI.com" style={{ color: '#e87000', textDecoration: 'none' }}>
                privacy@KITCHEN SAATHI.com
              </a>{' '}
              or manage preferences directly on the Platform.
            </p>
          </Section>

          <Section title="10. Your Consent">
            <p>
              By visiting our Platform or by providing your personal data, you consent to the collection, use, storage, disclosure, and otherwise processing of your personal data on the Platform in
              accordance with this Privacy Policy.
            </p>
            <p>
              You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us contacting you through SMS, instant messaging apps, call, and/or
              e-mail for the purposes specified in this Privacy Policy.
            </p>
          </Section>

          <Section title="11. Links to Other Sites">
            <p>
              Our Platform may provide links to other websites or applications that may collect personal data about you, and you will be governed by their privacy policies. KITCHEN SAATHI shall not be
              responsible for the privacy practices or the content of their privacy policies. We request you to read their privacy policies prior to disclosing any information.
            </p>
          </Section>

          <Section title="12. Changes to This Privacy Policy">
            <p>
              Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We will alert you to significant changes by
              posting the date our policy was last updated, placing a notice on our Platform, or by sending you an email when required to do so by applicable law.
            </p>
          </Section>

          <Section title="14. Customer Support">
            <p>
              If you have a query, concern, or complaint in relation to the collection or usage of your personal data under this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@KITCHEN SAATHI.com" style={{ color: '#e87000', textDecoration: 'none' }}>
                privacy@KITCHEN SAATHI.com
              </a>
            </p>
            <p>You can reach our customer support team to address any queries or complaints related to products and services by visiting our Help Centre:</p>
            <div style={{ marginTop: 8 }}>
              <LinkButton href="https://www.KITCHEN SAATHI.com/helpcentre">Visit Help Centre</LinkButton>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: '1px solid #e0e0e0',
  padding: '10px 14px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#212121',
  fontSize: 13,
  background: '#f7f9fc',
};
const tdStyle: React.CSSProperties = {
  border: '1px solid #f0f0f0',
  padding: '10px 14px',
  color: '#4a4a4a',
  fontSize: 13,
  lineHeight: 1.6,
};

const dataCategories: [string, string][] = [
  ['Identity & Contact', 'Name, email address, phone number, delivery address'],
  ['Payment Information', 'UPI ID, payment instrument type, last 4 digits of card'],
  ['Transaction Data', 'Orders placed, products viewed, purchase history'],
  ['Technical Data', 'IP address, browser information, URL history, device ID'],
  ['Usage Data', 'Browsing patterns, preferences, click behaviour, session data'],
  ['Communications', 'Reviews, ratings, messages, emails, feedback submitted on Platform'],
  ['Government IDs', 'PAN card (for purchases ≥ ₹2,00,000), GSTIN, KYC documents'],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#212121', marginBottom: 12, marginTop: 0, borderLeft: '3px solid #e87000', paddingLeft: 10 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.9 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: '8px 0 12px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Callout({ children, type }: { children: React.ReactNode; type: 'warning' | 'info' }) {
  const bg = type === 'warning' ? '#fff8e1' : '#fff3e0';
  const border = type === 'warning' ? '#e87000' : '#e87000';
  return <div style={{ background: bg, borderLeft: `4px solid ${border}`, padding: '14px 16px', borderRadius: 2, margin: '14px 0', fontSize: 13, color: '#4a4a4a', lineHeight: 1.7 }}>{children}</div>;
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        background: '#e87000',
        color: '#fff',
        borderRadius: 2,
        fontSize: 13,
        fontWeight: 600,
        textDecoration: 'none',
        letterSpacing: 0.3,
      }}
    >
      {children}
    </a>
  );
}
