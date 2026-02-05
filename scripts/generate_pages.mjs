import fs from "node:fs";
import path from "node:path";

const pagesDir = path.join(process.cwd(), "pages");
fs.mkdirSync(pagesDir, { recursive: true });

const ICON_HOME = '<svg viewBox="0 0 24 24" class="ico"><path d="M12 3l9 8h-3v10h-5v-6H11v6H6V11H3l9-8z"/></svg>';
const ICON_TOURN = '<svg viewBox="0 0 24 24" class="ico"><path d="M6 4h12v2H6V4zm2 4h8l1 4H7l1-4zm-2 6h12v2H6v-2zm2 4h8v2H8v-2z"/></svg>';
const ICON_GAME = '<svg viewBox="0 0 24 24" class="ico"><path d="M7 6h10a4 4 0 014 4v2a4 4 0 01-4 4h-1l-2 2H10l-2-2H7a4 4 0 01-4-4v-2a4 4 0 014-4zm2 5a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2z"/></svg>';
const ICON_MATCH = '<svg viewBox="0 0 24 24" class="ico"><path d="M7 3h10v2H7V3zm2 6h6v2H9V9zm-2 5h10v2H7v-2zm2 5h6v2H9v-2z"/></svg>';
const ICON_SHOP = '<svg viewBox="0 0 24 24" class="ico"><path d="M7 18c-1.1 0-2-.9-2-2V6h2v10h12v2H7zM9 6h10v10H9V6zm2 2v6h6V8h-6z"/></svg>';
const ICON_TEAM = '<svg viewBox="0 0 24 24" class="ico"><path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.95 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>';

const NAV_ITEMS = [
  ["home", "Accueil", "../index.html", ICON_HOME],
  ["tournaments", "Tournois", "tournaments.html", ICON_TOURN],
  ["games", "Jeux", "games.html", ICON_GAME],
  ["matches", "Matchs", "matches.html", ICON_MATCH],
  ["shop", "Boutique", "shop.html", ICON_SHOP],
  ["teams", "Équipe", "teams.html", ICON_TEAM],
];

const AUTH_MODAL = `
  <div class="authModal" id="authModal" aria-hidden="true">
    <div class="authModal__backdrop" data-close="true"></div>
    <div class="authCard" role="dialog" aria-modal="true" aria-label="Connexion">
      <div class="authCard__head">
        <div>
          <div class="authCard__title">Connexion</div>
          <div class="authCard__sub">Email + mot de passe, puis “mot de passe oublié”.</div>
        </div>
        <button class="iconBtn" data-close="true" aria-label="Fermer">
          <svg viewBox="0 0 24 24" class="ico">
            <path d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4z"/>
          </svg>
        </button>
      </div>
      <form class="authForm" id="loginForm">
        <label class="field">
          <span class="field__label">Email</span>
          <input type="email" name="email" placeholder="ex: you@email.com" required />
        </label>
        <label class="field">
          <span class="field__label">Mot de passe</span>
          <input type="password" name="password" placeholder="••••••••" required minlength="6" />
        </label>
        <button class="btn btn--primary authForm__submit" type="submit">Se connecter</button>
        <div class="authForm__bottom">
          <a class="authLink" href="forgot-password.html" id="forgotLink">Mot de passe oublié ?</a>
        </div>
      </form>
    </div>
  </div>
`;

const FOOTER = `
      <footer class="footer">
        <div>© 2026 Pulse — Front-office</div>
        <div class="footer__links">
          <a href="about.html">À propos</a>
          <a href="contact.html">Contact</a>
          <a href="faq.html">FAQ</a>
        </div>
      </footer>
`;

const nav = (activeKey) =>
  `<nav class="topbar" aria-label="Navigation principale">` +
  NAV_ITEMS.map(([key, label, href, icon]) => {
    const cls = `topbar__item${key === activeKey ? " is-active" : ""}`;
    return `<a class="${cls}" href="${href}">
          <span class="topbar__icon">${icon}</span>
          <span class="topbar__label">${label}</span>
        </a>`;
  }).join("\n") +
  `</nav>`;

const hero = (title, kicker, subtitle, activeNav) => `
  <header class="heroMini">
    <div class="heroFull__bg heroMini__bg" data-bg="../ll.png"></div>
    <div class="heroFull__overlay"></div>
    <div class="heroTop">
      <a class="brand" href="../index.html" aria-label="Pulse">
        <span class="brand__logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="ico">
            <path d="M4 4h16v16H4V4zm3 3v10h10V7H7zm2 2h6v6H9V9z"/>
          </svg>
        </span>
        <span class="brand__text">
          <span class="brand__name">PULSE</span>
          <span class="brand__small">e-sport arena</span>
        </span>
      </a>
      ${nav(activeNav)}
      <div class="heroTop__right">
        <a class="btn btn--ghost" href="register.html">S’inscrire</a>
        <button class="signInBtn" id="btnOpenAuth" type="button">
          <span class="signInBtn__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="ico">
              <path d="M10 17l1.4-1.4-2.6-2.6H20v-2H8.8l2.6-2.6L10 7l-7 7 7 7zm-6 4h6v-2H4V5h6V3H4a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
          </span>
          <span class="signInBtn__text">SIGN IN</span>
        </button>
        <button class="menuBtn" type="button" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="heroMini__center">
      <div class="heroKicker">${kicker}</div>
      <h1 class="heroMini__title">${title}</h1>
      <div class="heroMini__sub">${subtitle}</div>
      <div class="breadcrumbs">
        <a href="../index.html">Accueil</a>
        <span>•</span>
        <span>${title}</span>
      </div>
    </div>
    <div class="heroSlash" aria-hidden="true"></div>
  </header>
`;

const pageHtml = (title, kicker, subtitle, activeNav, body) => `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PULSE - ${title}</title>
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
${hero(title, kicker, subtitle, activeNav)}

  <main class="page">
    <section class="belowHero">
${body}
${FOOTER}
    </section>
  </main>
${AUTH_MODAL}
  <script src="../app.js"></script>
</body>
</html>
`;

const cardsGrid = (cards) => `<div class="cardsGrid">\n${cards.join("\n")}\n</div>`;

const schemaPanel = (tables) => `
      <div class="panel">
        <div class="panel__head">
          <div>
            <h3 class="panel__title">TABLES UTILISÉES</h3>
            <div class="panel__desc">Schéma réel + colonnes clés.</div>
          </div>
        </div>
        <div class="list">
          ${tables
            .map(
              (t) =>
                `<div class="listItem"><span><b>${t.name}</b></span><span class="listItem__meta">${t.cols}</span></div>`
            )
            .join("")}
        </div>
      </div>
`;

const sampleTournaments = [
  {
    title: "Pulse Invitational — Valorant",
    game: "Valorant",
    format: "BO3",
    status: "OPEN",
    prize: "1200 DT",
    dates: "18–22 Fév",
    matchesDone: 7,
    matchesTotal: 20,
    progress: 35,
    img: "https://picsum.photos/seed/pulse_t1/1200/800",
  },
  {
    title: "CS2 Arena Cup — Winter Split",
    game: "CS2",
    format: "BO1",
    status: "ONGOING",
    prize: "900 DT",
    dates: "20–23 Fév",
    matchesDone: 12,
    matchesTotal: 20,
    progress: 60,
    img: "https://picsum.photos/seed/pulse_t2/1200/800",
  },
  {
    title: "League Clash — Weekend Major",
    game: "League of Legends",
    format: "BO5",
    status: "OPEN",
    prize: "2500 DT",
    dates: "23–25 Fév",
    matchesDone: 0,
    matchesTotal: 16,
    progress: 0,
    img: "https://picsum.photos/seed/pulse_t3/1200/800",
  },
  {
    title: "Fortnite Zero Build Cup",
    game: "Fortnite",
    format: "BO1",
    status: "OPEN",
    prize: "700 DT",
    dates: "25 Fév",
    matchesDone: 0,
    matchesTotal: 24,
    progress: 0,
    img: "https://picsum.photos/seed/pulse_t4/1200/800",
  },
];

const sampleGames = [
  { name: "Valorant", category: "FPS", publisher: "Riot", tournaments: 6, img: "https://picsum.photos/seed/pulse_g1/1200/800" },
  { name: "Counter-Strike 2", category: "FPS", publisher: "Valve", tournaments: 4, img: "https://picsum.photos/seed/pulse_g2/1200/800" },
  { name: "League of Legends", category: "MOBA", publisher: "Riot", tournaments: 5, img: "https://picsum.photos/seed/pulse_g3/1200/800" },
  { name: "Fortnite", category: "BR", publisher: "Epic", tournaments: 3, img: "https://picsum.photos/seed/pulse_g4/1200/800" },
];

const sampleTeams = [
  { name: "Nebula Five", region: "MENA", members: 12, img: "https://picsum.photos/seed/pulse_team_1/1200/800", logo: "https://picsum.photos/seed/pulse_logo_1/200/200" },
  { name: "North Hydra", region: "EU", members: 9, img: "https://picsum.photos/seed/pulse_team_2/1200/800", logo: "https://picsum.photos/seed/pulse_logo_2/200/200" },
  { name: "Sandstorm", region: "MENA", members: 15, img: "https://picsum.photos/seed/pulse_team_3/1200/800", logo: "https://picsum.photos/seed/pulse_logo_3/200/200" },
  { name: "Aurora Squad", region: "NA", members: 10, img: "https://picsum.photos/seed/pulse_team_4/1200/800", logo: "https://picsum.photos/seed/pulse_logo_4/200/200" },
];

const sampleProducts = [
  { name: "Pulse Hoodie — Neon", price: "89 DT", stock: 14, team: "Nebula Five", img: "https://picsum.photos/seed/pulse_p1/1200/800" },
  { name: "Team Jersey — Pro Edition", price: "69 DT", stock: 7, team: "North Hydra", img: "https://picsum.photos/seed/pulse_p2/1200/800" },
  { name: "Mousepad XL — Arena", price: "39 DT", stock: 33, team: "Aurora Squad", img: "https://picsum.photos/seed/pulse_p3/1200/800" },
  { name: "Cap — Limited Drop", price: "29 DT", stock: 5, team: "Sandstorm", img: "https://picsum.photos/seed/pulse_p4/1200/800" },
];

const samplePlayers = [
  { display: "Zed", username: "ZED_99", country: "TN", role: "PLAYER", img: "https://picsum.photos/seed/pulse_u1/1200/800", avatar: "https://picsum.photos/seed/pulse_a1/200/200" },
  { display: "Frost", username: "FrostByte", country: "FR", role: "CAPTAIN", img: "https://picsum.photos/seed/pulse_u2/1200/800", avatar: "https://picsum.photos/seed/pulse_a2/200/200" },
  { display: "Kairo", username: "Kairo", country: "TN", role: "PLAYER", img: "https://picsum.photos/seed/pulse_u3/1200/800", avatar: "https://picsum.photos/seed/pulse_a3/200/200" },
  { display: "Nova", username: "NovaAim", country: "US", role: "PLAYER", img: "https://picsum.photos/seed/pulse_u4/1200/800", avatar: "https://picsum.photos/seed/pulse_a4/200/200" },
];

const sampleMatches = [
  { title: "Nebula Five vs North Hydra", round: "Quarterfinal", status: "SCHEDULED", when: "Jeu 20:00", tournament: "CS2 Arena Cup", img: "https://picsum.photos/seed/pulse_m1/1200/800" },
  { title: "Sandstorm vs Aurora Squad", round: "Semifinal", status: "ONGOING", when: "Live", tournament: "League Clash", img: "https://picsum.photos/seed/pulse_m2/1200/800" },
  { title: "Nebula Five vs Sandstorm", round: "Final", status: "FINISHED", when: "Terminé", tournament: "Pulse Invitational", img: "https://picsum.photos/seed/pulse_m3/1200/800" },
];

