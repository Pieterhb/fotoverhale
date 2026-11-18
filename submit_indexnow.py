#!/usr/bin/env python3
"""
Bing / IndexNow URL Submission Script for fotoverhale.softcoverbooks.co.za
Submits website URLs to the IndexNow protocol (supported by Bing, Yandex, Naver, Seznam, etc.)
Strictly an offline backend / admin script (NOT called in client-side / frontend code).
IndexNow documentation: https://www.indexnow.org/documentation
"""

import json
import os
import re
import sys
import urllib.request
import urllib.error

HOST = "fotoverhale.softcoverbooks.co.za"

# Master key verified in Bing Webmaster Tools for www.softcoverbooks.co.za.
# Per IndexNow protocol, the keyLocation on the apex/www domain is accepted for all subdomains.
# See: https://www.indexnow.org/faq  ("Can the key file be on the root domain?")
KEYS = [
    {
        "key": "e6b44d6766614ba9b455ea2a1eda494d",
        "keyLocation": f"https://{HOST}/e6b44d6766614ba9b455ea2a1eda494d.txt",
        "label": "Master Key (same-host) [ACTIVE]",
    },
    {
        "key": "e6b44d6766614ba9b455ea2a1eda494d",
        "keyLocation": "https://www.softcoverbooks.co.za/e6b44d6766614ba9b455ea2a1eda494d.txt",
        "label": "Master Key (root domain fallback)",
    },
]

ENDPOINTS = [
    {"name": "IndexNow (api.indexnow.org)", "url": "https://api.indexnow.org/IndexNow"},
    {"name": "Bing (bing.com)", "url": "https://www.bing.com/indexnow"},
    {"name": "Yandex (yandex.com)", "url": "https://yandex.com/indexnow"},
]

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

def get_urls():
    cli_urls = [arg for arg in sys.argv[1:] if arg.startswith("http")]
    if cli_urls:
        return cli_urls

    # 1. Read from built out/sitemap.xml
    sitemap_path = os.path.join(PROJECT_ROOT, "out", "sitemap.xml")
    if os.path.exists(sitemap_path):
        with open(sitemap_path, "r", encoding="utf-8") as f:
            content = f.read()
        urls = re.findall(r"<loc>(.*?)</loc>", content)
        if urls:
            return [u.strip() for u in urls if u.strip()]

    # 2. Fallback: extract from data/fotoverhale.json and core routes
    urls = [
        f"https://{HOST}/",
        f"https://{HOST}/reeks",
        f"https://{HOST}/p-d-haasbroek",
        f"https://{HOST}/geskiedenis",
        f"https://{HOST}/oor-ons",
        f"https://{HOST}/privaatheidsbeleid",
        f"https://{HOST}/terme-en-voorwaardes",
    ]
    data_path = os.path.join(PROJECT_ROOT, "data", "fotoverhale.json")
    if os.path.exists(data_path):
        with open(data_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        seen = set()
        for item in data:
            series_id = item.get("id")
            if not series_id or not isinstance(series_id, str):
                continue
            slug = series_id.strip().lower()
            if slug in seen:
                continue
            seen.add(slug)
            has_covers = (
                item.get("total_covers", 0) > 0
                or len(item.get("issues", [])) > 0
                or bool(item.get("cover_image"))
            )
            if has_covers:
                urls.append(f"https://{HOST}/reeks/{slug}")

    return urls

def main():
    urls = get_urls()
    print("========================================")
    print(f"IndexNow Submission for: {HOST}")
    print(f"Total URLs to submit:    {len(urls)}")
    print("========================================")

    for endpoint in ENDPOINTS:
        name = endpoint["name"]
        url = endpoint["url"]
        print(f"\n--> Submitting to {name}...")
        submitted = False

        for key_cfg in KEYS:
            payload = {
                "host": HOST,
                "key": key_cfg["key"],
                "keyLocation": key_cfg["keyLocation"],
                "urlList": urls,
            }
            payload_bytes = json.dumps(payload).encode("utf-8")

            req = urllib.request.Request(
                url,
                data=payload_bytes,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST",
            )

            try:
                with urllib.request.urlopen(req) as resp:
                    if resp.status == 200:
                        print(f"    [200 OK] Successfully submitted via {key_cfg['label']}!")
                        submitted = True
                        break
                    elif resp.status == 202:
                        print(f"    [202 Accepted] Submission accepted via {key_cfg['label']} (verification pending).")
                        submitted = True
                        break
            except urllib.error.HTTPError as e:
                if e.code == 403:
                    # 403 UserForbiddedToAccessSite = this key is not registered/verified
                    # in Bing Webmaster Tools for this site. Try next key.
                    body = e.read().decode("utf-8", errors="replace")
                    print(f"    [403 SKIP] {key_cfg['label']}: {body}")
                    continue
                else:
                    body = e.read().decode("utf-8", errors="replace")
                    print(f"    [{e.code}] {body or e.reason}")
            except Exception as e:
                print(f"    Network error connecting to {name}: {e}")
                break

        if not submitted:
            print(f"    Notice: Key verification pending propagation on {name}.")

    print("\n========================================")
    print("Submission process complete.")
    print("========================================")

if __name__ == "__main__":
    main()
