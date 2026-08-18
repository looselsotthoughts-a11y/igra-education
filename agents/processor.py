import os
from dotenv import load_dotenv
load_dotenv()
import google.generativeai as genai
# Configure Gemini
genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-3.6-flash")

PROMPT_TEMPLATE = """
You are helping Indian students and citizens understand government education notices.

Here is a raw title/text scraped from an Indian government education website:
"{raw_title}"

Source: {source}
URL: {url}

Your task:
1. Write a clear, friendly TITLE (max 10 words) that explains what this is about
2. Write a plain-language DESCRIPTION (2-3 sentences, simple English, no jargon) explaining what this notice means for students or citizens
3. Classify the LEVEL: Beginner, Intermediate, or Advanced
4. Classify the SUBJECT from this list only: science, math, history, coding, language, geography, civics, exam

Respond ONLY in this exact format, nothing else:
TITLE: <title here>
DESCRIPTION: <description here>
LEVEL: <level here>
SUBJECT: <subject here>
"""


def process_item(raw_item: dict) -> dict | None:
    """Send one raw item to Gemini and get back structured content."""
    try:
        prompt = PROMPT_TEMPLATE.format(
            raw_title=raw_item["raw_title"][:500],
            source=raw_item["source"],
            url=raw_item["raw_url"],
        )

        response = model.generate_content(prompt)
        text = response.text.strip()

        # Parse Gemini response
        lines = {}
        for line in text.split("\n"):
            if ":" in line:
                key, _, value = line.partition(":")
                lines[key.strip().upper()] = value.strip()

        title = lines.get("TITLE", "").strip()
        description = lines.get("DESCRIPTION", "").strip()
        level = lines.get("LEVEL", "Beginner").strip()
        subject = lines.get("SUBJECT", raw_item["subject"]).strip()

        # Validate
        if not title or not description or len(title) < 5:
            print(f"[Processor] Skipped (poor output): {raw_item['raw_title'][:50]}")
            return None

        # Validate subject is in allowed list
        allowed_subjects = ["science", "math", "history", "coding", "language", "geography", "civics", "exam"]
        if subject not in allowed_subjects:
            subject = raw_item["subject"]

        # Validate level
        if level not in ["Beginner", "Intermediate", "Advanced"]:
            level = "Beginner"

        print(f"[Processor] OK: {title[:60]}")

        return {
            "id": raw_item["raw_id"],
            "title": title,
            "description": description,
            "source": raw_item["source"],
            "source_icon": raw_item["source_icon"],
            "type": raw_item["type"],
            "subject": subject,
            "url": raw_item["raw_url"],
            "level": level,
            "featured": False,
        }

    except Exception as e:
        print(f"[Processor] ERROR on '{raw_item['raw_title'][:50]}': {e}")
        return None


def run_processor(raw_items: list[dict]) -> list[dict]:
    """Process all raw items through Gemini. Returns processed items."""
    processed = []
    for i, item in enumerate(raw_items):
        print(f"[Processor] Processing {i+1}/{len(raw_items)}: {item['raw_title'][:50]}")
        result = process_item(item)
        if result:
            processed.append(result)

    print(f"[Processor] Done. {len(processed)}/{len(raw_items)} items processed successfully.")
    return processed
