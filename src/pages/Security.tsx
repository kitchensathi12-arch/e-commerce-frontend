export default function SafeSecureShopping() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f1f3f6", minHeight: "100vh", padding: "24px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#878787", marginBottom: 12 }}>
          <span style={{ color: "#2874f0", cursor: "pointer" }}>Home</span>
          <span style={{ margin: "0 6px" }}>›</span>
          <span>Safe &amp; Secure Shopping</span>
        </div>

        <div style={{ background: "#fff", borderRadius: 2, padding: "32px 36px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>

          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#212121", marginBottom: 4, marginTop: 0 }}>
            Safe &amp; Secure Shopping
          </h1>
          <div style={{ fontSize: 13, color: "#878787", borderBottom: "1px solid #f0f0f0", paddingBottom: 20, marginBottom: 28 }}>
            Last Updated: July 2025
          </div>

          {/* Trust Banner */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            {[
              { icon: "🔒", label: "SSL Encrypted", sub: "256-bit secure connection" },
              { icon: "💳", label: "Secure Payments", sub: "PCI-DSS compliant gateway" },
              { icon: "🛡️", label: "Buyer Protection", sub: "100% purchase protection" },
              { icon: "↩️", label: "Easy Returns", sub: "Hassle-free return policy" },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{
                flex: "1 1 160px", background: "#f7f9fc", border: "1px solid #e0e0e0",
                borderRadius: 4, padding: "16px 14px", textAlign: "center",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#212121" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#878787", marginTop: 3 }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* FAQ-style sections */}
          <Section title="Is making an online payment secure on KitchenSathi?">
            <p>Yes, making online payments is completely secure on KitchenSathi. All transactions are processed over a 256-bit SSL encrypted connection, ensuring your payment details are fully protected. We are PCI-DSS compliant, which means we meet the highest industry standards for handling cardholder information.</p>
            <p>We recommend always shopping on the official KitchenSathi website or mobile app and never sharing your payment OTP with anyone, including customer support representatives.</p>
          </Section>

          <Section title="Does KitchenSathi store my credit/debit card information?">
            <p>No. KitchenSathi only stores the <strong>last 4 digits</strong> of your card number for the purpose of card identification. Your full card number, CVV, and expiry date are never stored on our servers. All payment data is handled directly by our PCI-DSS certified payment gateway partners.</p>
          </Section>

          <Section title="What credit/debit cards are accepted on KitchenSathi?">
            <p>We accept a wide range of credit and debit cards issued by banks in India:</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0 8px" }}>
              {["VISA", "MasterCard", "Maestro", "RuPay", "American Express", "Diner's Club", "Discover"].map((card) => (
                <span key={card} style={{
                  padding: "6px 14px", border: "1.5px solid #e0e0e0", borderRadius: 4,
                  fontSize: 13, fontWeight: 600, color: "#212121", background: "#fafafa",
                }}>
                  {card}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Do you accept payment made by credit/debit cards issued in other countries?">
            <p>Yes! We accept VISA, MasterCard, Maestro, and American Express credit/debit cards issued by banks in India and in the following countries:</p>
            <div style={{ background: "#f7f9fc", border: "1px solid #e0e0e0", borderRadius: 4, padding: "14px 18px", margin: "12px 0", fontSize: 13, color: "#4a4a4a", lineHeight: 1.9 }}>
              Australia, Austria, Belgium, Canada, Cyprus, Denmark, Finland, France, Germany, Ireland, Italy, Luxembourg, the Netherlands, New Zealand, Norway, Portugal, Singapore, Spain, Sweden, the United Kingdom, and the United States.
            </div>
            <Callout type="warning">
              Please note that we do <strong>not</strong> accept internationally issued credit/debit cards for eGV (e-Gift Voucher) payments or top-ups.
            </Callout>
          </Section>

          <Section title="What other payment options are available on KitchenSathi?">
            <p>Apart from credit and debit cards, we offer the following payment methods:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, margin: "12px 0" }}>
              {[
                { method: "Internet Banking", detail: "44+ banks supported" },
                { method: "Cash on Delivery", detail: "Pay when you receive" },
                { method: "EMI", detail: "Easy monthly instalments" },
                { method: "E-Gift Vouchers", detail: "Digital vouchers accepted" },
                { method: "KitchenSathi Pay Later", detail: "Buy now, pay later" },
                { method: "UPI", detail: "GPay, PhonePe & more" },
                { method: "Wallet", detail: "Paytm, Amazon Pay & more" },
                { method: "Paytm Postpaid", detail: "Postpaid credit option" },
              ].map(({ method, detail }) => (
                <div key={method} style={{
                  border: "1px solid #e0e0e0", borderRadius: 4, padding: "12px 14px",
                  background: "#fafafa",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#212121" }}>{method}</div>
                  <div style={{ fontSize: 12, color: "#878787", marginTop: 3 }}>{detail}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="How does KitchenSathi protect my personal information?">
            <p>We maintain reasonable physical, electronic, and procedural safeguards to protect your information:</p>
            <BulletList items={[
              "All sensitive data is transmitted over secure HTTPS/SSL connections.",
              "We adhere to strict security guidelines to protect your information against unauthorized access.",
              "Payment instruments are processed using PCI-DSS certified payment gateways.",
              "We do not share your financial information with third parties for their own marketing purposes without your explicit consent.",
              "We use two-factor authentication (OTP) for account access and transactions.",
            ]} />
          </Section>

          <Section title="What should I do if I suspect unauthorized activity on my account?">
            <BulletList items={[
              "Immediately change your KitchenSathi account password.",
              "Contact our Customer Support team via the Help Centre.",
              "If a fraudulent transaction has been made, also contact your bank or card issuer immediately.",
              "Never share your OTP, password, or card details with anyone claiming to be from KitchenSathi support — we will never ask for these.",
            ]} />
            <Callout type="info">
              <strong>Tip:</strong> KitchenSathi will <strong>never</strong> ask you to share your OTP, full card number, CVV, or net banking credentials over a call or email. Any such request is a fraud attempt — please report it immediately.
            </Callout>
          </Section>

          <Section title="What is the Buyer Protection Program?">
            <p>KitchenSathi's Buyer Protection Program assists Buyers who face issues with orders and are unable to resolve them with the Seller. Under this program:</p>
            <BulletList items={[
              "Coverage is available for up to ₹50,000 per claim.",
              "Buyers can make a maximum of 5 claims per year.",
              "Disputes must be filed within 45 days from the date of delivery.",
              "Once verified, KitchenSathi will actively work to reach a resolution.",
            ]} />
          </Section>

          <Section title="Privacy Policy">
            <p>KitchenSathi respects your privacy and is committed to protecting it. For complete details on how we collect, use, and protect your personal information, please refer to our{" "}
              <a href="/privacy-policy" style={{ color: "#2874f0", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a>.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>Couldn't find the information you need? We're here to help.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <LinkButton href="https://www.kitchensathi.com/helpcentre">Visit Help Centre</LinkButton>
              <LinkButton href="tel:044-45614700" secondary>044-45614700</LinkButton>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color: "#212121", marginBottom: 12, marginTop: 0, borderLeft: "3px solid #ff6161", paddingLeft: 10 }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, color: "#4a4a4a", lineHeight: 1.9 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: 20, margin: "8px 0 12px" }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 8, lineHeight: 1.7 }}>{item}</li>
      ))}
    </ul>
  );
}

function Callout({ children, type }: { children: React.ReactNode; type: "warning" | "info" }) {
  const bg = type === "warning" ? "#fff8e1" : "#e3f2fd";
  const border = type === "warning" ? "#ffc107" : "#2196f3";
  return (
    <div style={{ background: bg, borderLeft: `4px solid ${border}`, padding: "14px 16px", borderRadius: 2, margin: "14px 0", fontSize: 13, color: "#4a4a4a", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function LinkButton({ href, children, secondary }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a href={href} style={{
      display: "inline-block", padding: "10px 20px",
      background: secondary ? "#fff" : "#2874f0",
      color: secondary ? "#2874f0" : "#fff",
      border: secondary ? "1.5px solid #2874f0" : "none",
      borderRadius: 2, fontSize: 13, fontWeight: 600,
      textDecoration: "none", letterSpacing: 0.3,
    }}>
      {children}
    </a>
  );
}