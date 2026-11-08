#!/usr/bin/env python3
"""
Bing / IndexNow URL Submission Script for fotoverhale.softcoverbooks.co.za
Submits website URLs to the IndexNow protocol (supported by Bing, Yandex, Naver, Seznam, etc.)
IndexNow documentation: https://www.indexnow.org/documentation
"""

import json
import os
import re
import sys
import urllib.request
import urllib.error

HOST = "fotoverhale.softcoverbooks.co.za"
KEY = "ab79e4ae29f14aa79d4ec134576e1f02"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow"

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

def get_urls():
    # If specific URLs are passed as CLI arguments, use them
    cli_urls = [arg for arg in sys.argv[1:] if arg.startswith("http")]
    if cli_urls:
        return cli_urls

    # 1. Try reading from built out/sitemap.xml
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
    print(f"Submitting {len(urls)} URLs to IndexNow...")
    print(f"Host: {HOST}")
    print(f"Key Location: {KEY_LOCATION}")

    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }

    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            print(f"HTTP Status: {resp.status} {resp.reason}")
            if resp.status == 200:
                print("Success: URLs submitted successfully to IndexNow.")
            elif resp.status == 202:
                print("Accepted: URLs received. Key location verification pending by IndexNow.")
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"IndexNow HTTP Error {e.code}: {e.reason}")
        if body:
            print(f"Details: {body}")
        if e.code == 403:
            print("403 Forbidden: Key not valid or key file could not be verified on the live site yet.")
        elif e.code == 422:
            print("422 Unprocessable Entity: URLs do not match host or key.")
    except Exception as e:
        print(f"Network error: {e}")

if __name__ == "__main__":
    main()
