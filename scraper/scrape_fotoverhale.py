import os
import re
import json
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup

BASE_URL = "https://www.softcoverbooks.co.za/"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def clean_text(text):
    if not text:
        return ""
    # Replace non-breaking spaces and fix weird chars
    text = text.replace('\xa0', ' ').replace('&nbsp;', ' ')
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def fetch_url(url, timeout=15):
    try:
        quoted_url = urllib.parse.urlsplit(url)
        quoted_path = urllib.parse.quote(quoted_url.path)
        final_url = f"{quoted_url.scheme}://{quoted_url.netloc}{quoted_path}"
        req = urllib.request.Request(final_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode('utf-8', errors='replace')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def download_image(img_url, dest_path):
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 0:
        return True
    try:
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        quoted_url = urllib.parse.urlsplit(img_url)
        quoted_path = urllib.parse.quote(quoted_url.path)
        final_url = f"{quoted_url.scheme}://{quoted_url.netloc}{quoted_path}"
        req = urllib.request.Request(final_url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp, open(dest_path, 'wb') as f:
            f.write(resp.read())
        return True
    except Exception as e:
        print(f"Error downloading {img_url} to {dest_path}: {e}")
        return False

def determine_genre(title, language, description=""):
    t = title.lower()
    d = description.lower()
    
    # Medical & Hospital
    if any(k in t for k in ['dr ', 'dokter', 'saal 10', 'hospitaal', 'suster', 'psigiater']):
        return "Medies & Hospitaal"
    
    # Westerns
    if any(k in t for k in ['ruiter in swart', 'kid colt', 'kid die swerwer', 'skrikruiter', 'apache', 'lone wolf', 'the big iron', 'famous westerns', 'sundance', 'perdedief', 'weste']) or 'cowboy' in d:
        return "Westerns"
        
    # Detective & Spy
    if any(k in t for k in ['condor', 'spy', 'spioen', 'speurder', 'don le meer', 'savage', 'shamus', 'slaughter', 'conrad volta', 'hustler', 'supermask', 'saboteur', 'deep', 'craig', 'mes']) or 'speurder' in d or 'spioen' in d:
        return "Speurder & Spioen"
        
    # Romance & Drama
    if any(k in t for k in ['liefde', 'love', 'harte', 'saal', 'tessa', 'melody', 'louise', 'amanda', 'dagboek', 'secrets', 'see', 'foto liefde', 'tiener', 'vrou']):
        return "Liefde & Romanse"
        
    # Action & Adventure
    return "Aksie & Avontuur"

def determine_language(title, lang_code=None):
    if lang_code:
        l = lang_code.lower()
        if 'eng' in l:
            return "Engels"
        if 'afr' in l:
            return "Afrikaans"
    
    t = title.lower()
    english_indicators = [
        'and', 'the ', 'with ', 'call for', 'love', 'secrets', 'playboy', 'savage', 
        'slaughter', 'gang war', 'big iron', 'wild cat', 'true sa police', 'shamus', 
        'double feature', 'captain devil saboteur', 'cool the hustler'
    ]
    if any(ind in t for ind in english_indicators) and not any(afr in t for afr in ['en liefde', 'die ', 'van die']):
        return "Engels"
    if ' en ' in t and ' and ' in t:
        return "Tweetalig"
    return "Afrikaans"

def scrape_all():
    print("=== STAP 1: Laai Tuisblad en Reekse Lys af ===")
    os.makedirs("data", exist_ok=True)
    os.makedirs("public/covers", exist_ok=True)

    home_html = fetch_url(BASE_URL)
    if not home_html:
        raise Exception("Kon nie tuisblad laai nie!")

    home_soup = BeautifulSoup(home_html, 'html.parser')
    
    # 1. Versamel fotoverhaal skakels vanaf tuisblad
    series_links = {}
    for a in home_soup.find_all('a'):
        href = a.get('href', '')
        text = clean_text(a.get_text())
        if 'fotoverhaal' in href.lower():
            full_url = urllib.parse.urljoin(BASE_URL, href)
            # Normalize title
            title = clean_text(text)
            if not title and a.get('title'):
                title = clean_text(a.get('title'))
            title = re.sub(r'\s+reeks.*$', '', title, flags=re.IGNORECASE)
            title = re.sub(r'\s+boeke.*$', '', title, flags=re.IGNORECASE)
            if title and full_url not in series_links:
                series_links[full_url] = title

    print(f"Gevind: {len(series_links)} individuele fotoverhaal-reeks skakels op tuisblad.")

    # 2. Laai Meestertabel van 'reeks fotoverhale lys name.html'
    print("=== STAP 2: Ontleed Meestertabel van 'reeks fotoverhale lys name.html' ===")
    master_url = urllib.parse.urljoin(BASE_URL, "reeks fotoverhale lys name.html")
    master_html = fetch_url(master_url)
    master_soup = BeautifulSoup(master_html or "", 'html.parser')
    
    master_data = {}
    table = master_soup.find('table')
    if table:
        for row in table.find_all('tr')[1:]:
            cols = [clean_text(c.get_text()) for c in row.find_all(['td', 'th'])]
            if len(cols) >= 4 and cols[0]:
                raw_name = cols[0]
                lang = cols[1]
                publisher = cols[2]
                format_type = cols[3]
                s_slug = slugify(raw_name)
                master_data[s_slug] = {
                    "name": raw_name,
                    "language": lang,
                    "publisher": publisher,
                    "format": format_type
                }
    print(f"Meestertabel bevat {len(master_data)} fotoverhaal-reekse.")

    # Onttrek teks van spesifieke uitgawes in meesterblad
    master_issues_by_series = {}
    content_div = master_soup.find('div', class_='content')
    if content_div:
        current_series = None
        for p in content_div.find_all('p'):
            p_text = clean_text(p.get_text())
            # Check for REEKS header
            header_match = re.search(r'([A-Z0-9\s/]+)\s+REEKS', p_text)
            if header_match:
                series_header = clean_text(header_match.group(1)).title()
                current_series = slugify(series_header)
                if current_series not in master_issues_by_series:
                    master_issues_by_series[current_series] = []
            
            # Find issues lines like: "108. Grensvegter - Vir jou al die aasvoëls"
            for issue_match in re.finditer(r'(\d+)\.\s*([^\d\n\r]+?)(?=\s+\d+\.|$)', p_text):
                num = int(issue_match.group(1))
                i_title = clean_text(issue_match.group(2))
                if current_series:
                    master_issues_by_series[current_series].append({
                        "number": num,
                        "title": i_title
                    })

    # 3. Skraap elke individuele fotoverhaal-bladsy
    print("=== STAP 3: Skraap Spesifieke Reeksbladsye vir Voorblaaie en Notas ===")
    all_series = []
    images_to_download = []
    koos_papenfus_notes = {}

    for url, title in series_links.items():
        slug = slugify(title)
        html = fetch_url(url)
        if not html:
            continue
        
        soup = BeautifulSoup(html, 'html.parser')
        p_content = soup.find('div', class_='content')
        
        description_paras = []
        papenfus_text = []
        issues = []
        
        # Check text paragraphs
        if p_content:
            for p in p_content.find_all('p'):
                if not p.find('img'):
                    t = clean_text(p.get_text())
                    if t and not t.startswith('Copyright') and not t.startswith('Last updated'):
                        description_paras.append(t)
                        if 'koos papenfus' in t.lower() or 'papenfus' in t.lower():
                            papenfus_text.append(t)
                            
            # Look for issue numbers and titles in text
            full_content_text = p_content.get_text(separator="\n")
            for match in re.finditer(r'(\d+)\.\s*([^\d\n\r]+)', full_content_text):
                num = int(match.group(1))
                i_title = clean_text(match.group(2))
                # strip series name prefix if duplicated
                i_title = re.sub(rf'^{re.escape(title)}\s*-\s*', '', i_title, flags=re.IGNORECASE)
                if i_title and not any(iss['number'] == num for iss in issues):
                    issues.append({
                        "number": num,
                        "title": i_title
                    })

        description = "\n\n".join(description_paras)
        if papenfus_text:
            koos_papenfus_notes[title] = "\n\n".join(papenfus_text)

        # Look for images
        series_covers = []
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if 'fotoverhale' in src.lower() or 'images' in src.lower():
                img_name = os.path.basename(urllib.parse.unquote(src))
                # Skip site logos or spacer icons
                if any(x in img_name.lower() for x in ['logo', 'cd', 'counter', 'button', 'banner']):
                    continue
                    
                full_img_url = urllib.parse.urljoin(url, src)
                alt_title = clean_text(img.get('alt', ''))
                # Extract issue number from filename or alt
                num_match = re.search(r'(\d+)', img_name)
                img_issue_num = int(num_match.group(1)) if num_match else len(series_covers) + 1
                
                issue_title = alt_title or f"Uitgawe #{img_issue_num}"
                issue_title = re.sub(rf'^{re.escape(title)}\s*-\s*', '', issue_title, flags=re.IGNORECASE)
                
                # Check master table language
                master_info_pre = master_data.get(slug, {})
                lang_pre = determine_language(title, master_info_pre.get("language")).lower()
                
                # Clean slugs for SEO-friendly filename: <series>_<title>_<language>.jpg
                series_slug = slugify(title).replace('-', '_')
                clean_title_slug = slugify(issue_title).replace('-', '_') if issue_title and issue_title.lower() not in ['geen titel', 'no title'] else f"uitgawe_{img_issue_num}"
                title_slug = f"{img_issue_num}_{clean_title_slug}" if img_issue_num and not clean_title_slug.startswith(f"{img_issue_num}_") else clean_title_slug
                if len(title_slug) > 50:
                    title_slug = title_slug[:50].rstrip('_')
                
                ext = os.path.splitext(img_name)[1].lower() or ".jpg"
                clean_img_name = f"{series_slug}_{title_slug}_{lang_pre}{ext}"
                
                # Local destination
                local_dir = os.path.join("public", "covers", slug)
                dest_path = os.path.join(local_dir, clean_img_name)
                web_path = f"/covers/{slug}/{clean_img_name}"
                
                series_covers.append({
                    "number": img_issue_num,
                    "title": issue_title,
                    "image": web_path,
                    "raw_url": full_img_url,
                    "dest_path": dest_path
                })
                
                images_to_download.append((full_img_url, dest_path))

        # Check master table metadata
        master_info = master_data.get(slug, {})
        lang = determine_language(title, master_info.get("language"))
        genre = determine_genre(title, lang, description)
        
        # Combine issues from page and master list
        all_issue_nums = {cov['number']: cov for cov in series_covers}
        for master_iss in master_issues_by_series.get(slug, []):
            if master_iss['number'] not in all_issue_nums:
                all_issue_nums[master_iss['number']] = {
                    "number": master_iss['number'],
                    "title": master_iss['title'],
                    "image": series_covers[0]['image'] if series_covers else None
                }
        
        sorted_issues = sorted(all_issue_nums.values(), key=lambda x: x['number'])
        primary_cover = series_covers[0]['image'] if series_covers else (
            f"/covers/{slug}/cover.jpg" if os.path.exists(f"public/covers/{slug}/cover.jpg") else None
        )

        series_entry = {
            "id": slug,
            "title": title,
            "genre": genre,
            "language": lang,
            "publisher": master_info.get("publisher", "Republikeinse Publikasies"),
            "format": master_info.get("format", "A5"),
            "description": description or f"Gewilde Suid-Afrikaanse fotoverhaal-reeks {title}.",
            "total_covers": len(series_covers),
            "cover_image": primary_cover,
            "issues": [
                {
                    "number": iss["number"],
                    "title": iss["title"],
                    "image": iss.get("image") or primary_cover
                }
                for iss in sorted_issues
            ]
        }
        all_series.append(series_entry)

    # Sort all series by title
    all_series.sort(key=lambda s: s["title"].lower())

    # 4. Voeg reekse uit meestertabel by wat dalk nie 'n eie bladsy gehad het nie
    existing_slugs = {s["id"] for s in all_series}
    for m_slug, m_info in master_data.items():
        if m_slug not in existing_slugs and m_info["name"]:
            m_title = m_info["name"]
            m_lang = determine_language(m_title, m_info.get("language"))
            m_genre = determine_genre(m_title, m_lang)
            m_issues = master_issues_by_series.get(m_slug, [])
            all_series.append({
                "id": m_slug,
                "title": m_title,
                "genre": m_genre,
                "language": m_lang,
                "publisher": m_info.get("publisher", "Onbekend"),
                "format": m_info.get("format", "A5"),
                "description": f"Gelys in die meester fotoverhale-indeks saamgestel deur Koos Papenfus, Sven Barsby en Carol Hardijzer.",
                "total_covers": 0,
                "cover_image": None,
                "issues": m_issues
            })

    # Sort again
    all_series.sort(key=lambda s: s["title"].lower())

    # 5. Laai beelde af met ThreadPool
    print(f"=== STAP 4: Laai {len(images_to_download)} Voorbladbeelde Af ===")
    success_count = 0
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(download_image, url, path): (url, path) for url, path in images_to_download}
        for future in as_completed(futures):
            if future.result():
                success_count += 1
            if success_count % 25 == 0 or success_count == len(images_to_download):
                print(f"Afstand: {success_count}/{len(images_to_download)} beelde verwerk.")

    # 6. Skryf data/fotoverhale.json
    print("=== STAP 5: Stoor data/fotoverhale.json ===")
    with open("data/fotoverhale.json", "w", encoding="utf-8") as f:
        json.dump(all_series, f, ensure_ascii=False, indent=2)
    print(f"Gestoord: {len(all_series)} reekse in data/fotoverhale.json.")

    # 7. Skep data/geskiedenis.md met Koos Papenfus se volledige opnames
    print("=== STAP 6: Skep data/geskiedenis.md ===")
    geskiedenis_content = f"""# Die Geskiedenis van die Suid-Afrikaanse Fotoverhaal
*Saamgestel en opgeteken deur mnr. Koos Papenfus, met bydraes deur Carol Hardijzer en Pieter Haasbroek.*

---

## Inleiding: Die Unieke Kyk-en-Lees Fenomeen van Suid-Afrika

In die 1960's, 1970's en vroeë 1980's het 'n unieke literêre en visuele medium miljoene Suid-Afrikaners vasgenael gehou: die **fotoverhaal** (ook liefdevol bekend as 'n *kyk-en-lees* boekie). Anders as oorsese strokiesprente (comics) wat geteken is, het Suid-Afrikaanse fotoverhale gebruik gemaak van regte akteurs, fotograwe, grimering en werklike liggings in Johannesburg, Durban, Kaapstad en die Transvaalse bosveld.

Hierdie sakgrootte boekies – gedruk op goedkoop koerantpapier met glansende, helderkleurige voorblaaie – is weekliks by kafees, spoorwegstasies en algemene handelaars vir 'n paar sent verkoop. Vir geslagte Suid-Afrikaners was dit die primêre bron van bekostigbare ontvlugting en spanning.

---

## 1. Die Ontstaan: Mark Condor en die Goue Eeu

Die fotoverhaal-era het in die vroeë 1960's momentum gekry. Een van die vroegste baanbrekers en reuse-suksesse was **Mark Condor**. Mark Condor was Suid-Afrika se eie James Bond: 'n aantreklike, onverskrokke geheime agent wat internasionale misdaadsindikate, sluipmoordenaars en eksotiese spioene vasgevat het. 

Die resep van vinnige aksie, eksotiese vroue, pistole met knaldempers en dramatiese vuisgevegte het 'n reusagtige lesersmark ontsluit. Mark Condor het die fondament gelê vir die ontstaan van tientalle ander reekse wat vinnig sou volg.

---

## 2. Die Western-Era: Ruiter in Swart en Kid die Swerwer

Kort op die hakke van Mark Condor het die "cowboy"-genre Suid-Afrika stormerhand verower. Suid-Afrikaners was tradisioneel baie lief vir cowboy-stories, wat reeds in die 1950's as sagtebandboeke gewild was.

### Ruiter in Swart
Die **Ruiter in Swart** het een van die langslopendste en gewildste reekse in die geskiedenis van die medium geword:
- **Die Karakter**: Ben (later geïdentifiseer as Ben Brandt), 'n lid van die ou Transvaalse Polisiemag (ZARP) en 'n persoonlike vriend van president Paul Kruger.
- **Voorkoms**: Van kop tot tone in swart geklee, met twee rewolwers aan sy sye gerig vir die kenmerkende "crossdraw" – die teken van 'n ware snelskut.
- **Metgeselle**: Sy getroue swart perd Satan (alhoewel hy op sekere voorblaaie op 'n donkerbruin perd verskyn het) en in latere uitgawes sy wolfhond.
- **Die Akteur**: Die rol is vir jare lank vertolk deur **Danie van Rensburg**, wat onder die verhoognaam **Vonk de Ridder** ook in bekende Afrikaanse rolprente soos *Voor Sononder* opgetree het.

### Kid die Swerwer & Kid Colt
Saam met die Ruiter was *Kid die Swerwer* (en sy Engelse eweknie *Kid Colt*) reuse gunstelinge. Verhale van wetteloosheid op die delwerye en die grensgebiede het lesers week na week geboei.

---

## 3. Die Grensoorlog en Rocco de Wet: Grensvegter

Teen die laat 1970's het die politieke en militêre werklikheid van Suid-Afrika dramaties verander. Die Bosoorlog aan die noordgrens van Suidwes-Afrika (Namibië) en Angola het 'n direkte werklikheid geword vir byna elke gesin in die land. Byna elke familie het 'n seun, broer of vader gehad wat diens gedoen het op die grens.

In hierdie konteks het **Grensvegter** verskyn en onmiddellik 'n kultus-verskynsel geword:
- **Rocco de Wet**: 'n Onverskrokke eenman-oorlogsmasjien wat diep agter vyandelike lyne geopereer het om terroriste, insurgente en buitelandse huursoldate uit te wis.
- **Dan Pienaar**: In latere jare het die karakter Dan Pienaar by Rocco oorgeneem om die reeks vars te hou sonder om 'n nuwe akteur vir die ou karakter in te span.
- **Kulturele Trefkrag**: Net soos die rolprente *Kaptein Caprivi* en *Boetie gaan Border toe*, het *Grensvegter* die publiek se emosies en patriotisme tydens 'n gespanne tydvak vasgevang.

---

## 4. Ander Legendariese Genres en Karakters

### Die Wit Tier: Oerwoud-held van Takaranië
Vir aanhangers van oerwoud-avonture was daar *Die Wit Tier*. Geleë in die denkbeeldige Afrika-koninkryk Takaranië, was hierdie gespierde held 'n mengsel van Tarzan en Lee Falk se *The Phantom* (Die Skim). Gewapen met slegs sy hande, sy jagmes en sy verstand, het hy ivoorstropery, Arabiese slawehandelaars, en verlore prehistoriese monsters beveg.

### Tessa: Die Eerste Vroulike Aksieheldin
In 'n destyds baie konserwatiewe samelewing was **Tessa** 'n openbaring. As 'n beeldskone, blonde speurder en avonturier wat gereeld in swemklere of 'n bikini verskyn het, het sy bewys dat 'n vrou net so vaardig met die pistool en die vuiste kon wees. Die uitgewers het streng binne die grense van die Sensuurraad gebly – geen eksplisiete inhoud of kru taal nie – maar met delikate redigering was Tessa 'n reusagtige treffer.

### Dr. Conrad Brand en Saal 10: Mediese Emosie
Nie alle lesers wou pistole en skietgevegte hê nie. Reekse soos **Dr. Conrad Brand** ("die dokter met die goue hart") en **Saal 10 / Saal 10 Ongevalle** het emosiebelaaide hospitaaldramas en lewenswerklike krisisse uitgebeeld wat veral onder vroulike lesers ongekende gewildheid geniet het.

---

## 5. Waarom Akteurs en Skeppers Selde Gekrediteer is

'n Groot vraag onder hedendaagse versamelaars en navorsers is hoekom die skrywers, fotograwe en akteurs byna nooit in die boekies erkenning gekry het nie:
1. **Streng Uitgewerskontrole**: Uitgewersreuse soos **Republikeinse Publikasies** in Durban wou die handelsmerke en karakters streng beheer. As 'n akteur te bekend sou word of hoër vergoeding sou eis, kon die uitgewer die akteur eenvoudig vervang sonder dat die leser amptelik daarvan ingelig is.
2. **Beskerming van Privaatheid**: Baie van die modelle en akteurs was gewone studente, onderwysers of amateur toneelspelers wat ekstra sakgeld verdien het (dikwels slegs R10 tot R20 per fotosessie) en nie noodwendig met die sensasionele temas van sekere boekies geassosieer wou word nie.
3. **Vinnige Produksie**: 'n Tipiese fotoverhaal is dikwels binne 'n enkele naweek opgeneem en binne dae gereed gemaak vir die drukpers.

---

## 6. Die Koms van Televisie (1976) en die Einde van die Era

Die doodskoot vir die Suid-Afrikaanse fotoverhaal het gekom op **1 Januarie 1976**: die amptelike bekendstelling van **televisie** deur die SAUK.

Oornag het Suid-Afrikaners bewegende beelde, internasionale reekse en plaaslike TV-dramas reg in hul sitkamers gehad. Die behoefte aan stilstaande foto-stories om die verbeelding te prikkel het vinnig afgeneem. Teen die middel van die 1980's het die stygende koste van papier en drukwerk, tesame met video-opnemers (VCR's), die era van die kyk-en-lees boekie tot 'n einde gebring.

---

## 7. Die Bewaring van 'n Kultuurskat

Vandag is fotoverhale gesogte Africana en kultuurskatte. Hulle vang 'n unieke tydperk van Suid-Afrikaanse sosiale geskiedenis, popkultuur, motormodes en spreektaal vas wat andersins vir ewig verlore sou wees.

Spesiale dank aan **mnr. Pieter Haasbroek** (stigter van `softcoverbooks.co.za`), **mnr. Koos Papenfus**, **Sven Barsby**, en **Carol Hardijzer** wie se jarelange passie en versamelwerk verseker het dat hierdie erfenis digitaal bewaar word vir toekomstige geslagte.

---
*Kopiereg & Erkenning: Sagteband- & Fotoverhaal-argiewe van Suid-Afrika.*
"""
    with open("data/geskiedenis.md", "w", encoding="utf-8") as f:
        f.write(geskiedenis_content)
    print("Geskiedenis artikel suksesvol geskryf na data/geskiedenis.md.")
    print("=== SKRAPER TAAK VOLTOOI ===")

if __name__ == "__main__":
    scrape_all()