const samplePosts = [
  { author: "ZED_99", content: "Victoire 3-1 au Pulse Invitational !", likes: 42, comments: 9 },
  { author: "NovaAim", content: "Nouveau produit disponible dans la boutique Aurora Squad.", likes: 15, comments: 2 },
  { author: "FrostByte", content: "Roster update + essais ouverts cette semaine.", likes: 28, comments: 7 },
];

const cardTournament = (t) => `
    <article class="card card--tournament">
      <div class="card__media" data-bg="${t.img}">
        <div class="card__chips">
          <span class="chip chip--status">${t.status}</span>
          <span class="chip chip--format">${t.format}</span>
          <span class="chip">${t.game}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${t.title}</h4>
        <p class="card__desc">Dates: <b>${t.dates}</b> • Prize pool: <b>${t.prize}</b></p>
        <div class="card__metaRow">
          <span class="metaPill">Matchs: <b>${t.matchesDone}/${t.matchesTotal}</b></span>
          <span class="metaPill">Statut: <b>${t.status}</b></span>
        </div>
        <div class="progress"><div class="progress__bar" style="width:${t.progress}%"></div></div>
        <div class="card__actions">
          <a class="btn btn--ghost" href="tournament-detail.html">Voir détail</a>
        </div>
      </div>
    </article>
`;

const cardGame = (g) => `
    <article class="card card--game">
      <div class="card__media" data-bg="${g.img}">
        <div class="card__chips">
          <span class="chip chip--category">${g.category}</span>
          <span class="chip">Publisher: ${g.publisher}</span>
          <span class="chip">Tournois: ${g.tournaments}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${g.name}</h4>
        <p class="card__desc">Jeu populaire basé sur l’activité des tournois.</p>
        <div class="card__actions">
          <a class="btn btn--ghost" href="game-detail.html">Détail</a>
        </div>
      </div>
    </article>
`;

const cardTeam = (t) => `
    <article class="card card--team">
      <div class="card__media" data-bg="${t.img}">
        <div class="card__chips">
          <span class="chip chip--region">${t.region}</span>
          <span class="chip">Membres: ${t.members}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${t.name}</h4>
        <p class="card__desc">Équipe e-sport • Tournois • Boutique</p>
        <div class="avatarRow">
          <div class="avatar" data-avatar="${t.logo}" aria-hidden="true"></div>
          <div class="avatarText">
            <div class="name">${t.name}</div>
            <div class="sub">${t.region} • ${t.members} membres</div>
          </div>
        </div>
        <div class="card__actions">
          <a class="btn btn--ghost" href="team-detail.html">Détail équipe</a>
        </div>
      </div>
    </article>
`;

const cardProduct = (p, actionHref = "login.html") => `
    <article class="card card--product">
      <div class="card__media" data-bg="${p.img}">
        <div class="card__chips">
          <span class="chip chip--price">${p.price}</span>
          <span class="chip">Stock: ${p.stock}</span>
          <span class="chip">${p.team}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${p.name}</h4>
        <p class="card__desc">Vendeur: <b>${p.team}</b></p>
        <div class="card__actions">
          <a class="btn btn--ghost" href="product-detail.html">Détail</a>
          <a class="btn btn--primary" href="${actionHref}">Ajouter au panier</a>
        </div>
      </div>
    </article>
`;

const cardPlayer = (p, actionHref = "login.html") => `
    <article class="card card--member">
      <div class="card__media" data-bg="${p.img}">
        <div class="card__chips">
          <span class="chip chip--role">${p.role}</span>
          <span class="chip">${p.country}</span>
          <span class="chip">@${p.username}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${p.display}</h4>
        <p class="card__desc">Profil public • Message • Invitation équipe</p>
        <div class="avatarRow">
          <div class="avatar" data-avatar="${p.avatar}" aria-hidden="true"></div>
          <div class="avatarText">
            <div class="name">${p.display}</div>
            <div class="sub">${p.role} • ${p.country}</div>
          </div>
        </div>
        <div class="card__actions">
          <a class="btn btn--ghost" href="player-profile.html">Voir profil</a>
          <a class="btn btn--primary" href="${actionHref}">Ajouter ami</a>
        </div>
      </div>
    </article>
`;

const cardMatch = (m) => `
    <article class="card card--tournament">
      <div class="card__media" data-bg="${m.img}">
        <div class="card__chips">
          <span class="chip">${m.status}</span>
          <span class="chip">${m.round}</span>
          <span class="chip">${m.tournament}</span>
        </div>
      </div>
      <div class="card__body">
        <h4 class="card__title">${m.title}</h4>
        <p class="card__desc">${m.when}</p>
        <div class="card__actions">
          <a class="btn btn--ghost" href="match-detail.html">Détail match</a>
        </div>
      </div>
    </article>
`;

const postList = (posts, authHref = "login.html") => `
      <div class="list">
        ${posts
          .map(
            (p) => `
          <div class="listItem">
            <div>
              <b>@${p.author}</b>
              <div class="listItem__meta">${p.content}</div>
            </div>
            <div class="listItem__meta">${p.likes} likes • ${p.comments} commentaires</div>
          </div>`
          )
          .join("")}
      </div>
      <div class="panel__actions" style="margin-top:10px;">
        <a class="btn btn--ghost" href="${authHref}">Like / Commenter → Connexion</a>
      </div>
`;

const sidebar = (title, items, active) => `
  <aside class="sideNav">
    <div class="sideNav__title">${title}</div>
    ${items
      .map(
        (it) =>
          `<a class="${active === it.key ? "is-active" : ""}" href="${it.href}">${it.label}</a>`
      )
      .join("")}
  </aside>
`;

const playerSidebar = (active) =>
  sidebar("ESPACE JOUEUR", [
    { key: "dashboard", label: "Dashboard", href: "dashboard.html" },
    { key: "profile", label: "Mon profil", href: "profile.html" },
    { key: "players", label: "Recherche joueurs", href: "players.html" },
    { key: "friends", label: "Amis", href: "friends.html" },
    { key: "messages", label: "Messages", href: "messages.html" },
    { key: "feed", label: "Fil d’actualité", href: "feed.html" },
    { key: "teams", label: "Mes équipes", href: "my-teams.html" },
    { key: "requests", label: "Mes demandes", href: "my-requests.html" },
    { key: "orders", label: "Mes commandes", href: "orders.html" },
    { key: "notifications", label: "Notifications", href: "notifications.html" },
  ], active);

const captainSidebar = (active) =>
  sidebar("ESPACE CAPITAINE", [
    { key: "team", label: "Mon équipe", href: "captain-team-manage.html" },
    { key: "members", label: "Membres", href: "captain-members.html" },
    { key: "requests", label: "Demandes", href: "captain-requests.html" },
    { key: "invite", label: "Inviter", href: "captain-invite.html" },
    { key: "products", label: "Produits", href: "captain-products.html" },
    { key: "orders", label: "Commandes", href: "captain-orders.html" },
    { key: "tournaments", label: "Tournois", href: "captain-tournaments.html" },
  ], active);

const organizerSidebar = (active) =>
  sidebar("ESPACE ORGANISATEUR", [
    { key: "request", label: "Demande tournoi", href: "organizer-request-create.html" },
    { key: "requests", label: "Mes demandes", href: "organizer-requests.html" },
    { key: "tournaments", label: "Mes tournois", href: "organizer-tournaments.html" },
    { key: "registrations", label: "Inscriptions", href: "organizer-registrations.html" },
    { key: "matches", label: "Matchs", href: "organizer-matches.html" },
  ], active);

const withSidebar = (sidebarHtml, contentHtml) => `
      <div class="layout">
        ${sidebarHtml}
        <div>
          ${contentHtml}
        </div>
      </div>
`;

const teamSwitcher = `
          <div class="panel">
            <div class="filtersRow">
              <div class="select">
                <select>
                  <option>Équipe active</option>
                  <option>Nebula Five</option>
                  <option>North Hydra</option>
                </select>
              </div>
              <button class="btn btn--ghost" type="button">Changer</button>
            </div>
          </div>
`;

const pages = {};

// PAGES_START
pages["games.html"] = () => ({
  title: "Catalogue des jeux",
  kicker: "JEUX",
  subtitle: "Explorez tous les jeux, catégories et tournois associés.",
  nav: "games",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Catalogue des jeux</h1>
          <p>Recherche par nom + filtres catégories, publisher et tournois actifs.</p>
        </div>
        <div class="pageHeader__actions">
          <button class="btn btn--soft">Popularité</button>
          <button class="btn btn--ghost">Plus récents</button>
          <button class="btn btn--ghost">A–Z</button>
        </div>
      </div>

      <div class="panel">
        <div class="filtersRow">
          <input class="input" type="search" placeholder="Rechercher un jeu..." />
          <div class="select"><select><option>Catégorie</option><option>FPS</option><option>MOBA</option><option>BR</option></select></div>
          <div class="select"><select><option>Publisher</option><option>Riot</option><option>Valve</option><option>Epic</option></select></div>
          <button class="btn btn--ghost">Avec tournois actifs</button>
        </div>
      </div>

      ${cardsGrid(sampleGames.map(cardGame))}

      <div class="panel"><div class="panel__head"><h3 class="panel__title">PAGINATION</h3></div>
        <div class="list">
          <div class="listItem"><span>Page 1 / 12</span><span class="listItem__meta">12 jeux / page</span></div>
        </div>
      </div>

      ${schemaPanel([
        { name: "games", cols: "game_id, category_id, name, description, cover_image_id, publisher, created_at" },
        { name: "categories", cols: "category_id, name" },
        { name: "images", cols: "image_id, file_url" },
        { name: "tournaments", cols: "tournament_id, game_id, status, created_at" },
      ])}
    `,
});

pages["game-detail.html"] = () => ({
  title: "Détail jeu",
  kicker: "JEU",
  subtitle: "Infos complètes + tournois liés.",
  nav: "games",
  body: `
      <div class="layout">
        <section class="panel">
          <div style="display:flex; gap:14px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_game_cover/200/200"></div>
            <div>
              <h3 style="margin:0;">Valorant</h3>
              <div class="muted">Catégorie: FPS • Publisher: Riot</div>
              <div class="badge badge--info" style="margin-top:8px;">Tournois actifs</div>
            </div>
          </div>
          <p class="muted" style="margin-top:12px;">Jeu tactique 5v5 avec compétitions régulières et ligues communautaires.</p>
          <div class="statsRow" style="margin-top:12px;">
            <div class="statCard"><div class="statCard__value">12</div><div class="statCard__label">Tournois total</div></div>
            <div class="statCard"><div class="statCard__value">4</div><div class="statCard__label">Tournois actifs</div></div>
            <div class="statCard"><div class="statCard__value">48</div><div class="statCard__label">Équipes inscrites</div></div>
          </div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">PROGRESSION</h3>
          <div class="list">
            <div class="listItem"><span>Par matchs</span><span class="listItem__meta">FINISHED / TOTAL</span></div>
            <div class="listItem"><span>Fallback temps</span><span class="listItem__meta">start_date → end_date</span></div>
          </div>
        </aside>
      </div>

      <div class="panel">
        <div class="panel__head">
          <div>
            <h3 class="panel__title">TOURNOIS LIÉS</h3>
            <div class="panel__desc">Onglets rapides par statut.</div>
          </div>
        </div>
        <div class="tabs" data-tabs="game-tabs">
          <button class="tab is-active" data-tab="open">Ouverts</button>
          <button class="tab" data-tab="ongoing">En cours</button>
          <button class="tab" data-tab="finished">Terminés</button>
        </div>
        <div class="tabPanels" data-panels="game-tabs">
          <section class="tabPanel is-active" data-panel="open">${cardsGrid(sampleTournaments.slice(0, 2).map(cardTournament))}</section>
          <section class="tabPanel" data-panel="ongoing">${cardsGrid(sampleTournaments.slice(1, 2).map(cardTournament))}</section>
          <section class="tabPanel" data-panel="finished"><div class="emptyState">Aucun tournoi terminé pour ce jeu.</div></section>
        </div>
      </div>

      ${schemaPanel([
        { name: "games", cols: "game_id, category_id, cover_image_id, publisher, description" },
        { name: "categories", cols: "category_id, name" },
        { name: "tournaments", cols: "tournament_id, game_id, status, start_date, end_date" },
        { name: "matches", cols: "match_id, tournament_id, status" },
        { name: "tournament_teams", cols: "tournament_id, team_id, status" },
        { name: "images", cols: "image_id, file_url" },
      ])}
    `,
});

pages["tournaments.html"] = () => ({
  title: "Catalogue des tournois",
  kicker: "TOURNOIS",
  subtitle: "Filtres avancés + progress bar.",
  nav: "tournaments",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Catalogue des tournois</h1>
          <p>Recherche par titre + filtres jeu, statut, format, dates et prize pool.</p>
        </div>
        <div class="pageHeader__actions">
          <button class="btn btn--soft">Plus récents</button>
          <button class="btn btn--ghost">Prize pool</button>
          <button class="btn btn--ghost">Progression</button>
        </div>
      </div>

      <div class="panel">
        <div class="filtersRow">
          <input class="input" type="search" placeholder="Rechercher un tournoi..." />
          <div class="select"><select><option>Jeu</option><option>Valorant</option><option>CS2</option></select></div>
          <div class="select"><select><option>Catégorie</option><option>FPS</option><option>MOBA</option></select></div>
          <div class="select"><select><option>Statut</option><option>OPEN</option><option>ONGOING</option><option>FINISHED</option></select></div>
          <div class="select"><select><option>Format</option><option>BO1</option><option>BO3</option><option>BO5</option></select></div>
          <div class="select"><select><option>Registration</option><option>OPEN</option><option>APPROVAL</option></select></div>
          <input class="input" type="date" />
          <input class="input" type="number" placeholder="Prize min" />
          <input class="input" type="number" placeholder="Prize max" />
        </div>
      </div>

      ${cardsGrid(sampleTournaments.map(cardTournament))}

      ${schemaPanel([
        { name: "tournaments", cols: "tournament_id, game_id, title, status, start_date, end_date, max_teams, prize_pool" },
        { name: "games", cols: "game_id, category_id, name" },
        { name: "categories", cols: "category_id, name" },
        { name: "matches", cols: "match_id, tournament_id, status" },
      ])}
    `,
});

