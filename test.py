import json

def build_tree(data, root, processed=set()):
    if root in processed or "oid" not in data[root]:
        return None

    processed.add(root)

    tree = {
        "name": data[root].get("name", ""),
        "oid": data[root].get("oid", ""),
        "class": data[root].get("class", ""),
        "children": []
    }

    for key, value in data.items():
        if key != root and value.get("oid", "").startswith(data[root]["oid"]) and value["oid"][len(data[root]["oid"])] == ".":
            subtree = build_tree(data, key, processed)
            if subtree is not None:
                tree["children"].append(subtree)

    return tree

input_file = "ARUBAWIRED-NETWORKING-OID.json"
with open(input_file, "r") as file:
    data_json = file.read()

# Convert the JSON to a Python dictionary
data_json = data_json.replace("\\", "")
data = json.loads(data_json)

# Define the root node (can be any of the keys in the dictionary)
root_node = "hpe"

# Build the tree
tree = build_tree(data, root_node)

# Prepare the result
result = {
    "tree": tree
}

# Convert the result to JSON
result_json = json.dumps(result, indent=2)

# Define the output file name
output_file = input_file.replace(".json", "_output.json")

# Write the result to the output JSON file
with open(output_file, "w") as file:
    file.write(result_json)

# Print the result (optional)
# print(result_json)
