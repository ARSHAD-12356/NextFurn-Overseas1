import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext.jsx';
import '../styles/cart.css';

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.1a8.1 8.1 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.3-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.1.8 2.1.9 2.3.1.2 1.6 2.5 3.9 3.4.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="16" height="16">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UpiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
      <circle cx="7" cy="15" r="1" />
      <circle cx="17" cy="15" r="1" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function GooglePayLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function PaytmLogo() {
  return (
    <svg viewBox="0 0 58 18" width="54" height="17" aria-hidden="true" style={{ flexShrink: 0, display: 'inline-block' }}>
      <text x="0" y="15" fontFamily="'Inter', system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" fill="#002970" letterSpacing="-0.5px">Pay</text>
      <text x="31" y="15" fontFamily="'Inter', system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="17" fill="#00BAF2" letterSpacing="-0.5px">tm</text>
    </svg>
  );
}

function PhonePeLogo() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
      <circle cx="12" cy="12" r="12" fill="#5f259f" />
      <text x="12" y="16.5" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">पे</text>
    </svg>
  );
}

export default function CartPage() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    openCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    lastAddedItem,
    setLastAddedItem,
  } = useCart();

  const drawerRef = useRef(null);

  // Flow State: 'cart' | 'review' | 'success'
  const [step, setStep] = useState('cart');

  // Customer / Shipping Form State
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Patna',
    state: 'Bihar',
    pincode: '',
    company: '',
    gstin: '',
  });

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiChoice, setUpiChoice] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'id'
  const [upiId, setUpiId] = useState('');
  const [showQr, setShowQr] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: '',
  });
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  // Reset to 'cart' step whenever drawer is opened fresh
  useEffect(() => {
    if (!isCartOpen) {
      // Delay reset slightly so closing animation looks smooth
      const timer = setTimeout(() => {
        if (step !== 'success') {
          setStep('cart');
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isCartOpen, step]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Construct WhatsApp order message with products, models, prices, and total
  const getWhatsAppUrl = () => {
    const lines = cartItems.map(
      (it, idx) =>
        `${idx + 1}. *${it.name}* (${it.model || 'Model'}${it.spec ? ' - ' + it.spec : ''})\n   Qty: ${it.quantity} | Price: ${formatINR(it.price * it.quantity)}`
    );

    const msg =
      `*NextFurn Overseas Order Enquiry*\n\n` +
      `Hello! I would like to order the following items:\n\n` +
      lines.join('\n\n') +
      `\n\n*Total Amount:* ${formatINR(subtotal)}` +
      `\n\nPlease confirm availability and dispatch details. Thank you!`;

    return `https://wa.me/919990926199?text=${encodeURIComponent(msg)}`;
  };

  const handleExplore = () => {
    closeCart();
    const prodElem = document.getElementById('products');
    if (prodElem) {
      prodElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (field, val) => {
    setShippingInfo((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleCardChange = (field, val) => {
    setCardInfo((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Validation & Buy Now trigger
  const handleBuyNow = () => {
    const newErrors = {};

    if (!shippingInfo.name.trim()) newErrors.name = true;
    if (!shippingInfo.phone.trim() || shippingInfo.phone.trim().length < 10) newErrors.phone = true;
    if (!shippingInfo.address.trim()) newErrors.address = true;
    if (!shippingInfo.city.trim()) newErrors.city = true;
    if (!shippingInfo.pincode.trim() || shippingInfo.pincode.trim().length < 6) newErrors.pincode = true;

    if (paymentMethod === 'card') {
      if (!cardInfo.number.trim() || cardInfo.number.replace(/\s/g, '').length < 16) newErrors.cardNumber = true;
      if (!cardInfo.expiry.trim()) newErrors.cardExpiry = true;
      if (!cardInfo.cvv.trim() || cardInfo.cvv.length < 3) newErrors.cardCvv = true;
    }

    if (paymentMethod === 'upi' && upiChoice === 'id' && !upiId.trim()) {
      newErrors.upiId = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `NF-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const result = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cartItems],
        totalAmount: subtotal,
        paymentMethod:
          paymentMethod === 'upi'
            ? `UPI (${upiChoice === 'gpay' ? 'Google Pay' : upiChoice === 'phonepe' ? 'PhonePe' : upiChoice === 'paytm' ? 'Paytm' : upiId})`
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : paymentMethod === 'netbanking'
            ? `Net Banking (${selectedBank.toUpperCase()})`
            : 'Cash on Delivery (COD)',
        shipping: { ...shippingInfo },
      };

      setOrderResult(result);
      setIsSubmitting(false);
      clearCart();
      setStep('success');
    }, 750);
  };

  const getSuccessWhatsAppUrl = () => {
    if (!orderResult) return '';
    const msg =
      `*Order Placed Successfully on NextFurn Overseas!*\n\n` +
      `*Order ID:* ${orderResult.orderId}\n` +
      `*Customer:* ${orderResult.shipping.name} (${orderResult.shipping.phone})\n` +
      `*Address:* ${orderResult.shipping.address}, ${orderResult.shipping.city} - ${orderResult.shipping.pincode}\n` +
      `*Total Amount:* ${formatINR(orderResult.totalAmount)}\n` +
      `*Payment:* ${orderResult.paymentMethod}\n\n` +
      `Please confirm dispatch and order receipt.`;

    return `https://wa.me/919990926199?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Slide-over Cart Overlay */}
      <div
        className={`cart-overlay${isCartOpen ? ' is-open' : ''}`}
        aria-hidden={!isCartOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}
      >
        <div
          className={`cart-drawer${step === 'review' ? ' is-review-mode' : ''}`}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Cart & Checkout"
        >
          {/* ========================================================
              STEP 1: SHOPPING CART VIEW
              ======================================================== */}
          {step === 'cart' && (
            <>
              {/* Header */}
              <div className="cart-header">
                <div className="cart-header__title-wrap">
                  <span className="cart-header__icon">
                    <CartIcon />
                  </span>
                  <h2 className="cart-header__title">
                    Shopping Cart
                    {totalCount > 0 && <span className="cart-header__badge">{totalCount}</span>}
                  </h2>
                </div>
                <button
                  type="button"
                  className="cart-close-btn"
                  onClick={closeCart}
                  aria-label="Close Shopping Cart"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Body */}
              <div className="cart-body">
                {cartItems.length === 0 ? (
                  <div className="cart-empty">
                    <span className="cart-empty__icon">
                      <CartIcon />
                    </span>
                    <h3 className="cart-empty__title">Your cart is empty</h3>
                    <p className="cart-empty__desc">
                      Browse our executive office, institution, and hospital furniture collections and add your selected pieces here.
                    </p>
                    <button type="button" className="cart-empty__btn" onClick={handleExplore}>
                      <span>Explore Furniture</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="cart-banner">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      <span>
                        Official GST invoice and company quotation provided for all corporate & personal orders.
                      </span>
                    </div>

                    {cartItems.map((item) => (
                      <div key={item.key} className="cart-item">
                        <div className="cart-item__media">
                          <img src={item.image} alt={item.name} className="cart-item__img" loading="lazy" />
                        </div>

                        <div className="cart-item__info">
                          <div className="cart-item__top">
                            <h4 className="cart-item__name" title={item.name}>
                              {item.name}
                            </h4>
                            <button
                              type="button"
                              className="cart-item__remove-btn"
                              onClick={() => removeFromCart(item.key)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <TrashIcon />
                            </button>
                          </div>

                          <div className="cart-item__meta">
                            {item.model && <span className="cart-item__model">{item.model}</span>}
                            {item.spec && <span className="cart-item__spec">{item.spec}</span>}
                          </div>

                          <div className="cart-item__bottom">
                            <span className="cart-item__price">
                              {formatINR(item.price * item.quantity)}
                            </span>

                            <div className="cart-qty">
                              <button
                                type="button"
                                className="cart-qty__btn"
                                onClick={() => updateQuantity(item.key, -1)}
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="cart-qty__val">{item.quantity}</span>
                              <button
                                type="button"
                                className="cart-qty__btn"
                                onClick={() => updateQuantity(item.key, 1)}
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-summary">
                    <div className="cart-summary__row">
                      <span>Total Items</span>
                      <span className="cart-summary__val">{totalCount} units</span>
                    </div>
                    <div className="cart-summary__row cart-summary__row--total">
                      <span>Subtotal Amount</span>
                      <span className="cart-summary__val">{formatINR(subtotal)}</span>
                    </div>
                  </div>

                  <div className="cart-actions">
                    {/* 1. Order via WhatsApp */}
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cart-btn--whatsapp"
                    >
                      <WhatsAppIcon />
                      <span>Order via WhatsApp</span>
                    </a>

                    <button type="button" className="cart-btn--clear" onClick={clearCart}>
                      Clear Shopping Cart
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ========================================================
              STEP 2: ORDER REVIEW & PAYMENT VIEW
              ======================================================== */}
          {step === 'review' && (
            <>
              {/* Review Header with Back Button */}
              <div className="rv-header">
                <div className="rv-header__left">
                  <button
                    type="button"
                    className="rv-back-btn"
                    onClick={() => setStep('cart')}
                    aria-label="Back to Cart"
                  >
                    <ArrowLeftIcon />
                    <span>Back</span>
                  </button>
                  <h2 className="rv-header__title">
                    Order Review & Payment
                    <span className="rv-step-pill">Review</span>
                  </h2>
                </div>
                <button
                  type="button"
                  className="cart-close-btn"
                  onClick={closeCart}
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Review Scrollable Body */}
              <div className="rv-body">
                {/* 1. Items Review Card */}
                <div className="rv-card">
                  <div className="rv-card__head">
                    <h3 className="rv-card__title">
                      <span className="rv-card__icon">
                        <CartIcon />
                      </span>
                      Order Summary ({totalCount} items)
                    </h3>
                    <button
                      type="button"
                      className="rv-back-btn"
                      style={{ padding: '4px 8px', fontSize: '11.5px' }}
                      onClick={() => setStep('cart')}
                    >
                      Edit Cart
                    </button>
                  </div>

                  <div className="rv-items-list">
                    {cartItems.map((item) => (
                      <div key={item.key} className="rv-item">
                        <img src={item.image} alt={item.name} className="rv-item__img" />
                        <div className="rv-item__details">
                          <h4 className="rv-item__name">{item.name}</h4>
                          <span className="rv-item__meta">
                            {item.model ? `Model: ${item.model}` : 'NextFurn Commercial'}
                            {item.spec ? ` • ${item.spec}` : ''}
                          </span>
                        </div>
                        <div className="rv-item__price-box">
                          <span className="rv-item__qty">Qty: {item.quantity}</span>
                          <span className="rv-item__price">{formatINR(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rv-breakdown">
                    <div className="rv-breakdown__row">
                      <span>Items Subtotal</span>
                      <span>{formatINR(subtotal)}</span>
                    </div>
                    <div className="rv-breakdown__row">
                      <span>GST (18% Input Tax Included)</span>
                      <span>{formatINR(Math.round((subtotal * 18) / 118))}</span>
                    </div>
                    <div className="rv-breakdown__row">
                      <span>Standard Delivery</span>
                      <span className="rv-badge-free">FREE</span>
                    </div>
                    <div className="rv-breakdown__row rv-breakdown__row--total">
                      <span>Grand Total Amount</span>
                      <span className="rv-breakdown__val">{formatINR(subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Shipping & Customer Details Card */}
                <div className="rv-card">
                  <div className="rv-card__head">
                    <h3 className="rv-card__title">
                      <span className="rv-card__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </span>
                      Delivery & Billing Address
                    </h3>
                  </div>

                  <div className="rv-form-grid">
                    <div className="rv-field">
                      <label className="rv-label rv-label--req">Full Name</label>
                      <input
                        type="text"
                        className={`rv-input${errors.name ? ' is-error' : ''}`}
                        placeholder="e.g. Rahul Sharma"
                        value={shippingInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>

                    <div className="rv-field">
                      <label className="rv-label rv-label--req">Mobile / WhatsApp Number</label>
                      <input
                        type="tel"
                        className={`rv-input${errors.phone ? ' is-error' : ''}`}
                        placeholder="10-digit number"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="rv-field rv-form-grid--full">
                      <label className="rv-label">Email Address (for Invoice copy)</label>
                      <input
                        type="email"
                        className="rv-input"
                        placeholder="name@company.com"
                        value={shippingInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="rv-field rv-form-grid--full">
                      <label className="rv-label rv-label--req">Delivery Address (Building, Street, Floor)</label>
                      <input
                        type="text"
                        className={`rv-input${errors.address ? ' is-error' : ''}`}
                        placeholder="e.g. Office #402, 4th Floor, Tech Park, Near Zero Mile"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </div>

                    <div className="rv-field">
                      <label className="rv-label rv-label--req">City</label>
                      <input
                        type="text"
                        className={`rv-input${errors.city ? ' is-error' : ''}`}
                        placeholder="e.g. Patna"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>

                    <div className="rv-field">
                      <label className="rv-label rv-label--req">PIN Code</label>
                      <input
                        type="text"
                        maxLength="6"
                        className={`rv-input${errors.pincode ? ' is-error' : ''}`}
                        placeholder="e.g. 800026"
                        value={shippingInfo.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                      />
                    </div>

                    <div className="rv-field rv-form-grid--full">
                      <label className="rv-label">Company Name / GSTIN (Optional)</label>
                      <input
                        type="text"
                        className="rv-input"
                        placeholder="For GST Input Tax Credit invoice"
                        value={shippingInfo.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method Card */}
                <div className="rv-card">
                  <div className="rv-card__head">
                    <h3 className="rv-card__title">
                      <span className="rv-card__icon">
                        <LockIcon />
                      </span>
                      Select Payment Method
                    </h3>
                  </div>

                  {/* Payment Tabs: UPI, Cards, Net Banking, COD */}
                  <div className="rv-pay-nav">
                    <button
                      type="button"
                      className={`rv-pay-tab${paymentMethod === 'upi' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <UpiIcon />
                      <span>UPI / Apps</span>
                    </button>

                    <button
                      type="button"
                      className={`rv-pay-tab${paymentMethod === 'card' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <CardIcon />
                      <span>Cards</span>
                    </button>

                    <button
                      type="button"
                      className={`rv-pay-tab${paymentMethod === 'netbanking' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <BankIcon />
                      <span>Net Banking</span>
                    </button>

                    <button
                      type="button"
                      className={`rv-pay-tab${paymentMethod === 'cod' ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <CashIcon />
                      <span>COD</span>
                    </button>
                  </div>

                  {/* Tab Panel A: UPI */}
                  {paymentMethod === 'upi' && (
                    <div className="rv-tab-panel">
                      <div className="rv-upi-apps">
                        <button
                          type="button"
                          className={`rv-upi-btn${upiChoice === 'gpay' ? ' is-active' : ''}`}
                          onClick={() => setUpiChoice('gpay')}
                        >
                          <GooglePayLogo />
                          <span>Google Pay</span>
                        </button>
                        <button
                          type="button"
                          className={`rv-upi-btn${upiChoice === 'phonepe' ? ' is-active' : ''}`}
                          onClick={() => setUpiChoice('phonepe')}
                        >
                          <PhonePeLogo />
                          <span>PhonePe</span>
                        </button>
                        <button
                          type="button"
                          className={`rv-upi-btn${upiChoice === 'paytm' ? ' is-active' : ''}`}
                          onClick={() => setUpiChoice('paytm')}
                        >
                          <PaytmLogo />
                        </button>
                      </div>

                      <div className="rv-field" style={{ marginBottom: '12px' }}>
                        <label className="rv-label">Or Enter Any UPI ID</label>
                        <div className="rv-upi-box">
                          <input
                            type="text"
                            className={`rv-input${errors.upiId ? ' is-error' : ''}`}
                            placeholder="e.g. mobile@okaxis / user@upi"
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              setUpiChoice('id');
                            }}
                          />
                          <button
                            type="button"
                            className="rv-upi-verify-btn"
                            onClick={() => alert('UPI ID Verified successfully!')}
                          >
                            Verify
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rv-qr-toggle-btn"
                        onClick={() => setShowQr((v) => !v)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                          <rect x="3" y="3" width="7" height="7" />
                          <rect x="14" y="3" width="7" height="7" />
                          <rect x="14" y="14" width="7" height="7" />
                          <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        <span>{showQr ? 'Hide Scan & Pay QR' : 'Show Scan & Pay QR Code'}</span>
                      </button>

                      {showQr && (
                        <div className="rv-qr-box">
                          {/* SVG QR Code Simulation */}
                          <svg className="rv-qr-img" viewBox="0 0 100 100" fill="#002F23">
                            <rect x="10" y="10" width="24" height="24" fill="#002F23" />
                            <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                            <rect x="18" y="18" width="8" height="8" fill="#002F23" />
                            <rect x="66" y="10" width="24" height="24" fill="#002F23" />
                            <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                            <rect x="74" y="18" width="8" height="8" fill="#002F23" />
                            <rect x="10" y="66" width="24" height="24" fill="#002F23" />
                            <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                            <rect x="18" y="74" width="8" height="8" fill="#002F23" />
                            <rect x="42" y="15" width="8" height="8" />
                            <rect x="52" y="25" width="8" height="8" />
                            <rect x="42" y="42" width="16" height="16" fill="#F4510B" />
                            <rect x="66" y="52" width="10" height="10" />
                            <rect x="78" y="66" width="12" height="12" />
                            <rect x="40" y="75" width="10" height="10" />
                          </svg>
                          <span className="rv-qr-note">
                            Scan with Google Pay, PhonePe, or Paytm on delivery or checkout
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab Panel B: Cards */}
                  {paymentMethod === 'card' && (
                    <div className="rv-tab-panel">
                      <div className="rv-form-grid">
                        <div className="rv-field rv-form-grid--full">
                          <label className="rv-label rv-label--req">Card Number</label>
                          <input
                            type="text"
                            maxLength="19"
                            className={`rv-input${errors.cardNumber ? ' is-error' : ''}`}
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={cardInfo.number}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                              handleCardChange('number', val);
                            }}
                          />
                        </div>

                        <div className="rv-field rv-form-grid--full">
                          <label className="rv-label">Cardholder Name</label>
                          <input
                            type="text"
                            className="rv-input"
                            placeholder="Name on card"
                            value={cardInfo.holder}
                            onChange={(e) => handleCardChange('holder', e.target.value)}
                          />
                        </div>

                        <div className="rv-field">
                          <label className="rv-label rv-label--req">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            maxLength="5"
                            className={`rv-input${errors.cardExpiry ? ' is-error' : ''}`}
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={(e) => handleCardChange('expiry', e.target.value)}
                          />
                        </div>

                        <div className="rv-field">
                          <label className="rv-label rv-label--req">CVV</label>
                          <input
                            type="password"
                            maxLength="4"
                            className={`rv-input${errors.cardCvv ? ' is-error' : ''}`}
                            placeholder="3 or 4 digits"
                            value={cardInfo.cvv}
                            onChange={(e) => handleCardChange('cvv', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab Panel C: Net Banking */}
                  {paymentMethod === 'netbanking' && (
                    <div className="rv-tab-panel">
                      <label className="rv-label" style={{ marginBottom: '8px', display: 'block' }}>
                        Select Popular Indian Bank
                      </label>
                      <div className="rv-banks-grid">
                        {[
                          { id: 'sbi', name: 'SBI' },
                          { id: 'hdfc', name: 'HDFC Bank' },
                          { id: 'icici', name: 'ICICI Bank' },
                          { id: 'axis', name: 'Axis Bank' },
                          { id: 'pnb', name: 'PNB' },
                          { id: 'kotak', name: 'Kotak' },
                        ].map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            className={`rv-bank-btn${selectedBank === b.id ? ' is-active' : ''}`}
                            onClick={() => setSelectedBank(b.id)}
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>

                      <div className="rv-field">
                        <label className="rv-label">Or Choose Another Bank</label>
                        <select
                          className="rv-input"
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                        >
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="bob">Bank of Baroda</option>
                          <option value="canara">Canara Bank</option>
                          <option value="union">Union Bank of India</option>
                          <option value="indusind">IndusInd Bank</option>
                          <option value="yes">Yes Bank</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Tab Panel D: Cash on Delivery */}
                  {paymentMethod === 'cod' && (
                    <div className="rv-tab-panel">
                      <div className="rv-cod-box">
                        <div className="rv-cod-icon">
                          <CashIcon />
                        </div>
                        <div>
                          <h4 className="rv-cod-title">Cash on Delivery (COD) Available</h4>
                          <p className="rv-cod-desc">
                            Pay in cash or via instant mobile UPI QR when your order is delivered to your office or home.
                            NextFurn logistics representative will provide a stamped delivery challan upon arrival.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Sticky Action Bar with "BUY NOW" button */}
              <div className="rv-sticky-bar">
                <div className="rv-sticky-bar__top">
                  <div>
                    <span className="rv-sticky-bar__label">Total Payable</span>
                    <span style={{ display: 'block', fontSize: '11px', color: '#107C41', fontWeight: 600 }}>
                      ✓ Includes all taxes & free shipping
                    </span>
                  </div>
                  <span className="rv-sticky-bar__amount">{formatINR(subtotal)}</span>
                </div>

                <button
                  type="button"
                  className="rv-buy-btn"
                  onClick={handleBuyNow}
                  disabled={isSubmitting}
                >
                  <LockIcon />
                  <span>
                    {isSubmitting
                      ? 'Securing Order...'
                      : `BUY NOW • ${formatINR(subtotal)}`}
                  </span>
                </button>

                <p className="rv-security-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  256-Bit SSL Encrypted • NextFurn Overseas Verified Purchase
                </p>
              </div>
            </>
          )}

          {/* ========================================================
              STEP 3: ORDER CONFIRMATION / SUCCESS VIEW
              ======================================================== */}
          {step === 'success' && orderResult && (
            <div className="rv-body" style={{ padding: '30px 20px', background: '#ffffff' }}>
              <div className="rv-success">
                <div className="rv-success__icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <h2 className="rv-success__title">Order Confirmed!</h2>
                <span className="rv-success__order-id">Order ID: {orderResult.orderId}</span>

                <p style={{ margin: '0', fontSize: '14px', color: '#555f59', lineHeight: 1.5 }}>
                  Thank you, <strong>{orderResult.shipping.name}</strong>! Your furniture order has been booked with NextFurn Overseas.
                </p>

                <div className="rv-success__card">
                  <div className="rv-success__row">
                    <span>Order Date</span>
                    <strong>{orderResult.date}</strong>
                  </div>
                  <div className="rv-success__row">
                    <span>Payment Method</span>
                    <strong>{orderResult.paymentMethod}</strong>
                  </div>
                  <div className="rv-success__row">
                    <span>Delivery Address</span>
                    <strong style={{ maxWidth: '60%', textAlign: 'right' }}>
                      {orderResult.shipping.address}, {orderResult.shipping.city} ({orderResult.shipping.pincode})
                    </strong>
                  </div>
                  <div className="rv-success__row" style={{ paddingTop: '8px', borderTop: '1px dashed rgba(0,47,35,0.1)' }}>
                    <span>Total Amount</span>
                    <strong style={{ fontSize: '16px', color: '#002F23' }}>{formatINR(orderResult.totalAmount)}</strong>
                  </div>
                </div>

                <div className="rv-success__actions">
                  <a
                    href={getSuccessWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv-success__btn--whatsapp"
                  >
                    <WhatsAppIcon />
                    <span>Get Order Confirmation on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    className="rv-success__btn--close"
                    onClick={() => {
                      setStep('cart');
                      closeCart();
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Added-to-Cart Toast */}
      {lastAddedItem && (
        <aside className="cart-toast" role="status" aria-live="polite">
          <div className="cart-toast__content">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="cart-toast__icon">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>
              Added: <strong className="cart-toast__name">{lastAddedItem.name}</strong>
            </span>
          </div>
          <button
            type="button"
            className="cart-toast__view-btn"
            onClick={() => {
              setLastAddedItem(null);
              setStep('cart');
              openCart();
            }}
          >
            View Cart ({totalCount})
          </button>
        </aside>
      )}
    </>
  );
}