pages["tournament-detail.html"] = () => ({
  title: "Détail tournoi",
  kicker: "TOURNOI",
  subtitle: "Progression, scores, matchs et équipes.",
  nav: "tournaments",
  body: `
      <div class="layout">
        <section class="panel">
          <h3 style="margin:0;">Pulse Invitational — Valorant</h3>
          <p class="muted">Organisateur: Pulse Org • Format: BO3 • Prize pool: 1200 DT</p>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>Dates</span><span class="listItem__meta">18–22 fév</span></div>
            <div class="listItem"><span>Deadline</span><span class="listItem__meta">15 fév</span></div>
            <div class="listItem"><span>Max équipes</span><span class="listItem__meta">16</span></div>
            <div class="listItem"><span>Statut</span><span class="badge badge--info">OPEN</span></div>
          </div>
          <div class="progress" style="margin-top:10px;"><div class="progress__bar" style="width:45%"></div></div>
          <div class="muted" style="margin-top:6px;">9 matchs terminés / 20</div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">INSCRIPTIONS</h3>
          <div class="list">
            <div class="listItem"><span>Équipes acceptées</span><span class="listItem__meta">8 / 16</span></div>
            <div class="listItem"><span>Mode</span><span class="listItem__meta">APPROVAL</span></div>
          </div>
          <a class="btn btn--primary" style="margin-top:10px;" href="login.html">Participer / Inscrire équipe</a>
        </aside>
      </div>

      <div class="panel">
        <div class="tabs" data-tabs="tourn-tabs">
          <button class="tab is-active" data-tab="overview">Aperçu</button>
          <button class="tab" data-tab="scores">Scores</button>
          <button class="tab" data-tab="matches">Matchs</button>
          <button class="tab" data-tab="teams">Équipes</button>
        </div>
        <div class="tabPanels" data-panels="tourn-tabs">
          <section class="tabPanel is-active" data-panel="overview">
            <p class="muted">Description du tournoi + règles principales (rules).</p>
            <div class="list">
              <div class="listItem"><span>Règles</span><span class="listItem__meta">BO3, double élimination</span></div>
              <div class="listItem"><span>Inscriptions</span><span class="listItem__meta">Ouvertes jusqu’au 15 fév</span></div>
            </div>
          </section>
          <section class="tabPanel" data-panel="scores">
            <div class="tableWrap">
              <table class="table">
                <thead><tr><th>Équipe</th><th>MJ</th><th>V</th><th>D</th><th>Points</th></tr></thead>
                <tbody>
                  <tr><td>Nebula Five</td><td>5</td><td>4</td><td>1</td><td>12</td></tr>
                  <tr><td>North Hydra</td><td>5</td><td>3</td><td>2</td><td>9</td></tr>
                  <tr><td>Sandstorm</td><td>5</td><td>2</td><td>3</td><td>6</td></tr>
                </tbody>
              </table>
            </div>
          </section>
          <section class="tabPanel" data-panel="matches">
            <h4 style="margin:0 0 8px;">Matchs terminés</h4>
            ${cardsGrid(sampleMatches.slice(2).map(cardMatch))}
            <h4 style="margin:14px 0 8px;">Matchs en cours</h4>
            ${cardsGrid(sampleMatches.slice(1, 2).map(cardMatch))}
            <h4 style="margin:14px 0 8px;">Matchs à venir</h4>
            ${cardsGrid(sampleMatches.slice(0, 1).map(cardMatch))}
          </section>
          <section class="tabPanel" data-panel="teams">
            ${cardsGrid(sampleTeams.map(cardTeam))}
          </section>
        </div>
      </div>

      ${schemaPanel([
        { name: "tournaments", cols: "tournament_id, game_id, organizer_user_id, title, rules, status, prize_pool" },
        { name: "matches", cols: "match_id, tournament_id, status, round_name, scheduled_at" },
        { name: "match_teams", cols: "match_id, team_id, score, is_winner" },
        { name: "tournament_teams", cols: "tournament_id, team_id, status, seed" },
        { name: "teams", cols: "team_id, name, captain_user_id" },
        { name: "users", cols: "user_id, display_name" },
      ])}
    `,
});

pages["matches.html"] = () => ({
  title: "Liste des matchs",
  kicker: "MATCHS",
  subtitle: "Filtrer par tournoi, statut et équipe.",
  nav: "matches",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Liste des matchs</h1>
          <p>Vue globale ou par tournoi.</p>
        </div>
        <div class="pageHeader__actions">
          <button class="btn btn--soft">Prochains matchs</button>
          <button class="btn btn--ghost">Plus récents</button>
        </div>
      </div>

      <div class="panel">
        <div class="filtersRow">
          <div class="select"><select><option>Filtre principal</option><option>Tous</option><option>Par tournoi</option></select></div>
          <div class="select"><select><option>Statut</option><option>SCHEDULED</option><option>ONGOING</option><option>FINISHED</option></select></div>
          <div class="select"><select><option>Jeu</option><option>Valorant</option><option>CS2</option></select></div>
          <input class="input" type="date" />
          <input class="input" type="search" placeholder="Équipe" />
        </div>
      </div>

      <div class="panel">
        <div class="panel__head"><h3 class="panel__title">MATCHS</h3></div>
        <div class="tableWrap">
          <table class="table">
            <thead><tr><th>Match</th><th>Tournoi</th><th>Round</th><th>Statut</th><th>Horaire</th></tr></thead>
            <tbody>
              <tr><td>Nebula Five vs North Hydra</td><td>CS2 Arena Cup</td><td>Quarterfinal</td><td><span class="badge badge--info">SCHEDULED</span></td><td>Jeu 20:00</td></tr>
              <tr><td>Sandstorm vs Aurora Squad</td><td>League Clash</td><td>Semifinal</td><td><span class="badge badge--success">ONGOING</span></td><td>Live</td></tr>
              <tr><td>Nebula Five vs Sandstorm</td><td>Pulse Invitational</td><td>Final</td><td><span class="badge">FINISHED</span></td><td>Terminé</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      ${schemaPanel([
        { name: "matches", cols: "match_id, tournament_id, status, scheduled_at, round_name, best_of" },
        { name: "tournaments", cols: "tournament_id, title, game_id" },
        { name: "match_teams", cols: "match_id, team_id, score, is_winner" },
        { name: "teams", cols: "team_id, name" },
      ])}
    `,
});

pages["match-detail.html"] = () => ({
  title: "Détail match",
  kicker: "MATCH",
  subtitle: "Scores et équipes participantes.",
  nav: "matches",
  body: `
      <div class="layout">
        <section class="panel">
          <h3 style="margin:0;">Nebula Five vs North Hydra</h3>
          <p class="muted">Tournoi: CS2 Arena Cup • Round: Quarterfinal • BO3</p>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>Nebula Five</span><span class="badge badge--success">2</span></div>
            <div class="listItem"><span>North Hydra</span><span class="badge">1</span></div>
          </div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">INFOS</h3>
          <div class="list">
            <div class="listItem"><span>Status</span><span class="badge badge--success">FINISHED</span></div>
            <div class="listItem"><span>Heure</span><span class="listItem__meta">20:00</span></div>
            <div class="listItem"><span>Arbitre</span><span class="listItem__meta">Pulse Admin</span></div>
          </div>
        </aside>
      </div>

      ${schemaPanel([
        { name: "matches", cols: "match_id, tournament_id, status, round_name, scheduled_at, best_of" },
        { name: "match_teams", cols: "match_id, team_id, score, is_winner" },
        { name: "teams", cols: "team_id, name, logo_image_id" },
        { name: "images", cols: "image_id, file_url" },
      ])}
    `,
});

pages["teams.html"] = () => ({
  title: "Catalogue des équipes",
  kicker: "ÉQUIPES",
  subtitle: "Recherche + filtres région, produits et tournois.",
  nav: "teams",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Catalogue des équipes</h1>
          <p>Rechercher par nom, région et activité.</p>
        </div>
        <div class="pageHeader__actions">
          <button class="btn btn--soft">Plus récentes</button>
          <button class="btn btn--ghost">Alphabétique</button>
        </div>
      </div>
      <div class="panel">
        <div class="filtersRow">
          <input class="input" type="search" placeholder="Rechercher une équipe..." />
          <div class="select"><select><option>Région</option><option>MENA</option><option>EU</option><option>NA</option></select></div>
          <button class="btn btn--ghost">Avec produits</button>
          <button class="btn btn--ghost">Actif en tournois</button>
        </div>
      </div>
      ${cardsGrid(sampleTeams.map(cardTeam))}
      ${schemaPanel([
        { name: "teams", cols: "team_id, name, region, captain_user_id, logo_image_id" },
        { name: "team_members", cols: "team_id, user_id, is_active" },
        { name: "users", cols: "user_id, display_name" },
        { name: "tournament_teams", cols: "tournament_id, team_id" },
        { name: "images", cols: "image_id, file_url" },
      ])}
    `,
});

