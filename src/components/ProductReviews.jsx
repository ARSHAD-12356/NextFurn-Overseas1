import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// Reviews are kept in this browser's localStorage, one list per product id.
// There is no backend yet, so a review is only visible on the device that wrote it.
const STORAGE_PREFIX = 'nextfurn_reviews_';
const MAX_NAME = 60;
const MIN_TEXT = 10;
const MAX_TEXT = 1000;

// Photos are shrunk in the browser before saving: localStorage only holds about 5 MB per site.
const MAX_PHOTOS = 3;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const PHOTO_MAX_SIDE = 900;
const PHOTO_QUALITY = 0.78;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function loadReviews(productId) {
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + productId);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, PHOTO_MAX_SIDE / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', PHOTO_QUALITY));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable'));
    };
    img.src = url;
  });
}

export function useProductReviews(productId) {
  const [reviews, setReviews] = useState(() => loadReviews(productId));

  useEffect(() => {
    setReviews(loadReviews(productId));
  }, [productId]);

  // Returns false when the browser refuses to store it (usually storage full because of photos).
  const addReview = (review) => {
    const next = [{ ...review, id: `${Date.now()}`, date: new Date().toISOString() }, ...reviews];
    try {
      localStorage.setItem(STORAGE_PREFIX + productId, JSON.stringify(next));
    } catch (error) {
      console.error('Unable to save review.', error);
      return false;
    }
    setReviews(next);
    return true;
  };

  const count = reviews.length;
  const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  return { reviews, count, average, addReview };
}

export function Stars({ value, size = 18, className = '' }) {
  return (
    <span className={`pdp-stars ${className}`} style={{ '--star-size': `${size}px` }} aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)));
        return (
          <span key={n} className="pdp-stars__item" aria-hidden="true">
            <span className="pdp-stars__empty">★</span>
            <span className="pdp-stars__fill" style={{ width: `${fill * 100}%` }}>★</span>
          </span>
        );
      })}
    </span>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const shown = hover || value;
  return (
    <div className="pdp-star-picker" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={`pdp-star-picker__btn${n <= shown ? ' is-on' : ''}`}
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
      <span className="pdp-star-picker__label">{shown ? labels[shown - 1] : 'Tap a star to rate'}</span>
    </div>
  );
}

