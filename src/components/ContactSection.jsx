import { useState } from 'react';
import contactOfficeImg from '../assets/rooms/contact-office.png';
import '../styles/contact-section.css';

const CONTACT = {
  email: 'nextfurn12@gmail.com',
  phone1: '+91 99909 26199',
  phone2: '+91 96647 61989',
  address: 'Alpaaye Colony, Gate No. 1, Zero Mile, Transport Nagar, Near Vikas Transport, Kumhrar, Patna - 800026',
};

function Icon({ name }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };

  switch (name) {
    case 'user':
      return <svg {...common}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case 'mail':
      return <svg {...common}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
    case 'phone':
      return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
    case 'building':
      return <svg {...common}><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M8 10h.01" /><path d="M16 10h.01" /><path d="M8 14h.01" /><path d="M16 14h.01" /></svg>;
    case 'pin':
      return <svg {...common}><path d="M12 21s-7-4.35-7-10a7 7 0 0 1 14 0c0 5.65-7 10-7 10z" /><circle cx="12" cy="11" r="2.5" /></svg>;
    case 'edit':
      return <svg {...common}><path d="m18 2 4 4-10 10H8v-4z" /><path d="m14 6 4 4" /></svg>;
    case 'send':
      return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m2.01 21 20.99-9L2.01 3 2 10l15 2-15 2z" /></svg>;
    case 'lock':
      return <svg {...common}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    default:
      return null;
  }
}

function Field({ id, label, icon, error, children, full }) {
  return (
    <div className={`ct-field${full ? ' ct-field--message' : ''}${error ? ' has-error' : ''}`}>
      <span className="ct-field__icon" aria-hidden="true"><Icon name={icon} /></span>
      <div className="ct-field__body">
        <label className="ct-field__label" htmlFor={id}>{label}</label>
        {children}
        {error && <span className="ct-field__error" id={`${id}-error`}>{error}</span>}
      </div>
    </div>
  );
}

const INITIAL_VALUES = { name: '', email: '', phone: '', company: '', message: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone.trim() && !/^[+\d][\d\s()-]{6,18}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (!values.message.trim()) errors.message = 'Please enter your requirement.';
  return errors;
}