pages["team-detail.html"] = () => ({
  title: "Détail équipe",
  kicker: "ÉQUIPE",
  subtitle: "Tournois, membres et boutique.",
  nav: "teams",
  body: `
      <div class="layout">
        <section class="panel">
          <div style="display:flex; gap:14px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_logo_1/200/200"></div>
            <div>
              <h3 style="margin:0;">Nebula Five</h3>
              <div class="muted">Région: MENA • Capitaine: FrostByte</div>
              <div style="margin-top:8px;">
                <a class="btn btn--primary" href="login.html">Demander rejoindre</a>
                <a class="btn btn--ghost" href="login.html">Message capitaine</a>
              </div>
            </div>
          </div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">STATS</h3>
          <div class="statsRow">
            <div class="statCard"><div class="statCard__value">12</div><div class="statCard__label">Membres</div></div>
            <div class="statCard"><div class="statCard__value">8</div><div class="statCard__label">Produits</div></div>
          </div>
        </aside>
      </div>

      <div class="panel">
        <div class="tabs" data-tabs="team-tabs">
          <button class="tab is-active" data-tab="tournaments">Tournois</button>
          <button class="tab" data-tab="members">Membres</button>
          <button class="tab" data-tab="products">Produits</button>
        </div>
        <div class="tabPanels" data-panels="team-tabs">
          <section class="tabPanel is-active" data-panel="tournaments">
            ${cardsGrid(sampleTournaments.slice(0, 3).map(cardTournament))}
          </section>
          <section class="tabPanel" data-panel="members">
            ${cardsGrid(samplePlayers.map((p) => cardPlayer(p, "login.html")))}
          </section>
          <section class="tabPanel" data-panel="products">
            ${cardsGrid(sampleProducts.map((p) => cardProduct(p, "login.html")))}
          </section>
        </div>
      </div>

      ${schemaPanel([
        { name: "teams", cols: "team_id, name, captain_user_id, logo_image_id" },
        { name: "team_members", cols: "team_id, user_id, is_active" },
        { name: "tournament_teams", cols: "tournament_id, team_id, status" },
        { name: "products", cols: "product_id, team_id, name, price, stock_qty" },
        { name: "team_join_requests", cols: "request_id, team_id, user_id, status" },
      ])}
    `,
});

pages["shop.html"] = () => ({
  title: "Boutique",
  kicker: "BOUTIQUE",
  subtitle: "Catalogue des produits vendus par les équipes.",
  nav: "shop",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Boutique</h1>
          <p>Recherche + filtres prix, stock, équipe vendeuse.</p>
        </div>
        <div class="pageHeader__actions">
          <button class="btn btn--soft">Best sellers</button>
          <button class="btn btn--ghost">Nouveautés</button>
          <button class="btn btn--ghost">Prix</button>
        </div>
      </div>
      <div class="panel">
        <div class="filtersRow">
          <input class="input" type="search" placeholder="Rechercher un produit..." />
          <div class="select"><select><option>Équipe vendeuse</option><option>Nebula Five</option><option>North Hydra</option></select></div>
          <input class="input" type="number" placeholder="Prix min" />
          <input class="input" type="number" placeholder="Prix max" />
          <button class="btn btn--ghost">En stock</button>
          <button class="btn btn--ghost">Actifs</button>
        </div>
      </div>
      ${cardsGrid(sampleProducts.map((p) => cardProduct(p, "login.html")))}
      ${schemaPanel([
        { name: "products", cols: "product_id, team_id, name, price, stock_qty, is_active" },
        { name: "product_images", cols: "product_id, image_id, position" },
        { name: "teams", cols: "team_id, name" },
        { name: "cart_items", cols: "cart_id, product_id, quantity" },
        { name: "carts", cols: "cart_id, status" },
      ])}
    `,
});

pages["product-detail.html"] = () => ({
  title: "Détail produit",
  kicker: "PRODUIT",
  subtitle: "Fiche produit + actions.",
  nav: "shop",
  body: `
      <div class="layout">
        <section class="panel">
          <div style="display:flex; gap:16px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_p1/200/200"></div>
            <div>
              <h3 style="margin:0;">Pulse Hoodie — Neon</h3>
              <div class="muted">Vendeur: Nebula Five • Stock: 14</div>
              <div class="badge badge--warning" style="margin-top:8px;">89 DT</div>
              <div style="margin-top:10px;">
                <a class="btn btn--primary" href="login.html">Ajouter au panier</a>
                <a class="btn btn--ghost" href="team-detail.html">Voir équipe</a>
              </div>
            </div>
          </div>
          <p class="muted" style="margin-top:12px;">Hoodie officiel avec broderie néon, coupe unisexe.</p>
          <div class="avatarRow" style="margin-top:12px;">
            <div class="avatar" data-avatar="https://picsum.photos/seed/pulse_p1a/120/120"></div>
            <div class="avatar" data-avatar="https://picsum.photos/seed/pulse_p1b/120/120"></div>
            <div class="avatar" data-avatar="https://picsum.photos/seed/pulse_p1c/120/120"></div>
          </div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">DÉTAILS</h3>
          <div class="list">
            <div class="listItem"><span>SKU</span><span class="listItem__meta">PH-NEON</span></div>
            <div class="listItem"><span>Tailles</span><span class="listItem__meta">S / M / L</span></div>
            <div class="listItem"><span>Livraison</span><span class="listItem__meta">48h</span></div>
          </div>
        </aside>
      </div>
      ${schemaPanel([
        { name: "products", cols: "product_id, team_id, name, description, price, stock_qty" },
        { name: "product_images", cols: "product_id, image_id, position" },
        { name: "teams", cols: "team_id, name" },
        { name: "images", cols: "image_id, file_url" },
        { name: "cart_items", cols: "cart_id, product_id, quantity" },
      ])}
    `,
});

pages["feed-public.html"] = () => ({
  title: "Fil public",
  kicker: "COMMUNAUTÉ",
  subtitle: "Posts publics uniquement.",
  nav: "home",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Fil public</h1>
          <p>Posts PUBLIC visibles par les visiteurs.</p>
        </div>
      </div>
      <div class="panel">
        <div class="filtersRow">
          <div class="select"><select><option>Tout</option><option>Par auteur</option></select></div>
          <input class="input" type="search" placeholder="Auteur" />
          <button class="btn btn--ghost">Avec images</button>
          <button class="btn btn--ghost">Plus récents</button>
        </div>
      </div>
      <div class="panel">
        <div class="panel__head"><h3 class="panel__title">POSTS</h3></div>
        ${postList(samplePosts)}
      </div>
      ${schemaPanel([
        { name: "posts", cols: "post_id, author_user_id, content_text, visibility, created_at" },
        { name: "post_images", cols: "post_id, image_id, position" },
        { name: "users", cols: "user_id, display_name" },
        { name: "comments", cols: "comment_id, post_id, author_user_id" },
        { name: "post_likes", cols: "post_id, user_id" },
      ])}
    `,
});

pages["search.html"] = () => ({
  title: "Recherche globale",
  kicker: "RECHERCHE",
  subtitle: "Résultats multi-types par onglets.",
  nav: "home",
  body: `
      <section class="globalSearchWrap" aria-label="Recherche globale">
        <form class="globalSearch" role="search" autocomplete="off">
          <span class="globalSearch__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="ico">
              <path d="M10 2a8 8 0 105.3 14l4.7 4.7 1.4-1.4-4.7-4.7A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
            </svg>
          </span>
          <input class="globalSearch__input" type="search" placeholder="Rechercher joueurs, équipes, tournois..." />
          <button class="globalSearch__btn" type="submit">Rechercher</button>
        </form>
      </section>

      <div class="panel">
        <div class="tabs" data-tabs="search-tabs">
          <button class="tab is-active" data-tab="players">Joueurs</button>
          <button class="tab" data-tab="teams">Équipes</button>
          <button class="tab" data-tab="tournaments">Tournois</button>
          <button class="tab" data-tab="games">Jeux</button>
          <button class="tab" data-tab="products">Produits</button>
          <button class="tab" data-tab="posts">Posts</button>
        </div>
        <div class="tabPanels" data-panels="search-tabs">
          <section class="tabPanel is-active" data-panel="players">${cardsGrid(samplePlayers.map((p) => cardPlayer(p)))}</section>
          <section class="tabPanel" data-panel="teams">${cardsGrid(sampleTeams.map(cardTeam))}</section>
          <section class="tabPanel" data-panel="tournaments">${cardsGrid(sampleTournaments.map(cardTournament))}</section>
          <section class="tabPanel" data-panel="games">${cardsGrid(sampleGames.map(cardGame))}</section>
          <section class="tabPanel" data-panel="products">${cardsGrid(sampleProducts.map(cardProduct))}</section>
          <section class="tabPanel" data-panel="posts"><div class="emptyState">Top 5 posts (template).</div></section>
        </div>
      </div>
    `,
});

pages["about.html"] = () => ({
  title: "À propos",
  kicker: "PULSE",
  subtitle: "Plateforme e-sport pour créer des équipes et organiser des tournois.",
  nav: "home",
  body: `
      <div class="panel">
        <h3 class="panel__title">NOTRE MISSION</h3>
        <p class="muted">Connecter joueurs, capitaines et organisateurs autour d’une expérience e-sport complète.</p>
      </div>
      <div class="panel">
        <h3 class="panel__title">VALEURS</h3>
        <div class="list">
          <div class="listItem"><span>Compétition saine</span><span class="listItem__meta">Transparence & fair-play</span></div>
          <div class="listItem"><span>Communauté</span><span class="listItem__meta">Social + teams</span></div>
          <div class="listItem"><span>Performance</span><span class="listItem__meta">Stats & suivi</span></div>
        </div>
      </div>
      ${schemaPanel([{ name: "Aucune table", cols: "Page statique (option CMS si besoin)" }])}
    `,
});

pages["contact.html"] = () => ({
  title: "Contact & Support",
  kicker: "SUPPORT",
  subtitle: "Formulaire de support visiteur.",
  nav: "home",
  body: `
      <div class="pageHeader">
        <div>
          <h1>Contact & Support</h1>
          <p>Réponse sous 24–48h.</p>
        </div>
      </div>
      <form class="panel">
        <div class="formGrid">
          <label class="field"><span class="field__label">Nom complet</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Email</span><input class="input" type="email" /></label>
          <label class="field"><span class="field__label">Sujet</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Type</span><select class="input"><option>Bug</option><option>Partenariat</option><option>Support</option></select></label>
          <label class="field"><span class="field__label">Message</span><textarea class="textarea"></textarea></label>
          <label class="field"><span class="field__label">Pièce jointe</span><input class="input" type="file" /></label>
        </div>
        <div class="formActions" style="margin-top:12px;">
          <button class="btn btn--primary" type="submit">Envoyer</button>
          <button class="btn btn--ghost" type="button">Annuler</button>
        </div>
      </form>
      ${schemaPanel([
        { name: "Option A", cols: "Envoi email backend (sans DB)" },
        { name: "Option B", cols: "support_tickets (recommandé)" },
      ])}
    `,
});

pages["faq.html"] = () => ({
  title: "FAQ / Règlement",
  kicker: "AIDE",
  subtitle: "Règles des tournois, boutique et comportement.",
  nav: "home",
  body: `
      <div class="panel">
        <div class="filtersRow">
          <input class="input" type="search" placeholder="Rechercher une question..." />
          <span class="muted">Dernière mise à jour: 05/02/2026</span>
        </div>
      </div>
      <div class="panel faq">
        <details open>
          <summary>Comment s’inscrire à un tournoi ?</summary>
          <p class="muted">Connectez-vous, choisissez votre équipe et cliquez sur “Inscrire”.</p>
        </details>
        <details>
          <summary>Puis-je rejoindre plusieurs équipes ?</summary>
          <p class="muted">Oui, selon les règles de votre ligue.</p>
        </details>
        <details>
          <summary>Comment suivre mes commandes ?</summary>
          <p class="muted">Depuis l’espace joueur, onglet “Commandes”.</p>
        </details>
      </div>
      ${schemaPanel([{ name: "Aucune table", cols: "Page statique (option CMS)" }])}
    `,
});

