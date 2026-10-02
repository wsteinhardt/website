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
        ['Deep blue', '#1d4e89', '#163b68'],
        ['Terracotta', '#a4502a', '#82401f'],
        ['Slate green', '#3d6b57', '#2f5343'],
        ['Current (none)', '#111827', '#000000']
    ];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,600&family=Fraunces:opsz,wght@9..144,600&family=Playfair+Display:wght@600&family=EB+Garamond:wght@600&family=Libre+Baskerville:wght@700&family=Inter:wght@600&display=swap';
    document.head.appendChild(link);

    var state = { font: 0, color: 0 };
    try { Object.assign(state, JSON.parse(localStorage.getItem('previewDesign') || '{}')); } catch (e) {}

    function apply() {
        var r = document.documentElement.style;
        r.setProperty('--heading-font', fonts[state.font][1]);
        r.setProperty('--accent', colors[state.color][1]);
        r.setProperty('--accent-dark', colors[state.color][2]);
        try { localStorage.setItem('previewDesign', JSON.stringify(state)); } catch (e) {}
        render();
        window.dispatchEvent(new Event('resize'));
    }

    var box = document.createElement('div');
    box.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9999;background:#fff;border:1px solid #e5e7eb;' +
        'border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.15);padding:14px 16px;font:13px -apple-system,sans-serif;' +
        'color:#1f2937;width:230px;max-width:calc(100vw - 32px);box-sizing:border-box';
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
        box.innerHTML = h;
    }

    box.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.c) state.color = +b.dataset.c;
        if (b.dataset.f) state.font = +b.dataset.f;
        apply();
    });

    apply();
})();