export default function ContactSection() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;

    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus({ type: 'error', text: 'Please fill in the required fields correctly.' });
      return;
    }

    setSubmitting(true);

    // Format WhatsApp message with all details
    const textLines = [
      '👋 *NextFurn Overseas — New Furniture Requirement Enquiry*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${values.name.trim()}`,
      `✉️ *Email:* ${values.email.trim()}`,
      values.phone.trim() ? `📞 *Phone:* ${values.phone.trim()}` : null,
      values.company.trim() ? `🏢 *Company / Organisation:* ${values.company.trim()}` : null,
      '',
      '📝 *Requirement / Message:*',
      values.message.trim(),
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '_Sent via NextFurn Overseas Website_'
    ].filter(Boolean);

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919990926199&text=${encodeURIComponent(textLines.join('\n'))}`;

    // Reliable opening of WhatsApp
    const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      const a = document.createElement('a');
      a.href = whatsappUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setStatus({
      type: 'info',
      text: 'Opening WhatsApp to send enquiry details directly to +91 99909 26199...',
    });

    setValues(INITIAL_VALUES);

    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contact" className="ct" aria-labelledby="ct-title">
      {/* Straight-split contact image backdrop */}
      <div className="ct-backdrop" aria-hidden="true">
        <div className="ct-image-panel">
          <img src={contactOfficeImg} alt="NextFurn Office Interior" loading="lazy" decoding="async" />
        </div>
      </div>

      <div className="ct-inner">
        {/* Left Column: Heading, Subheading & Info Cards */}
        <div className="ct-left">
          <div className="ct-info">
            <div className="ct-eyebrow">
              <span>CONTACT US</span>
              <span className="ct-eyebrow-line" aria-hidden="true" />
            </div>

            <h2 id="ct-title" className="ct-title">
              Let&rsquo;s Create Spaces<br />
              That <span className="ct-title-orange">Work for You</span>
            </h2>

            <p className="ct-text">
              Planning an office, school, hospital or public space? Tell us what you need and our team will help you choose the right furniture, finishes and quantities.
            </p>

            {/* 3 Contact Info Cards */}
            <div className="ct-cards">
              {/* Email Card */}
              <div className="ct-card-item">
                <div className="ct-card-icon ct-card-icon--email">
                  <Icon name="mail" />
                </div>
                <div className="ct-card-text">
                  <span className="ct-card-label">Email Us</span>
                  <a href={`mailto:${CONTACT.email}`} className="ct-card-val">{CONTACT.email}</a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="ct-card-item">
                <div className="ct-card-icon ct-card-icon--phone">
                  <Icon name="phone" />
                </div>
                <div className="ct-card-text">
                  <span className="ct-card-label">Call Us</span>
                  <div className="ct-card-val-multi">
                    <a href={`tel:${CONTACT.phone1.replace(/\s+/g, '')}`}>{CONTACT.phone1}</a>
                    <a href={`tel:${CONTACT.phone2.replace(/\s+/g, '')}`}>{CONTACT.phone2}</a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="ct-card-item">
                <div className="ct-card-icon ct-card-icon--location">
                  <Icon name="pin" />
                </div>
                <div className="ct-card-text">
                  <span className="ct-card-label">Corporate Office</span>
                  <p className="ct-card-val ct-card-val--address">{CONTACT.address}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Floating White Form Card */}
        <div className="ct-right">
          <form className="ct-form" onSubmit={onSubmit} noValidate aria-busy={submitting}>
            <div className="ct-form__eyebrow">
              <span>SEND US AN ENQUIRY</span>
              <span className="ct-form__eyebrow-line" aria-hidden="true" />
            </div>

            <h3 className="ct-form__title">
              Tell Us About Your <span className="ct-title-orange">Furniture Requirement</span>
            </h3>

            <p className="ct-form__sub">
              Share a few details and our team will get back to you as soon as possible.
            </p>

            <div className="ct-grid">
              <Field id="ct-name" label="Your Name *" icon="user" error={errors.name}>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={updateField('name')}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'ct-name-error' : undefined}
                />
              </Field>

              <Field id="ct-email" label="Your Email *" icon="mail" error={errors.email}>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={updateField('email')}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'ct-email-error' : undefined}
                />
              </Field>

              <Field id="ct-phone" label="Phone Number" icon="phone" error={errors.phone}>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={updateField('phone')}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'ct-phone-error' : undefined}
                />
              </Field>

              <Field id="ct-company" label="Company / Organisation" icon="building">
                <input
                  id="ct-company"
                  name="company"
                  type="text"
                  value={values.company}
                  onChange={updateField('company')}
                  placeholder="Enter company or organisation"
                  autoComplete="organization"
                />
              </Field>
            </div>

            <Field id="ct-message" label="Your Message *" icon="edit" error={errors.message} full>
              <textarea
                id="ct-message"
                name="message"
                rows="4"
                value={values.message}
                onChange={updateField('message')}
                placeholder="Tell us about your furniture requirement..."
                maxLength={500}
                required
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'ct-message-error ct-message-count' : 'ct-message-count'}
              />
              <span className="ct-message-count" id="ct-message-count" aria-live="polite">
                {values.message.length}/500
              </span>
            </Field>

            <button type="submit" className="ct-btn" disabled={submitting}>
              <span>{submitting ? 'Connecting WhatsApp…' : 'Send Enquiry'}</span>
              <Icon name="send" />
            </button>

            {status && (
              <p className={`ct-status is-${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
                {status.text}
              </p>
            )}

            <div className="ct-privacy">
              <Icon name="lock" />
              <span>Your Information is safe with us. We&rsquo;ll never share your details.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