pages["login.html"] = () => ({
  title: "Connexion",
  kicker: "AUTH",
  subtitle: "Accès rapide à votre compte.",
  nav: "home",
  body: `
      <form class="panel">
        <div class="formGrid">
          <label class="field"><span class="field__label">Email ou Username</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Mot de passe</span><input class="input" type="password" /></label>
          <label class="field"><span class="field__label">Se souvenir de moi</span><input type="checkbox" /></label>
        </div>
        <div class="formActions" style="margin-top:12px;">
          <button class="btn btn--primary" type="submit">Se connecter</button>
          <a class="btn btn--ghost" href="register.html">Créer un compte</a>
          <a class="btn btn--ghost" href="forgot-password.html">Mot de passe oublié</a>
        </div>
      </form>
      ${schemaPanel([{ name: "users", cols: "email, username, password_hash, is_active" }])}
    `,
});

pages["register.html"] = () => ({
  title: "Inscription",
  kicker: "AUTH",
  subtitle: "Créer un compte joueur.",
  nav: "home",
  body: `
      <form class="panel">
        <div class="formGrid">
          <label class="field"><span class="field__label">Username</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Email</span><input class="input" type="email" /></label>
          <label class="field"><span class="field__label">Display name</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Mot de passe</span><input class="input" type="password" /></label>
          <label class="field"><span class="field__label">Confirmation</span><input class="input" type="password" /></label>
          <label class="field"><span class="field__label">Pays</span><input class="input" type="text" /></label>
          <label class="field"><span class="field__label">Téléphone</span><input class="input" type="tel" /></label>
          <label class="field"><span class="field__label">Date de naissance</span><input class="input" type="date" /></label>
          <label class="field"><span class="field__label">Genre</span><select class="input"><option>—</option><option>Homme</option><option>Femme</option></select></label>
          <label class="field"><span class="field__label">Conditions</span><input type="checkbox" /> J’accepte les CGU</label>
        </div>
        <div class="formActions" style="margin-top:12px;">
          <button class="btn btn--primary" type="submit">Créer le compte</button>
        </div>
      </form>
      ${schemaPanel([{ name: "users", cols: "username, email, display_name, password_hash, role=PLAYER" }])}
    `,
});

pages["forgot-password.html"] = () => ({
  title: "Mot de passe oublié",
  kicker: "AUTH",
  subtitle: "Recevoir un lien de reset.",
  nav: "home",
  body: `
      <form class="panel">
        <div class="formGrid">
          <label class="field"><span class="field__label">Email</span><input class="input" type="email" /></label>
        </div>
        <div class="formActions" style="margin-top:12px;">
          <button class="btn btn--primary" type="submit">Envoyer le lien</button>
        </div>
      </form>
      ${schemaPanel([{ name: "password_reset_tokens", cols: "token, user_id, expires_at (option)" }])}
    `,
});

pages["reset-password.html"] = () => ({
  title: "Réinitialiser mot de passe",
  kicker: "AUTH",
  subtitle: "Choisissez un nouveau mot de passe.",
  nav: "home",
  body: `
      <form class="panel">
        <div class="formGrid">
          <label class="field"><span class="field__label">Nouveau mot de passe</span><input class="input" type="password" /></label>
          <label class="field"><span class="field__label">Confirmation</span><input class="input" type="password" /></label>
        </div>
        <div class="formActions" style="margin-top:12px;">
          <button class="btn btn--primary" type="submit">Mettre à jour</button>
        </div>
      </form>
      ${schemaPanel([{ name: "users", cols: "password_hash" }])}
    `,
});

pages["player-profile.html"] = () => ({
  title: "Profil joueur",
  kicker: "JOUEUR",
  subtitle: "Profil public + posts.",
  nav: "home",
  body: `
      <div class="layout">
        <section class="panel">
          <div style="display:flex; gap:14px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_a2/200/200"></div>
            <div>
              <h3 style="margin:0;">FrostByte</h3>
              <div class="muted">Capitaine • FR</div>
              <div style="margin-top:8px;">
                <a class="btn btn--primary" href="login.html">Ajouter ami</a>
                <a class="btn btn--ghost" href="login.html">Envoyer message</a>
                <a class="btn btn--ghost" href="login.html">Inviter dans une équipe</a>
              </div>
            </div>
          </div>
        </section>
        <aside class="panel">
          <h3 class="panel__title">ÉQUIPES</h3>
          <div class="list">
            <div class="listItem"><span>North Hydra</span><span class="listItem__meta">Capitaine</span></div>
          </div>
        </aside>
      </div>
      <div class="panel" style="margin-top:12px;">
        <h3 class="panel__title">POSTS PUBLICS</h3>
        ${postList(samplePosts, "login.html")}
      </div>
      ${schemaPanel([
        { name: "users", cols: "user_id, display_name, bio, country, profile_image_id" },
        { name: "team_members", cols: "team_id, user_id, is_active" },
        { name: "posts", cols: "post_id, author_user_id, visibility" },
        { name: "post_images", cols: "post_id, image_id" },
      ])}
    `,
});

pages["dashboard.html"] = () => ({
  title: "Dashboard joueur",
  kicker: "JOUEUR",
  subtitle: "Résumé rapide + actions.",
  nav: "home",
  body: withSidebar(
    playerSidebar("dashboard"),
    `
        <div class="pageHeader">
          <div>
            <h1>Tableau de bord</h1>
            <p>Vue globale de vos activités.</p>
          </div>
        </div>
        <div class="panel">
          <div style="display:flex; gap:14px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_a1/200/200"></div>
            <div>
              <h3 style="margin:0;">Zed (@ZED_99)</h3>
              <div class="muted">Pays: TN • Bio: FPS player</div>
            </div>
          </div>
        </div>
        <div class="statsRow" style="margin-top:12px;">
          <div class="statCard"><div class="statCard__value">8</div><div class="statCard__label">Amis</div></div>
          <div class="statCard"><div class="statCard__value">3</div><div class="statCard__label">Équipes</div></div>
          <div class="statCard"><div class="statCard__value">12</div><div class="statCard__label">Posts</div></div>
        </div>
        <div class="panel" style="margin-top:12px;">
          <div class="panel__head"><h3 class="panel__title">NOTIFICATIONS</h3></div>
          <div class="list">
            <div class="listItem"><span>Invitation équipe Aurora Squad</span><span class="badge">Nouveau</span></div>
            <div class="listItem"><span>Commande #ORD-2026-001</span><span class="badge badge--success">PAYÉE</span></div>
          </div>
        </div>
        <div class="panel" style="margin-top:12px;">
          <div class="panel__head"><h3 class="panel__title">DEMANDES EN ATTENTE</h3></div>
          <div class="list">
            <div class="listItem"><span>Demande d’ami de Kairo</span><span class="badge">PENDING</span></div>
            <div class="listItem"><span>Invitation équipe North Hydra</span><span class="badge">PENDING</span></div>
          </div>
        </div>
        <div class="panel" style="margin-top:12px;">
          <div class="panel__head"><h3 class="panel__title">RACCOURCIS</h3></div>
          <div class="card__actions">
            <a class="btn btn--primary" href="post-create.html">Créer un post</a>
            <a class="btn btn--ghost" href="teams-explore.html">Explorer équipes</a>
            <a class="btn btn--ghost" href="shop.html">Boutique</a>
            <a class="btn btn--ghost" href="cart.html">Mon panier</a>
          </div>
        </div>
        ${schemaPanel([
          { name: "users", cols: "user_id, display_name, profile_image_id" },
          { name: "notifications", cols: "notification_id, user_id, type, is_read" },
          { name: "friend_requests", cols: "from_user_id, to_user_id, status" },
          { name: "team_invites", cols: "team_id, invited_user_id, status" },
          { name: "team_join_requests", cols: "team_id, user_id, status" },
          { name: "matches", cols: "match_id, status, scheduled_at" },
        ])}
      `
  ),
});

pages["profile.html"] = () => ({
  title: "Mon profil",
  kicker: "JOUEUR",
  subtitle: "Infos + posts + stats.",
  nav: "home",
  body: withSidebar(
    playerSidebar("profile"),
    `
        <div class="panel">
          <div style="display:flex; gap:14px; align-items:center;">
            <div class="avatarLg" data-avatar="https://picsum.photos/seed/pulse_a1/200/200"></div>
            <div>
              <h3 style="margin:0;">Zed (@ZED_99)</h3>
              <div class="muted">Bio: FPS player • Pays: TN</div>
              <div style="margin-top:8px;">
                <a class="btn btn--primary" href="profile-edit.html">Modifier profil</a>
                <a class="btn btn--ghost" href="password-change.html">Changer mot de passe</a>
              </div>
            </div>
          </div>
        </div>
        <div class="statsRow" style="margin-top:12px;">
          <div class="statCard"><div class="statCard__value">8</div><div class="statCard__label">Amis</div></div>
          <div class="statCard"><div class="statCard__value">3</div><div class="statCard__label">Équipes</div></div>
          <div class="statCard"><div class="statCard__value">12</div><div class="statCard__label">Posts</div></div>
        </div>
        <div class="panel" style="margin-top:12px;">
          <h3 class="panel__title">MES ÉQUIPES</h3>
          ${cardsGrid(sampleTeams.slice(0, 2).map(cardTeam))}
        </div>
        <div class="panel" style="margin-top:12px;">
          <h3 class="panel__title">MES POSTS</h3>
          ${postList(samplePosts, "post-detail.html")}
        </div>
        ${schemaPanel([
          { name: "users", cols: "user_id, display_name, bio, country" },
          { name: "team_members", cols: "team_id, user_id, is_active" },
          { name: "posts", cols: "post_id, author_user_id, created_at" },
          { name: "post_images", cols: "post_id, image_id" },
        ])}
      `
  ),
});

