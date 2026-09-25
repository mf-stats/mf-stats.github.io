/* Language switching — English / German.
 *
 * Blocks of translated copy carry lang="en" or lang="de". The stylesheet hides
 * whichever locale is inactive, so switching is a single attribute change on
 * <html> with no layout rebuild.
 *
 * Order of preference: explicit choice (localStorage) > browser language >
 * the locale the document was authored in (English). Loaded synchronously in
 * <head> so the correct locale is set before first paint.
 */
(function () {
  'use strict';

  var STORE_KEY = 'locale';
  var LOCALES = ['en', 'de'];
  var root = document.documentElement;

  // The company name is not translated; only the descriptor after it changes.
  var NAME = 'Dr. Micha Fischer - Statistical Consulting';

  var TITLES = {
    index: {
      en: NAME + ' | Statistics for empirical research',
      de: NAME + ' | Statistik für die empirische Forschung'
    },
    impressum: {
      en: 'Legal Notice | ' + NAME,
      de: 'Impressum | ' + NAME
    },
    datenschutz: {
      en: 'Privacy Policy | ' + NAME,
      de: 'Datenschutzerklärung | ' + NAME
    }
  };

  function read() {
    try {
      var v = window.localStorage.getItem(STORE_KEY);
      return LOCALES.indexOf(v) > -1 ? v : null;
    } catch (e) {
      return null; // private mode / storage disabled
    }
  }

  function write(locale) {
    try {
      window.localStorage.setItem(STORE_KEY, locale);
    } catch (e) {
      /* preference simply is not persisted */
    }
  }

  function detect() {
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var tag = String(langs[i]).toLowerCase();
      if (tag.indexOf('de') === 0) return 'de';
      if (tag.indexOf('en') === 0) return 'en';
    }
    return null;
  }

  function apply(locale) {
    root.setAttribute('data-locale', locale);
    root.setAttribute('lang', locale);

    var page = root.getAttribute('data-page');
    if (page && TITLES[page]) document.title = TITLES[page][locale];

    var buttons = document.querySelectorAll('[data-set-locale]');
    for (var i = 0; i < buttons.length; i++) {
      var b = buttons[i];
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-locale') === locale));
    }
  }

  // Set the locale immediately, before the page paints.
  apply(read() || detect() || root.getAttribute('data-locale') || 'en');

  // Buttons do not exist yet at this point, so delegate from the document.
  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('[data-set-locale]') : null;
    if (!button) return;

    event.preventDefault();
    var locale = button.getAttribute('data-set-locale');
    if (LOCALES.indexOf(locale) === -1) return;

    apply(locale);
    write(locale); // only an explicit choice is remembered
  });

  // Sync aria-pressed once the switch is actually in the DOM.
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-locale'));
  });
})();
