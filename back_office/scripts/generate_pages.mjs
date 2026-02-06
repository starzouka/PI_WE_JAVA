import fs from "node:fs";
import path from "node:path";

const outDir = process.cwd();

const templatePath = path.join(outDir, "index.html");
let sprite = "";
if (fs.existsSync(templatePath)) {
  const template = fs.readFileSync(templatePath, "utf8");
  const match = template.match(new RegExp('<svg width="0"[\\s\\S]*?<\\/svg>'));
  sprite = match ? match[0] : "";
}

const NAV_GROUPS = [
  {
    title: "Dashboard",
    items: [{ key: "dashboard", label: "Dashboard", href: "index.html", icon: "i-home" }],
  },
  {
    title: "Utilisateurs",
    items: [{ key: "users", label: "Utilisateurs", href: "users.html", icon: "i-users" }],
  },
  {
    title: "Social & Moderation",
    items: [
      { key: "posts", label: "Posts", href: "posts.html", icon: "i-flag" },
      { key: "comments", label: "Commentaires", href: "comments.html", icon: "i-flag" },
      { key: "reports", label: "Signalements", href: "reports.html", icon: "i-flag" },
      { key: "messages", label: "Messages", href: "messages.html", icon: "i-flag" },
    ],
  },
  {
    title: "Jeux & Categories",
    items: [
      { key: "categories", label: "Categories", href: "categories.html", icon: "i-game" },
      { key: "games", label: "Jeux", href: "games.html", icon: "i-game" },
    ],
  },
  {
    title: "Equipes",
    items: [{ key: "teams", label: "Equipes", href: "teams.html", icon: "i-users" }],
  },
  {
    title: "Boutique & Commandes",
    items: [
      { key: "products", label: "Produits", href: "products.html", icon: "i-cart" },
      { key: "orders", label: "Commandes", href: "orders.html", icon: "i-cart" },
      { key: "carts", label: "Paniers", href: "carts.html", icon: "i-cart" },
    ],
  },
  {
    title: "Tournois",
    items: [
      { key: "tournamentRequests", label: "Demandes", href: "tournament-requests.html", icon: "i-trophy" },
      { key: "tournaments", label: "Tournois", href: "tournaments.html", icon: "i-trophy" },
      { key: "matches", label: "Matchs", href: "matches.html", icon: "i-trophy" },
    ],
  },
  {
    title: "Systeme",
    items: [
      { key: "notifications", label: "Notifications", href: "notifications.html", icon: "i-gear" },
      { key: "images", label: "Images", href: "images.html", icon: "i-gear" },
    ],
  },
];

const TOP_LINKS = [
  { key: "dashboard", label: "Dashboard", href: "index.html", icon: "i-home" },
  { key: "users", label: "Utilisateurs", href: "users.html" },
  { key: "orders", label: "Commandes", href: "orders.html" },
  { key: "tournaments", label: "Tournois", href: "tournaments.html" },
  { key: "reports", label: "Signalements", href: "reports.html" },
];

const sidebar = (activeKey) => {
  const groups = NAV_GROUPS.map((group) => {
    const items = group.items
      .map((item) => {
        const active = item.key === activeKey ? " active" : "";
        return `
        <a class="navItem${active}" href="${item.href}">
          <svg class="icon"><use href="#${item.icon}"></use></svg>
          <span>${item.label}</span>
        </a>`;
      })
      .join("\n");

    return `
      <div class="sideGroupTitle">${group.title}</div>
      ${items}`;
  }).join("\n");

  return `
    <aside class="sidebar">
      <div class="brand">
        <span class="brandMark">
          <svg class="icon"><use href="#i-logo"></use></svg>
        </span>
        <span class="brandText">PULSE</span>
      </div>
      <nav class="sideNav" aria-label="Navigation principale">
        ${groups}
      </nav>
      <div class="sideFooter">
        <div class="presence">
          <div class="presenceRow">
            <span class="dot dotLive"></span><span>LIVE</span>
          </div>
          <div class="presenceRow">
            <span class="dot dotOff"></span><span>OFFLINE</span>
          </div>
        </div>
        <button class="userMini" id="sidebarUserBtn" type="button" aria-haspopup="menu" aria-expanded="false">
          <span class="avatar avatarSmall">A</span>
          <span class="userMiniText">Admin</span>
          <svg class="icon iconSmall"><use href="#i-chevron"></use></svg>
        </button>
      </div>
    </aside>
  `;
};

