import POSTS from '../data/blogPosts.js';
import '../styles/blog-post.css';

export default function BlogPostPage({ slug, onNavigate }) {
  const post = POSTS.find((item) => item.id === slug);

  if (!post) {
    return (
      <main className="blog-post blog-post--not-found">
        <p className="blog-post__eyebrow">Our Blog</p>
        <h1>Article not found</h1>
        <p>The article you’re looking for may have moved or is no longer available.</p>
        <button type="button" className="blog-post__back" onClick={() => onNavigate('home', '#blog')}>
          Back to all articles
        </button>
      </main>
    );
  }

  return (
    <main className="blog-post">
      <div className="blog-post__container">
        <button type="button" className="blog-post__back" onClick={() => onNavigate('home', '#blog')}>
          <span aria-hidden="true">←</span> Back to all articles
        </button>
        <header className="blog-post__header">
          <p className="blog-post__eyebrow">{post.cats.join(' · ')}</p>
          <h1>{post.title}</h1>
          <p className="blog-post__excerpt">{post.excerpt}</p>
          <p className="blog-post__meta">{post.date}<span aria-hidden="true">·</span>{post.read}</p>
        </header>
        <img className="blog-post__image" src={post.image} alt={post.alt} />
        <article className="blog-post__content">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
        </article>
        <button type="button" className="blog-post__back blog-post__back--bottom" onClick={() => onNavigate('home', '#blog')}>
          <span aria-hidden="true">←</span> Back to all articles
        </button>
      </div>
    </main>
  );
}
