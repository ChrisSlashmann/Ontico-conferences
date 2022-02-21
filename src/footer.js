import { el, setChildren } from 'redom';
import marker from './assets/img/time-marker.svg';
import './styles/footer.css';

// Мне не до конца была ясна логика этого элемента в макете
// С одной стороны, это вроде бы сортировка, но сортировку в футере не делают...
// К тому же, даты событий в карточках в макете тоже никак с маем не соотносятся ->
// там даты с марта по сентябрь
// С другой стороны это может быть указателем текущего месяца, но тогда почему май?
// Я решила реализовать логику последнего своего предположения и сделала маркер месяца
// Конечно это решение расходится с тем, что вы подразумевали в макете, но ->
// у меня, к сожалению, не было возможности кого-нибудь об этом спросить.
// Я с удовольствием доработаю этот элемент, если вы захотите увидеть от меня другую реализацию

function createFooterTimeline() {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();

  const timelineEl = el('div.footer__timeline');

  const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  const monthsListEl = el('ul.footer__timeline-list');
  setChildren(monthsListEl, months.map((month) => el(
    'li.footer__timeline-item', [
      el('img.footer__timeline-marker.hidden', { src: marker }),
      el('p.footer__timeline-text', month),
    ],
  )));

  for (let i = 0; i < monthsListEl.childNodes.length; i++) {
    if (thisMonth === i) {
      const thisChild = monthsListEl.childNodes[i];
      thisChild.firstChild.classList.remove('hidden');
    }
  }

  setChildren(timelineEl, [
    el('h3.footer__timeline-year', `${thisYear} год:`),
    el('div.footer__timeline-wrapper', [
      monthsListEl,
    ]),
  ]);

  return timelineEl;
}

function createFooterContainer() {
  const footerContainerEl = el('div.container.footer__container');

  setChildren(footerContainerEl, [
    el('p.footer__contacts', [
      el('span.footer__contacts-subtitle.footer__contacts-subtitle_oneliner', 'По любым вопросам обращайтесь: '),
      'Бухгалтерия и вопросы оплаты: ',
      el('a.footer__contacts-link', {
        href: 'mailto:support@ontico.ru',
      }, 'support@ontico.ru '),
      el('a.footer__contacts-link', {
        href: 'tel:+74956460768',
      }, '+7(495) 646-07-68, '),
      el('a.footer__contacts-link', {
        href: 'mailto:@ontico_support',
      }, '@ontico_support'),
    ]),

    el('p.footer__contacts', [
      el('span.footer__contacts-subtitle', 'Программный комитет: '),
      el('a.footer__contacts-link', {
        href: 'mailto:speakers@ontico.ru',
      }, 'speakers@ontico.ru'),
    ]),

    el('p.footer__contacts', [
      el('span.footer__contacts-subtitle', 'Организационный комитет: '),
      el('a.footer__contacts-link', {
        href: 'mailto:organization@ontico.ru',
      }, 'organization@ontico.ru'),
    ]),

    el('p.footer__contacts', '125040, Москва, Нижняя ул., д. 14, стр. 7, подъезд 1, оф. 16 ООО «Конференции Олега Бунина»'),

    createFooterTimeline(),
  ]);

  return footerContainerEl;
}

export default el('footer', [
  createFooterContainer(),
]);