const topbar = (activeKey) => {
  const links = TOP_LINKS.map((link) => {
    const active = link.key === activeKey ? " active" : "";
    const icon = link.icon ? `<svg class="icon iconSmall"><use href="#${link.icon}"></use></svg>` : "";
    return `<a class="topLink${active}" href="${link.href}">${icon} ${link.label}</a>`;
  }).join("\n");

  return `
    <header class="topbar">
      <div class="topLinks">
        ${links}
      </div>
      <div class="topActions">
        <div class="searchBox">
          <svg class="icon iconSmall muted"><use href="#i-search"></use></svg>
          <input id="globalSearch" type="text" placeholder="Search..." autocomplete="off" />
        </div>
        <div class="profileWrap">
          <button class="profileBtn" id="profileBtn" type="button" aria-haspopup="menu" aria-expanded="false">
            <span class="avatar">A</span>
            <span class="profileName">Admin</span>
            <svg class="icon iconSmall muted"><use href="#i-chevron"></use></svg>
          </button>
          <div class="dropdown" id="profileMenu" role="menu" aria-hidden="true">
            <a role="menuitem" href="#">Mon profil</a>
            <a role="menuitem" href="#">Parametres</a>
            <div class="sep"></div>
            <a role="menuitem" href="#">Deconnexion</a>
          </div>
        </div>
        <button class="iconBtn" type="button" aria-label="Notifications">
          <svg class="icon"><use href="#i-bell"></use></svg>
          <span class="badgeDot"></span>
        </button>
      </div>
    </header>
  `;
};

