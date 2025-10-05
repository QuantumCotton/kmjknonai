import re

# Contractor capacity by category (jobs per month)
CONTRACTOR_CAPACITY = {
    'Roofing': 25,
    'Kitchen & Bathroom Remodeling': 2,  # Kitchen
    'HVAC': 30,
    'Concrete': 10,
    'Handyman Services': 100,
    'Pool Services': 15,
    'Deck & Outdoor': 12,
    'Flooring': 20,
    'Pressure Washing': 40,
    'General Contracting': 8
}

# Parse the markdown file
keywords_data = []
current_category = None

with open('8000manuskeywordfilter.md', 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if line.startswith('▼'):
            current_category = line.replace('▼', '').strip()
        elif current_category and '\t' in line:
            parts = line.split('\t')
            if len(parts) >= 15 and parts[0] == current_category:
                try:
                    keyword = parts[1]
                    search_vol = int(parts[2].replace(',', ''))
                    cpc = float(parts[3].replace('$', ''))
                    avg_job_value = float(parts[4].replace('$', '').replace(',', ''))
                    monthly_clicks = float(parts[5].replace(',', ''))
                    monthly_leads = float(parts[6].replace(',', ''))
                    monthly_jobs = float(parts[7].replace(',', ''))
                    commission = float(parts[8].replace('$', '').replace(',', ''))
                    monthly_revenue = float(parts[11].replace('$', '').replace(',', ''))
                    monthly_ad_spend = float(parts[12].replace('$', '').replace(',', ''))
                    monthly_profit = float(parts[13].replace('$', '').replace(',', ''))
                    roas = float(parts[14])
                    
                    keywords_data.append({
                        'category': current_category,
                        'keyword': keyword,
                        'searchVol': search_vol,
                        'cpc': cpc,
                        'avgJobValue': avg_job_value,
                        'monthlyClicks': monthly_clicks,
                        'monthlyLeads': monthly_leads,
                        'monthlyJobs': monthly_jobs,
                        'commission': commission,
                        'monthlyRevenue': monthly_revenue,
                        'monthlyAdSpend': monthly_ad_spend,
                        'monthlyProfit': monthly_profit,
                        'roas': roas
                    })
                except (ValueError, IndexError):
                    pass

# Generate JavaScript array
js_data = 'const keywordData = [\n'
for kw in keywords_data:
    js_data += f"  {{{','.join([f'{k}:{repr(v)}' if isinstance(v, str) else f'{k}:{v}' for k, v in kw.items()])}}},\n"
js_data += '];\n\n'

# Add contractor capacity data
js_data += 'const contractorCapacity = {\n'
for cat, capacity in CONTRACTOR_CAPACITY.items():
    js_data += f"  '{cat}': {capacity},\n"
js_data += '};\n'

print(f"Parsed {len(keywords_data)} keywords")
print("Writing self-contained HTML file...")

# Read the HTML template
with open('contractor_capacity_calculator.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Remove the external script tag and embed the data
html_content = html_content.replace(
    '<script src="keyword_data_generated.js" onerror="alert(\'Failed to load keyword data!\')"></script>',
    f'<script>\n{js_data}\n'
)

# Also remove the error check since data is embedded
html_content = html_content.replace(
    '''        // Check if data loaded
        if (typeof keywordData === 'undefined') {
            console.error('keywordData not loaded!');
            alert('ERROR: Keyword data file not found. Make sure keyword_data_generated.js is in the same folder.');
        }
        
        ''',
    ''
)

# Write self-contained HTML
with open('contractor_capacity_full.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Done! Created contractor_capacity_full.html with embedded data")
