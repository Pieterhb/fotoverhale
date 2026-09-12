# Cloudflare Ontplooiingsgids: fotoverhale.softcoverbooks.co.za

Hierdie gids verduidelik hoe om die **Suid-Afrikaanse Fotoverhaal Argief** op Cloudflare te ontplooi en die subdomein `fotoverhale.softcoverbooks.co.za` te koppel.

---

## Opsie 1: Cloudflare Pages (Aanbeveel vir Next.js)

Cloudflare Pages bied direkte integrasie met GitHub en ondersteun Next.js via die `@cloudflare/next-on-pages` adapter of as 'n Statiese Webwerf (Static Export).

### Metode A: Statiese Webwerf (Blitsvinnig via Cloudflare CDN)
Aangesien al 357 fotoverhale-reekse en 437+ voorblaaie plaaslik gegenereer en bewaar word, kan u dit as 'n statiese webwerf bou:

1. Voeg `output: 'export'` by in `next.config.mjs`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   export default nextConfig;
   ```
2. Bou die projek:
   ```bash
   npm run build
   ```
   Dit skep die volledige statiese webwerf in die `out/` gids.
3. Koppel aan Cloudflare Pages:
   - Gaan na die Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages**.
   - Koppel u GitHub-bewaarplek (`fotoverhale`).
   - Stel die bou-opdrag in as: `npm run build`
   - Stel die afvoergids (Output directory) in as: `out`
   - Klik op **Save and Deploy**.

---

### Metode B: Cloudflare Pages met Next.js SSR / API-ondersteuning
As u die Next.js App Router met Cloudflare Workers runtime wil gebruik:
```bash
npm install --save-dev @cloudflare/next-on-pages
```
- Bou-opdrag in Cloudflare Pages: `npx @cloudflare/next-on-pages`
- Afvoergids: `.vercel/output/static`
- Verenigbaarheid vlag: `nodejs_compat`

---

## DNS & Subdomein Konfigurasie (fotoverhale.softcoverbooks.co.za)

Sodra u projek op Cloudflare Pages ontplooi is:

1. In die Cloudflare Dashboard, gaan na u **Pages Projek** -> **Custom Domains**.
2. Klik op **Set up a custom domain**.
3. Voer die subdomein in: `fotoverhale.softcoverbooks.co.za`.
4. Cloudflare sal outomaties die DNS CNAME-rekord vir `softcoverbooks.co.za` opdateer om te wys na u Pages-toepassing (bv. `fotoverhale.pages.dev`).
5. 'n Gratis SSL/TLS-sertifikaat word outomaties binne minute deur Cloudflare uitgereik.

---

## Periodieke Bywerking van die Argief

Indien u nuwe voorblaaie byvoeg op `softcoverbooks.co.za`:
1. Voer die skraper weer uit:
   ```bash
   python scraper/scrape_fotoverhale.py
   ```
2. Stoot die nuwe veranderinge na GitHub (`git commit` en `git push`).
3. Cloudflare Pages sal outomaties die webwerf herbou en die nuutste voorblaaie en reekse lewendig stel!
