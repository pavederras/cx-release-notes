#!/usr/bin/env python3
"""
Release Notes HTML Generator
Converts markdown release notes to polished HTML for stakeholder distribution
"""

import re
import os
from pathlib import Path

def parse_markdown(md_content):
    """Parse markdown content into structured data"""
    sections = []
    current_section = None
    current_item = None

    lines = md_content.split('\n')

    for line in lines:
        # Section headers (## Section Name)
        if line.startswith('## ') and not line.startswith('## Sprint Summary') and not line.startswith('## CX Team'):
            if current_section:
                sections.append(current_section)

            # Extract section name and count
            section_match = re.match(r'## (.+?)(?:\s*\((\d+)\s*items?\))?$', line)
            if section_match:
                current_section = {
                    'name': section_match.group(1),
                    'count': section_match.group(2) or '0',
                    'items': [],
                    'anchor': section_match.group(1).lower().replace(' ', '-')
                }
                current_item = None

        # Feature items (### with emoji and status)
        elif line.startswith('### ') and current_section:
            if current_item:
                current_section['items'].append(current_item)

            # Parse status and title
            feature_match = re.match(r'### ([🆕✨🐛⚡🔧🔍🗑️]) (\w+):\s*(.+)$', line)
            if feature_match:
                emoji = feature_match.group(1)
                status = feature_match.group(2)
                title = feature_match.group(3)

                # Map emoji to status type
                status_class = {
                    '🆕': 'new',
                    '✨': 'enhanced',
                    '🐛': 'fix',
                    '⚡': 'performance',
                    '🔧': 'technical',
                    '🔍': 'spike',
                    '🗑️': 'deprecated'
                }.get(emoji, 'new')

                current_item = {
                    'emoji': emoji,
                    'status': status,
                    'status_class': status_class,
                    'title': title,
                    'ticket': '',
                    'type': '',
                    'details': [],
                    'screenshots': []
                }

        # Ticket links
        elif line.startswith('**Ticket:**') and current_item:
            ticket_match = re.search(r'\[#(\d+)\]\((.*?)\)', line)
            if ticket_match:
                current_item['ticket'] = ticket_match.group(1)
                current_item['ticket_url'] = ticket_match.group(2)

        # Type
        elif line.startswith('**Type:**') and current_item:
            current_item['type'] = line.replace('**Type:**', '').strip()

        # Details section
        elif line.startswith('**Details:**') and current_item:
            current_item['in_details'] = True

        # Screenshots
        elif line.startswith('**Screenshots:**') and current_item:
            current_item['in_screenshots'] = True
            current_item['in_details'] = False

        # Collect details
        elif current_item and current_item.get('in_details'):
            if line.strip() and not line.startswith('**'):
                current_item['details'].append(line.strip())

        # Collect screenshots
        elif current_item and current_item.get('in_screenshots'):
            if line.strip().startswith('- `screenshots/'):
                screenshot = line.strip().replace('- `', '').replace('`', '')
                current_item['screenshots'].append(screenshot)

    # Add last item and section
    if current_item and current_section:
        current_section['items'].append(current_item)
    if current_section:
        sections.append(current_section)

    return sections

