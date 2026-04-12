import React, { useState } from 'react';

// ── Icons ──────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 5.61 5.61l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = 'profile' | 'orders';

interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
}

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

// ── Mock Data ──────────────────────────────────────────────────────────────
const mockOrders: Order[] = [
  { id: '#ORD-8821', date: '28 Mar 2025', items: 'Kitchen Mixer Pro, Blender Set', total: '₹4,299', status: 'Delivered' },
  { id: '#ORD-7654', date: '15 Mar 2025', items: 'Non-stick Pan 3pc Set', total: '₹1,850', status: 'Shipped' },
  { id: '#ORD-6540', date: '2 Mar 2025', items: 'Pressure Cooker 5L', total: '₹2,100', status: 'Processing' },
  { id: '#ORD-5312', date: '10 Feb 2025', items: 'Knife Set Deluxe, Cutting Board', total: '₹999', status: 'Delivered' },
  { id: '#ORD-4201', date: '22 Jan 2025', items: 'Electric Kettle 1.5L', total: '₹750', status: 'Cancelled' },
];

const statusColors: Record<Order['status'], React.CSSProperties> = {
  Delivered: { background: '#e8f5e9', color: '#2e7d32' },
  Shipped: { background: '#e3f2fd', color: '#1565c0' },
  Processing: { background: '#fff8e1', color: '#f57f17' },
  Cancelled: { background: '#fce4ec', color: '#b71c1c' },
};

// ── Strength helper ────────────────────────────────────────────────────────
function getStrength(val: string) {
  if (!val) return { score: 0, label: '', color: '' };
  let s = 0;
  if (val.length >= 8) s++;
  if (/[A-Z]/.test(val)) s++;
  if (/[0-9]/.test(val)) s++;
  if (/[^A-Za-z0-9]/.test(val)) s++;
  const levels = [
    { label: '', color: '' },
    { label: 'Weak', color: '#e74c3c' },
    { label: 'Fair', color: '#e67e22' },
    { label: 'Good', color: '#f1c40f' },
    { label: 'Strong', color: '#27ae60' },
  ];
  return { score: s, ...levels[s] };
}

// ── Shared input styles ────────────────────────────────────────────────────
const inp: React.CSSProperties = {
  width: '100%',
  height: 36,
  padding: '0 12px',
  border: '1px solid #e0d9d1',
  borderRadius: 8,
  fontSize: 13.5,
  fontFamily: 'inherit',
  color: '#2b2420',
  background: '#faf8f5',
  outline: 'none',
};
const inpFocus: React.CSSProperties = {
  borderColor: '#e74c3c',
  boxShadow: '0 0 0 3px rgba(231,76,60,.10)',
  background: '#fff',
};

