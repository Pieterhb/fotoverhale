import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import re
import time

def check_site():
    home_url = 'https://www.softcoverbooks.co.za/'
    req = urllib.request.Request(home_url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='replace')
    soup = BeautifulSoup(html, 'html.parser')
    
    links = set()
    for a in soup.find_all('a'):
        href = a.get('href', '')
        if href and not href.startswith('#') and not href.startswith('mailto:') and 'javascript:' not in href:
            full = urllib.parse.urljoin(home_url, href)
            if 'softcoverbooks.co.za' in full:
                links.add(full)
                
    print(f'Found {len(links)} internal links on homepage')
    
    # Also check if there is an article or history link on any of the fotoverhaal pages
    # Let's test a few specific possibilities or search words
    candidates = [l for l in links if any(w in l.lower() for w in ['geskiedenis', 'artikel', 'papenfus', 'storie', 'foto', 'statistiek', 'oor', 'skatkis', 'inligting', 'waar', 'foute', 'nuut'])]
    print(f'Candidate links ({len(candidates)}):')
    for c in candidates:
        print(' -', c)

    # Let's inspect each candidate
    for url in candidates:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            page_html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='replace')
            page_soup = BeautifulSoup(page_html, 'html.parser')
            text = page_soup.get_text()
            if 'papenfus' in text.lower():
                print(f'\n[FOUND PAPENFUS] in {url}')
                for line in text.splitlines():
                    if 'papenfus' in line.lower():
                        print('  ', line.strip())
            if '1976' in text or 'televisie' in text.lower() or 'kyk-en-lees' in text.lower():
                print(f'\n[FOUND HISTORY KEYWORDS] in {url}')
        except Exception as e:
            # print(f'Error fetching {url}: {e}')
            pass

if __name__ == '__main__':
    check_site()
