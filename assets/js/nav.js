/* Mobile menu.
 *
 * Below 720px the stylesheet hides .site-nav until the header carries
 * .nav-open. The button toggles that class; choosing a link, pressing Escape
 * or tapping outside the header closes the menu again.
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var button = header && header.querySelector('.nav-toggle');
  if (!button) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', String(open));
  }

  button.addEventListener('click', function () {
    setOpen(!header.classList.contains('nav-open'));
  });

  // In-page anchors do not reload the page, so close the panel explicitly.
  header.querySelector('.site-nav').addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
      setOpen(false);
      button.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setOpen(false);
  });
})();
