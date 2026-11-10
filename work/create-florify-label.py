from pathlib import Path
from html import escape
svg=['''<svg xmlns="http://www.w3.org/2000/svg" width="3600" height="1200" viewBox="0 0 3600 1200">
<defs>
 <linearGradient id="copper" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#a27651"/><stop offset=".5" stop-color="#936037"/><stop offset="1" stop-color="#875831"/></linearGradient>
 <pattern id="grain" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="#5f3e24" opacity=".09"/></pattern>
 <clipPath id="front"><path d="M1200 0h1200v880L1800 1200 1200 880z"/></clipPath>
</defs>
<path fill="#faf9f5" d="M0 0h3600v1200H0z"/>
<!-- Underlying warm paper, visible above the two side panels. -->
<path fill="#e0cbb7" d="M0 0h1200v120L980 0H300L0 190zM2400 0h1200v190L3300 0h-680l-220 180z"/>
<!-- Central copper shield and its nested diagonal bands. -->
<g clip-path="url(#front)">
 <path fill="url(#copper)" d="M1200 0h1200v1200H1200z"/>
 <path fill="#79502f" d="m1200 760 600 440 600-440v150l-600 450-600-450z"/>
 <path fill="#9e703f" d="m1200 635 600 460 600-460v125l-600 440-600-440z"/>
 <path fill="#faf9f5" d="M1400 0h800l-400 315z"/>
 <path fill="#d4b798" d="m1330 0 470 315L1450 0zM2270 0l-470 315L2150 0z"/>
 <path fill="#6d4828" opacity=".58" d="M1370 640q430 45 860 0l-430 350z"/>
 <path fill="url(#grain)" d="M1200 0h1200v1200H1200z"/>
</g>
<g text-anchor="middle">
 <g fill="#2876a1" font-family="Arial,sans-serif" font-weight="700"><text x="1800" y="87" font-size="47" letter-spacing="-1">VITALITY</text><text x="1800" y="132" font-size="35">FOR LIFE<tspan font-size="16" baseline-shift="super">®</tspan></text></g>
 <g stroke="#2876a1" fill="none" stroke-width="4" transform="translate(1800 208)"><path d="M-4 55Q-44 7 4-30Q40 5-4 55ZM-3 49Q5 14 4-31Q17-46 6-57"/><path d="m-4 35-19-12M0 22-23 7M3 10-19-7M5-2-10-18M3 25l18-15M5 11 25-3M6-2l17-13"/></g>
 <text x="1800" y="480" fill="#fffaf0" font-family="Georgia, 'Times New Roman',serif" font-size="132" letter-spacing="1"><tspan font-size="181">F</tspan>LORIFY<tspan font-family="Arial,sans-serif" font-size="25" baseline-shift="super">®</tspan></text>
 <text x="1800" y="553" fill="#fffaf0" font-family="Arial,sans-serif" font-weight="700" font-size="51" letter-spacing="1">DAILY PROBIOTIC</text>
 <g fill="#fffaf0" font-family="Arial,sans-serif"><text x="1800" y="737" font-size="43">Promotes Healthy Immune</text><text x="1800" y="793" font-size="43">and Digestive Systems*</text><text x="1800" y="1010" font-size="35" font-weight="700">DIETARY SUPPLEMENT</text><text x="1800" y="1060" font-size="34" font-weight="700">30 CAPSULES</text></g>
</g>
<!-- Benefits panel seen in the first, second and fifth photographs. -->
<rect x="280" y="65" width="845" height="1055" rx="27" fill="#91633e"/>
<g fill="#fffaf0" font-family="Arial,sans-serif">
 <text x="325" y="162" font-size="54" font-weight="700">Probiotic Powerhouse*</text>
</g>
''']
def text(x,y,lines,size=36,color='#fffaf0',weight='400',line_height=None):
    step=line_height or size*1.25
    svg.append(f'<g fill="{color}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{weight}">')
    for i,line in enumerate(lines):
        svg.append(f'<text x="{x}" y="{y+i*step}">{escape(line)}</text>')
    svg.append('</g>')
text(330,295,['• 11 billion guaranteed active','  cultures help replenish the','  natural balance in your','  digestive tract*'],42,line_height=57)
text(330,565,['• 9 diverse probiotic strains','  help improve the absorption','  of nutrients and protect against','  occasional stomach upsets*'],40,line_height=56)
text(330,845,['• Promote a healthy immune','  system with clinically tested','  probiotics and vitamin D*'],40,line_height=56)
# The narrow FDA box is printed vertically beside the peel-back tab.
svg.append('<g transform="translate(140 1120) rotate(-90)"><rect x="0" y="0" width="1055" height="102" rx="7" fill="none" stroke="#3e3b36" stroke-width="3"/>')
text(20,29,['*These statements have not been evaluated by the Food and','Drug Administration. This product is not intended to diagnose,','treat, cure, or prevent any disease.'],24,'#3e3b36',line_height=29)
svg.append('</g>')
# Directions column continues across the seam at 0/3600.
svg.append('''<path d="M2475 40H3520Q3600 40 3600 115V1040H2475z" fill="#f6f5f1"/>
<rect x="2470" y="72" width="153" height="82" rx="12" fill="#2678a4"/>
<path d="m2490 130 33-48 32 48-32-25z" fill="#f9f9ee"/><rect x="2560" y="94" width="49" height="31" rx="3" fill="#d4b45c"/>
<text x="2566" y="117" fill="#2e4e60" font-family="Arial,sans-serif" font-size="24" font-weight="700">AM</text>
''')
text(2650,128,['DIRECTIONS: Take one capsule daily.'],37,'#3e3b36','700')
text(2470,237,['To maximize shelf life and product','performance, we recommend refrigeration.'],35,'#3e3b36',line_height=46)
text(2470,385,['Consult your physician before taking this','product if you are pregnant, planning to become','pregnant, nursing, under a doctor’s care, taking','medications, or administering to children under','the age of 18. If you experience an adverse','reaction, stop use and see your doctor. Keep out','of reach of children. Tamper-evident inner seal;','if broken do not accept.'],33,'#3e3b36',line_height=43)
text(2670,825,['Melaleuca, Inc., Idaho Falls, ID 83402','To order: Melaleuca.com','208-534-3000','Made in the USA with thoughtfully','selected global ingredients','N° 60113','NOT FOR RESALE','VEGETARIAN · GLUTEN-FREE'],29,'#3e3b36',line_height=37)
# Recreate the visible circular quality mark, without a fabricated QR code.
svg.append('''<g transform="translate(2540 864)" stroke="#4c4a45" fill="none"><circle r="66" stroke-width="5"/><circle r="48" stroke-width="2"/><path d="M0 33Q-33-2 2-30Q32-3 0 33ZM0 27 2-29" stroke-width="3"/></g>
<text x="2540" y="966" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="#4c4a45">QUALITY</text>
<path d="M3485 25h35q80 0 80 85t-45 104v940" fill="none" stroke="#d9d7d0" stroke-width="3"/>
<text x="3532" y="117" transform="rotate(45 3532 117)" font-family="Arial,sans-serif" font-weight="700" font-size="35" fill="#5a5954">PEEL</text>
<text x="3568" y="335" transform="rotate(90 3568 335)" font-family="Arial,sans-serif" font-style="italic" font-size="31" fill="#45443e">Supplement Facts Under Tab</text>
</svg>''')
Path('public/artwork/florify-label.svg').write_text('\n'.join(svg))
