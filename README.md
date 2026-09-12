# Die Suid-Afrikaanse Fotoverhaal Argief
### `fotoverhale.softcoverbooks.co.za`

'n Moderne, estetiese en vinnige digitale bewaarplek vir Suid-Afrikaanse Fotoverhale (kyk-en-lees fotoboeke uit die 1960's–1980's), geskraap vanaf en geanker in die ryk argief van `https://www.softcoverbooks.co.za/`.

---

## Projek-Oorsig

- **Hoof-tegnologieë**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide React, Fuse.js.
- **Data-onttrekking**: Python (BeautifulSoup, Concurrent ThreadPoolExecutor) om alle fotoverhale, metadata en voorbladbeelde te onttrek.
- **Tema & Kleurskema**: Vintage Dark Monochrome + Retro Pulp Accent (`#121417` diep grafiet, `#222730` kaarte, vintage papier/room `#F5EFEB`, warm amber `#E08838`, en bloedrooi `#B91C1C`).
- **Taal**: Volledig in Afrikaans met outentieke historiese terminologie.
- **Inhoud**:
  - 357 Gekatalogiseerde Fotoverhaal-reekse
  - 437+ Hoë-resolusie voorbladbeelde in `public/covers/`
  - 472+ Geregistreerde uitgawes en titels
  - Volledige geskiedenis-artikel deur **mnr. Koos Papenfus** in `data/geskiedenis.md` en `/geskiedenis`.

---

## Gids vir Plaaslike Uitvoering

### 1. Hardloop die Skraper (opsioneel, reeds gedoen)
```bash
python scraper/scrape_fotoverhale.py
```
Dit laai alle voorblaaie af na `public/covers/[slug]/` en werk `data/fotoverhale.json` en `data/geskiedenis.md` by.

### 2. Begin die Plaaslike Ontwikkelingsbediener
```bash
npm run dev
```
Maak oop in u webblaaier by: [http://localhost:3000](http://localhost:3000).

### 3. Bou vir Produksie
```bash
npm run build
npm run start
```

---

## Bladsye en Funksionaliteit

1. **Tuisblad & Galery (`/`)**:
   - Hero-afdeling met vinnige statistiektellers (Reekse, Voorblaaie, Tydperk, Bewaring).
   - Kitssoektog aangedryf deur Fuse.js (soek op reeksnaam, karakter, of uitgawenaam).
   - Kategorie-filters: `Alles`, `Aksie & Avontuur`, `Westerns`, `Speurder & Spioen`, `Liefde & Romanse`, `Medies & Hospitaal`, `Engelse Uitgawes`.
   - A–Z Alfabet-indeks om vinnig na reekse te spring.
   - Slegs-met-voorblaaie skakelaar en sorteer-opsies.
2. **Reeks-Detailaansig (`/reeks/[slug]`)**:
   - Uitstal van al die beskikbare voorblaaie van die spesifieke reeks.
   - Interaktiewe ligkas (Lightbox) met sleutelbord-navigasie (pyltjies en Esc).
   - Koos Papenfus se historiese agtergrondnotas en karakterinligting.
3. **Geskiedenis & Artikels (`/geskiedenis`)**:
   - Die volledige geskiedenis van die Suid-Afrikaanse fotoverhaal soos opgeteken deur Koos Papenfus.
   - Hoofstukke oor Mark Condor, Ruiter in Swart, Grensvegter, die anonieme akteurs, en die impak van SAUK TV in 1976.
4. **Oor die Argief & Erkenning (`/oor-ons`)**:
   - Erkenning aan mnr. Pieter Haasbroek, Koos Papenfus, Sven Barsby, en Carol Hardijzer.
   - Oproep aan versamelaars om ontbrekende voorblaaie by te dra.

---

## Cloudflare Ontplooiing

Sien die volledige stap-vir-stap gids in [`CLOUDFLARE_DEPLOYMENT.md`](file:///c:/fotoverhale/CLOUDFLARE_DEPLOYMENT.md) vir die opstelling van `fotoverhale.softcoverbooks.co.za`.
