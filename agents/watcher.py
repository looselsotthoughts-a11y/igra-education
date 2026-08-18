import requests
from bs4 import BeautifulSoup
import hashlib
from datetime import datetime
import time

SOURCES = [
    {
        "name": "UGC",
        "url": "https://www.ugc.gov.in/e-notification/",
        "source_icon": "🎓",
        "subject": "exam",
        "type": "article",
    },
    {
        "name": "Ministry of Education",
        "url": "https://www.education.gov.in/news-and-media/press-releases",
        "source_icon": "🏛️",
        "subject": "civics",
        "type": "article",
    },
    {
        "name": "NCERT",
        "url": "https://ncert.nic.in/textbook.php",
        "source_icon": "📗",
        "subject": "exam",
        "type": "textbook",
    },
    {
        "name": "AICTE",
        "url": "https://www.aicte-india.org/bureaus/latest-news-updates",
        "source_icon": "📘",
        "subject": "exam",
        "type": "article",
    },
    {
        "name": "NTA",
        "url": "https://nta.ac.in/Notice",
        "source_icon": "📋",
        "subject": "exam",
        "type": "exam",
    },
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def make_id(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()


def scrape_source(source: dict) -> list[dict]:
    items = []
    try:
        session = requests.Session()
        response = session.get(
            source["url"],
            headers=HEADERS,
            timeout=20,
            allow_redirects=True,
        )
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "lxml")

        # Try multiple selectors to find content
        candidates = []

        # Look for list items, table rows, divs with news/notice content
        for tag in soup.find_all(["li", "td", "div", "p", "h3", "h4"]):
            text = tag.get_text(strip=True)
            if len(text) < 25 or len(text) > 500:
                continue
            # Skip nav/footer/header junk
            if any(skip in text.lower() for skip in [
                "home", "about us", "contact", "login", "register",
                "copyright", "privacy", "sitemap", "skip to"
            ]):
                continue
            candidates.append(text)

        # Deduplicate
        seen = set()
        for text in candidates:
            if text not in seen:
                seen.add(text)
                # Find closest link
                link_tag = soup.find("a", string=lambda s: s and text[:30] in s)
                href = ""
                if link_tag:
                    href = link_tag.get("href", "")
                    if href.startswith("/"):
                        base = "/".join(source["url"].split("/")[:3])
                        href = base + href
                    elif not href.startswith("http"):
                        href = source["url"]

                items.append({
                    "raw_id": make_id(text + source["name"]),
                    "raw_title": text,
                    "raw_url": href or source["url"],
                    "source": source["name"],
                    "source_icon": source["source_icon"],
                    "subject": source["subject"],
                    "type": source["type"],
                    "scraped_at": datetime.utcnow().isoformat(),
                })

        print(f"[Watcher] {source['name']}: found {len(items)} items")
        time.sleep(2)  # Be respectful to servers

    except Exception as e:
        print(f"[Watcher] ERROR scraping {source['name']}: {e}")

    return items


def run_watcher() -> list[dict]:
    all_items = []
    for source in SOURCES:
        items = scrape_source(source)
        all_items.extend(items)
    print(f"[Watcher] Total raw items collected: {len(all_items)}")
    return all_items