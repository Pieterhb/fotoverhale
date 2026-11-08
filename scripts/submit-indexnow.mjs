#!/usr/bin/env node

/**
 * Bing / IndexNow URL Submission Script
 *
 * Submits website URLs to the IndexNow protocol (supported by Bing, Yandex, Naver, Seznam, etc.)
 * Strictly an offline backend / admin script (NOT called in client-side / frontend code).
 * IndexNow documentation: https://www.indexnow.org/documentation
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const HOST = "fotoverhale.softcoverbooks.co.za";

// Primary key specified by user, and parent domain key verified in Bing Webmaster Tools
const KEYS = [
  {
    key: "e6b44d6766614ba9b455ea2a1eda494d",
    keyLocation: `https://${HOST}/e6b44d6766614ba9b455ea2a1eda494d.txt`,
    label: "Bing Webmaster Verified Key (Subdomain)",
  },
  {
    key: "e6b44d6766614ba9b455ea2a1eda494d",
    keyLocation: `https://www.softcoverbooks.co.za/e6b44d6766614ba9b455ea2a1eda494d.txt`,
    label: "Bing Webmaster Verified Key (Main Domain)",
  },
  {
    key: "ab79e4ae29f14aa79d4ec134576e1f02",
    keyLocation: `https://${HOST}/ab79e4ae29f14aa79d4ec134576e1f02.txt`,
    label: "Primary Key (Subdomain)",
  },
  {
    key: "ab79e4ae29f14aa79d4ec134576e1f02",
    keyLocation: `https://www.softcoverbooks.co.za/ab79e4ae29f14aa79d4ec134576e1f02.txt`,
    label: "Primary Key (Main Domain)",
  },
];

const ENDPOINTS = [
  { name: "IndexNow (api.indexnow.org)", url: "https://api.indexnow.org/IndexNow" },
  { name: "Bing (bing.com)", url: "https://www.bing.com/indexnow" },
  { name: "Yandex (yandex.com)", url: "https://yandex.com/indexnow" },
];

function getUrls() {
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));
  if (cliUrls.length > 0) {
    return cliUrls;
  }

  // 1. Read from built sitemap.xml
  const sitemapPath = path.join(projectRoot, "out", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = locMatches.map((m) => m[1].trim()).filter(Boolean);
    if (urls.length > 0) {
      return urls;
    }
  }

  // 2. Fallback: extract from data/fotoverhale.json and core routes
  const dataPath = path.join(projectRoot, "data", "fotoverhale.json");
  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/reeks`,
    `https://${HOST}/p-d-haasbroek`,
    `https://${HOST}/geskiedenis`,
    `https://${HOST}/oor-ons`,
    `https://${HOST}/privaatheidsbeleid`,
    `https://${HOST}/terme-en-voorwaardes`,
  ];

  if (fs.existsSync(dataPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
      const seen = new Set();
      for (const item of data) {
        if (!item.id || typeof item.id !== "string") continue;
        const slug = item.id.trim().toLowerCase();
        if (seen.has(slug)) continue;
        seen.add(slug);
        const hasCovers =
          (item.total_covers && item.total_covers > 0) ||
          (item.issues && item.issues.length > 0) ||
          Boolean(item.cover_image);
        if (hasCovers) {
          urls.push(`https://${HOST}/reeks/${slug}`);
        }
      }
    } catch (err) {
      console.warn("Could not parse fotoverhale.json:", err.message);
    }
  }

  return urls;
}

async function submitToIndexNow() {
  const urlList = getUrls();
  console.log(`========================================`);
  console.log(`IndexNow Submission for: ${HOST}`);
  console.log(`Total URLs to submit:    ${urlList.length}`);
  console.log(`========================================`);

  for (const endpoint of ENDPOINTS) {
    console.log(`\n--> Submitting to ${endpoint.name}...`);
    let submitted = false;

    for (const keyConfig of KEYS) {
      const payload = {
        host: HOST,
        key: keyConfig.key,
        keyLocation: keyConfig.keyLocation,
        urlList,
      };

      try {
        const response = await fetch(endpoint.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        if (response.status === 200) {
          console.log(`    [200 OK] Successfully submitted via ${keyConfig.label}!`);
          submitted = true;
          break;
        } else if (response.status === 202) {
          console.log(`    [202 Accepted] Submission accepted via ${keyConfig.label} (verification pending).`);
          submitted = true;
          break;
        } else if (response.status === 403) {
          // Negative cache or verification pending on this key, try fallback
          continue;
        } else {
          const text = await response.text();
          console.warn(`    [${response.status}] ${text}`);
        }
      } catch (err) {
        console.error(`    Network error connecting to ${endpoint.name}:`, err.message);
        break;
      }
    }

    if (!submitted) {
      console.warn(`    Notice: Key verification pending propagation on ${endpoint.name}.`);
    }
  }

  console.log(`\n========================================`);
  console.log(`Submission process complete.`);
  console.log(`========================================`);
}

submitToIndexNow();
