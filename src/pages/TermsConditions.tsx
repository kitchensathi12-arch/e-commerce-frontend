export default function TermsOfUse() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: '#f1f3f6', minHeight: '100vh', padding: '24px 0' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 16px' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: '#878787', marginBottom: 12 }}>
          <span style={{ color: '#2874f0', cursor: 'pointer' }}>Home</span>
          <span style={{ margin: '0 6px' }}>›</span>
          <span>Terms & Conditions</span>
        </div>

        <div style={{ background: '#fff', borderRadius: 2, padding: '32px 36px', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#212121', marginBottom: 4, marginTop: 0 }}>KITCHEN SAATHI Terms & Conditions</h1>
          <div style={{ fontSize: 13, color: '#878787', borderBottom: '1px solid #f0f0f0', paddingBottom: 20, marginBottom: 28 }}>Last Updated: July 2025</div>

          <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.9, marginBottom: 20 }}>
            These Terms & Conditions govern your access to and use of the Platform, including the website, mobile application, and related services operated by KITCHEN SAATHI.
          </p>
          <p style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.9, marginBottom: 28 }}>
            The Platform is owned and operated by <strong>Shri Nathji Enterprises</strong>, a company incorporated under the Companies Act. "You" or "User" refers to any person who accesses or
            transacts on the Platform.
          </p>

          <Section title="1. Membership Eligibility">
            <p>
              Transactions on the Platform are available only to persons who can form legally binding contracts under the Indian Contract Act, 1872. Persons who are "incompetent to contract,"
              including un-discharged insolvents, are not eligible to use the Platform.
            </p>
            <p>
              If you are a minor (under 18 years of age), you may use or access the Platform only under the supervision and prior consent of a parent or legal guardian. Any transaction on the Platform
              on behalf of a minor must be made by such legal guardian or parent.
            </p>
            <p>KITCHEN SAATHI reserves the right to terminate your membership and/or refuse access to the Platform if you are discovered to be transacting while under the age of 18 years.</p>
          </Section>

          <Section title="2. Your Account and Registration Obligations">
            <p>
              If you use the Platform, you are responsible for maintaining the confidentiality of your Display Name and Password, and for all activities that occur under your credentials. You agree
              that:
            </p>
            <BulletList
              items={[
                'Your mobile phone number and/or email address is your primary identifier on the Platform and must be kept up to date at all times.',
                'You will notify KITCHEN SAATHI promptly if your contact details change, via one-time password verification.',
                'KITCHEN SAATHI shall not be liable for any activities or consequences arising from misuse of your Account where you have failed to update your contact details.',
                'You must not share your login credentials (username and password) with any other person — doing so constitutes a breach of these Terms & Conditions.',
                'You must log out from your account at the end of each session and immediately notify KITCHEN SAATHI of any unauthorized use of your account.',
              ]}
            />
          </Section>

          <Section title="3. Consent to Advertisements">
            <p>
              By accessing or using the Platform, you grant express consent for KITCHEN SAATHI to display advertisements, promotions, and sponsored content. These may be placed adjacent to, integrated
              within, or overlaid upon your content, listings, or user interface, as well as throughout the transaction and payment process. The manner, mode, and extent of such advertising are
              subject to change without specific notice.
            </p>
          </Section>

          <Section title="4. Platform for Transaction and Communication">
            <p>The Platform enables Buyers and Sellers to transact. KITCHEN SAATHI is not a party to, nor does it control, any transaction between Platform Users. Specifically:</p>
            <BulletList
              items={[
                'All commercial/contractual terms (price, shipping, payment, delivery, warranties) are offered and agreed to solely between Buyers and Sellers.',
                'Placement of an order by a Buyer is an offer to buy, not acceptance by the Seller. The Seller retains the right to cancel any order at its sole discretion.',
                'KITCHEN SAATHI does not warrant the quality, value, or saleability of any product or service listed on the Platform.',
                'KITCHEN SAATHI is not responsible for non-performance or breach of any contract between Buyers and Sellers.',
                'KITCHEN SAATHI does not, at any point, take possession of or hold title to any product offered by Sellers.',
              ]}
            />
          </Section>

          <Section title="5. Charges and Fees">
            <p>KITCHEN SAATHI may charge a nominal fee for browsing and buying on the Platform. The following fees may apply:</p>
            <Table
              rows={[
                ['Platform Fee', 'Fee levied to sustain the efficient operations and continuous improvement of the Platform for a hassle-free experience.'],
                ['Convenience Fee', 'Charged for certain services (e.g., travel bookings) in addition to the cost of booking as charged by the service provider.'],
                ['Cash on Delivery Fee', 'Charged to cover the handling and logistics required for COD orders.'],
                ['Offer Handling Fee', 'Charged to enable processing of bank offers on your order. Non-refundable (except on Minutes and grocery orders).'],
                ['Payment Handling Fee', 'Charged for processing your chosen payment instrument securely. Refundable upon order cancellation or return (exceptions apply).'],
              ]}
            />
            <p style={{ marginTop: 12 }}>Changes to the Fee Policy shall be posted on the Platform and shall become effective immediately upon posting.</p>
          </Section>

          <Section title="6. Use of the Platform">
            <p>You agree not to host, display, upload, modify, publish, transmit, or share any information that:</p>
            <BulletList
              items={[
                'Belongs to another person and to which you have no right.',
                'Is harmful, harassing, defamatory, obscene, pornographic, or otherwise unlawful.',
                'Is misleading or patently offensive to the online community.',
                'Promotes illegal activities or violates any applicable law.',
                'Infringes upon any third-party intellectual property, privacy, or publicity rights.',
                'Contains viruses, malware, or any code designed to interrupt or damage systems.',
                'Threatens the unity, integrity, defence, or sovereignty of India.',
              ]}
            />
            <p>
              You further agree not to use any automated tools (bots, scrapers, spiders) to access or copy content from the Platform, or attempt to gain unauthorized access to any systems or data.
            </p>
          </Section>

          <Section title="7. Contents Posted on Platform">
            <p>
              All text, graphics, photographs, trademarks, logos, and artwork ("Content") that is user-generated remains the responsibility of the user who posted it. KITCHEN SAATHI acts as an
              intermediary and does not exercise editorial control over third-party user-generated content.
            </p>
            <p>
              You grant KITCHEN SAATHI a non-exclusive, worldwide, perpetual, royalty-free right to use Content you post, consistent with our Privacy Policy, for any purpose including promotional and
              advertising use in any media now known or hereafter devised.
            </p>
          </Section>

          <Section title="8. Disclaimer of Warranties and Liability">
            <p>
              The Platform, all materials, products, and services are provided on an "as is" and "as available" basis without any representation or warranties, express or implied. KITCHEN SAATHI does
              not warrant that:
            </p>
            <BulletList
              items={[
                'The Platform will be constantly available or available at all.',
                'Information on the Platform is complete, true, accurate, or non-misleading.',
                'The Platform is free from viruses or other harmful components.',
              ]}
            />
            <Callout type="warning">
              IN NO EVENT SHALL KITCHEN SAATHI BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, OR CONSEQUENTIAL DAMAGES OF ANY KIND IN CONNECTION WITH THESE Terms & Conditions, EVEN IF INFORMED IN
              ADVANCE OF THE POSSIBILITY OF SUCH DAMAGES.
            </Callout>
          </Section>

          <Section title="9. Indemnity">
            <p>
              You shall indemnify and hold harmless KITCHEN SAATHI, its owners, licensees, affiliates, subsidiaries, group companies, and their respective officers, directors, agents, and employees
              from any claim or demand — including reasonable attorneys' fees — made by any third party due to or arising out of:
            </p>
            <BulletList
              items={[
                'Your breach of these Terms & Conditions, Privacy Policy, or other policies.',
                'Your violation of any law, rules, or regulations.',
                'Your infringement of any third-party intellectual property or other rights.',
              ]}
            />
          </Section>

          <Section title="10. Shipping & Delivery Policy">
            <p>
              KITCHEN SAATHI strives to process and dispatch all orders in a timely and efficient manner. Orders are generally processed within 48-72 hours after successful order confirmation and
              payment verification.
            </p>

            <BulletList
              items={[
                'Estimated delivery timelines may vary depending on the delivery location, product availability, and logistics operations.',
                'Standard delivery timelines generally range between 3-7 business days.',
                'Delivery delays may occur due to unforeseen circumstances including weather conditions, transportation disruptions, public holidays, natural disasters, or government restrictions.',
                'Customers may receive updates related to order confirmation, dispatch, and delivery through SMS, email, phone call, or WhatsApp notifications where applicable.',
                'KITCHEN SAATHI shall not be held liable for delays caused by third-party courier or logistics partners.',
                'Risk of loss and title for products pass to the customer upon successful delivery of the order.',
              ]}
            />
          </Section>

          <Section title="11. Cancellation Policy">
            <p>
              Customers may request cancellation of an order before the order has been processed or dispatched from our warehouse. Once an order has been shipped or is out for delivery, cancellation
              requests may not be accepted.
            </p>

            <BulletList
              items={[
                'Cancellation requests can be initiated by contacting our customer support team through the contact details provided on the Platform.',
                'KITCHEN SAATHI reserves the right to cancel any order at its sole discretion due to reasons including product unavailability, pricing errors, suspicious or fraudulent transactions, or operational limitations.',
                'If an order is cancelled after payment has been successfully processed, the applicable refund amount shall be initiated to the original payment method used during the transaction.',
                'Orders placed during promotional campaigns, special sales, or limited-time offers may be subject to separate cancellation conditions.',
                'KITCHEN SAATHI reserves the right to refuse cancellation requests in cases involving misuse of the Platform or violation of these Terms & Conditions.',
              ]}
            />
          </Section>

          <Section title="12. Refund Policy">
            <p>
              Refunds shall be processed only in cases where KITCHEN SAATHI determines that the refund request is genuine and valid in accordance with these Terms & Conditions and applicable policies.
            </p>

            <BulletList
              items={[
                'Approved refunds are generally processed within 5-7 business days from the date of approval.',
                'Refund amounts shall be credited to the original payment method used during the transaction unless otherwise required by applicable law.',
                'Shipping charges, platform fees, convenience fees, payment handling charges, and other applicable charges may be non-refundable unless specifically stated otherwise.',
                'Refund timelines may vary depending upon the customer’s bank, payment gateway, or financial institution.',
                'KITCHEN SAATHI reserves the right to reject refund requests in cases involving fraudulent activity, abuse of refund policies, or violations of these Terms & Conditions.',
                'In cases where a refund cannot be processed to the original payment method, KITCHEN SAATHI may contact the customer for alternative refund arrangements subject to verification.',
              ]}
            />
          </Section>

          <Section title="13. Applicable Law and Jurisdiction">
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to the use of the Platform shall be subject to
              the exclusive jurisdiction of the courts located in Haryana, India.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: '#212121', marginBottom: 12, marginTop: 0, borderLeft: '3px solid #ff6161', paddingLeft: 10 }}>{title}</h2>
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

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, fontSize: 13 }}>
      <thead>
        <tr style={{ background: '#fff8e1' }}>
          <th style={{ border: '1px solid #f0f0f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#212121', width: '30%' }}>Fee Type</th>
          <th style={{ border: '1px solid #f0f0f0', padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: '#212121' }}>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([type, desc], i) => (
          <tr key={i} style={{ background: i % 2 === 0 ? '#fafafa' : '#fff' }}>
            <td style={{ border: '1px solid #f0f0f0', padding: '10px 14px', fontWeight: 600, color: '#e87000' }}>{type}</td>
            <td style={{ border: '1px solid #f0f0f0', padding: '10px 14px', color: '#4a4a4a' }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Callout({ children, type }: { children: React.ReactNode; type: 'warning' | 'info' }) {
  const bg = type === 'warning' ? '#fff8e1' : '#e3f2fd';
  const border = type === 'warning' ? '#ffc107' : '#e87000';
  return <div style={{ background: bg, borderLeft: `4px solid ${border}`, padding: '14px 16px', borderRadius: 2, margin: '14px 0', fontSize: 13, color: '#4a4a4a', lineHeight: 1.7 }}>{children}</div>;
}