pages["profile-edit.html"] = () => ({
  title: "Modifier profil",
  kicker: "JOUEUR",
  subtitle: "Mise à jour des informations.",
  nav: "home",
  body: withSidebar(
    playerSidebar("profile"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Photo</span><input class="input" type="file" /></label>
            <label class="field"><span class="field__label">Display name</span><input class="input" type="text" value="Zed" /></label>
            <label class="field"><span class="field__label">Bio</span><textarea class="textarea">FPS player</textarea></label>
            <label class="field"><span class="field__label">Pays</span><input class="input" type="text" value="TN" /></label>
            <label class="field"><span class="field__label">Téléphone</span><input class="input" type="tel" /></label>
            <label class="field"><span class="field__label">Date de naissance</span><input class="input" type="date" /></label>
            <label class="field"><span class="field__label">Genre</span><select class="input"><option>—</option><option>Homme</option><option>Femme</option></select></label>
            <label class="field"><span class="field__label">Désactiver compte</span><input type="checkbox" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Sauvegarder</button>
          </div>
        </form>
        ${schemaPanel([{ name: "users", cols: "display_name, bio, country, phone, birth_date, gender, profile_image_id" }, { name: "images", cols: "image_id, file_url" }])}
      `
  ),
});

pages["password-change.html"] = () => ({
  title: "Changer mot de passe",
  kicker: "JOUEUR",
  subtitle: "Sécurisez votre compte.",
  nav: "home",
  body: withSidebar(
    playerSidebar("profile"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Ancien mot de passe</span><input class="input" type="password" /></label>
            <label class="field"><span class="field__label">Nouveau mot de passe</span><input class="input" type="password" /></label>
            <label class="field"><span class="field__label">Confirmation</span><input class="input" type="password" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Mettre à jour</button>
          </div>
        </form>
        ${schemaPanel([{ name: "users", cols: "password_hash" }])}
      `
  ),
});

pages["players.html"] = () => ({
  title: "Recherche joueurs",
  kicker: "JOUEUR",
  subtitle: "Trouver des joueurs et envoyer des demandes d’amis.",
  nav: "home",
  body: withSidebar(
    playerSidebar("players"),
    `
        <div class="panel">
          <div class="filtersRow">
            <input class="input" type="search" placeholder="Username ou display name" />
            <div class="select"><select><option>Pays</option><option>TN</option><option>FR</option></select></div>
            <button class="btn btn--ghost">Plus récents</button>
          </div>
        </div>
        ${cardsGrid(samplePlayers.map((p) => cardPlayer(p, "friends.html")))}
        ${schemaPanel([
          { name: "users", cols: "user_id, username, display_name, country" },
          { name: "friend_requests", cols: "from_user_id, to_user_id, status" },
          { name: "friendships", cols: "user_id1, user_id2" },
        ])}
      `
  ),
});

pages["friends.html"] = () => ({
  title: "Amis",
  kicker: "JOUEUR",
  subtitle: "Gérer amis + demandes.",
  nav: "home",
  body: withSidebar(
    playerSidebar("friends"),
    `
        <div class="panel">
          <div class="tabs" data-tabs="friends-tabs">
            <button class="tab is-active" data-tab="list">Mes amis</button>
            <button class="tab" data-tab="received">Demandes reçues</button>
            <button class="tab" data-tab="sent">Demandes envoyées</button>
          </div>
          <div class="tabPanels" data-panels="friends-tabs">
            <section class="tabPanel is-active" data-panel="list">
              <div class="tableWrap">
                <table class="table">
                  <thead><tr><th>Joueur</th><th>Pays</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr><td>Zed_99</td><td>TN</td><td><button class="btn btn--ghost">Message</button></td></tr>
                    <tr><td>NovaAim</td><td>US</td><td><button class="btn btn--ghost">Message</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section class="tabPanel" data-panel="received">
              <div class="tableWrap">
                <table class="table">
                  <thead><tr><th>Joueur</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    <tr><td>Kairo</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--primary">Accepter</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section class="tabPanel" data-panel="sent">
              <div class="tableWrap">
                <table class="table">
                  <thead><tr><th>Joueur</th><th>Statut</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr><td>FrostByte</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--ghost">Annuler</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        ${schemaPanel([
          { name: "friendships", cols: "user_id1, user_id2, created_at" },
          { name: "friend_requests", cols: "from_user_id, to_user_id, status" },
          { name: "users", cols: "user_id, display_name" },
        ])}
      `
  ),
});

pages["messages.html"] = () => ({
  title: "Messagerie",
  kicker: "JOUEUR",
  subtitle: "Conversations privées.",
  nav: "home",
  body: withSidebar(
    playerSidebar("messages"),
    `
        <div class="panel">
          <div class="filtersRow">
            <input class="input" type="search" placeholder="Rechercher conversation..." />
          </div>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>FrostByte</span><span class="badge">2 non lus</span></div>
            <div class="listItem"><span>NovaAim</span><span class="listItem__meta">Hier</span></div>
          </div>
        </div>
        ${schemaPanel([
          { name: "messages", cols: "message_id, sender_user_id, receiver_user_id, body_text, is_read" },
          { name: "users", cols: "user_id, display_name" },
        ])}
      `
  ),
});

pages["conversation.html"] = () => ({
  title: "Conversation",
  kicker: "JOUEUR",
  subtitle: "Chat 1‑1.",
  nav: "home",
  body: withSidebar(
    playerSidebar("messages"),
    `
        <div class="panel">
          <h3 class="panel__title">Chat avec FrostByte</h3>
          <div class="list">
            <div class="listItem"><span>FrostByte: GG !</span><span class="listItem__meta">10:05</span></div>
            <div class="listItem"><span>Moi: Merci !</span><span class="listItem__meta">10:06</span></div>
          </div>
          <div style="margin-top:10px; display:flex; gap:8px;">
            <input class="input" type="text" placeholder="Écrire un message..." />
            <button class="btn btn--primary" type="button">Envoyer</button>
          </div>
        </div>
        ${schemaPanel([{ name: "messages", cols: "sender_user_id, receiver_user_id, body_text, is_read" }])}
      `
  ),
});

pages["feed.html"] = () => ({
  title: "Fil d’actualité",
  kicker: "JOUEUR",
  subtitle: "Posts publics, amis et équipes.",
  nav: "home",
  body: withSidebar(
    playerSidebar("feed"),
    `
        <div class="panel">
          <div class="panel__head">
            <h3 class="panel__title">FIL</h3>
            <div class="panel__actions"><a class="btn btn--primary" href="post-create.html">Créer un post</a></div>
          </div>
          ${postList(samplePosts, "post-detail.html")}
        </div>
        ${schemaPanel([
          { name: "posts", cols: "post_id, author_user_id, visibility, created_at" },
          { name: "post_likes", cols: "post_id, user_id" },
          { name: "comments", cols: "comment_id, post_id, author_user_id" },
          { name: "friendships", cols: "user_id1, user_id2" },
          { name: "team_members", cols: "team_id, user_id" },
        ])}
      `
  ),
});

pages["post-create.html"] = () => ({
  title: "Créer un post",
  kicker: "JOUEUR",
  subtitle: "Texte + images + visibilité.",
  nav: "home",
  body: withSidebar(
    playerSidebar("feed"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Contenu</span><textarea class="textarea" placeholder="Votre message..."></textarea></label>
            <label class="field"><span class="field__label">Visibilité</span><select class="input"><option>PUBLIC</option><option>FRIENDS</option><option>TEAM_ONLY</option></select></label>
            <label class="field"><span class="field__label">Images</span><input class="input" type="file" multiple /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Publier</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "posts", cols: "post_id, author_user_id, content_text, visibility" },
          { name: "post_images", cols: "post_id, image_id, position" },
          { name: "images", cols: "image_id, file_url" },
        ])}
      `
  ),
});

pages["post-detail.html"] = () => ({
  title: "Détail post",
  kicker: "JOUEUR",
  subtitle: "Post + commentaires.",
  nav: "home",
  body: withSidebar(
    playerSidebar("feed"),
    `
        <div class="panel">
          <h3 class="panel__title">Post de @ZED_99</h3>
          <p class="muted">Victoire 3-1 au Pulse Invitational !</p>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>@NovaAim: GG !</span><span class="listItem__meta">1h</span></div>
            <div class="listItem"><span>@Kairo: Nice</span><span class="listItem__meta">2h</span></div>
          </div>
          <div style="margin-top:10px;">
            <input class="input" type="text" placeholder="Ajouter un commentaire..." />
          </div>
        </div>
        ${schemaPanel([
          { name: "posts", cols: "post_id, author_user_id, content_text" },
          { name: "comments", cols: "comment_id, post_id, author_user_id, content_text" },
          { name: "post_likes", cols: "post_id, user_id" },
          { name: "reports", cols: "report_id, target_type, target_id" },
        ])}
      `
  ),
});

pages["notifications.html"] = () => ({
  title: "Notifications",
  kicker: "JOUEUR",
  subtitle: "Tous vos événements importants.",
  nav: "home",
  body: withSidebar(
    playerSidebar("notifications"),
    `
        <div class="panel">
          <div class="panel__head">
            <h3 class="panel__title">NOTIFICATIONS</h3>
            <div class="panel__actions">
              <button class="btn btn--ghost">Tout marquer lu</button>
            </div>
          </div>
          <div class="filtersRow">
            <button class="btn btn--soft">Toutes</button>
            <button class="btn btn--ghost">Non lues</button>
          </div>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>Invitation équipe Aurora Squad</span><span class="badge">Nouveau</span></div>
            <div class="listItem"><span>Commande #ORD-2026-001</span><span class="badge badge--success">PAYÉE</span></div>
            <div class="listItem"><span>Nouveau message de FrostByte</span><span class="badge">1h</span></div>
          </div>
        </div>
        ${schemaPanel([{ name: "notifications", cols: "notification_id, user_id, type, ref_table, ref_id, is_read" }])}
      `
  ),
});

pages["teams-explore.html"] = () => ({
  title: "Explorer équipes",
  kicker: "JOUEUR",
  subtitle: "Rejoindre une équipe.",
  nav: "teams",
  body: withSidebar(
    playerSidebar("teams"),
    `
        <div class="panel">
          <div class="filtersRow">
            <input class="input" type="search" placeholder="Rechercher une équipe..." />
            <div class="select"><select><option>Région</option><option>MENA</option><option>EU</option></select></div>
            <button class="btn btn--ghost">Avec produits</button>
            <button class="btn btn--ghost">Actif en tournois</button>
          </div>
        </div>
        ${cardsGrid(sampleTeams.map(cardTeam))}
        ${schemaPanel([
          { name: "teams", cols: "team_id, name, region" },
          { name: "team_members", cols: "team_id, user_id, is_active" },
          { name: "team_join_requests", cols: "team_id, user_id, status" },
          { name: "products", cols: "product_id, team_id" },
        ])}
      `
  ),
});

pages["my-teams.html"] = () => ({
  title: "Mes équipes",
  kicker: "JOUEUR",
  subtitle: "Appartenances + invitations.",
  nav: "teams",
  body: withSidebar(
    playerSidebar("teams"),
    `
        <div class="panel">
          <div class="tabs" data-tabs="myteams-tabs">
            <button class="tab is-active" data-tab="active">Équipes actives</button>
            <button class="tab" data-tab="invites">Invitations</button>
          </div>
          <div class="tabPanels" data-panels="myteams-tabs">
            <section class="tabPanel is-active" data-panel="active">
              <div class="tableWrap">
                <table class="table">
                  <thead><tr><th>Équipe</th><th>Rôle</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr><td>Nebula Five</td><td>Membre</td><td><button class="btn btn--ghost">Quitter</button></td></tr>
                    <tr><td>Aurora Squad</td><td>Membre</td><td><button class="btn btn--ghost">Quitter</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section class="tabPanel" data-panel="invites">
              <div class="tableWrap">
                <table class="table">
                  <thead><tr><th>Équipe</th><th>Statut</th><th>Actions</th></tr></thead>
                  <tbody>
                    <tr><td>North Hydra</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--primary">Accepter</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        ${schemaPanel([
          { name: "team_members", cols: "team_id, user_id, is_active, left_at" },
          { name: "team_invites", cols: "team_id, invited_user_id, status" },
        ])}
      `
  ),
});

pages["my-requests.html"] = () => ({
  title: "Mes demandes",
  kicker: "JOUEUR",
  subtitle: "Suivi des demandes d’adhésion.",
  nav: "teams",
  body: withSidebar(
    playerSidebar("requests"),
    `
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Équipe</th><th>Date</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>North Hydra</td><td>02/02/2026</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--ghost">Annuler</button></td></tr>
                <tr><td>Sandstorm</td><td>20/01/2026</td><td><span class="badge badge--danger">REFUSED</span></td><td>—</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([{ name: "team_join_requests", cols: "request_id, team_id, user_id, status, created_at" }])}
      `
  ),
});

pages["cart.html"] = () => ({
  title: "Mon panier",
  kicker: "JOUEUR",
  subtitle: "Gérer les items du panier.",
  nav: "shop",
  body: withSidebar(
    playerSidebar("orders"),
    `
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Produit</th><th>Quantité</th><th>Prix</th><th>Total</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Pulse Hoodie</td><td>1</td><td>89 DT</td><td>89 DT</td><td><button class="btn btn--ghost">Retirer</button></td></tr>
                <tr><td>Mousepad XL</td><td>2</td><td>39 DT</td><td>78 DT</td><td><button class="btn btn--ghost">Retirer</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="panel__actions" style="margin-top:10px;">
            <a class="btn btn--primary" href="checkout.html">Passer commande</a>
          </div>
        </div>
        ${schemaPanel([
          { name: "carts", cols: "cart_id, user_id, status" },
          { name: "cart_items", cols: "cart_id, product_id, quantity, unit_price_at_add" },
          { name: "products", cols: "product_id, stock_qty, is_active" },
        ])}
      `
  ),
});

pages["checkout.html"] = () => ({
  title: "Checkout",
  kicker: "JOUEUR",
  subtitle: "Finaliser la commande.",
  nav: "shop",
  body: withSidebar(
    playerSidebar("orders"),
    `
        <div class="panel">
          <h3 class="panel__title">Récapitulatif</h3>
          <div class="list">
            <div class="listItem"><span>Pulse Hoodie x1</span><span class="listItem__meta">89 DT</span></div>
            <div class="listItem"><span>Mousepad XL x2</span><span class="listItem__meta">78 DT</span></div>
          </div>
          <div class="listItem" style="margin-top:8px;"><span>Total</span><span class="badge badge--success">167 DT</span></div>
        </div>
        <form class="panel" style="margin-top:12px;">
          <div class="formGrid">
            <label class="field"><span class="field__label">Adresse</span><textarea class="textarea"></textarea></label>
            <label class="field"><span class="field__label">Téléphone</span><input class="input" type="tel" /></label>
            <label class="field"><span class="field__label">Méthode de paiement</span><select class="input"><option>CARD</option><option>CASH</option></select></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Confirmer</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "orders", cols: "order_id, cart_id, user_id, status, total_amount" },
          { name: "carts", cols: "cart_id, status" },
          { name: "cart_items", cols: "cart_id, product_id, quantity" },
        ])}
      `
  ),
});

pages["orders.html"] = () => ({
  title: "Mes commandes",
  kicker: "JOUEUR",
  subtitle: "Historique des commandes.",
  nav: "shop",
  body: withSidebar(
    playerSidebar("orders"),
    `
        <div class="panel">
          <div class="filtersRow">
            <div class="select"><select><option>Statut</option><option>PENDING</option><option>PAID</option><option>SHIPPED</option><option>DELIVERED</option></select></div>
            <input class="input" type="date" />
            <button class="btn btn--ghost">Plus récents</button>
          </div>
          <div class="tableWrap" style="margin-top:10px;">
            <table class="table">
              <thead><tr><th>Commande</th><th>Date</th><th>Total</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>ORD-2026-001</td><td>02/02/2026</td><td>167 DT</td><td><span class="badge badge--success">PAID</span></td><td><a class="btn btn--ghost" href="order-detail.html">Détail</a></td></tr>
                <tr><td>ORD-2026-002</td><td>05/02/2026</td><td>39 DT</td><td><span class="badge">PENDING</span></td><td><a class="btn btn--ghost" href="order-detail.html">Détail</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([{ name: "orders", cols: "order_id, order_number, status, total_amount, created_at" }])}
      `
  ),
});

pages["order-detail.html"] = () => ({
  title: "Détail commande",
  kicker: "JOUEUR",
  subtitle: "Contenu et statut.",
  nav: "shop",
  body: withSidebar(
    playerSidebar("orders"),
    `
        <div class="panel">
          <h3 class="panel__title">ORD-2026-001</h3>
          <p class="muted">Status: <span class="badge badge--success">PAID</span></p>
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Produit</th><th>Quantité</th><th>Prix</th></tr></thead>
              <tbody>
                <tr><td>Pulse Hoodie</td><td>1</td><td>89 DT</td></tr>
                <tr><td>Mousepad XL</td><td>2</td><td>39 DT</td></tr>
              </tbody>
            </table>
          </div>
          <div class="panel__actions" style="margin-top:10px;">
            <button class="btn btn--ghost">Annuler commande</button>
          </div>
        </div>
        ${schemaPanel([
          { name: "orders", cols: "order_id, order_number, status, total_amount" },
          { name: "cart_items", cols: "cart_id, product_id, quantity, unit_price_at_add" },
          { name: "products", cols: "product_id, team_id, name" },
        ])}
      `
  ),
});

pages["captain-team-create.html"] = () => ({
  title: "Créer une équipe",
  kicker: "CAPITAINE",
  subtitle: "Créer une nouvelle équipe.",
  nav: "teams",
  body: withSidebar(
    captainSidebar("team"),
    `
        ${teamSwitcher}
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Nom</span><input class="input" type="text" /></label>
            <label class="field"><span class="field__label">Région</span><input class="input" type="text" /></label>
            <label class="field"><span class="field__label">Description</span><textarea class="textarea"></textarea></label>
            <label class="field"><span class="field__label">Logo</span><input class="input" type="file" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Créer équipe</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "teams", cols: "team_id, name, region, captain_user_id, logo_image_id" },
          { name: "team_members", cols: "team_id, user_id, joined_at, is_active" },
          { name: "images", cols: "image_id, file_url" },
        ])}
      `
  ),
});

pages["captain-team-manage.html"] = () => ({
  title: "Gestion équipe",
  kicker: "CAPITAINE",
  subtitle: "Modifier les infos de l’équipe.",
  nav: "teams",
  body: withSidebar(
    captainSidebar("team"),
    `
        ${teamSwitcher}
        <div class="panel">
          <h3 class="panel__title">Nebula Five</h3>
          <div class="statsRow">
            <div class="statCard"><div class="statCard__value">12</div><div class="statCard__label">Membres</div></div>
            <div class="statCard"><div class="statCard__value">8</div><div class="statCard__label">Produits</div></div>
            <div class="statCard"><div class="statCard__value">5</div><div class="statCard__label">Tournois</div></div>
          </div>
        </div>
        <form class="panel" style="margin-top:12px;">
          <div class="formGrid">
            <label class="field"><span class="field__label">Nom</span><input class="input" type="text" value="Nebula Five" /></label>
            <label class="field"><span class="field__label">Région</span><input class="input" type="text" value="MENA" /></label>
            <label class="field"><span class="field__label">Description</span><textarea class="textarea">Équipe e-sport</textarea></label>
            <label class="field"><span class="field__label">Logo</span><input class="input" type="file" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Enregistrer</button>
            <button class="btn btn--ghost" type="button">Supprimer équipe</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "teams", cols: "team_id, name, region, description, logo_image_id" },
          { name: "team_members", cols: "team_id, user_id, is_active" },
          { name: "products", cols: "product_id, team_id" },
          { name: "tournament_teams", cols: "tournament_id, team_id" },
        ])}
      `
  ),
});

pages["captain-members.html"] = () => ({
  title: "Gestion membres",
  kicker: "CAPITAINE",
  subtitle: "Roster de l’équipe.",
  nav: "teams",
  body: withSidebar(
    captainSidebar("members"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Membre</th><th>Rôle</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>FrostByte</td><td>Capitaine</td><td><span class="badge badge--info">Capitaine</span></td><td>—</td></tr>
                <tr><td>Zed_99</td><td>Membre</td><td>Actif</td><td><button class="btn btn--ghost">Retirer</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "team_members", cols: "team_id, user_id, joined_at, is_active" },
          { name: "teams", cols: "captain_user_id" },
          { name: "users", cols: "user_id, display_name" },
        ])}
      `
  ),
});

