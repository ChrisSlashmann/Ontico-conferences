import { el, setChildren } from 'redom';
import Navigo from 'navigo'; // Navigo поможет сделать SPA
// eslint-disable-next-line import/extensions
import footer from './footer.js';
import './styles/normalize.css';
import './styles/style.css';

const router = new Navigo('/');

function createConferenceList() {
  const conferenceListEl = el('ul.conference__list');

  fetch('https://conf.ontico.ru/api/conferences/forCalendar.json').then(async (res) => {
    const data = await res.json();

    setChildren(conferenceListEl, data.result.map((item) => el(
      'li.conference__list-item', [
        el('div.conference__list-info', [
          el('p.conference__list-dates', item.date_range),
          el('img.conference__list-logo', { src: item.logo }),
          el('h2.conference__list-name', item.name),
          el('p.conference__list-desc', item.brief),
          el('p.conference__list-location', item.location),
          el('a.conference__list-uri', {
            href: item.uri,
            target: '_blank', // ссылки, ведущие на другие ресурсы
            rel: 'noopener',
          }, item.uri),
        ]),

        el('div.conference__list-actions', [
          el('a.conference__list-buy', {
            href: '#',
            onclick(e) { // ссылки, ведущие на другие страницы нашего сервиса
              e.preventDefault();
              router.navigate(e.target.getAttribute('href'));
            },
          }, 'Купить билет'),
          el('a.conference__list-show-more', {
            href: '#',
            onclick(e) {
              e.preventDefault();
              router.navigate(e.target.getAttribute('href'));
            },
          }, 'Подробнее'),
        ]),
      ],
    )));

    return conferenceListEl;
  });

  return el('div.container.conference__container', [
    conferenceListEl,
  ]);
}

const main = el('main');

setChildren(window.document.body, [
  main,
  footer,
]);

// Впоследствии сюда можно добавить реализацию контента для main для других страниц -
// - покупки билетов и подробной информации об ивенте
// Затем при помощи router.on, как представлено ниже, связать эти страницы в SPA

router.on('/', () => {
  setChildren(main, createConferenceList());
});

router.resolve();
