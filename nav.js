// Sliding underline for the top nav: rests under the current page,
// follows the mouse on hover, and glides in from the previous page's tab.
(function () {
    var nav = document.querySelector('.nav-left');
    if (!nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
    var page = location.pathname.split('/').pop() || 'index.html';
    var current = links.filter(function (a) { return a.getAttribute('href') === page; })[0];
    if (current) {
        current.classList.add('active');
        current.setAttribute('aria-current', 'page');
    }

    var bar = document.createElement('span');
    bar.className = 'nav-indicator';
    nav.appendChild(bar);

    function place(a) {
        if (!a) { bar.style.opacity = 0; return; }
        bar.style.opacity = 1;
        bar.style.width = a.offsetWidth + 'px';
        bar.style.transform = 'translateX(' + a.offsetLeft + 'px)';
    }

    // Start under the tab we came from (if any), then slide to this page.
    var from = null;
    try { from = sessionStorage.getItem('navFrom'); } catch (e) {}
    var start = links.filter(function (a) { return a.getAttribute('href') === from; })[0];
    bar.style.transition = 'none';
    place(start || current);
    bar.offsetWidth; // force layout so the next change animates
    bar.style.transition = '';
    requestAnimationFrame(function () { place(current); });

    links.forEach(function (a) {
        a.addEventListener('mouseenter', function () { place(a); });
        a.addEventListener('click', function () {
            try { sessionStorage.setItem('navFrom', page); } catch (e) {}
        });
    });
    nav.addEventListener('mouseleave', function () { place(current); });
    window.addEventListener('resize', function () { place(current); });
    if (document.fonts) document.fonts.ready.then(function () { place(current); });
})();