pages["captain-requests.html"] = () => ({
  title: "Demandes rejoindre",
  kicker: "CAPITAINE",
  subtitle: "Accepter / refuser les demandes.",
  nav: "teams",
  body: withSidebar(
    captainSidebar("requests"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Joueur</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td>Kairo</td><td>02/02/2026</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--primary">Accepter</button></td></tr>
                <tr><td>NovaAim</td><td>03/02/2026</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--ghost">Refuser</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "team_join_requests", cols: "request_id, team_id, user_id, status, responded_by_captain_id" },
          { name: "team_members", cols: "team_id, user_id" },
          { name: "notifications", cols: "notification_id, user_id, type" },
        ])}
      `
  ),
});

pages["captain-invite.html"] = () => ({
  title: "Inviter un joueur",
  kicker: "CAPITAINE",
  subtitle: "Invitations d’équipe.",
  nav: "teams",
  body: withSidebar(
    captainSidebar("invite"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="filtersRow">
            <input class="input" type="search" placeholder="Username ou display name" />
            <button class="btn btn--primary">Rechercher</button>
          </div>
          <div class="list" style="margin-top:10px;">
            <div class="listItem"><span>NovaAim</span><button class="btn btn--ghost">Inviter</button></div>
          </div>
        </div>
        ${schemaPanel([
          { name: "team_invites", cols: "team_id, invited_user_id, invited_by_user_id, status" },
          { name: "team_members", cols: "team_id, user_id" },
          { name: "notifications", cols: "notification_id, user_id" },
        ])}
      `
  ),
});

pages["captain-products.html"] = () => ({
  title: "Produits équipe",
  kicker: "CAPITAINE",
  subtitle: "CRUD produits de l’équipe.",
  nav: "shop",
  body: withSidebar(
    captainSidebar("products"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="panel__head">
            <h3 class="panel__title">PRODUITS</h3>
            <div class="panel__actions"><a class="btn btn--primary" href="captain-product-create.html">Créer produit</a></div>
          </div>
          ${cardsGrid(sampleProducts.map((p) => cardProduct(p, "captain-product-edit.html")))}
        </div>
        ${schemaPanel([
          { name: "products", cols: "product_id, team_id, name, price, stock_qty, is_active" },
          { name: "product_images", cols: "product_id, image_id, position" },
        ])}
      `
  ),
});

pages["captain-product-create.html"] = () => ({
  title: "Créer produit",
  kicker: "CAPITAINE",
  subtitle: "Ajouter un nouveau produit.",
  nav: "shop",
  body: withSidebar(
    captainSidebar("products"),
    `
        ${teamSwitcher}
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Nom</span><input class="input" type="text" /></label>
            <label class="field"><span class="field__label">Prix</span><input class="input" type="number" /></label>
            <label class="field"><span class="field__label">Stock</span><input class="input" type="number" /></label>
            <label class="field"><span class="field__label">SKU</span><input class="input" type="text" /></label>
            <label class="field"><span class="field__label">Description</span><textarea class="textarea"></textarea></label>
            <label class="field"><span class="field__label">Images</span><input class="input" type="file" multiple /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Créer</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "products", cols: "name, description, price, stock_qty, sku, is_active" },
          { name: "images", cols: "image_id, file_url" },
          { name: "product_images", cols: "product_id, image_id, position" },
        ])}
      `
  ),
});

pages["captain-product-edit.html"] = () => ({
  title: "Modifier produit",
  kicker: "CAPITAINE",
  subtitle: "Mettre à jour un produit.",
  nav: "shop",
  body: withSidebar(
    captainSidebar("products"),
    `
        ${teamSwitcher}
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Nom</span><input class="input" type="text" value="Pulse Hoodie" /></label>
            <label class="field"><span class="field__label">Prix</span><input class="input" type="number" value="89" /></label>
            <label class="field"><span class="field__label">Stock</span><input class="input" type="number" value="14" /></label>
            <label class="field"><span class="field__label">SKU</span><input class="input" type="text" value="PH-NEON" /></label>
            <label class="field"><span class="field__label">Description</span><textarea class="textarea">Hoodie officiel</textarea></label>
            <label class="field"><span class="field__label">Images</span><input class="input" type="file" multiple /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Mettre à jour</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "products", cols: "name, description, price, stock_qty, sku, is_active" },
          { name: "product_images", cols: "product_id, image_id, position" },
        ])}
      `
  ),
});

pages["captain-orders.html"] = () => ({
  title: "Commandes liées",
  kicker: "CAPITAINE",
  subtitle: "Commandes contenant les produits de l’équipe.",
  nav: "shop",
  body: withSidebar(
    captainSidebar("orders"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Commande</th><th>Date</th><th>Montant équipe</th><th>Statut</th></tr></thead>
              <tbody>
                <tr><td>ORD-2026-001</td><td>02/02/2026</td><td>128 DT</td><td><span class="badge badge--success">PAID</span></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "orders", cols: "order_id, order_number, status, total_amount" },
          { name: "cart_items", cols: "cart_id, product_id, quantity, unit_price_at_add" },
          { name: "products", cols: "product_id, team_id" },
        ])}
      `
  ),
});

