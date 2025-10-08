#!/usr/bin/env python3
"""
Script to replace keyword data in contractor_capacity_full.html
"""

# Read the HTML file
with open('contractor_capacity_full.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read the new keyword data
with open('new_keyword_data.js', 'r', encoding='utf-8') as f:
    new_keywords = f.read()

# Find the start and end of the old keyword data
start_marker = 'const keywordData = ['
end_marker = '];'

start_idx = html_content.find(start_marker)
if start_idx == -1:
    print("ERROR: Could not find start marker!")
    exit(1)

# Find the closing ]; after the start
end_idx = html_content.find(end_marker, start_idx)
if end_idx == -1:
    print("ERROR: Could not find end marker!")
    exit(1)

# Add length of end_marker to include it
end_idx += len(end_marker)

# Replace the old data with new data
new_content = html_content[:start_idx] + new_keywords.strip() + '\n' + html_content[end_idx:]

# Write the updated file
with open('contractor_capacity_full.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Successfully replaced keyword data!")
print(f"   Replaced {end_idx - start_idx} characters")
print(f"   New keyword data: {len(new_keywords)} characters")
