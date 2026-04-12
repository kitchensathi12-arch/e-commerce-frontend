export default function CancellationReturnPolicy() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f1f3f6", minHeight: "100vh", padding: "24px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "#878787", marginBottom: 12 }}>
          <span style={{ color: "#2874f0", cursor: "pointer" }}>Home</span>
          <span style={{ margin: "0 6px" }}>›</span>
          <span>Cancellation & Return Policy</span>
        </div>

        <div style={{ background: "#fff", borderRadius: 2, padding: "32px 36px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>

          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#212121", marginBottom: 4, marginTop: 0 }}>
            Order Cancellation and Return Policy
          </h1>
          <div style={{ fontSize: 13, color: "#878787", borderBottom: "1px solid #f0f0f0", paddingBottom: 20, marginBottom: 28 }}>
            Last Updated: July 2025
          </div>

          {/* ── CANCELLATION ── */}
          <Section title="Cancellation Policy">
            <p>The customer can choose to cancel an order any time before it is dispatched. The order cannot be cancelled once it is out for delivery. However, the customer may choose to reject it at the doorstep.</p>
            <p>The time window for cancellation varies based on different categories, and the order cannot be cancelled once the specified time has passed. In some cases, a cancellation fee will be charged post the specified time. The details mentioned on the product page or order confirmation page will be considered final.</p>
            <p>In case of any cancellation from the Seller due to unforeseen circumstances, a full refund will be initiated for prepaid orders.</p>
            <p>KitchenSathi reserves the right to accept the cancellation of any order, and also reserves the right to waive off or modify the time window or cancellation fee from time to time.</p>

            <Callout type="info">
              <strong>Hyperlocal / MINUTES Delivery:</strong> Orders placed under the MINUTES delivery option are non-cancellable and non-refundable via self-serve, owing to quick delivery times, except when cancellation/refund is requested via a Customer Support Agent under these specific circumstances:
              <ul style={{ margin: "8px 0 0", paddingLeft: 20, lineHeight: 1.8 }}>
                <li>The order could not be delivered within the estimated time displayed while placing the order.</li>
                <li>The order has not been picked up by the Delivery Partner.</li>
                <li>The Seller has not accepted or has cancelled the order for reasons not attributable to you.</li>
                <li>Easy Doorstep Cancellation or any other reason the Platform may update from time to time.</li>
              </ul>
            </Callout>
          </Section>

          {/* ── RETURNS ── */}
          <Section title="Returns Policy">
            <p>Returns is a scheme provided by respective Sellers directly under this policy, in terms of which the option of exchange, replacement, and/or refund is offered by the respective Sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided on the product page shall prevail over the general returns policy.</p>

            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#212121", margin: "20px 0 12px" }}>Part 1 – Category, Return Window and Actions Possible</h3>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#2874f0" }}>
                    <th style={thStyle}>Category</th>
                    <th style={thStyle}>Return Window</th>
                    <th style={thStyle}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returnRows.map(([cat, win, act], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={tdStyle}>{cat}</td>
                      <td style={{ ...tdStyle, whiteSpace: "nowrap", fontWeight: 600, color: "#2874f0" }}>{win}</td>
                      <td style={tdStyle}>{act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* ── PART 2 ── */}
          <Section title="Part 2 – Returns Pick-Up and Processing">
            <p>In case of returns where you would like item(s) to be picked up from a different address, the address can only be changed if pick-up service is available at the new address. During pick-up, your product will be checked for the following conditions:</p>

            <div style={{ overflowX: "auto", marginTop: 8 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#fff8e1" }}>
                    <th style={{ ...thStyleLight, width: "22%" }}>Condition</th>
                    <th style={thStyleLight}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupConditions.map(([cond, detail], i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={{ ...tdStyle, fontWeight: 600, color: "#212121" }}>{cond}</td>
                      <td style={tdStyle}>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout type="warning">
              The field executive will refuse to accept the return if any of the above conditions are not met. For any products for which a refund is to be given, the refund will be processed once the returned product has been received by the Seller.
            </Callout>
          </Section>

          {/* ── PART 3 ── */}
          <Section title="Part 3 – General Rules for a Successful Return">
            <BulletList items={[
              "In certain cases where the Seller is unable to process a replacement for any reason, a refund will be given.",
              "In cases where a product accessory is found missing/damaged/defective, the Seller may either process a replacement of the particular accessory or issue an eGV for an equivalent amount.",
              "During open box deliveries, if you received a different or damaged product, you will be given a refund on the spot (cash-on-delivery orders get spot refunds). Once you have accepted an open box delivery, no return request will be processed except for manufacturing defects.",
              "For products where installation is provided by KitchenSathi's service partners, do not open the product packaging yourself.",
              "For Furniture, any product-related issues will be checked by authorised service personnel and resolved by replacing the faulty part. Full replacement is provided only where replacement of the part will not resolve the issue.",
              "KitchenSathi holds the right to restrict the number of returns per order unit after evaluating the product/order defect.",
            ]} />
          </Section>

          {/* ── REFUND ── */}
          <Section title="Refund Policy">
            <BulletList items={[
              "Except for Cash on Delivery transactions, refund shall be made at the same issuing bank from where the Transaction Price was received, or through any other method available on the Platform as chosen by you.",
              "For Cash on Delivery transactions, refunds will be made via electronic payment transfers.",
              "Refund shall be made in Indian Rupees only and shall be equivalent to the Transaction Price received in Indian Rupees.",
              "For electronics payments, refund shall be made through NEFT / RTGS or any other online banking / electronic funds transfer system approved by the Reserve Bank of India (RBI).",
              "Refunds may be supported for select banks. Where a bank is not supported, you will be required to share alternate bank account details.",
              "In case of refunds, you will be provided an option to credit back to source, bank account/UPI, or receive a gift voucher.",
            ]} />
            <Callout type="info">
              <strong>Refund Timeline:</strong> Refund will be processed within <strong>5–7 business days</strong> from the date the refund is initiated. You can track the status of your refund on the Order Details page.
            </Callout>
          </Section>

          {/* ── BUYER PROTECTION ── */}
          <Section title="Buyer Protection Program">
            <p>The Buyer Protection Program covers Buyers who are unable to successfully resolve their dispute with the Seller or are not satisfied with the resolution provided by the Seller.</p>
            <BulletList items={[
              "Only Buyers who have purchased the product on KitchenSathi are eligible.",
              "Buyers can file a dispute within 45 days from the date of delivery.",
              "Buyers can make a maximum of 5 claims per year. Coverage amount is limited to ₹50,000.",
              "Fraudulent charges and claims are not covered.",
              "Blacklisted and blocked Buyers are not covered.",
              "Claims of 'Buyer remorse' (bought by mistake or change of mind) will not be entertained.",
              "Decisions made by KitchenSathi under the Buyer Protection Program shall be final and binding.",
            ]} />
          </Section>

          {/* ── CONTACT ── */}
          <Section title="Contact Us">
            <p>For order-related queries, visit our Help Centre:</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <LinkButton href="https://www.kitchensathi.com/helpcentre">Help Centre</LinkButton>
              <LinkButton href="mailto:support@kitchensathi.com">Email Support</LinkButton>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0", padding: "10px 14px", textAlign: "left",
  fontWeight: 600, color: "#fff", fontSize: 13,
};
const thStyleLight: React.CSSProperties = {
  border: "1px solid #f0f0f0", padding: "10px 14px", textAlign: "left",
  fontWeight: 600, color: "#212121", fontSize: 13,
};
const tdStyle: React.CSSProperties = {
  border: "1px solid #f0f0f0", padding: "10px 14px", color: "#4a4a4a",
  fontSize: 13, lineHeight: 1.6,
};

const returnRows: [string, string, string][] = [
  ["Furniture, Home (Pet Supplies & Rest of Home)", "10 days", "Refund or Replacement"],
  ["Lifestyle – Clothing, Footwear, Watches, Bags, Jewellery, Winterwear", "10 days", "Refund, Replacement or Exchange"],
  ["Medicine (Allopathy & Homeopathy)", "2 days", "Refund"],
  ["Home Improvement Tools, Home Décor, Furnishing, Household Items", "7 days", "Refund or Replacement"],
  ["Books, Sports Equipment, Exercise & Fitness, Auto Accessories", "7 days", "Replacement only"],
  ["Toys, Stationery, Musical Instruments", "7 days", "Replacement only"],
  ["All Mobiles (select brands), Electronics, Small Home Appliances", "7 days", "Replacement only"],
  ["Mobiles – Apple, Google, Samsung, Realme, Vivo, POCO, Redmi, MI, etc.", "7 days", "Service Center Replacement/Repair only"],
  ["Furniture (large), Large Appliances (select brands), Chimney, Water Purifier, Fan, Geyser", "10 days", "Replacement only"],
  ["Grocery – Dairy, Bakery, Fruits & Vegetables", "2 days", "Refund only"],
  ["Grocery – Pulses, Atta, Edible Oils & remaining grocery", "7 days", "Refund only"],
  ["No Questions Asked category", "10 days", "Refund or Replacement"],
  ["Refurbished Products", "7 days", "Replacement only"],
];

const pickupConditions: [string, string][] = [
  ["Correct Product", "IMEI / name / image / brand / serial number / article number / barcode should match and MRP tag should be undetached and clearly visible."],
  ["Complete Product", "All in-the-box accessories (remote control, starter kits, instruction manuals, chargers, headphones, etc.), freebies and combos (if any) should be present."],
  ["Unused Product", "The product should be unused, unwashed, unsoiled, without stains, and with non-tampered quality check seals/return tags/warranty seals. Mobile/Laptop/Tablet must be factory reset; iCloud lock disabled for Apple devices."],
  ["Undamaged Product", "The product (including SIM trays, charging port, headphone port, back-panel etc.) should be undamaged and without any scratches, dents, tears, or holes."],
  ["Undamaged Packaging", "The product's original packaging/box should be undamaged."],
];

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
  const bg = type === "warning" ? "#fff8e1" : "#e8f5e9";
  const border = type === "warning" ? "#ffc107" : "#4caf50";
  return (
    <div style={{ background: bg, borderLeft: `4px solid ${border}`, padding: "14px 16px", borderRadius: 2, margin: "14px 0", fontSize: 13, color: "#4a4a4a", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{
      display: "inline-block", padding: "10px 20px", background: "#2874f0",
      color: "#fff", borderRadius: 2, fontSize: 13, fontWeight: 600,
      textDecoration: "none", letterSpacing: 0.3,
    }}>
      {children}
    </a>
  );
}