pages["captain-tournaments.html"] = () => ({
  title: "Inscrire une équipe",
  kicker: "CAPITAINE",
  subtitle: "Choisir un tournoi et inscrire l’équipe.",
  nav: "tournaments",
  body: withSidebar(
    captainSidebar("tournaments"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="filtersRow">
            <div class="select"><select><option>Équipe</option><option>Nebula Five</option></select></div>
            <div class="select"><select><option>Tournoi</option><option>Pulse Invitational</option></select></div>
            <button class="btn btn--primary">Inscrire</button>
          </div>
        </div>
        ${cardsGrid(sampleTournaments.map(cardTournament))}
        ${schemaPanel([
          { name: "tournament_teams", cols: "tournament_id, team_id, status" },
          { name: "tournaments", cols: "tournament_id, status, registration_mode, max_teams" },
          { name: "teams", cols: "team_id, captain_user_id" },
        ])}
      `
  ),
});

pages["captain-team-tournaments.html"] = () => ({
  title: "Suivi tournois",
  kicker: "CAPITAINE",
  subtitle: "Matchs et résultats.",
  nav: "tournaments",
  body: withSidebar(
    captainSidebar("tournaments"),
    `
        ${teamSwitcher}
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Tournoi</th><th>Statut</th><th>Prochains matchs</th></tr></thead>
              <tbody>
                <tr><td>Pulse Invitational</td><td><span class="badge badge--info">ONGOING</span></td><td>Nebula Five vs Sandstorm</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "tournament_teams", cols: "tournament_id, team_id, status" },
          { name: "matches", cols: "match_id, tournament_id, status" },
          { name: "match_teams", cols: "match_id, team_id, score" },
        ])}
      `
  ),
});

pages["organizer-request-create.html"] = () => ({
  title: "Demande tournoi",
  kicker: "ORGANISATEUR",
  subtitle: "Soumettre une demande à l’admin.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("request"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Titre</span><input class="input" type="text" /></label>
            <label class="field"><span class="field__label">Jeu</span><select class="input"><option>Valorant</option><option>CS2</option></select></label>
            <label class="field"><span class="field__label">Dates</span><input class="input" type="text" placeholder="18–22 fév" /></label>
            <label class="field"><span class="field__label">Deadline</span><input class="input" type="date" /></label>
            <label class="field"><span class="field__label">Max équipes</span><input class="input" type="number" /></label>
            <label class="field"><span class="field__label">Format</span><select class="input"><option>BO1</option><option>BO3</option><option>BO5</option></select></label>
            <label class="field"><span class="field__label">Registration mode</span><select class="input"><option>OPEN</option><option>APPROVAL</option></select></label>
            <label class="field"><span class="field__label">Prize pool</span><input class="input" type="number" /></label>
            <label class="field"><span class="field__label">Description</span><textarea class="textarea"></textarea></label>
            <label class="field"><span class="field__label">Règles</span><textarea class="textarea"></textarea></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Envoyer</button>
          </div>
        </form>
        ${schemaPanel([{ name: "tournament_requests", cols: "request_id, organizer_user_id, game_id, title, rules, start_date, end_date, max_teams, format, registration_mode, prize_pool" }])}
      `
  ),
});

pages["organizer-requests.html"] = () => ({
  title: "Mes demandes",
  kicker: "ORGANISATEUR",
  subtitle: "Suivi des demandes envoyées.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("requests"),
    `
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Titre</th><th>Jeu</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Pulse Invitational</td><td>Valorant</td><td><span class="badge">PENDING</span></td><td><a class="btn btn--ghost" href="organizer-request-detail.html">Voir</a></td></tr>
                <tr><td>CS2 Arena Cup</td><td>CS2</td><td><span class="badge badge--success">ACCEPTED</span></td><td><a class="btn btn--ghost" href="organizer-request-detail.html">Voir</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([{ name: "tournament_requests", cols: "request_id, title, status, reviewed_at, admin_response_note" }])}
      `
  ),
});

pages["organizer-request-detail.html"] = () => ({
  title: "Détail demande",
  kicker: "ORGANISATEUR",
  subtitle: "Infos et statut.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("requests"),
    `
        <div class="panel">
          <h3 class="panel__title">Pulse Invitational — Valorant</h3>
          <p class="muted">Status: <span class="badge">PENDING</span></p>
          <div class="list">
            <div class="listItem"><span>Dates</span><span class="listItem__meta">18–22 fév</span></div>
            <div class="listItem"><span>Max équipes</span><span class="listItem__meta">16</span></div>
            <div class="listItem"><span>Prize pool</span><span class="listItem__meta">1200 DT</span></div>
          </div>
        </div>
        ${schemaPanel([{ name: "tournament_requests", cols: "request_id, organizer_user_id, status, admin_response_note" }])}
      `
  ),
});

pages["organizer-tournaments.html"] = () => ({
  title: "Mes tournois",
  kicker: "ORGANISATEUR",
  subtitle: "Tournois validés et actifs.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("tournaments"),
    `
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Tournoi</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Pulse Invitational</td><td><span class="badge badge--info">OPEN</span></td><td><a class="btn btn--ghost" href="organizer-tournament-detail.html">Gérer</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([{ name: "tournaments", cols: "tournament_id, organizer_user_id, status, start_date, end_date" }])}
      `
  ),
});

pages["organizer-tournament-edit.html"] = () => ({
  title: "Éditer tournoi",
  kicker: "ORGANISATEUR",
  subtitle: "Mettre à jour les infos.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("tournaments"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Titre</span><input class="input" type="text" value="Pulse Invitational" /></label>
            <label class="field"><span class="field__label">Statut</span><select class="input"><option>OPEN</option><option>ONGOING</option><option>FINISHED</option></select></label>
            <label class="field"><span class="field__label">Dates</span><input class="input" type="text" value="18–22 fév" /></label>
            <label class="field"><span class="field__label">Prize pool</span><input class="input" type="number" value="1200" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Mettre à jour</button>
          </div>
        </form>
        ${schemaPanel([{ name: "tournaments", cols: "title, status, start_date, end_date, prize_pool" }])}
      `
  ),
});

pages["organizer-tournament-detail.html"] = () => ({
  title: "Détail tournoi (org)",
  kicker: "ORGANISATEUR",
  subtitle: "Gestion du tournoi.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("tournaments"),
    `
        <div class="panel">
          <h3 class="panel__title">Pulse Invitational</h3>
          <div class="statsRow">
            <div class="statCard"><div class="statCard__value">8</div><div class="statCard__label">Équipes</div></div>
            <div class="statCard"><div class="statCard__value">16</div><div class="statCard__label">Matchs</div></div>
          </div>
          <div class="card__actions" style="margin-top:10px;">
            <a class="btn btn--ghost" href="organizer-registrations.html">Inscriptions</a>
            <a class="btn btn--ghost" href="organizer-matches.html">Matchs</a>
          </div>
        </div>
        ${schemaPanel([
          { name: "tournaments", cols: "tournament_id, organizer_user_id, status" },
          { name: "tournament_teams", cols: "tournament_id, team_id, status" },
          { name: "matches", cols: "match_id, tournament_id, status" },
        ])}
      `
  ),
});

pages["organizer-registrations.html"] = () => ({
  title: "Inscriptions",
  kicker: "ORGANISATEUR",
  subtitle: "Accepter / refuser équipes.",
  nav: "tournaments",
  body: withSidebar(
    organizerSidebar("registrations"),
    `
        <div class="panel">
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Équipe</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Nebula Five</td><td><span class="badge">PENDING</span></td><td><button class="btn btn--primary">Accepter</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "tournament_teams", cols: "tournament_id, team_id, status, seed" },
          { name: "teams", cols: "team_id, name, logo_image_id" },
        ])}
      `
  ),
});

pages["organizer-matches.html"] = () => ({
  title: "Gestion matchs",
  kicker: "ORGANISATEUR",
  subtitle: "Créer et éditer les matchs.",
  nav: "matches",
  body: withSidebar(
    organizerSidebar("matches"),
    `
        <div class="panel">
          <div class="panel__head">
            <h3 class="panel__title">MATCHS</h3>
            <div class="panel__actions"><a class="btn btn--primary" href="organizer-match-create.html">Créer match</a></div>
          </div>
          <div class="tableWrap">
            <table class="table">
              <thead><tr><th>Match</th><th>Statut</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td>Nebula Five vs North Hydra</td><td><span class="badge badge--info">SCHEDULED</span></td><td><a class="btn btn--ghost" href="organizer-match-edit.html">Éditer</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        ${schemaPanel([
          { name: "matches", cols: "match_id, tournament_id, status, round_name, scheduled_at" },
          { name: "match_teams", cols: "match_id, team_id, score, is_winner" },
        ])}
      `
  ),
});

pages["organizer-match-create.html"] = () => ({
  title: "Créer match",
  kicker: "ORGANISATEUR",
  subtitle: "Ajouter un match au tournoi.",
  nav: "matches",
  body: withSidebar(
    organizerSidebar("matches"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Round</span><input class="input" type="text" placeholder="Quarterfinal" /></label>
            <label class="field"><span class="field__label">Date</span><input class="input" type="datetime-local" /></label>
            <label class="field"><span class="field__label">Équipes</span><input class="input" type="text" placeholder="Team A vs Team B" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Créer match</button>
          </div>
        </form>
        ${schemaPanel([
          { name: "matches", cols: "tournament_id, round_name, scheduled_at, best_of, status" },
          { name: "match_teams", cols: "match_id, team_id, score, is_winner" },
        ])}
      `
  ),
});

pages["organizer-match-edit.html"] = () => ({
  title: "Éditer match",
  kicker: "ORGANISATEUR",
  subtitle: "Saisie des résultats.",
  nav: "matches",
  body: withSidebar(
    organizerSidebar("matches"),
    `
        <form class="panel">
          <div class="formGrid">
            <label class="field"><span class="field__label">Statut</span><select class="input"><option>ONGOING</option><option>FINISHED</option></select></label>
            <label class="field"><span class="field__label">Score Team A</span><input class="input" type="number" /></label>
            <label class="field"><span class="field__label">Score Team B</span><input class="input" type="number" /></label>
          </div>
          <div class="formActions" style="margin-top:12px;">
            <button class="btn btn--primary" type="submit">Enregistrer</button>
          </div>
        </form>
        ${schemaPanel([{ name: "match_teams", cols: "match_id, team_id, score, is_winner" }])}
      `
  ),
});

// PAGES_END

Object.entries(pages).forEach(([file, build]) => {
  const def = build();
  const html = pageHtml(def.title, def.kicker, def.subtitle, def.nav, def.body);
  fs.writeFileSync(path.join(pagesDir, file), html, "utf8");
});

console.log(`Generated ${Object.keys(pages).length} pages in ${pagesDir}`);
