import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { getArticleBySlug, ARTICLES, SITE_NAME, SITE_TAGLINE } from '@/data/articles';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [photoAuthor, setPhotoAuthor] = useState('');

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="font-serif text-3xl">Статья не найдена</p>
        <Link to="/" className="text-primary hover:underline">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const image = customImage || article.image;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const related = ARTICLES.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-background paper-grain selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold tracking-tight">{SITE_NAME}</span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.25em] text-muted-foreground pb-1">
              {SITE_TAGLINE}
            </span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <Icon name="ArrowLeft" size={18} />
            <span>Ко всем статьям</span>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-12 animate-fade-in">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-primary mb-5">
          <span>{article.category}</span>
          <span className="w-8 h-px bg-primary/40" />
          <span className="text-muted-foreground">{article.date}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-semibold leading-[1.04] mb-6 text-balance">
          {article.title}
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">{article.excerpt}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground border-y border-border py-4 mb-10">
          <span className="text-foreground font-medium">{article.author}</span>
          <span>·</span>
          <span>{article.readMin} мин чтения</span>
          <span className="ml-auto flex gap-3">
            <Icon name="Share2" size={16} className="hover:text-primary cursor-pointer transition-colors" />
            <Icon name="Bookmark" size={16} className="hover:text-primary cursor-pointer transition-colors" />
          </span>
        </div>

        {/* Cover photo with upload */}
        <div className="mb-12">
          {image ? (
            <div>
              <div className="relative group overflow-hidden rounded-sm">
                <img src={image} alt={article.title} className="w-full max-h-[480px] object-cover" />
                <label className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100">
                  <span className="flex items-center gap-2 text-background bg-foreground/70 px-4 py-2 rounded-sm text-sm">
                    <Icon name="ImagePlus" size={16} /> Заменить фото
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Icon name="Camera" size={13} className="text-muted-foreground shrink-0" />
                <input
                  value={photoAuthor}
                  onChange={(e) => setPhotoAuthor(e.target.value)}
                  placeholder="Автор фото"
                  className="text-xs text-muted-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/50 w-full italic"
                />
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-sm py-20 cursor-pointer hover:border-primary hover:bg-secondary/30 transition-colors">
              <Icon name="ImagePlus" size={32} className="text-muted-foreground" />
              <span className="font-serif text-xl">Добавить фото к статье</span>
              <span className="text-sm text-muted-foreground">Нажмите, чтобы загрузить обложку</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          )}
        </div>

        {/* Body */}
        <article className="space-y-6">
          {article.body.map((p, i) => (
            <p
              key={i}
              className={`leading-[1.85] text-foreground/90 ${
                i === 0 ? 'first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]' : ''
              }`}
            >
              {p}
            </p>
          ))}
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
          {article.tags.map((t) => (
            <span key={t} className="text-sm text-primary">
              #{t}
            </span>
          ))}
        </div>
      </main>

      {/* Related */}
      {related.length > 0 && (
        <section className="container max-w-6xl py-16 border-t border-border">
          <h2 className="font-serif text-2xl mb-8">Читайте также</h2>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
            {related.map((a) => (
              <Link key={a.id} to={`/article/${a.slug}`} className="group">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
                  <span>{a.category}</span>
                  <span className="text-muted-foreground normal-case tracking-normal">{a.date}</span>
                </div>
                <h3 className="font-serif text-2xl font-medium leading-tight group-hover:text-primary transition-colors text-balance">
                  {a.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}