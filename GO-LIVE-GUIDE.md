# Thomson's Edge — Website Go-Live Guide

Everything you need to launch the site and keep it running. No coding required for
the day-to-day items.

---

## 1. What you have

A complete, fast, mobile-friendly website with these pages:

- **Home** (`index.html`)
- **Projects / Portfolio** (`projects.html`)
- **Services** (`services.html`)
- **About Us** (`about.html`)
- **Contact / Book a Consultation** (`contact.html`)
- **Privacy Policy** (`privacy.html`) and **Terms of Use** (`terms.html`)
- A styled **404** page, plus `sitemap.xml`, `robots.txt`, favicons, and social-share image.

Everything is plain HTML/CSS/JS — it runs on any web host with no database or
special software.

---

## 2. Make the contact form send emails (5 minutes)

Right now the form opens the visitor's email app. To have enquiries emailed to you
automatically instead:

1. Go to **https://formspree.io** and create a free account.
2. Create a new form. Formspree gives you a form ID that looks like `xdorwkgb`.
3. In the form's settings, add both recipients:
   `info@thomsonsedge.com` and `sarah@thomsonsedge.com`.
4. Open `contact.html`, find this line near the form:
   `<form id="contact-form" ... data-endpoint="">`
   and put your ID inside the quotes:
   `data-endpoint="xdorwkgb"`
5. Save and re-upload `contact.html`. Done — enquiries now arrive in both inboxes,
   and the form still falls back to email if anything ever goes wrong.

(Web3Forms works the same way if you prefer it — paste its full endpoint URL into
`data-endpoint` instead.)

---

## 3. Put it online

You already have access to your current website, so you have a host. Upload the
**entire contents** of this folder to your host's public web folder (often called
`public_html`, `www`, or `htdocs`), keeping the folder structure intact.

Common ways to upload:
- Your host's File Manager (in cPanel or similar) — upload the ZIP and "Extract".
- An FTP program like FileZilla.
- If you'd rather use a modern host: Netlify or Cloudflare Pages both let you drag
  this folder in and go live free; you then point your domain at them.

After uploading, visit your domain and click through every page and the form.

---

## 4. Point the domain / go secure

- Make sure `thomsonsedge.com` points to wherever you uploaded the files (your host
  can confirm this — it's usually already set for your current site).
- Turn on **HTTPS/SSL** (nearly always free and one click in your host panel). Once
  it's active, open `.htaccess` and remove the `#` marks from the "Force HTTPS"
  lines to send everyone to the secure version.

---

## 5. Help Google find you (SEO)

1. Create a free **Google Business Profile** for Thomson's Edge (name, address,
   phone, hours, photos). This is the single biggest thing for "Ottawa designers"
   type searches.
2. Add the site to **Google Search Console** (search.google.com/search-console),
   verify it, and submit `https://thomsonsedge.com/sitemap.xml`.
3. The site already includes SEO titles, descriptions, structured data, and your
   Instagram/TikTok links for search engines.

---

## 6. Swapping photos or text later

- **Photos:** replace the files in `/assets/img/` with your own, keeping the same
  file names (e.g. a new `project-1.jpg`). Keep them a similar shape and under ~300 KB.
- **Text:** open the relevant `.html` file in any text editor and edit the words
  between the tags. When in doubt, change only the visible sentences.
- **Brand colours:** all colours live at the top of `/assets/css/style.css` under
  `:root` — change them in one place.
- **Team headshots:** the About page currently shows a "Considered / Personal /
  Crafted" gallery with a "headshots coming soon" note. Send real headshots and they
  can be dropped straight in.

---

## 7. Things still worth confirming

- **Project names** (Manotick, Rideau, Westboro, etc.) are placeholders — swap in
  real project names/locations if you have them.
- **Testimonials** are placeholders — replace with real client quotes when ready.
- **Logo for dark backgrounds:** the footer is intentionally light so your logo
  blends. If you ever want a dark footer, ask your logo designer for a version with
  a transparent background and light text.

Questions? Everything is standard HTML — any web developer can pick it up instantly.
