#!/usr/bin/env node

/**
 * Bing / IndexNow URL Submission Script
 *
 * Submits website URLs to the IndexNow protocol (supported by Bing, Yandex, Naver, Seznam, etc.)
 * IndexNow documentation: https://www.indexnow.org/documentation
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const HOST = "fotoverhale.softcoverbooks.co.za";
const KEY = "ab79e4ae29f14aa79d4ec134576e1f02";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

function getUrls() {
  // If specific URLs are passed as command-line arguments, use them
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));
  if (cliUrls.length > 0) {
    return cliUrls;
  }

  // 1. Try reading from built sitemap.xml
  const sitemapPath = path.join(projectRoot, "out", "sitemap.xml");
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    const locMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
    const urls = locMatches.map((m) => m[1].trim()).filter(Boolean);
    if (urls.length > 0) {
      return urls;
    }
  }

  // 2. Fallback: extract from data/fotoverhale.json and static routes
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
  console.log(`Preparing IndexNow submission for host: ${HOST}`);
  console.log(`Key location: ${KEY_LOCATION}`);
  console.log(`Total URLs to submit: ${urlList.length}`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`HTTP Status: ${response.status} ${response.statusText}`);

    if (response.status === 200) {
      console.log("Success: URLs submitted successfully to IndexNow.");
    } else if (response.status === 202) {
      console.log("Accepted: URLs received. Key location verification is pending by IndexNow.");
    } else {
      const text = await response.text();
      console.error(`IndexNow response (${response.status}):`, text || "(no message body)");
      if (response.status === 403) {
        console.error("403 Forbidden: Key not valid or key file could not be verified on the live site yet.");
      } else if (response.status === 422) {
        console.error("422 Unprocessable Entity: URLs do not match the specified host or key.");
      }
    }
  } catch (err) {
    console.error("Network error during IndexNow submission:", err.message);
  }
}

submitToIndexNow();