const page = ({ title, active, topKey, content }) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PULSE - ${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
${sprite}
  <div class="app">
    ${sidebar(active)}
    <div class="main">
      ${topbar(topKey || active)}
      <main class="content">
        ${content}
      </main>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
`;

const schemaPanel = (tables) => `
  <section class="panel">
    <div class="panelHeader">
      <div>
        <h3 class="panelTitle">SCHEMA UTILISE</h3>
        <div class="panelDesc">Tables et colonnes principales.</div>
      </div>
    </div>
    <div class="list">
      ${tables
        .map((t) => `<div class="listItem"><span><b>${t.name}</b></span><span class="listMeta">${t.cols}</span></div>`)
        .join("\n")}
    </div>
  </section>
`;

const schemaCols = (cols = []) =>
  cols
    .filter((c) => {
      const lc = String(c).toLowerCase();
      return !lc.includes("action") && !lc.includes("photo") && !lc.includes("image") && !lc.includes("logo") && !lc.includes("cover");
    })
    .join(", ");

const TABLE_MAP = {
  "user-detail": "users",
  "user-create": "users",
  "user-edit": "users",
  "post-detail": "posts",
  "report-detail": "reports",
  "game-detail": "games",
  "game-form": "games",
  "category-form": "categories",
  "team-detail": "teams",
  "product-detail": "products",
  "product-form": "products",
  "order-detail": "orders",
  "tournament-detail": "tournaments",
  "tournament-form": "tournaments",
  "tournament-request-detail": "tournament_requests",
  "match-detail": "matches",
  "match-teams": "match_teams",
};

const inferTableName = (cfg) => {
  if (cfg.tableName) return cfg.tableName;
  const base = cfg.file ? cfg.file.replace(".html", "") : "";
  if (TABLE_MAP[base]) return TABLE_MAP[base];
  if (cfg.type === "list" && base) return base.replace(/-/g, "_");
  return null;
};

const schemaFor = (cfg) => {
  if (cfg.schema && cfg.schema.length) return cfg.schema;
  const tableName = inferTableName(cfg);
  if (tableName && cfg.columns) {
    return [{ name: tableName, cols: schemaCols(cfg.columns) }];
  }
  if (tableName && cfg.tabs) {
    const cols = cfg.tabs.reduce((acc, tab) => {
      if (tab.table) acc.push(...tab.table);
      if (tab.list) acc.push(...tab.list);
      return acc;
    }, []);
    return [{ name: tableName, cols: schemaCols(cols) || "Voir colonnes definies dans le schema" }];
  }
  if (tableName) {
    return [{ name: tableName, cols: "Voir colonnes definies dans le schema" }];
  }
  return null;
};

const filtersBar = (filters) => {
  if (!filters || !filters.length) return "";
  return `
  <div class="filtersBar">
    ${filters
      .map((f) => {
        if (f.type === "select") {
          const options = f.options.map((o) => `<option>${o}</option>`).join("");
          return `<div class="filterGroup"><label>${f.label}</label><select>${options}</select></div>`;
        }
        return `<div class="filterGroup"><label>${f.label}</label><input type="${f.type || "text"}" placeholder="${f.placeholder || ""}" /></div>`;
      })
      .join("\n")}
  </div>`;
};

const sampleValue = (col, actionHref) => {
  const c = col.toLowerCase();
  if (c.includes("action")) {
    return actionHref ? `<a class="btn btnTiny" href="${actionHref}">Voir</a>` : "<button class=\"btn btnTiny\">Action</button>";
  }
  if (c.includes("photo") || c.includes("image") || c.includes("logo") || c.includes("cover")) {
    return '<span class="avatarSmall">A</span>';
  }
  if (c.includes("status")) return '<span class="badge badge--warning">PENDING</span>';
  if (c.includes("date") || c.includes("created") || c.includes("updated")) return "2026-02-05";
  if (c.includes("order_number")) return "ORD-2026-001";
  if (c.includes("email")) return "user@email.com";
  if (c.includes("username") || c.includes("user")) return "zed_99";
  if (c.includes("role")) return "PLAYER";
  if (c.includes("total") || c.includes("price")) return "120 DT";
  if (c.includes("country") || c.includes("region")) return "TN";
  if (c.includes("game")) return "Valorant";
  if (c.includes("team")) return "Nebula Five";
  if (c.includes("format")) return "BO3";
  if (c.includes("score")) return "2";
  if (c.includes("seed")) return "1";
  if (c.includes("title")) return "Pulse Invitational";
  if (c.includes("id")) return "1";
  return "—";
};

const dataTable = (headers, actionHref) => {
  const row = headers.map((h) => sampleValue(h, actionHref));
  const row2 = headers.map((h) => sampleValue(h, actionHref));
  return `
  <div class="dataTableWrap">
    <table class="dataTable">
      <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>
        <tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>
        <tr>${row2.map((c) => `<td>${c}</td>`).join("")}</tr>
      </tbody>
    </table>
  </div>`;
};

const tabsBlock = (key, tabs) => `
  <div class="tabs" data-tabs="${key}">
    ${tabs.map((t, i) => `<button class="tab${i === 0 ? " isActive" : ""}" data-tab="${t.id}">${t.label}</button>`).join("\n")}
  </div>
  <div class="tabPanels" data-panels="${key}">
    ${tabs.map((t, i) => `<div class="tabPanel${i === 0 ? " isActive" : ""}" data-panel="${t.id}">${t.body}</div>`).join("\n")}
  </div>
`;

const renderListPage = (cfg) => `
  <div class="pageHeader">
    <div>
      <h2>${cfg.title}</h2>
      <div class="pageSub">${cfg.desc || ""}</div>
    </div>
    ${cfg.actionHref ? `<div class="formActions"><a class="btn btnPrimary" href="${cfg.actionHref}">${cfg.actionLabel || "Creer"}</a></div>` : ""}
  </div>
  ${filtersBar(cfg.filters)}
  <section class="panel">
    <div class="panelHeader"><h3 class="panelTitle">${cfg.tableTitle || "LISTE"}</h3></div>
    ${dataTable(cfg.columns, cfg.rowAction)}
    ${cfg.footer || ""}
  </section>
  ${schemaFor(cfg) ? schemaPanel(schemaFor(cfg)) : ""}
`;

const renderFormPage = (cfg) => `
  <div class="pageHeader">
    <div>
      <h2>${cfg.title}</h2>
      <div class="pageSub">${cfg.desc || ""}</div>
    </div>
  </div>
  <section class="panel">
    <div class="formGrid">
      ${cfg.fields
        .map((f) => {
          const name = f.label || f;
          const lower = name.toLowerCase();
          if (f.type === "textarea" || lower.includes("description") || lower.includes("rules") || lower.includes("bio")) {
            return `<div class="field"><label>${name}</label><textarea placeholder="${f.placeholder || ""}"></textarea></div>`;
          }
          if (f.type === "select" || lower.includes("role") || lower.includes("status") || lower.includes("mode") || lower.includes("format")) {
            const options = (f.options || ["Option 1", "Option 2"]).map((o) => `<option>${o}</option>`).join("");
            return `<div class="field"><label>${name}</label><select>${options}</select></div>`;
          }
          const type = f.type || (lower.includes("date") ? "date" : lower.includes("email") ? "email" : lower.includes("password") ? "password" : "text");
          return `<div class="field"><label>${name}</label><input type="${type}" placeholder="${f.placeholder || ""}" /></div>`;
        })
        .join("\n")}
    </div>
    <div class="formActions" style="margin-top:12px;">
      <button class="btn btnPrimary">Enregistrer</button>
      <button class="btn btnGhost">Annuler</button>
    </div>
  </section>
  ${schemaFor(cfg) ? schemaPanel(schemaFor(cfg)) : ""}
`;

const renderTabsPage = (cfg) => `
  <div class="pageHeader">
    <div>
      <h2>${cfg.title}</h2>
      <div class="pageSub">${cfg.desc || ""}</div>
    </div>
    ${cfg.actions || ""}
  </div>
  ${tabsBlock(
    cfg.tabKey,
    cfg.tabs.map((t) => ({
      id: t.id,
      label: t.label,
      body: t.table
        ? `<section class="panel">${dataTable(t.table, t.rowAction)}</section>`
        : `<section class="panel"><div class="list">${t.list
            .map((item) => `<div class="listItem"><span>${item}</span><span class="listMeta">${sampleValue(item)}</span></div>`)
            .join("")}</div></section>`,
    }))
  )}
  ${schemaFor(cfg) ? schemaPanel(schemaFor(cfg)) : ""}
`;

const pages = [
  { file: "index.html", title: "Dashboard Admin", active: "dashboard", type: "dashboard" },
  {
    file: "users.html",
    title: "Gestion utilisateurs",
    active: "users",
    type: "list",
    desc: "users + images + actions batch.",
    columns: ["Photo", "username", "email", "role", "is_active", "email_verified", "country", "created_at", "last_login_at", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "username/email" },
      { label: "Role", type: "select", options: ["ALL", "PLAYER", "ORGANIZER", "ADMIN"] },
      { label: "Actif", type: "select", options: ["ALL", "Actif", "Suspendu"] },
      { label: "Email verified", type: "select", options: ["ALL", "Oui", "Non"] },
    ],
    actionHref: "user-create.html",
    actionLabel: "+ Creer utilisateur",
    rowAction: "user-detail.html",
    schema: [
      { name: "users", cols: "user_id, username, email, role, is_active, email_verified" },
      { name: "images", cols: "image_id, file_url" },
    ],
  },
  {
    file: "user-detail.html",
    title: "Detail utilisateur",
    active: "users",
    type: "tabs",
    desc: "Profil, equipes, activite, commerce, moderation.",
    tabKey: "user",
    tabs: [
      { id: "profil", label: "Profil", list: ["user_id", "username", "email", "role"] },
      { id: "equipes", label: "Equipes", table: ["team", "joined_at", "is_active"] },
      { id: "activite", label: "Activite", table: ["post_id", "created_at", "visibility"] },
      { id: "commerce", label: "E-commerce", table: ["order_number", "status", "total_amount"] },
      { id: "moderation", label: "Moderation", table: ["report_id", "target_type", "status"] },
    ],
    schema: [
      { name: "users", cols: "user_id, username, email, role, profile_image_id" },
      { name: "team_members", cols: "team_id, user_id, joined_at" },
      { name: "orders", cols: "order_id, user_id, status" },
      { name: "reports", cols: "report_id, reporter_user_id, target_type" },
    ],
  },
  {
    file: "user-create.html",
    title: "Creer utilisateur",
    active: "users",
    type: "form",
    fields: [
      "username*",
      "email*",
      { label: "password*", type: "password" },
      { label: "confirm_password*", type: "password" },
      { label: "role*", type: "select", options: ["PLAYER", "ORGANIZER", "ADMIN"] },
      "display_name*",
      { label: "bio", type: "textarea" },
      "phone",
      "country",
      { label: "birth_date", type: "date" },
      { label: "gender", type: "select", options: ["male", "female", "other"] },
      { label: "email_verified", type: "select", options: ["true", "false"] },
      { label: "is_active", type: "select", options: ["true", "false"] },
      { label: "profile_image", type: "file" },
    ],
  },
  {
    file: "user-edit.html",
    title: "Modifier utilisateur",
    active: "users",
    type: "form",
    fields: [
      "username",
      "email",
      { label: "role", type: "select", options: ["PLAYER", "ORGANIZER", "ADMIN"] },
      "display_name",
      { label: "new_password", type: "password" },
      { label: "confirm_password", type: "password" },
      { label: "email_verified", type: "select", options: ["true", "false"] },
      { label: "is_active", type: "select", options: ["true", "false"] },
      { label: "reset photo", type: "select", options: ["non", "oui"] },
    ],
  },
  {
    file: "posts.html",
    title: "Gestion posts",
    active: "posts",
    topKey: "reports",
    type: "list",
    desc: "posts + stats (images, comments, likes).",
    columns: ["post_id", "Auteur", "Extrait", "visibility", "created_at", "is_deleted", "nb images", "nb comments", "nb likes", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "keyword" },
      { label: "Visibility", type: "select", options: ["ALL", "PUBLIC", "FRIENDS", "TEAM_ONLY"] },
      { label: "Deleted", type: "select", options: ["ALL", "false", "true"] },
    ],
    rowAction: "post-detail.html",
  },
  {
    file: "post-detail.html",
    title: "Detail post",
    active: "posts",
    topKey: "reports",
    type: "tabs",
    desc: "Post + commentaires + moderation.",
    tabKey: "post",
    tabs: [
      { id: "post", label: "Post", list: ["post_id", "author_user_id", "visibility", "is_deleted"] },
      { id: "comments", label: "Commentaires", table: ["comment_id", "author", "content_text", "created_at"] },
      { id: "reports", label: "Signalements", table: ["report_id", "status", "created_at"] },
    ],
  },
  {
    file: "comments.html",
    title: "Gestion commentaires",
    active: "comments",
    topKey: "reports",
    type: "list",
    desc: "comments + moderation.",
    columns: ["comment_id", "post_id", "Auteur", "Extrait", "created_at", "is_deleted", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "keyword" },
      { label: "Deleted", type: "select", options: ["ALL", "false", "true"] },
      { label: "Date", type: "date" },
    ],
    rowAction: "post-detail.html",
  },
  {
    file: "messages.html",
    title: "Gestion messages",
    active: "messages",
    topKey: "reports",
    type: "list",
    desc: "messages (option moderation).",
    columns: ["message_id", "sender", "receiver", "extrait", "created_at", "is_read", "Actions"],
    filters: [
      { label: "Sender", placeholder: "username" },
      { label: "Receiver", placeholder: "username" },
      { label: "is_read", type: "select", options: ["ALL", "true", "false"] },
    ],
  },
  {
    file: "reports.html",
    title: "Gestion signalements",
    active: "reports",
    topKey: "reports",
    type: "list",
    desc: "reports OPEN/IN_REVIEW/CLOSED.",
    columns: ["report_id", "reporter", "target_type", "target_id", "status", "created_at", "Actions"],
    filters: [
      { label: "Status", type: "select", options: ["ALL", "OPEN", "IN_REVIEW", "CLOSED"] },
      { label: "Target", type: "select", options: ["ALL", "POST", "COMMENT", "USER", "TEAM"] },
      { label: "Recherche", placeholder: "reason, reporter" },
    ],
    rowAction: "report-detail.html",
  },
  {
    file: "report-detail.html",
    title: "Detail signalement",
    active: "reports",
    topKey: "reports",
    type: "tabs",
    desc: "Actions admin + apercu cible.",
    tabKey: "report",
    tabs: [
      { id: "info", label: "Infos", list: ["report_id", "target_type", "target_id", "status"] },
      { id: "target", label: "Cible", list: ["preview", "actions"] },
    ],
  },
  {
    file: "categories.html",
    title: "Gestion categories",
    active: "categories",
    topKey: "games",
    type: "list",
    desc: "categories + nb jeux.",
    columns: ["category_id", "name", "description", "created_at", "nb jeux", "Actions"],
    actionHref: "category-form.html",
    actionLabel: "+ Nouvelle categorie",
    rowAction: "category-form.html",
  },
  {
    file: "category-form.html",
    title: "Form categorie",
    active: "categories",
    topKey: "games",
    type: "form",
    fields: ["name*", { label: "description", type: "textarea" }],
  },
  {
    file: "games.html",
    title: "Gestion jeux",
    active: "games",
    topKey: "games",
    type: "list",
    desc: "games + cover image.",
    columns: ["cover", "game_id", "name", "category", "publisher", "created_at", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "name, publisher" },
      { label: "Category", type: "select", options: ["ALL", "FPS", "MOBA"] },
    ],
    actionHref: "game-form.html",
    actionLabel: "+ Nouveau jeu",
    rowAction: "game-detail.html",
  },
  {
    file: "game-detail.html",
    title: "Detail jeu",
    active: "games",
    topKey: "games",
    type: "tabs",
    desc: "Infos + tournois associes.",
    tabKey: "game",
    tabs: [
      { id: "info", label: "Infos", list: ["name", "category", "publisher"] },
      { id: "tournois", label: "Tournois", table: ["tournament_id", "status", "start_date", "prize_pool"] },
    ],
  },
  {
    file: "game-form.html",
    title: "Form jeu",
    active: "games",
    topKey: "games",
    type: "form",
    fields: ["name*", { label: "category_id*", type: "select", options: ["FPS", "MOBA"] }, "publisher", { label: "description", type: "textarea" }, { label: "cover_image", type: "file" }],
  },
  {
    file: "teams.html",
    title: "Gestion equipes",
    active: "teams",
    topKey: "users",
    type: "list",
    desc: "teams + captain + stats.",
    columns: ["logo", "team_id", "name", "region", "captain", "members", "products", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "name, captain" },
      { label: "Region", placeholder: "EU" },
      { label: "Avec produits", type: "select", options: ["ALL", "Oui", "Non"] },
    ],
    rowAction: "team-detail.html",
  },
  {
    file: "team-detail.html",
    title: "Detail equipe",
    active: "teams",
    topKey: "users",
    type: "tabs",
    desc: "Infos + membres + produits + tournois.",
    tabKey: "team",
    tabs: [
      { id: "info", label: "Infos", list: ["name", "region", "captain_user_id"] },
      { id: "members", label: "Membres", table: ["user", "joined_at", "is_active"] },
      { id: "requests", label: "Demandes", table: ["request_id", "user", "status"] },
      { id: "invites", label: "Invitations", table: ["invite_id", "invited_user", "status"] },
      { id: "products", label: "Produits", table: ["product_id", "name", "price"] },
      { id: "tournaments", label: "Tournois", table: ["tournament_id", "status", "seed"] },
    ],
  },
  {
    file: "team-members.html",
    title: "Gestion team_members",
    active: "teams",
    type: "list",
    desc: "Liste globale des membres.",
    columns: ["team", "user", "joined_at", "is_active", "Actions"],
  },
  {
    file: "team-requests.html",
    title: "Demandes rejoindre equipe",
    active: "teams",
    type: "list",
    desc: "Admin peut forcer accept/refuse.",
    columns: ["request_id", "team", "user", "status", "created_at", "Actions"],
  },
  {
    file: "team-invites.html",
    title: "Invitations equipe",
    active: "teams",
    type: "list",
    desc: "Suivi des invites.",
    columns: ["invite_id", "team", "invited_user", "status", "created_at", "Actions"],
  },
  {
    file: "products.html",
    title: "Gestion produits",
    active: "products",
    topKey: "orders",
    type: "list",
    desc: "Produits + images + stock.",
    columns: ["image", "product_id", "name", "team", "price", "stock_qty", "is_active", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "name, sku" },
      { label: "Team", placeholder: "team" },
      { label: "Actif", type: "select", options: ["ALL", "true", "false"] },
    ],
    actionHref: "product-form.html",
    actionLabel: "+ Nouveau produit",
    rowAction: "product-detail.html",
  },
  {
    file: "product-detail.html",
    title: "Detail produit",
    active: "products",
    topKey: "orders",
    type: "tabs",
    desc: "Infos + commandes impactees.",
    tabKey: "product",
    tabs: [
      { id: "info", label: "Infos", list: ["product_id", "name", "price", "stock_qty"] },
      { id: "orders", label: "Commandes", table: ["order_number", "status", "quantity"] },
    ],
  },
  {
    file: "product-form.html",
    title: "Form produit",
    active: "products",
    topKey: "orders",
    type: "form",
    fields: [
      "team_id*",
      "name*",
      "sku",
      { label: "price*", type: "number" },
      { label: "stock_qty*", type: "number" },
      { label: "is_active", type: "select", options: ["true", "false"] },
      { label: "description", type: "textarea" },
      { label: "Images", type: "file" },
    ],
  },
  {
    file: "carts.html",
    title: "Gestion paniers",
    active: "carts",
    topKey: "orders",
    type: "list",
    desc: "Lecture/debug carts.",
    columns: ["cart_id", "user", "status", "items", "updated_at"],
  },
  {
    file: "orders.html",
    title: "Gestion commandes",
    active: "orders",
    topKey: "orders",
    type: "list",
    desc: "Orders + filtres + export.",
    columns: ["order_number", "user", "status", "payment_status", "payment_method", "total_amount", "created_at", "Actions"],
    filters: [
      { label: "Recherche", placeholder: "order_number" },
      { label: "Status", type: "select", options: ["ALL", "PENDING", "PAID", "SHIPPED"] },
      { label: "Payment", type: "select", options: ["ALL", "UNPAID", "PAID"] },
    ],
    rowAction: "order-detail.html",
  },
  {
    file: "order-detail.html",
    title: "Detail commande",
    active: "orders",
    topKey: "orders",
    type: "tabs",
    desc: "Infos + items + actions.",
    tabKey: "order",
    tabs: [
      { id: "info", label: "Infos", list: ["order_number", "status", "payment_status", "total_amount"] },
      { id: "items", label: "Items", table: ["product", "team", "unit_price", "quantity", "subtotal"] },
    ],
  },
  {
    file: "tournament-requests.html",
    title: "Demandes tournois",
    active: "tournamentRequests",
    topKey: "tournaments",
    type: "list",
    desc: "tournament_requests PENDING/ACCEPTED/REFUSED.",
    columns: ["request_id", "title", "organizer", "game", "start_date", "prize_pool", "status", "Actions"],
    filters: [
      { label: "Status", type: "select", options: ["ALL", "PENDING", "ACCEPTED", "REFUSED"] },
      { label: "Game", placeholder: "Valorant" },
    ],
    rowAction: "tournament-request-detail.html",
  },
  {
    file: "tournament-request-detail.html",
    title: "Detail demande tournoi",
    active: "tournamentRequests",
    topKey: "tournaments",
    type: "tabs",
    desc: "Accepter / Refuser + admin_note.",
    tabKey: "trequest",
    tabs: [
      { id: "info", label: "Infos", list: ["title", "game_id", "format", "max_teams"] },
      { id: "admin", label: "Admin", list: ["status", "admin_response_note", "reviewed_at"] },
    ],
  },
  {
    file: "tournaments.html",
    title: "Gestion tournois",
    active: "tournaments",
    topKey: "tournaments",
    type: "list",
    desc: "CRUD tournaments + filtres.",
    columns: ["tournament_id", "title", "game", "organizer", "status", "start_date", "prize_pool", "Actions"],
    filters: [
      { label: "Status", type: "select", options: ["ALL", "OPEN", "ONGOING", "FINISHED"] },
      { label: "Game", placeholder: "Valorant" },
    ],
    actionHref: "tournament-form.html",
    actionLabel: "+ Nouveau tournoi",
    rowAction: "tournament-detail.html",
  },
  {
    file: "tournament-form.html",
    title: "Form tournoi",
    active: "tournaments",
    topKey: "tournaments",
    type: "form",
    fields: [
      "organizer_user_id*",
      "game_id*",
      "title*",
      { label: "start_date*", type: "date" },
      { label: "end_date*", type: "date" },
      { label: "registration_deadline", type: "date" },
      { label: "max_teams*", type: "number" },
      { label: "format*", type: "select", options: ["BO1", "BO3", "BO5"] },
      { label: "registration_mode*", type: "select", options: ["OPEN", "APPROVAL"] },
      { label: "prize_pool*", type: "number" },
      { label: "prize_description", type: "textarea" },
      { label: "description", type: "textarea" },
      { label: "rules", type: "textarea" },
    ],
  },
  {
    file: "tournament-detail.html",
    title: "Detail tournoi",
    active: "tournaments",
    topKey: "tournaments",
    type: "tabs",
    desc: "Infos + inscriptions + matchs + classement.",
    tabKey: "tournament",
    tabs: [
      { id: "info", label: "Infos", list: ["title", "status", "format", "prize_pool"] },
      { id: "teams", label: "Inscriptions", table: ["team", "status", "seed"] },
      { id: "matches", label: "Matchs", table: ["match_id", "round_name", "scheduled_at", "status"] },
      { id: "results", label: "Classement", table: ["team", "W", "L", "points"] },
    ],
  },
  {
    file: "tournament-teams.html",
    title: "Inscriptions equipes",
    active: "tournaments",
    topKey: "tournaments",
    type: "list",
    desc: "tournament_teams.",
    columns: ["team", "status", "seed", "registered_at", "checked_in", "Actions"],
  },
  {
    file: "matches.html",
    title: "Gestion matchs",
    active: "matches",
    topKey: "tournaments",
    type: "list",
    desc: "Liste + filtres.",
    columns: ["match_id", "tournament", "round_name", "scheduled_at", "status", "Actions"],
    filters: [
      { label: "Status", type: "select", options: ["ALL", "SCHEDULED", "ONGOING", "FINISHED"] },
      { label: "Round", placeholder: "Quarterfinal" },
    ],
    rowAction: "match-detail.html",
  },
  {
    file: "match-detail.html",
    title: "Detail match",
    active: "matches",
    topKey: "tournaments",
    type: "tabs",
    desc: "Teams + scores + actions.",
    tabKey: "match",
    tabs: [
      { id: "info", label: "Infos", list: ["match_id", "tournament_id", "round_name", "status"] },
      { id: "teams", label: "Teams", table: ["team_id", "score", "is_winner"] },
    ],
  },
  {
    file: "match-teams.html",
    title: "Gestion match_teams",
    active: "matches",
    topKey: "tournaments",
    type: "list",
    desc: "Associer equipes + scores.",
    columns: ["match_id", "team_id", "score", "is_winner"],
  },
  {
    file: "notifications.html",
    title: "Notifications systeme",
    active: "notifications",
    topKey: "dashboard",
    type: "list",
    desc: "Optionnel: lire / marquer lu.",
    columns: ["notification_id", "user", "type", "content", "is_read", "created_at"],
  },
  {
    file: "images.html",
    title: "Gestion images",
    active: "images",
    topKey: "dashboard",
    type: "list",
    desc: "Media + contraintes FK.",
    columns: ["image_id", "file_url", "mime_type", "size_bytes", "uploaded_by", "created_at"],
    filters: [
      { label: "mime_type", placeholder: "image/png" },
      { label: "uploaded_by", placeholder: "user" },
    ],
  },
];

const dashboardContent = `
  <div class="pageHeader">
    <div>
      <h2>Dashboard Admin</h2>
      <div class="pageSub">Vue globale, alertes et acces rapide.</div>
    </div>
    <div class="formActions">
      <button class="btn btnGhost">Exporter CSV</button>
      <button class="btn btnPrimary">Actualiser</button>
    </div>
  </div>
  ${filtersBar([
    { label: "Periode", type: "select", options: ["Aujourd'hui", "7 jours", "30 jours", "Personnalise"] },
    { label: "Statut commande", type: "select", options: ["ALL", "PENDING", "PAID", "SHIPPED"] },
    { label: "Reports", type: "select", options: ["ALL", "OPEN", "IN_REVIEW", "CLOSED"] },
    { label: "Demandes tournois", type: "select", options: ["ALL", "PENDING", "ACCEPTED", "REFUSED"] },
  ])}
  <div class="kpiRow">
    <div class="kpiCard"><div class="kpiLabel">Total utilisateurs</div><div class="kpiValue">12,402</div><div class="listMeta">+124 / 7 jours</div></div>
    <div class="kpiCard"><div class="kpiLabel">Commandes</div><div class="kpiValue">2,140</div><div class="listMeta">PENDING 120</div></div>
    <div class="kpiCard"><div class="kpiLabel">CA total</div><div class="kpiValue">128,900 DT</div><div class="listMeta">30 jours</div></div>
    <div class="kpiCard"><div class="kpiLabel">Signalements ouverts</div><div class="kpiValue">14</div><div class="listMeta">OPEN / IN_REVIEW</div></div>
    <div class="kpiCard"><div class="kpiLabel">Demandes tournois</div><div class="kpiValue">6</div><div class="listMeta">PENDING</div></div>
    <div class="kpiCard"><div class="kpiLabel">Tournois en cours</div><div class="kpiValue">9</div><div class="listMeta">ONGOING</div></div>
  </div>
  <div class="split">
    <div>
      <section class="panel">
        <div class="panelHeader"><h3 class="panelTitle">GRAPHIQUES</h3><span class="listMeta">Commandes & inscriptions</span></div>
        <div class="list">
          <div class="listItem"><span>Commandes par jour/semaine</span><span class="badge badge--info">Chart</span></div>
          <div class="listItem"><span>Repartition commandes par statut</span><span class="badge badge--info">Chart</span></div>
          <div class="listItem"><span>Inscriptions tournois par tournoi</span><span class="badge badge--info">Chart</span></div>
        </div>
      </section>
      <section class="panel">
        <div class="panelHeader"><h3 class="panelTitle">DERNIERS SIGNALEMENTS</h3><button class="btn btnTiny">Voir tout</button></div>
        <div class="list">
          <div class="listItem"><span>Report #1021 - POST</span><span class="badge badge--danger">OPEN</span></div>
          <div class="listItem"><span>Report #1020 - COMMENT</span><span class="badge badge--warning">IN_REVIEW</span></div>
          <div class="listItem"><span>Report #1018 - USER</span><span class="badge">CLOSED</span></div>
        </div>
      </section>
    </div>
    <div>
      <section class="panel">
        <div class="panelHeader"><h3 class="panelTitle">DERNIERES COMMANDES</h3><button class="btn btnTiny">Voir tout</button></div>
        ${dataTable(["order_number", "user", "status", "total_amount"], "order-detail.html")}
      </section>
      <section class="panel">
        <div class="panelHeader"><h3 class="panelTitle">DEMANDES TOURNOIS</h3><button class="btn btnTiny">Voir tout</button></div>
        <div class="list">
          <div class="listItem"><span>Pulse Winter Cup</span><span class="badge badge--warning">PENDING</span></div>
          <div class="listItem"><span>Community Clash</span><span class="badge badge--success">ACCEPTED</span></div>
        </div>
      </section>
      <section class="panel">
        <div class="panelHeader"><h3 class="panelTitle">DERNIERS UTILISATEURS</h3><button class="btn btnTiny">Voir tout</button></div>
        <div class="list">
          <div class="listItem"><span>@FrostByte</span><span class="listMeta">FR • PLAYER</span></div>
          <div class="listItem"><span>@NovaAim</span><span class="listMeta">US • PLAYER</span></div>
          <div class="listItem"><span>@ArenaOrg</span><span class="listMeta">ORGANIZER</span></div>
        </div>
      </section>
    </div>
  </div>
  ${schemaPanel([
    { name: "users", cols: "user_id, username, email, role, created_at" },
    { name: "orders", cols: "order_id, status, total_amount, created_at" },
    { name: "reports", cols: "report_id, target_type, status" },
    { name: "tournament_requests", cols: "request_id, status, created_at" },
    { name: "tournaments", cols: "tournament_id, status, start_date" },
  ])}
`;

pages.forEach((cfg) => {
  let content = "";
  if (cfg.type === "dashboard") content = dashboardContent;
  if (cfg.type === "list") content = renderListPage(cfg);
  if (cfg.type === "form") content = renderFormPage(cfg);
  if (cfg.type === "tabs") content = renderTabsPage(cfg);

  const html = page({
    title: cfg.title,
    active: cfg.active,
    topKey: cfg.topKey,
    content,
  });
  fs.writeFileSync(path.join(outDir, cfg.file), html, "utf8");
});

console.log(`Generated ${pages.length} pages in ${outDir}`);
