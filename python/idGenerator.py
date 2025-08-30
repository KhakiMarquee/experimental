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
    base_path = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(base_path, '..', 'data', filename)
    
    name, ext = os.path.splitext(filename)
    output_file = os.path.join(base_path, '..', 'data', f"{name}_with_ids{ext}")

    with open(input_file, 'r', encoding='utf-8') as infile:
        data = json.load(infile)

    updated_count = 0

    for section_key, section_data in data.items():
        if 'items' in section_data:
            for item in section_data['items']:
                if 'id' not in item:
                    item['id'] = generate_id(item)
                    updated_count += 1

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

#python python/idGenerator.py data.json <-- change file name