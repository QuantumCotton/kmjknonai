#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Parse Stuart, FL market data from Google Keyword Planner export"""

def categorize_keyword(keyword):
    """Categorize keyword based on content"""
    kw = keyword.lower()
    
    # Kitchen & Bathroom (check first - most specific)
    if any(x in kw for x in ['kitchen', 'bathroom', 'bath ', 'shower', 'tub', 'bathtub', 'jacuzzi', 'vanity']):
        return 'Kitchen & Bathroom Remodeling'
    
    # Roofing
    if any(x in kw for x in ['roof', 'shingle', 'gutter', 'epdm', 'tpo', 'underlayment', 'soffit', 'fascia']):
        return 'Roofing'
    
    # HVAC
    if any(x in kw for x in ['hvac', 'air conditioner', 'air conditioning', 'ac ', ' ac', 'heating', 'cooling', 'furnace', 'ductwork', 'duct ', 'carrier', 'trane', 'rheem', 'goodman', 'bryant', 'york', 'tempstar', 'mitsubishi', 'daikin', 'ars air', 'air handler', 'plenum']):
        return 'HVAC'
    
    # Pool Services
    if any(x in kw for x in ['pool', 'swimming']):
        return 'Pool Services'
    
    # Pressure Washing (before concrete to catch wash/clean keywords)
    if any(x in kw for x in ['pressure wash', 'power wash', 'karcher', 'simpson', 'ryobi pressure', 'honda pressure', 'honda power', 'milwaukee pressure', 'soft wash', 'house wash', 'roof wash', 'clean', 'wash']):
        return 'Pressure Washing'
    
    # Flooring
    if any(x in kw for x in ['epoxy floor', 'garage floor', 'flooring', 'polished concrete floor', 'stained concrete floor', 'polyaspartic']):
        return 'Flooring'
    
    # Concrete
    if any(x in kw for x in ['concrete', 'cement', 'driveway', 'patio', 'paver', 'stamped', 'slab', 'cinder', 'breeze block']):
        return 'Concrete'
    
    # Deck
    if any(x in kw for x in ['deck', 'timbertech', 'azek', 'railing']):
        return 'Deck & Outdoor'
    
    # Handyman
    if any(x in kw for x in ['handyman', 'painting', 'window']):
        return 'Handyman Services'
    
    return 'General Contracting'

# Read and parse the file
try:
    with open('MASTERDATASTUARTALLMARKETS.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    keywords = []
    
    # Skip first 3 header lines
    for i, line in enumerate(lines[3:], start=4):
        parts = line.strip().split('\t')
        
        if len(parts) < 9:
            continue
        
        keyword = parts[0].strip()
        search_vol_str = parts[2].strip()
        cpc_high_str = parts[8].strip()
        
        if not keyword or not search_vol_str or not cpc_high_str:
            continue
        
        try:
            search_vol = int(search_vol_str)
            cpc = float(cpc_high_str)
            
            if cpc == 0:  # Use low range if high is 0
                cpc = float(parts[7].strip()) if parts[7].strip() else 1.0
                
        except (ValueError, IndexError):
            continue
        
        category = categorize_keyword(keyword)
        
        keywords.append({
            'keyword': keyword.replace("'", "\\'"),
            'searchVol': search_vol,
            'cpc': round(cpc, 2),
            'category': category
        })
    
    # Generate JavaScript
    js_output = "const keywordData = [\n"
    for kw in keywords:
        js_output += f"  {{keyword:'{kw['keyword']}',searchVol:{kw['searchVol']},cpc:{kw['cpc']},category:'{kw['category']}'}},\n"
    js_output += "];\n"
    
    # Write output
    with open('stuart_keywords.js', 'w', encoding='utf-8') as f:
        f.write(js_output)
    
    # Stats
    print(f"✓ Successfully parsed {len(keywords)} keywords from Stuart, FL market data")
    print(f"✓ Output saved to: stuart_keywords.js")
    print("\nCategory Distribution:")
    
    categories = {}
    for kw in keywords:
        cat = kw['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    for cat, count in sorted(categories.items(), key=lambda x: -x[1]):
        print(f"  {cat:35} {count:3} keywords")
    
except FileNotFoundError:
    print("ERROR: MASTERDATASTUARTALLMARKETS.md not found")
except Exception as e:
    print(f"ERROR: {e}")
