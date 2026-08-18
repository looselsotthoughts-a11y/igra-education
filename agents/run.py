import os
from dotenv import load_dotenv
from supabase import create_client
from watcher import run_watcher
from processor import run_processor

load_dotenv()

# Supabase client
supabase = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)


def get_existing_ids() -> set:
    """Fetch all existing content IDs from Supabase to avoid duplicates."""
    try:
        response = supabase.table("content").select("id").execute()
        return {row["id"] for row in response.data}
    except Exception as e:
        print(f"[Run] ERROR fetching existing IDs: {e}")
        return set()


def save_to_supabase(items: list[dict]) -> int:
    """Save new items to Supabase. Returns count of items saved."""
    existing_ids = get_existing_ids()
    new_items = [item for item in items if item["id"] not in existing_ids]

    if not new_items:
        print("[Run] No new items to save.")
        return 0

    print(f"[Run] Saving {len(new_items)} new items to Supabase...")
    try:
        supabase.table("content").insert(new_items).execute()
        print(f"[Run] Saved {len(new_items)} items successfully.")
        return len(new_items)
    except Exception as e:
        print(f"[Run] ERROR saving to Supabase: {e}")
        return 0


def main():
    print("=" * 50)
    print("IGRA Education Agent — starting run")
    print("=" * 50)

    # Step 1: Watch
    print("\n[Step 1] Running Watcher...")
    raw_items = run_watcher()

    if not raw_items:
        print("[Run] No items found by watcher. Exiting.")
        return

    # Step 2: Process (limit to 20 per run to control API costs)
    print(f"\n[Step 2] Running Processor on up to 20 items...")
    raw_items = raw_items[:20]
    processed_items = run_processor(raw_items)

    if not processed_items:
        print("[Run] No items processed successfully. Exiting.")
        return

    # Step 3: Save to Supabase
    print(f"\n[Step 3] Saving to Supabase...")
    saved = save_to_supabase(processed_items)

    print("\n" + "=" * 50)
    print(f"IGRA Agent run complete. {saved} new items added.")
    print("=" * 50)


if __name__ == "__main__":
    main()
