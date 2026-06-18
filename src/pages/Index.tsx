import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { ARTICLES, CATEGORIES, ALL_TAGS, NAV, HERO_IMAGE, SITE_NAME, SITE_TAGLINE } from '@/data/articles';

export default function Index() {
  const [activeNav, setActiveNav] = useState('Главная');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const filtered = useMemo(() => {
    return ARTICLES.filter((a) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q));
      const matchCat = !activeCategory || a.category === activeCategory;
      const matchTags = activeTags.length === 0 || activeTags.every((t) => a.tags.includes(t));
      return matchQuery && matchCat && matchTags;
    });
  }, [query, activeCategory, activeTags]);

  const hasFilters = query || activeCategory || activeTags.length > 0;
  const lead = filtered[0];
  const rest = filtered.slice(1);

  const resetFilters = () => {
    setQuery('');
    setActiveCategory(null);
    setActiveTags([]);
  };

  return (
    <div className="min-h-screen bg-background paper-grain selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container max-w-6xl flex items-center justify-between h-16">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold tracking-tight">{SITE_NAME}</span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.25em] text-muted-foreground pb-1">
              {SITE_TAGLINE}
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`text-sm story-underline ${
                  activeNav === item ? 'text-primary font-semibold' : 'text-foreground/70'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <Icon name="Search" size={18} />
            <span className="hidden sm:inline">Поиск</span>
          </button>
        </div>
      </header>

      {/* Date ribbon */}
      <div className="border-b border-border bg-secondary/40">
        <div className="container max-w-6xl flex items-center justify-between py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>Четверг, 18 июня 2026</span>
          <span className="hidden sm:inline">Независимое издание о людях и идеях</span>
        </div>
      </div>

      {/* Search panel */}
      <section
        className={`overflow-hidden border-b border-border bg-card transition-all duration-500 ${
          searchOpen ? 'max-h-[600px]' : 'max-h-0'
        }`}
      >
        <div className="container max-w-6xl py-8 space-y-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              autoFocus={searchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Искать по статьям, авторам и темам…"
              className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-sm font-serif text-xl outline-none focus:border-primary transition-colors"
            />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Категории</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory((c) => (c === cat ? null : cat))}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary text-foreground/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Теги</p>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-sm transition-colors ${
                    activeTags.includes(tag)
                      ? 'text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Icon name="X" size={15} /> Сбросить фильтры
            </button>
          )}
        </div>
      </section>

      <main className="container max-w-6xl py-12">
        {hasFilters && (
          <p className="mb-8 text-sm text-muted-foreground animate-fade-in-slow">
            Найдено материалов: <span className="text-foreground font-semibold">{filtered.length}</span>
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="py-24 text-center animate-fade-in">
            <Icon name="SearchX" size={40} className="mx-auto text-muted-foreground mb-4" />
            <p className="font-serif text-2xl mb-2">Ничего не нашлось</p>
            <p className="text-muted-foreground">Попробуйте изменить запрос или сбросить фильтры.</p>
          </div>
        ) : (
          <>
            {/* Lead story */}
            {lead && (
              <Link to={`/article/${lead.slug}`} className="grid lg:grid-cols-2 gap-10 mb-16 animate-fade-in group cursor-pointer">
                <div className="overflow-hidden rounded-sm order-1 lg:order-none">
                  <img
                    src={lead.image || HERO_IMAGE}
                    alt={lead.title}
                    className="w-full h-full max-h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-primary mb-4">
                    <span>{lead.category}</span>
                    <span className="w-8 h-px bg-primary/40" />
                    <span className="text-muted-foreground">{lead.date}</span>
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-[1.05] mb-5 text-balance group-hover:text-primary transition-colors">
                    {lead.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                    {lead.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="text-foreground font-medium">{lead.author}</span>
                    <span>·</span>
                    <span>{lead.readMin} мин чтения</span>
                  </div>
                </div>
              </Link>
            )}

            <div className="border-t border-border pt-12">
              <h2 className="font-serif text-2xl mb-8 flex items-baseline gap-4">
                Свежие материалы
                <span className="flex-1 h-px bg-border" />
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {rest.map((a, i) => (
                  <Link
                    to={`/article/${a.slug}`}
                    key={a.id}
                    className="group cursor-pointer animate-fade-in block"
                    style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
                  >
                    {a.image && (
                      <div className="overflow-hidden rounded-sm mb-4">
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-primary mb-3">
                      <span>{a.category}</span>
                      <span className="text-muted-foreground normal-case tracking-normal">{a.date}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-medium leading-tight mb-3 group-hover:text-primary transition-colors text-balance">
                      {a.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{a.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="text-foreground/80">{a.author}</span>
                      <span>{a.readMin} мин</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Categories strip */}
        <section className="mt-24 border-t border-border pt-12">
          <h2 className="font-serif text-2xl mb-8">Разделы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-sm overflow-hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchOpen(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-card hover:bg-primary hover:text-primary-foreground transition-colors py-8 px-4 text-center group"
              >
                <span className="font-serif text-xl">{cat}</span>
                <span className="block mt-1 text-xs text-muted-foreground group-hover:text-primary-foreground/70">
                  {ARTICLES.filter((a) => a.category === cat).length} материалов
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* About / Newsletter */}
        <section className="mt-24 grid lg:grid-cols-2 gap-12 items-center bg-secondary/40 rounded-sm p-10 md:p-14">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 leading-tight text-balance">
              Истории, которые стоит читать медленно
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              «Глагол» — независимое издание о людях, городах и идеях. Мы пишем длинно, думаем вдумчиво
              и выходим без спешки.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Ваш e-mail"
              className="flex-1 px-4 py-3 bg-background border border-border rounded-sm outline-none focus:border-primary transition-colors"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap">
              Подписаться
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container max-w-6xl py-12 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <span className="font-serif text-2xl font-bold">{SITE_NAME}</span>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Независимое издание о людях и идеях. © 2026. Все материалы вымышлены.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Разделы</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n}>
                  <button onClick={() => setActiveNav(n)} className="text-foreground/70 hover:text-primary transition-colors">
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">Контакты</p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>hello@glagol.media</li>
              <li>+7 900 000-00-00</li>
              <li className="flex gap-3 pt-2">
                <Icon name="Send" size={18} className="hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Mail" size={18} className="hover:text-primary cursor-pointer transition-colors" />
                <Icon name="Rss" size={18} className="hover:text-primary cursor-pointer transition-colors" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}