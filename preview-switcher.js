// PREVIEW ONLY: floating panel to compare accent colours and heading fonts.
// Not meant to ship; remove before merging to main.
(function () {
    var fonts = [
        ['Source Serif 4', '"Source Serif 4", Georgia, serif'],
        ['Fraunces', '"Fraunces", Georgia, serif'],
        ['Playfair Display', '"Playfair Display", Georgia, serif'],
        ['EB Garamond', '"EB Garamond", Georgia, serif'],
        ['Libre Baskerville', '"Libre Baskerville", Georgia, serif'],
        ['Inter (sans)', '"Inter", -apple-system, sans-serif'],
        ['Current (system sans)', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif']
    ];
    var colors = [
        ['Deep blue', '#1d4e89', '#163b68', '#e8eef6'],
        ['Terracotta', '#a4502a', '#82401f', '#f6ebe4'],
        ['Slate green', '#3d6b57', '#2f5343', '#e3ede8'],
        ['Current (none)', '#111827', '#000000', '#e5e7eb']
    ];
    var bodyFonts = [
        ['Current (system sans)', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'],
        ['Libre Franklin', '"Libre Franklin", -apple-system, sans-serif'],
        ['Source Sans 3', '"Source Sans 3", -apple-system, sans-serif'],
        ['Lato', '"Lato", -apple-system, sans-serif'],
        ['Nunito Sans', '"Nunito Sans", -apple-system, sans-serif'],
        ['Source Serif 4 (serif)', '"Source Serif 4", Georgia, serif']
    ];

    var backgrounds = [
        ['Warm paper', '#f8f6f1'],
        ['Sage tint', '#f2f5f2'],
        ['Stone', '#efede8'],
        ['Cool grey (current)', '#f9fafb'],
        ['White', '#ffffff']
    ];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Fraunces:opsz,wght@9..144,600&family=Playfair+Display:wght@600&family=EB+Garamond:wght@600&family=Libre+Baskerville:wght@700&family=Inter:wght@600&family=Libre+Franklin:wght@400;500;600&family=Source+Sans+3:wght@400;500;600&family=Lato:wght@400;700&family=Nunito+Sans:wght@400;600&display=swap';
    document.head.appendChild(link);

    var state = { font: 4, color: 2, body: 2, bg: 0 };
    try { Object.assign(state, JSON.parse(localStorage.getItem('previewDesign3') || '{}')); } catch (e) {}

    function apply() {
        var r = document.documentElement.style;
        r.setProperty('--heading-font', fonts[state.font][1]);
        r.setProperty('--accent', colors[state.color][1]);
        r.setProperty('--accent-dark', colors[state.color][2]);
        r.setProperty('--accent-light', colors[state.color][3]);
        r.setProperty('--body-font', bodyFonts[state.body][1]);
        r.setProperty('--page-bg', backgrounds[state.bg][1]);
        try { localStorage.setItem('previewDesign3', JSON.stringify(state)); } catch (e) {}
        render();
        window.dispatchEvent(new Event('resize'));
    }

    var box = document.createElement('div');
    box.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9999;background:#fff;border:1px solid #e5e7eb;' +
        'border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.15);padding:14px 16px;font:13px -apple-system,sans-serif;' +
        'color:#1f2937;width:230px;max-height:calc(100vh - 32px);overflow:auto;max-width:calc(100vw - 32px);box-sizing:border-box';
    document.body.appendChild(box);

    function render() {
        var h = '<div style="font-weight:600;margin-bottom:8px">Design preview</div>' +
            '<div style="color:#6b7280;margin-bottom:4px">Accent colour</div><div style="display:flex;gap:6px;margin-bottom:10px">';
        colors.forEach(function (c, i) {
            h += '<button data-c="' + i + '" title="' + c[0] + '" style="width:30px;height:30px;border-radius:50%;cursor:pointer;background:' + c[1] +
                ';border:3px solid ' + (i === state.color ? '#fff' : 'transparent') + ';box-shadow:0 0 0 2px ' + (i === state.color ? c[1] : '#e5e7eb') + '"></button>';
        });
        h += '</div><div style="color:#6b7280;margin-bottom:4px">' + colors[state.color][0] + '</div>' +
            '<div style="color:#6b7280;margin:10px 0 4px">Heading font</div>';
        fonts.forEach(function (f, i) {
            h += '<button data-f="' + i + '" style="display:block;width:100%;text-align:left;padding:5px 8px;margin:2px 0;border-radius:6px;cursor:pointer;' +
                'font-family:' + f[1].replace(/"/g, "'") + ';font-size:15px;font-weight:600;border:1px solid ' + (i === state.font ? '#9ca3af' : 'transparent') +
                ';background:' + (i === state.font ? '#f3f4f6' : 'transparent') + '">' + f[0] + '</button>';
        });
        h += '<div style="color:#6b7280;margin:10px 0 4px">Body font</div>';
        bodyFonts.forEach(function (f, i) {
            h += '<button data-b="' + i + '" style="display:block;width:100%;text-align:left;padding:4px 8px;margin:2px 0;border-radius:6px;cursor:pointer;' +
                'font-family:' + f[1].replace(/"/g, "'") + ';font-size:14px;border:1px solid ' + (i === state.body ? '#9ca3af' : 'transparent') +
                ';background:' + (i === state.body ? '#f3f4f6' : 'transparent') + '">' + f[0] + '</button>';
        });
        h += '<div style="color:#6b7280;margin:10px 0 4px">Background</div><div style="display:flex;gap:6px;margin-bottom:4px">';
        backgrounds.forEach(function (c, i) {
            h += '<button data-g="' + i + '" title="' + c[0] + '" style="width:30px;height:30px;border-radius:6px;cursor:pointer;background:' + c[1] +
                ';border:1px solid #d1d5db;box-shadow:' + (i === state.bg ? '0 0 0 2px #fff, 0 0 0 4px #6b7280' : 'none') + '"></button>';
        });
        h += '</div><div style="color:#6b7280">' + backgrounds[state.bg][0] + '</div>';
        h += '<button data-x="1" style="margin-top:8px;padding:4px 8px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;cursor:pointer;color:#6b7280">Hide panel</button>';
        box.innerHTML = h;
    }

    box.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.c) state.color = +b.dataset.c;
        if (b.dataset.f) state.font = +b.dataset.f;
        if (b.dataset.b) state.body = +b.dataset.b;
        if (b.dataset.g) state.bg = +b.dataset.g;
        if (b.dataset.x) { box.style.display = 'none'; return; }
        apply();
    });

    apply();
})();
