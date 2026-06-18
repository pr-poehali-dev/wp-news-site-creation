export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readMin: number;
  author: string;
  image: string;
  body: string[];
}

export const HERO_IMAGE =
  'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/a6b880b8-8850-406f-85dc-cb5d6724aaba.jpg';

export const CATEGORIES = ['Политика', 'Экономика', 'Технологии', 'Культура', 'Наука', 'Город', 'Федеральные новости'];

export const ALL_TAGS = ['аналитика', 'интервью', 'репортаж', 'мнение', 'данные', 'история', 'тренды', 'хроника'];

const LOREM = [
  'Этот город меняется не громкими реформами, а тысячами тихих решений. Где-то жильцы разбили сад на месте парковки, где-то соседи договорились вместе чинить старую лестницу — и эти мелочи постепенно складываются в новую ткань повседневности.',
  'Мы провели несколько недель, наблюдая за тем, как люди возвращают себе общественные пространства. Главный вывод оказался неожиданным: чтобы место ожило, нужны не деньги, а внимание и постоянство тех, кто им пользуется.',
  'Исследователи, с которыми мы говорили, сходятся в одном — будущее принадлежит не самым большим проектам, а самым устойчивым привычкам. И именно поэтому за этими историями стоит следить внимательнее, чем за громкими заголовками.',
];

export const ARTICLES: Article[] = [
  { id: 1, slug: 'gorod-peresobiraet-sebya', title: 'Город пересобирает себя: как меняются общественные пространства', excerpt: 'Большое исследование о том, как тихие дворы и заброшенные набережные превращаются в центры жизни.', category: 'Город', tags: ['аналитика', 'репортаж'], date: '18 июня 2026', readMin: 8, author: 'Анна Веденеева', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/eb91dd41-89b0-461b-969c-77ddfbd7ad92.jpg', body: LOREM },
  { id: 2, slug: 'tihaya-revolyuciya-v-energetike', title: 'Тихая революция в энергетике: что показали последние данные', excerpt: 'Цифры, которые меняют представление об устойчивом будущем и роли локальных сетей.', category: 'Экономика', tags: ['данные', 'тренды'], date: '17 июня 2026', readMin: 6, author: 'Игорь Снегов', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/c5cd10be-54bc-487b-bf59-3c3f57138935.jpg', body: LOREM },
  { id: 3, slug: 'algoritmy-kotorye-uchatsya-zabyvat', title: 'Алгоритмы, которые учатся забывать', excerpt: 'Разговор с исследователями о новом подходе к памяти машин и приватности.', category: 'Технологии', tags: ['интервью', 'тренды'], date: '16 июня 2026', readMin: 11, author: 'Лев Карпов', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/8bfe4eff-a475-4ed0-bb24-0dee40c287a7.jpg', body: LOREM },
  { id: 4, slug: 'vozvrashenie-medlennogo-chteniya', title: 'Возвращение медленного чтения', excerpt: 'Почему длинные тексты снова в моде и что это говорит о нас самих.', category: 'Культура', tags: ['мнение', 'история'], date: '15 июня 2026', readMin: 5, author: 'Мария Тон', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/b39202b7-f9af-4799-bf18-bbd9ba2ed26c.jpg', body: LOREM },
  { id: 5, slug: 'karta-tishiny', title: 'Карта тишины: где в мегаполисе ещё можно услышать себя', excerpt: 'Акустический атлас города — неожиданный взгляд на привычные улицы.', category: 'Наука', tags: ['данные', 'репортаж'], date: '14 июня 2026', readMin: 7, author: 'Пётр Зорин', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/0141f9d1-6608-4b5b-a0e3-40f3bb60c1cb.jpg', body: LOREM },
  { id: 6, slug: 'novaya-hronika-malyh-del', title: 'Новая хроника малых дел', excerpt: 'Истории людей, которые меняют свои районы без громких заявлений.', category: 'Город', tags: ['хроника', 'история'], date: '13 июня 2026', readMin: 9, author: 'Анна Веденеева', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/96a905b0-a4a6-406e-aa13-de7b67b8626f.jpg', body: LOREM },
  { id: 7, slug: 'ekonomika-vnimaniya', title: 'Экономика внимания достигла предела', excerpt: 'Аналитики спорят: что приходит на смену бесконечной ленте.', category: 'Экономика', tags: ['аналитика', 'мнение'], date: '12 июня 2026', readMin: 6, author: 'Игорь Снегов', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/d9d273fb-84e6-4cf1-a398-595ad4d8116d.jpg', body: LOREM },
  { id: 8, slug: 'muzei-otkryvayut-zapasniki', title: 'Музеи открывают свои запасники', excerpt: 'Тысячи работ впервые становятся доступны — репортаж из хранилищ.', category: 'Культура', tags: ['репортаж', 'история'], date: '11 июня 2026', readMin: 4, author: 'Мария Тон', image: 'https://cdn.poehali.dev/projects/c9190c0b-89c7-4186-a95c-d2ead77fea4b/files/c8edc3d8-705d-40a9-adfc-93405ba40157.jpg', body: LOREM },
];

export const SITE_NAME = 'Пресса40.ру';
export const SITE_TAGLINE = 'сетевое издание';

export const NAV = ['Главная', 'Новости', 'Архив', 'Категории', 'О сайте', 'Контакты'];

export const getArticleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);