def generate_html(sections, sprint_name, sprint_dates):
    """Generate HTML from structured data"""

    # Build navigation
    nav_items = ''.join([
        f'<a href="#{section["anchor"]}" class="nav-link">{section["name"]} ({section["count"]})</a>'
        for section in sections
    ])

    # Build sections
    sections_html = []
    for section in sections:
        items_html = []

        for item in section['items']:
            # Build details
            details_html = ''
            if item['details']:
                details_list = ''.join([f'<li>{detail}</li>' for detail in item['details'] if detail.startswith('-')])
                details_text = ' '.join([detail for detail in item['details'] if not detail.startswith('-')])

                if details_list:
                    details_html = f'''
                    <div class="feature-details">
                        {details_text}
                        <ul>{details_list}</ul>
                    </div>
                    '''
                else:
                    details_html = f'<div class="feature-details"><p>{details_text}</p></div>'

            # Build screenshots
            screenshots_html = ''
            if item['screenshots']:
                screenshot_items = ''.join([
                    f'''
                    <div class="screenshot-item">
                        <img src="{screenshot}" alt="{item['title']}" onclick="enlargeImage(this)">
                        <p class="screenshot-caption">Click to enlarge</p>
                    </div>
                    '''
                    for screenshot in item['screenshots']
                ])
                screenshots_html = f'<div class="screenshots-grid">{screenshot_items}</div>'

            # Build ticket link
            ticket_html = ''
            if item.get('ticket'):
                ticket_html = f'<a href="{item["ticket_url"]}" class="ticket-link" target="_blank">#{item["ticket"]}</a>'

            item_html = f'''
            <div class="feature-item">
                <div class="feature-header">
                    <span class="status-badge status-{item['status_class']}">{item['emoji']} {item['status']}</span>
                    <h3 class="feature-title">{item['title']}</h3>
                    {ticket_html}
                </div>
                {details_html}
                {screenshots_html}
            </div>
            '''
            items_html.append(item_html)

        section_html = f'''
        <section id="{section['anchor']}" class="release-section">
            <h2 class="section-header">{section['name']} <span class="count">({section['count']} items)</span></h2>
            <div class="features-container">
                {''.join(items_html)}
            </div>
        </section>
        '''
        sections_html.append(section_html)

    # Complete HTML template
    html = f'''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CX Sprint {sprint_name} Release Notes</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }}

        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}

        .header h1 {{
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }}

        .header .sprint-dates {{
            font-size: 1.1rem;
            opacity: 0.9;
        }}

        .navigation {{
            background: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            position: sticky;
            top: 0;
            z-index: 100;
            display: flex;
            gap: 1rem;
            overflow-x: auto;
        }}

        .nav-link {{
            padding: 0.5rem 1rem;
            background: #f0f0f0;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
            white-space: nowrap;
            transition: all 0.3s;
        }}

        .nav-link:hover {{
            background: #667eea;
            color: white;
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }}

        .release-section {{
            margin-bottom: 3rem;
        }}

        .section-header {{
            font-size: 2rem;
            color: #667eea;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 3px solid #667eea;
        }}

        .section-header .count {{
            font-size: 1.2rem;
            color: #999;
            font-weight: normal;
        }}

        .features-container {{
            display: grid;
            gap: 1.5rem;
        }}

        .feature-item {{
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s, box-shadow 0.3s;
        }}

        .feature-item:hover {{
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }}

        .feature-header {{
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
        }}

        .status-badge {{
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.85rem;
            white-space: nowrap;
        }}

        .status-new {{
            background: #d4edda;
            color: #155724;
        }}

        .status-enhanced {{
            background: #cce5ff;
            color: #004085;
        }}

        .status-fix {{
            background: #f8d7da;
            color: #721c24;
        }}

        .status-performance {{
            background: #fff3cd;
            color: #856404;
        }}

        .status-technical {{
            background: #e2e3e5;
            color: #383d41;
        }}

        .status-spike {{
            background: #d1ecf1;
            color: #0c5460;
        }}

        .status-deprecated {{
            background: #f5c6cb;
            color: #721c24;
        }}

        .feature-title {{
            flex: 1;
            font-size: 1.3rem;
            color: #333;
        }}

        .ticket-link {{
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            padding: 0.3rem 0.6rem;
            background: #f0f0f0;
            border-radius: 4px;
            font-size: 0.9rem;
        }}

        .ticket-link:hover {{
            background: #667eea;
            color: white;
        }}

        .feature-details {{
            margin-top: 1rem;
            color: #666;
            line-height: 1.8;
        }}

        .feature-details ul {{
            margin-left: 1.5rem;
            margin-top: 0.5rem;
        }}

        .feature-details li {{
            margin-bottom: 0.3rem;
        }}

        .screenshots-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }}

        .screenshot-item {{
            text-align: center;
        }}

        .screenshot-item img {{
            width: 100%;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            cursor: pointer;
            transition: transform 0.3s;
        }}

        .screenshot-item img:hover {{
            transform: scale(1.02);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }}

        .screenshot-caption {{
            font-size: 0.85rem;
            color: #999;
            margin-top: 0.5rem;
        }}

        .modal {{
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.9);
            align-items: center;
            justify-content: center;
        }}

        .modal-content {{
            max-width: 90%;
            max-height: 90%;
        }}

        .close-modal {{
            position: absolute;
            top: 20px;
            right: 40px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }}

        footer {{
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem;
            margin-top: 3rem;
        }}

        @media (max-width: 768px) {{
            .header h1 {{
                font-size: 1.8rem;
            }}

            .navigation {{
                padding: 0.5rem 1rem;
            }}

            .container {{
                padding: 1rem;
            }}

            .feature-header {{
                flex-direction: column;
                align-items: flex-start;
            }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>CX Sprint {sprint_name}</h1>
        <p class="sprint-dates">{sprint_dates}</p>
    </div>

    <nav class="navigation">
        {nav_items}
    </nav>

    <div class="container">
        {''.join(sections_html)}
    </div>

    <footer>
        <p>&copy; 2026 Consumer Experience Team | Generated from Azure DevOps</p>
    </footer>

    <div id="imageModal" class="modal" onclick="closeModal()">
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="modalImage">
    </div>

    <script>
        function enlargeImage(img) {{
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modal.style.display = 'flex';
            modalImg.src = img.src;
        }}

        function closeModal() {{
            document.getElementById('imageModal').style.display = 'none';
        }}

        // Smooth scrolling for navigation
        document.querySelectorAll('.nav-link').forEach(link => {{
            link.addEventListener('click', function(e) {{
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
            }});
        }});
    </script>
</body>
</html>
    '''

    return html

def main():
    """Main execution"""
    import sys

    if len(sys.argv) < 2:
        print("Usage: python generate-html.py <markdown-file>")
        sys.exit(1)

    md_file = Path(sys.argv[1])
    if not md_file.exists():
        print(f"Error: {md_file} not found")
        sys.exit(1)

    # Read markdown
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    # Extract sprint info
    sprint_match = re.search(r'# CX Sprint (.+?) Release Notes', md_content)
    sprint_name = sprint_match.group(1) if sprint_match else 'Unknown'

    dates_match = re.search(r'\*\*Sprint Dates:\*\* (.+?)$', md_content, re.MULTILINE)
    sprint_dates = dates_match.group(1) if dates_match else 'TBD'

    # Parse and generate
    sections = parse_markdown(md_content)
    html = generate_html(sections, sprint_name, sprint_dates)

    # Write output
    output_file = md_file.parent / 'release-notes.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"✓ Generated: {output_file}")
    print(f"  Sprint: {sprint_name}")
    print(f"  Sections: {len(sections)}")
    print(f"  Total items: {sum(len(s['items']) for s in sections)}")

if __name__ == '__main__':
    main()
