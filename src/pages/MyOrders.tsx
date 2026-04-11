import { useState } from "react";
import { Types } from "mongoose";
import { useNavigate } from "react-router-dom";
import type { IOrderDocument, IOrderItem, OrderStatus, PaymentStatus } from "@kitchensathi12-arch/ecommerce-types";

// ─── Mock data typed as IOrderDocument[] ─────────────────────────────────────
// Replace MOCK_ORDERS with your API/Redux state typed as IOrderDocument[]

const MOCK_ORDERS: IOrderDocument[] = [
    {
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        address_id: new Types.ObjectId(),
        paymentMethod: "UPI",
        paymentStatus: "paid" as PaymentStatus,
        orderStatus: "delivered" as OrderStatus,
        itemsPrice: 2297,
        shippingPrice: 0,
        taxPrice: 229.7,
        totalPrice: 2526.7,
        isDelivered: true,
        deliveredAt: new Date("2026-04-08"),
        paidAt: new Date("2026-04-05"),
        createdAt: new Date("2026-04-05"),
        updatedAt: new Date("2026-04-08"),
        items: [
            { product: new Types.ObjectId(), name: "Non-Stick Kadai with Lid", price: 1299, quantity: 1, image: "🍳" },
            { product: new Types.ObjectId(), name: "Stainless Steel Tiffin Box Set", price: 499, quantity: 2, image: "🥘" },
        ],
    } as unknown as IOrderDocument,
    {
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        address_id: new Types.ObjectId(),
        paymentMethod: "Credit Card",
        paymentStatus: "paid" as PaymentStatus,
        orderStatus: "shipped" as OrderStatus,
        itemsPrice: 1850,
        shippingPrice: 0,
        taxPrice: 185,
        totalPrice: 2035,
        isDelivered: false,
        paidAt: new Date("2026-04-02"),
        createdAt: new Date("2026-04-02"),
        updatedAt: new Date("2026-04-04"),
        items: [
            { product: new Types.ObjectId(), name: "Pressure Cooker 5L Aluminium", price: 1850, quantity: 1, image: "⚙️" },
        ],
    } as unknown as IOrderDocument,
    {
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        address_id: new Types.ObjectId(),
        paymentMethod: "Net Banking",
        paymentStatus: "pending" as PaymentStatus,
        orderStatus: "confirmed" as OrderStatus,
        itemsPrice: 1948,
        shippingPrice: 0,
        taxPrice: 194.8,
        totalPrice: 2142.8,
        isDelivered: false,
        createdAt: new Date("2026-03-25"),
        updatedAt: new Date("2026-03-25"),
        items: [
            { product: new Types.ObjectId(), name: "Wooden Spatula Set of 3", price: 349, quantity: 1, image: "🥄" },
            { product: new Types.ObjectId(), name: "Cast Iron Tawa 12 inch", price: 1599, quantity: 1, image: "🍽️" },
        ],
    } as unknown as IOrderDocument,
    {
        _id: new Types.ObjectId(),
        user: new Types.ObjectId(),
        address_id: new Types.ObjectId(),
        paymentMethod: "COD",
        paymentStatus: "failed" as PaymentStatus,
        orderStatus: "cancelled" as OrderStatus,
        itemsPrice: 999,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 999,
        isDelivered: false,
        createdAt: new Date("2026-03-10"),
        updatedAt: new Date("2026-03-11"),
        items: [
            { product: new Types.ObjectId(), name: "Electric Kettle 1.5L SS Body", price: 999, quantity: 1, image: "☕" },
        ],
    } as unknown as IOrderDocument,
];

// ─── Display configs keyed by your exact enum values ─────────────────────────

const STATUS_CONFIG: Record<
    OrderStatus,
    { label: string; color: string; bg: string; dot: string; trackStep: number }
