import os
import json
import hashlib
import sys

def generate_id(json_obj):
    """Generate an MD5 hash of the canonical JSON string, excluding 'id' if present."""
    obj_copy = dict(json_obj)
    obj_copy.pop('id', None)
    canonical = json.dumps(obj_copy, sort_keys=True)
    return hashlib.md5(canonical.encode('utf-8')).hexdigest()

def add_ids_to_nested_items(filename):
    print("Script started")
    print("Arguments:", sys.argv)

    base_path = os.path.dirname(os.path.abspath(__file__))

    # If user passes an absolute or relative path that exists, use it directly
    if os.path.isabs(filename) or os.path.exists(filename):
        input_file = filename
    else:
        input_file = os.path.join(base_path, '..', 'data', filename)

    print("Input file:", input_file)

    name, ext = os.path.splitext(os.path.basename(filename))
    # Always save with "_with_ids.json"
    output_file = os.path.join(base_path, '..', 'data', f"{name}_with_ids{ext}")

    with open(input_file, 'r', encoding='utf-8') as infile:
        data = json.load(infile)

    updated_count = 0

    # Case 1: JSON is a list
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and 'id' not in item:
                item['id'] = generate_id(item)
                updated_count += 1
                print(f"🆔 Added ID to: {item.get('title', 'No title')}")

    # Case 2 & 3: JSON is a dict
    elif isinstance(data, dict):
        for key, value in data.items():
            # Case 2: single "items" list
            if key == "items" and isinstance(value, list):
                for item in value:
                    if isinstance(item, dict) and 'id' not in item:
                        item['id'] = generate_id(item)
                        updated_count += 1
                        print(f"🆔 Added ID to: {item.get('title', 'No title')}")
            # Case 3: multiple sections, each with "items"
            elif isinstance(value, dict) and 'items' in value and isinstance(value['items'], list):
                for item in value['items']:
                    if isinstance(item, dict) and 'id' not in item:
                        item['id'] = generate_id(item)
                        updated_count += 1
                        print(f"🆔 Added ID to: {item.get('title', 'No title')}")

    else:
        print("⚠️ JSON format not recognized. Nothing updated.")

    # Save output
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as outfile:
        json.dump(data, outfile, indent=2)

    print(f"✅ Added IDs to {updated_count} new items.")
    print(f"📄 Output written to: {os.path.abspath(output_file)}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python idGenerator.py <filename.json>")
        sys.exit(1)

    filename = sys.argv[1]
    add_ids_to_nested_items(filename)