function PhotoUploader({ photos, onChange, onError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);

  const addFiles = async (fileList) => {
    const files = [...fileList];
    const room = MAX_PHOTOS - photos.length;
    if (room <= 0) return onError(`You can add up to ${MAX_PHOTOS} photos.`);

    const valid = files.filter((f) => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_UPLOAD_BYTES);
    if (valid.length < files.length) onError('Only JPG, PNG or WEBP photos up to 10 MB can be added.');
    else if (files.length > room) onError(`Only ${MAX_PHOTOS} photos per review — the first ${room} were added.`);
    else onError('');

    setBusy(true);
    const added = [];
    for (const file of valid.slice(0, room)) {
      try {
        added.push(await compressPhoto(file));
      } catch {
        onError('One of the photos could not be read. Please try another file.');
      }
    }
    setBusy(false);
    if (added.length) onChange([...photos, ...added]);
  };

  const full = photos.length >= MAX_PHOTOS;

  return (
    <div className="pdp-photo-upload">
      <span className="pdp-photo-upload__label">
        Add photos <span className="pdp-photo-upload__hint">(optional, up to {MAX_PHOTOS})</span>
      </span>

      <div className="pdp-photo-upload__row">
        {photos.map((src, i) => (
          <div key={src.slice(-40) + i} className="pdp-photo-upload__thumb">
            <img src={src} alt={`Your photo ${i + 1}`} />
            <button
              type="button"
              className="pdp-photo-upload__remove"
              aria-label={`Remove photo ${i + 1}`}
              onClick={() => onChange(photos.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </div>
        ))}

        {!full && (
          <button
            type="button"
            className={`pdp-photo-upload__drop${dragging ? ' is-dragging' : ''}${photos.length ? ' is-compact' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
            disabled={busy}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            <span className="pdp-photo-upload__drop-text">
              {busy ? 'Adding…' : photos.length ? 'Add more' : 'Click to upload or drag photos here'}
            </span>
            {!photos.length && !busy && <span className="pdp-photo-upload__drop-sub">JPG, PNG or WEBP · up to 10 MB each</span>}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        multiple
        hidden
        onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
      />
    </div>
  );
}

const formatDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function ProductReviews({ productName, reviews, count, average, addReview }) {
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [thanks, setThanks] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => e.key === 'Escape' && setLightbox(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  // The form is a popup: Esc closes it and the page behind stops scrolling.
  useEffect(() => {
    if (!formOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeForm();
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [formOpen]);

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    total: reviews.filter((r) => r.rating === star).length,
  }));

  const openForm = () => {
    setFormOpen(true);
    setThanks(false);
  };

  const resetForm = () => {
    setRating(0);
    setName('');
    setText('');
    setPhotos([]);
    setError('');
  };

  const closeForm = () => {
    resetForm();
    setFormOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!rating) return setError('Please choose a star rating.');
    if (!trimmedName) return setError('Please enter your name.');
    if (trimmedText.length < MIN_TEXT) return setError(`Please write at least ${MIN_TEXT} characters.`);
    const saved = addReview({ rating, name: trimmedName.slice(0, MAX_NAME), text: trimmedText.slice(0, MAX_TEXT), photos });
    if (!saved) {
      return setError(photos.length
        ? 'Your browser storage is full, so the photos could not be saved. Remove a photo and try again.'
        : 'Your review could not be saved in this browser. Please try again.');
    }
    resetForm();
    setFormOpen(false);
    setThanks(true);
  };

  return (
    <section className="pdp-reviews" id="reviews" aria-labelledby="pdp-reviews-title">
      <div className="pdp-container">
        <div className="pdp-reviews__card">
          <h2 id="pdp-reviews-title" className="pdp-reviews__title">Ratings &amp; Reviews</h2>

          <div className="pdp-reviews__summary">
            <div className="pdp-reviews__score-block">
              <div className="pdp-reviews__score-row">
                <span className="pdp-reviews__score">{count ? average.toFixed(1) : '0.0'}</span>
                <Stars value={average} size={22} />
              </div>
              <p className="pdp-reviews__based">
                {count ? `Based on ${count} review${count > 1 ? 's' : ''}` : 'No reviews yet'}
              </p>
            </div>
            <button type="button" className="pdp-reviews__rate-btn" onClick={openForm}>Rate</button>
          </div>

          <ul className="pdp-reviews__bars">
            {distribution.map(({ star, total }) => (
              <li key={star} className="pdp-reviews__bar-row">
                <span className="pdp-reviews__bar-star">{star} <span aria-hidden="true">★</span></span>
                <span className="pdp-reviews__bar-track" aria-hidden="true">
                  <span className="pdp-reviews__bar-fill" style={{ width: count ? `${(total / count) * 100}%` : 0 }} />
                </span>
                <span className="pdp-reviews__bar-count">({total})</span>
              </li>
            ))}
          </ul>

          {thanks && <p className="pdp-reviews__thanks" role="status">Thank you! Your review has been added.</p>}

          <button type="button" className="pdp-reviews__write-btn" onClick={openForm}>Write A Review</button>

          {formOpen && createPortal(
            <div className="pdp-review-modal pdp-page" onMouseDown={(e) => e.target === e.currentTarget && closeForm()}>
            <div className="pdp-review-modal__panel" role="dialog" aria-modal="true" aria-labelledby="pdp-review-form-title">
            <button type="button" className="pdp-review-modal__close" aria-label="Close review form" onClick={closeForm}>×</button>
            <form className="pdp-review-form" onSubmit={handleSubmit} noValidate>
              <h3 id="pdp-review-form-title" className="pdp-review-form__title">Review {productName}</h3>
              <StarPicker value={rating} onChange={(n) => { setRating(n); setError(''); }} />
              <label className="pdp-review-form__field">
                <span>Your name</span>
                <input type="text" value={name} maxLength={MAX_NAME} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="pdp-review-form__field">
                <span>Your review</span>
                <textarea
                  rows={4}
                  value={text}
                  maxLength={MAX_TEXT}
                  placeholder="What did you like or dislike? How is the quality and comfort?"
                  onChange={(e) => setText(e.target.value)}
                />
              </label>
              <PhotoUploader photos={photos} onChange={setPhotos} onError={setError} />
              {error && <p className="pdp-review-form__error" role="alert">{error}</p>}
              <div className="pdp-review-form__actions">
                <button type="button" className="pdp-review-form__cancel" onClick={closeForm}>Cancel</button>
                <button type="submit" className="pdp-review-form__submit">Submit Review</button>
              </div>
            </form>
            </div>
            </div>,
            document.body,
          )}

          {count > 0 && (
            <ul className="pdp-reviews__list">
              {reviews.map((review) => (
                <li key={review.id} className="pdp-review-item">
                  <div className="pdp-review-item__head">
                    <span className="pdp-review-item__avatar" aria-hidden="true">{review.name.charAt(0).toUpperCase()}</span>
                    <div>
                      <span className="pdp-review-item__name">{review.name}</span>
                      <span className="pdp-review-item__date">{formatDate(review.date)}</span>
                    </div>
                    <Stars value={review.rating} size={15} className="pdp-review-item__stars" />
                  </div>
                  <p className="pdp-review-item__text">{review.text}</p>
                  {review.photos?.length > 0 && (
                    <div className="pdp-review-item__photos">
                      {review.photos.map((src, i) => (
                        <button
                          key={i}
                          type="button"
                          className="pdp-review-item__photo"
                          aria-label={`View photo ${i + 1} from ${review.name}`}
                          onClick={() => setLightbox(src)}
                        >
                          <img src={src} alt="" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {lightbox && createPortal(
        <div className="pdp-review-lightbox pdp-page" role="dialog" aria-modal="true" aria-label="Review photo" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Customer review" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="pdp-review-lightbox__close" aria-label="Close photo" onClick={() => setLightbox(null)}>×</button>
        </div>,
        document.body,
      )}
    </section>
  );
}