> = {
    pending: { label: "Pending", color: "#92400e", bg: "#fef3c7", dot: "#f59e0b", trackStep: 0 },
    confirmed: { label: "Confirmed", color: "#b45309", bg: "#ffedd5", dot: "#f97316", trackStep: 1 },
    shipped: { label: "Shipped", color: "#1d4ed8", bg: "#dbeafe", dot: "#3b82f6", trackStep: 2 },
    delivered: { label: "Delivered", color: "#15803d", bg: "#dcfce7", dot: "#22c55e", trackStep: 3 },
    cancelled: { label: "Cancelled", color: "#b91c1c", bg: "#fee2e2", dot: "#ef4444", trackStep: -1 },
};

const PAYMENT_CONFIG: Record<PaymentStatus, { label: string; color: string }> = {
    pending: { label: "Pending", color: "#b45309" },
    paid: { label: "Paid", color: "#15803d" },
    failed: { label: "Failed", color: "#b91c1c" },
    refunded: { label: "Refunded", color: "#6d28d9" },
};

const FILTER_OPTIONS: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(date?: Date): string {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
    });
}

function shortId(doc: IOrderDocument): string {
    return `KS-${String(doc._id).slice(-8).toUpperCase()}`;
}

function fmtINR(n: number): string {
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── Tracking bar ─────────────────────────────────────────────────────────────

function TrackingBar({ orderStatus }: { orderStatus: OrderStatus }) {
    if (orderStatus === "cancelled") return null;

    const steps: { label: string }[] = [
        { label: "Ordered" },
        { label: "Confirmed" },
        { label: "Shipped" },
        { label: "Delivered" },
    ];
    const current = STATUS_CONFIG[orderStatus].trackStep;

    return (
        <div style={{ display: "flex", alignItems: "center", marginTop: 12 }}>
            {steps.map(({ label }, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div
                            style={{
                                width: 22, height: 22, borderRadius: "50%",
                                background: i <= current ? "#1a1a1a" : "#d1d5db",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 11, color: "#fff", fontWeight: 700,
                                boxShadow: i === current ? "0 0 0 3px rgba(26,26,26,0.15)" : "none",
                                transition: "background 0.3s",
                            }}
                        >
                            {i < current ? "✓" : i + 1}
                        </div>
                        <span style={{
                            fontSize: 10, whiteSpace: "nowrap",
                            color: i <= current ? "#1a1a1a" : "#9ca3af",
                            fontWeight: i === current ? 700 : 400,
                        }}>
                            {label}
                        </span>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{
                            flex: 1, height: 2, margin: "0 4px", marginBottom: 16, borderRadius: 2,
                            background: i < current ? "#1a1a1a" : "#e5e7eb",
                            transition: "background 0.3s",
                        }} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ─── Single order item row ────────────────────────────────────────────────────

function OrderItemRow({ item }: { item: IOrderItem }) {
    const isEmoji = item.image && item.image.length <= 4 && !item.image.startsWith("http");
    return (
        <div style={{
            display: "flex", gap: 14, alignItems: "center",
            padding: "12px 14px", background: "#faf8f5",
            borderRadius: 10, border: "1px solid #f0ece5",
        }}>
            <div style={{
                width: 56, height: 56, borderRadius: 8, background: "#f5e6d3",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isEmoji ? 26 : 12, flexShrink: 0, overflow: "hidden",
            }}>
                {item.image ? (
                    isEmoji
                        ? item.image
                        : <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
                ) : "📦"}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>Qty: {item.quantity}</div>
            </div>
            <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e07b54" }}>
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>
                    ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                </div>
            </div>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Orders() {
    const [filter, setFilter] = useState<OrderStatus | "all">("all");
    const [expanded, setExpanded] = useState<string | null>(String(MOCK_ORDERS[0]._id));
    const navigate = useNavigate();

    // Swap MOCK_ORDERS with your real IOrderDocument[] from API / Redux
    const orders: IOrderDocument[] = MOCK_ORDERS;

    const filtered = filter === "all"
        ? orders
        : orders.filter((o) => o.orderStatus === filter);

    return (
        <div style={{ minHeight: "100vh", background: "#f3ede4", fontFamily: "'Georgia','Times New Roman',serif" }}>
            {/* Page header */}
            <div style={{ background: "#1a1a1a", color: "#fff", padding: "22px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22 }}>📦</span>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>My Orders</h1>
                </div>
                <div style={{ background: "#e07b54", color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: 13, fontWeight: 700 }}>
                    {orders.length} Orders
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

                {/* Filter tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
                    {FILTER_OPTIONS.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setFilter(opt.value)}
                            style={{
                                padding: "7px 18px", borderRadius: 24, fontFamily: "inherit",
                                border: filter === opt.value ? "2px solid #1a1a1a" : "2px solid #d1d5db",
                                background: filter === opt.value ? "#1a1a1a" : "#fff",
                                color: filter === opt.value ? "#fff" : "#374151",
                                fontWeight: filter === opt.value ? 700 : 400,
                                fontSize: 13, cursor: "pointer", transition: "all 0.2s",
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af", fontSize: 16 }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                        No orders found.
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {filtered.map((order) => {
                            const docId = String(order._id);
                            const sc = STATUS_CONFIG[order.orderStatus];
                            const pc = PAYMENT_CONFIG[order.paymentStatus];
                            const isOpen = expanded === docId;

                            return (
                                <div
                                    key={docId}
                                    style={{
                                        background: "#fff", borderRadius: 14,
                                        boxShadow: "0 1px 6px rgba(0,0,0,0.07)", overflow: "hidden",
                                        border: isOpen ? "2px solid #1a1a1a" : "2px solid transparent",
                                        transition: "border 0.2s",
                                    }}
                                >
                                    {/* Collapsed header row */}
                                    <div
                                        onClick={() => setExpanded(isOpen ? null : docId)}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            padding: "16px 22px", cursor: "pointer",
                                            background: isOpen ? "#f9f9f9" : "#fff",
                                            borderBottom: isOpen ? "1px solid #f0f0f0" : "none",
                                            transition: "background 0.2s",
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>

                                            <div>
                                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Order ID</div>
                                                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a", fontFamily: "monospace" }}>{shortId(order)}</div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Placed On</div>
                                                <div style={{ fontWeight: 500, fontSize: 13, color: "#374151" }}>{fmtDate(order.createdAt)}</div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Items</div>
                                                <div style={{ fontWeight: 500, fontSize: 13, color: "#374151" }}>
                                                    {order.items.length} item{order.items.length > 1 ? "s" : ""}
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Payment</div>
                                                <div style={{ fontWeight: 600, fontSize: 13, color: pc.color }}>{pc.label}</div>
                                            </div>

                                            <div>
                                                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.8 }}>Total</div>
                                                <div style={{ fontWeight: 700, fontSize: 14, color: "#e07b54" }}>₹{fmtINR(order.totalPrice)}</div>
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <span style={{
                                                display: "inline-flex", alignItems: "center", gap: 6,
                                                padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                                                color: sc.color, background: sc.bg, letterSpacing: 0.2,
                                            }}>
                                                <span style={{ width: 7, height: 7, borderRadius: "50%", background: sc.dot, display: "inline-block" }} />
                                                {sc.label}
                                            </span>
                                            <span style={{
                                                fontSize: 18, color: "#9ca3af", userSelect: "none",
                                                transform: isOpen ? "rotate(180deg)" : "none",
                                                transition: "transform 0.2s", display: "inline-block",
                                            }}>▾</span>
                                        </div>
                                    </div>

                                    {/* Expanded details */}
                                    {isOpen && (
                                        <div style={{ padding: "20px 22px" }}>
                                            <TrackingBar orderStatus={order.orderStatus} />

                                            <div style={{ display: "flex", gap: 24, marginTop: 20, flexWrap: "wrap" }}>

                                                {/* Items list – uses IOrderItem */}
                                                <div style={{ flex: 2, minWidth: 280 }}>
                                                    <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af", marginBottom: 12 }}>
                                                        Items Ordered
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                                        {order.items.map((item: IOrderItem, idx: number) => (
                                                            <OrderItemRow key={idx} item={item} />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right column */}
                                                <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 16 }}>

                                                    {/* Dark summary panel – uses itemsPrice / shippingPrice / taxPrice / totalPrice */}
                                                    <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "16px 18px", color: "#fff" }}>
                                                        <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af", marginBottom: 12 }}>
                                                            Order Summary
                                                        </div>
                                                        {[
                                                            { label: "Items Total", value: `₹${order.itemsPrice.toLocaleString("en-IN")}`, accent: false },
                                                            { label: "Shipping", value: order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`, accent: true },
                                                            { label: "Tax", value: `₹${order.taxPrice.toFixed(2)}`, accent: false },
                                                        ].map(({ label, value, accent }) => (
                                                            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: accent ? "#4ade80" : "#d1d5db" }}>
                                                                <span>{label}</span>
                                                                <span style={{ fontWeight: 500 }}>{value}</span>
                                                            </div>
                                                        ))}
                                                        <div style={{ borderTop: "1px solid #374151", marginTop: 8, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 15 }}>
                                                            <span>Total</span>
                                                            <span style={{ color: "#e07b54" }}>₹{fmtINR(order.totalPrice)}</span>
                                                        </div>
                                                    </div>

                                                    {/* Delivery info – uses paymentMethod / paymentStatus / isDelivered / deliveredAt / paidAt */}
                                                    <div style={{ background: "#faf8f5", borderRadius: 12, padding: "14px 16px", border: "1px solid #f0ece5", fontSize: 12, color: "#374151", display: "flex", flexDirection: "column", gap: 8 }}>
                                                        <div style={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#9ca3af", marginBottom: 4 }}>
                                                            Delivery Details
                                                        </div>
                                                        <div>💳 {order.paymentMethod}</div>
                                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                            <span>Payment Status</span>
                                                            <span style={{ fontWeight: 700, color: pc.color }}>{pc.label}</span>
                                                        </div>
                                                        {order.isDelivered && order.deliveredAt && (
                                                            <div>✅ Delivered on {fmtDate(order.deliveredAt)}</div>
                                                        )}
                                                        {order.paidAt && (
                                                            <div>💰 Paid on {fmtDate(order.paidAt)}</div>
                                                        )}
                                                    </div>

                                                    {/* Action buttons driven by orderStatus */}
                                                    <div style={{ display: "flex", gap: 8 }}>
                                                        {order.orderStatus !== "cancelled" && (
                                                            <button style={{
                                                                flex: 1, padding: "10px 0", borderRadius: 8, border: "none",
                                                                background: "#1a1a1a", color: "#fff", fontWeight: 700,
                                                                fontSize: 12, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3,
                                                            }}>
                                                                Track Order
                                                            </button>
                                                        )}
                                                        {order.orderStatus === "delivered" && (
                                                            <button style={{
                                                                flex: 1, padding: "10px 0", borderRadius: 8,
                                                                border: "2px solid #e07b54", background: "transparent",
                                                                color: "#e07b54", fontWeight: 700, fontSize: 12,
                                                                cursor: "pointer", fontFamily: "inherit",
                                                            }}>
                                                                Reorder
                                                            </button>
                                                        )}
                                                        {(order.orderStatus === "pending" || order.orderStatus === "confirmed") && (
                                                            <button style={{
                                                                flex: 1, padding: "10px 0", borderRadius: 8,
                                                                border: "2px solid #e5e7eb", background: "transparent",
                                                                color: "#9ca3af", fontWeight: 700, fontSize: 12,
                                                                cursor: "pointer", fontFamily: "inherit",
                                                            }}>
                                                                Cancel
                                                            </button>
                                                        )}
                                                        {order.orderStatus === "cancelled" && (
                                                            <button style={{
                                                                flex: 1, padding: "10px 0", borderRadius: 8,
                                                                border: "2px solid #e07b54", background: "transparent",
                                                                color: "#e07b54", fontWeight: 700, fontSize: 12,
                                                                cursor: "pointer", fontFamily: "inherit",
                                                            }}>
                                                                Reorder
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Back to shop */}
                <div style={{ marginTop: 32 }}>
                    <button
                        onClick={() => navigate("/")}
                        style={{
                            padding: "11px 24px",
                            borderRadius: 8,
                            border: "2px solid #1a1a1a",
                            background: "transparent",
                            color: "#1a1a1a",
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        ← Return To Shop
                    </button>
                </div>
            </div>
        </div>
    );
}