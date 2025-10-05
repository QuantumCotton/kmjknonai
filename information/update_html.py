#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Replace keyword data in HTML with Stuart FL data"""

# Read the new JavaScript data
with open('stuart_keywords.js', 'r', encoding='utf-8') as f:
    new_js_data = f.read().strip()

# Read the HTML file
with open('contractor_capacity_full.html', 'r', encoding='utf-8') as f:
    html_lines = f.readlines()

# Find the start and end of the keyword data section
start_line = None
end_line = None

for i, line in enumerate(html_lines):
    if 'const keywordData = [' in line and start_line is None:
        start_line = i
    if start_line is not None and line.strip() == '];':
        # Check if this is the end of keywordData (next non-empty line should be contractorCapacity)
        for j in range(i+1, min(i+5, len(html_lines))):
            if 'contractorCapacity' in html_lines[j]:
                end_line = i
                break
        if end_line is not None:
            break

if start_line is None or end_line is None:
    print(f"ERROR: Could not find data section. start={start_line}, end={end_line}")
    exit(1)

print(f"Found keyword data section: lines {start_line+1} to {end_line+1}")
print(f"Replacing {end_line - start_line + 1} lines with new Stuart FL data")

# Build the new HTML
new_html = []
new_html.extend(html_lines[:start_line])  # Everything before keyword data
new_html.append(new_js_data + '\n\n')     # New keyword data
new_html.extend(html_lines[end_line+1:])  # Everything after keyword data

# Write the updated HTML
with open('contractor_capacity_full.html', 'w', encoding='utf-8') as f:
    f.writelines(new_html)

print(f"✓ Successfully updated contractor_capacity_full.html")
print(f"✓ Replaced lines {start_line+1}-{end_line+1} with {len(new_js_data.split(chr(10)))} lines of Stuart FL market data")