// ── PwField component ──────────────────────────────────────────────────────
const PwField: React.FC<{
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
}> = ({ label, placeholder, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div style={{ fontSize: 11.5, fontWeight: 500, color: '#6b6360', marginBottom: 5 }}>{label}</div>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={{ ...inp, paddingRight: 38 }}
          onFocus={(e) => Object.assign(e.target.style, { ...inpFocus, paddingRight: '38px' })}
          onBlur={(e) => Object.assign(e.target.style, { ...inp, paddingRight: '38px' })}
        />
        <button
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#b0a89f',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const AccountPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>('profile');
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState('');
  const [newPw, setNewPw] = useState('');

  const [info, setInfo] = useState<UserInfo>({
    firstName: 'Md',
    lastName: 'Rimel',
    email: 'rimel1111@gmail.com',
    phone: '+91 98765 43210',
    address: 'Kingston, 5236, United States',
  });
  const [draft, setDraft] = useState<UserInfo>(info);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSave = () => {
    setInfo(draft);
    setEditing(false);
    setNewPw('');
    showToast('Profile updated successfully');
  };

  const handleCancel = () => {
    setDraft(info);
    setEditing(false);
    setNewPw('');
  };

  const strength = getStrength(newPw);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0eb', padding: '2rem 1rem 3rem', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* ── Hero Card ── */}
        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e2da', overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', marginBottom: '1.25rem' }}>
          {/* Red banner */}
          <div style={{ background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)', padding: '1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', top: -60, right: -40 }} />
            <div style={{ position: 'absolute', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', bottom: -30, left: 60 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.4)',
                  flexShrink: 0,
                }}
              >
                {info.firstName[0]}
                {info.lastName[0]}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>
                  {info.firstName} {info.lastName}
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>{info.email}</div>
              </div>
            </div>
          </div>

          {/* Quick info strip */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #f0ebe4' }}>
            {[
              { icon: <MailIcon />, label: 'Email', value: info.email },
              { icon: <PhoneIcon />, label: 'Phone', value: info.phone },
              { icon: <MapPinIcon />, label: 'Address', value: info.address },
            ].map((item, i) => (
              <div key={item.label} style={{ padding: '1rem 1.5rem', borderRight: i < 2 ? '1px solid #f0ebe4' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9e9085', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  {item.icon} {item.label}
                </div>
                <div style={{ fontSize: 13.5, color: '#2b2420', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 0, padding: '0 1.5rem' }}>
            {(['profile', 'orders'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setEditing(false);
                }}
                style={{
                  padding: '0.85rem 1.25rem',
                  fontSize: 13.5,
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? '#e74c3c' : '#9e9085',
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid #e74c3c' : '2px solid transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'color 0.15s',
                }}
              >
                {t === 'profile' ? <UserIcon /> : <PackageIcon />}
                {t === 'profile' ? 'My Profile' : 'My Orders'}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB: Profile ── */}
        {tab === 'profile' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e2da', overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '1px solid #f0ebe4' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2b2420' }}>Personal Information</div>
              {!editing && (
                <button
                  onClick={() => {
                    setDraft(info);
                    setEditing(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    height: 32,
                    padding: '0 14px',
                    borderRadius: 8,
                    border: '1px solid #ddd6cc',
                    background: 'transparent',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    color: '#6b6360',
                    cursor: 'pointer',
                  }}
                >
                  <EditIcon /> Edit Profile
                </button>
              )}
            </div>

            <div style={{ padding: '1.5rem 2rem' }}>
              {!editing ? (
                /* View Mode */
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                    {[
                      { label: 'First name', value: info.firstName },
                      { label: 'Last name', value: info.lastName },
                      { label: 'Email address', value: info.email },
                      { label: 'Phone', value: info.phone },
                      { label: 'Address', value: info.address },
                    ].map((f) => (
                      <div key={f.label}>
                        <div style={{ fontSize: 11, fontWeight: 500, color: '#9e9085', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontSize: 14, color: '#2b2420' }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{ padding: '1rem 1.25rem', background: '#faf8f5', borderRadius: 10, border: '1px solid #ede8e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#2b2420' }}>Password</div>
                      <div style={{ fontSize: 12.5, color: '#9e9085', marginTop: 2 }}>Last changed 3 months ago</div>
                    </div>
                    <button
                      onClick={() => {
                        setDraft(info);
                        setEditing(true);
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      Change password <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Mode */
                <div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#9e9085', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.85rem' }}>Personal details</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: '0.85rem' }}>
                    {[
                      { label: 'First name', key: 'firstName' as keyof UserInfo, type: 'text' },
                      { label: 'Last name', key: 'lastName' as keyof UserInfo, type: 'text' },
                      { label: 'Email', key: 'email' as keyof UserInfo, type: 'email' },
                      { label: 'Phone', key: 'phone' as keyof UserInfo, type: 'tel' },
                    ].map((f) => (
                      <div key={f.key}>
                        <div style={{ fontSize: 11.5, fontWeight: 500, color: '#6b6360', marginBottom: 5 }}>{f.label}</div>
                        <input
                          type={f.type}
                          value={draft[f.key]}
                          onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
                          style={inp}
                          onFocus={(e) => Object.assign(e.target.style, inpFocus)}
                          onBlur={(e) => Object.assign(e.target.style, inp)}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: 11.5, fontWeight: 500, color: '#6b6360', marginBottom: 5 }}>Address</div>
                    <input
                      type="text"
                      value={draft.address}
                      onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                      style={inp}
                      onFocus={(e) => Object.assign(e.target.style, inpFocus)}
                      onBlur={(e) => Object.assign(e.target.style, inp)}
                    />
                  </div>

                  <div style={{ fontSize: 11, fontWeight: 500, color: '#9e9085', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.85rem' }}>Change password</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: '1.5rem' }}>
                    <PwField label="Current password" placeholder="Enter current password" />
                    <div>
                      <PwField label="New password" placeholder="Enter new password" value={newPw} onChange={setNewPw} />
                      {newPw.length > 0 && (
                        <>
                          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} style={{ height: 3, flex: 1, borderRadius: 99, background: i <= strength.score ? strength.color : '#ede8e1', transition: 'background 0.3s' }} />
                            ))}
                          </div>
                          <div style={{ fontSize: 11, color: strength.color, marginTop: 3 }}>{strength.label}</div>
                        </>
                      )}
                    </div>
                    <PwField label="Confirm new password" placeholder="Confirm new password" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button
                      onClick={handleCancel}
                      style={{
                        height: 34,
                        padding: '0 16px',
                        borderRadius: 8,
                        border: '1px solid #ddd6cc',
                        background: 'transparent',
                        fontSize: 13.5,
                        fontFamily: 'inherit',
                        color: '#6b6360',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      style={{
                        height: 34,
                        padding: '0 20px',
                        borderRadius: 8,
                        border: 'none',
                        background: 'linear-gradient(135deg,#c0392b,#e74c3c)',
                        fontSize: 13.5,
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      <CheckIcon /> Save changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: Orders ── */}
        {tab === 'orders' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e2da', overflow: 'hidden', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '1.25rem 2rem', borderBottom: '1px solid #f0ebe4' }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2b2420' }}>My Orders</div>
              <div style={{ fontSize: 12.5, color: '#9e9085', marginTop: 2 }}>{mockOrders.length} orders placed</div>
            </div>

            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr auto', gap: 16, padding: '0.6rem 2rem', background: '#faf8f5', borderBottom: '1px solid #f0ebe4' }}>
              {['Order ID', 'Items', 'Total', 'Status', ''].map((h) => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: '#9e9085', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {h}
                </div>
              ))}
            </div>

            {mockOrders.map((order, idx) => (
              <div
                key={order.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr auto',
                  alignItems: 'center',
                  gap: 16,
                  padding: '1rem 2rem',
                  borderBottom: idx < mockOrders.length - 1 ? '1px solid #f5f0eb' : 'none',
                  transition: 'background 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#faf8f5')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#2b2420' }}>{order.id}</div>
                  <div style={{ fontSize: 12, color: '#9e9085', marginTop: 2 }}>{order.date}</div>
                </div>
                <div style={{ fontSize: 13, color: '#6b6360', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{order.items}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#2b2420' }}>{order.total}</div>
                <div>
                  <span style={{ ...statusColors[order.status], fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 99, display: 'inline-block' }}>{order.status}</span>
                </div>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12.5,
                    color: '#e74c3c',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View <ChevronRightIcon />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#2b2420',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: 13.5,
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
            zIndex: 999,
            animation: 'fadeUp 0.2s ease',
          }}
        >
          {toast}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AccountPage;
