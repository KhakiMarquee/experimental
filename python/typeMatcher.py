import json
import os

def extract_typed_objects(obj, collected=None):
    """
    Recursively walk any JSON object (dict/list).
    Collect entries that have 'id' and 'type'.
    Normalize 'type' into a list.
    """
    if collected is None:
        collected = []

    if isinstance(obj, dict):
        if "id" in obj and "type" in obj:
            types = obj["type"]
            if not isinstance(types, list):
                types = [types]
            collected.append({
                "id": obj["id"],
                "type": [t.lower() for t in types if isinstance(t, str)],
                "context": {k: v for k, v in obj.items() if k not in ("id", "type")}
            })
        for v in obj.values():
            extract_typed_objects(v, collected)

    elif isinstance(obj, list):
        for item in obj:
            extract_typed_objects(item, collected)

    return collected


def match_types(file1, file2, output_file=None):
    # Load both files
    with open(file1, "r", encoding="utf-8") as f:
        data1 = json.load(f)
    with open(file2, "r", encoding="utf-8") as f:
        data2 = json.load(f)

    objs1 = extract_typed_objects(data1)
    objs2 = extract_typed_objects(data2)

    # Match
    for obj1 in objs1:
        obj1["related_ids"] = []
        obj1["related_contexts"] = []
        for obj2 in objs2:
            if set(obj1["type"]) & set(obj2["type"]):
                obj1["related_ids"].append(obj2["id"])
                obj1["related_contexts"].append(obj2["context"])

    # Save
    if not output_file:
        base1 = os.path.splitext(os.path.basename(file1))[0]
        base2 = os.path.splitext(os.path.basename(file2))[0]
        output_file = f"{base1}-matched-with-{base2}.json"

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(objs1, f, indent=2, ensure_ascii=False)

    print(f"✅ Relations saved to {output_file}")


# Example usage:
# match_types("services-with-ids.json", "projects-with-ids.json")
