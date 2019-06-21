/* eslint-disable no-use-before-define */
import { uniqueId } from 'lodash';
import {
  bindTimeToDayMoment,
  getTodayDate,
  getTomorrowDate,
  momentToUnixTime,
  toMoment,
} from '../utils/date';

const daysWithSchedule = [getTodayDate(), getTomorrowDate()];
export function getMovies(date) {
  return daysWithSchedule.includes(date) ? generateMoviesFor(date) : [];
}

export function getMovie(id) {
  if (!movies[id]) throw new NotFoundError('Movie with given id is not found');
  return movies[id];
}

export function getSeances(movieId, date) {
  return daysWithSchedule.includes(date)
    ? generateSeancesFor(toMoment(date), movieId)
    : {};
}

function generateMoviesFor(day) {
  const dayStartMoment = toMoment(day).startOf('day');

  const generatedMovies = [];
  Object.keys(movies).forEach(movieId => {
    const movie = movies[movieId];
    generatedMovies.push({
      id: parseInt(movieId, 10),
      ...movie,
      seances: generateSeancesFor(dayStartMoment, movieId),
    });
  });

  return generatedMovies;
}

function generateSeancesFor(dayStartMoment, movieId) {
  const seanceStartTimes2D =
    possibleSeanceStartTimes[movieId % possibleSeanceStartTimes.length];
  const seanceStartTimes3D =
    possibleSeanceStartTimes[(movieId + 1) % possibleSeanceStartTimes.length];

  return {
    '3D': generateSeancesAt(
      seanceStartTimes3D
        .map(time => bindTimeToDayMoment(time, dayStartMoment))
        .map(momentToUnixTime),
    ),
    '2D': generateSeancesAt(
      seanceStartTimes2D
        .map(time => bindTimeToDayMoment(time, dayStartMoment))
        .map(momentToUnixTime),
    ),
  };
}

function generateSeancesAt(seanceStartTimes) {
  return seanceStartTimes.map((startTime, idx) => ({
    id: uniqueId(),
    startTime,
    hallScheme,
    price: getMinPrice(hallScheme),
    takenSeats: possibleTakenSeats[idx % possibleTakenSeats.length],
    reservedSeats: possibleReservedSeats[idx % possibleReservedSeats.length],
  }));
}

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.message = message;
  }
}

function getMinPrice(hallScheme) {
  return hallScheme.reduce((min, row) => {
    return row
      ? row.seats.reduce((min, seat) => {
          return seat ? Math.min(min, seat.price) : min;
        }, min)
      : min;
  }, Infinity);
}

const hallScheme = [
  {
    number: 1,
    seats: [
      null,
      { id: 1, number: 1, price: 200 },
      { id: 2, number: 2, price: 200 },
      { id: 3, number: 3, price: 200 },
      null,
      { id: 4, number: 4, price: 200 },
      { id: 5, number: 5, price: 200 },
      { id: 6, number: 6, price: 200 },
      null,
      { id: 7, number: 7, price: 200 },
      { id: 8, number: 8, price: 200 },
      { id: 9, number: 9, price: 200 },
    ],
  },
  {
    number: 2,
    seats: [
      null,
      { id: 10, number: 1, price: 200 },
      { id: 11, number: 2, price: 200 },
      { id: 12, number: 3, price: 200 },
      null,
      { id: 13, number: 4, price: 200 },
      { id: 14, number: 5, price: 200 },
      { id: 15, number: 6, price: 200 },
      null,
      { id: 16, number: 7, price: 200 },
      { id: 17, number: 8, price: 200 },
      { id: 18, number: 9, price: 200 },
    ],
  },
  {
    number: 3,
    seats: [
      null,
      { id: 19, number: 1, price: 200 },
      { id: 20, number: 2, price: 200 },
      { id: 21, number: 3, price: 200 },
      null,
      { id: 22, number: 4, price: 200 },
      { id: 23, number: 5, price: 200 },
      { id: 24, number: 6, price: 200 },
      null,
      { id: 25, number: 7, price: 200 },
      { id: 26, number: 8, price: 200 },
      { id: 27, number: 9, price: 200 },
    ],
  },
  {
    number: 4,
    seats: [
      null,
      { id: 28, number: 1, price: 200 },
      { id: 29, number: 2, price: 200 },
      { id: 30, number: 3, price: 200 },
      null,
      { id: 31, number: 4, price: 200 },
      { id: 32, number: 5, price: 200 },
      { id: 33, number: 6, price: 200 },
      null,
      { id: 34, number: 7, price: 200 },
      { id: 35, number: 8, price: 200 },
      { id: 36, number: 9, price: 200 },
    ],
  },
  null,
  {
    number: 5,
    seats: [
      { id: 37, number: 1, price: 250 },
      { id: 38, number: 2, price: 250 },
      { id: 39, number: 3, price: 250 },
      { id: 40, number: 4, price: 250 },
      { id: 41, number: 5, price: 250 },
      { id: 42, number: 6, price: 250 },
      { id: 43, number: 7, price: 250 },
      { id: 44, number: 8, price: 250 },
      { id: 45, number: 9, price: 250 },
      { id: 46, number: 10, price: 250 },
      { id: 47, number: 11, price: 250 },
      { id: 48, number: 12, price: 200 },
    ],
  },
];

const possibleTakenSeats = [
  [3, 13, 17, 24, 26, 28, 30],
  [39, 40, 43, 44, 46],
  [16, 17, 18, 19],
  [2, 3, 4, 5, 6],
];

const possibleReservedSeats = [
  [16, 17, 18, 19],
  [2, 3, 4, 5, 6],
  [3, 13, 24, 26, 28, 30],
  [39, 40, 43, 44, 46],
];

const possibleSeanceStartTimes = [
  ['12:30', '14:30', '16:50', '17:50', '19:20'],
  ['12:30', '14:30', '16:50', '17:50', '19:20'],
  ['12:30', '14:30', '16:50', '17:50', '26:20'],
];

const movies = {
  1: {
    id: 1,
    name: 'Властелин колец',
    description:
      'Сказания о Средиземье — это хроника Великой войны за Кольцо, войны, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал власть над всеми живыми тварями, но был обязан служить злу. \n' +
      '\n' +
      'Тихая деревня, где живут хоббиты. Волшебник Гэндальф, придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает найденное кольцо своему племяннику Фродо, который пытается научиться справляться с тем страшным могуществом, которое дает ему кольцо…',
    duration: 178,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/328.jpg',
    frames: [
      {
        description: 'Властелин колец',
        url: 'https://www.kinopoisk.ru/images/film_big/328.jpg',
      },
      {
        description: 'Властелин колец',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Властелин колец',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530934.jpg',
      },
      {
        description: 'Властелин колец',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530933.jpg',
      },
      {
        description: 'Властелин колец',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530932.jpg',
      },
      {
        description: 'Властелин колец',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530925.jpg',
      },
    ],
  },
  2: {
    id: 2,
    name: 'Хоббит: Битва пяти воинств',
    description: `Когда отряд из тринадцати гномов нанимал хоббита Бильбо Бэгинса в качестве взломщика и четырнадцатого, «счастливого», участника похода к Одинокой горе, Бильбо полагал, что его приключения закончатся, когда он выполнит свою задачу — найдет сокровище, которое так необходимо предводителю гномов Торину. Путешествие в Эребор, захваченное драконом Смаугом королевство гномов, оказалось еще более опасным, чем предполагали гномы и даже Гэндальф — мудрый волшебник, протянувший Торину и его отряду руку помощи.

В погоню за гномами устремилась армия орков, ведомых пробудившимся в руинах древним злом, а эльфы и люди, с которыми Бильбо и его товарищам пришлось иметь дело во время путешествия и которые пострадали от последствий желания гномов вернуть свой дом, предъявили права на щедрое вознаграждение — часть сокровищ Одинокой горы. Скоро неподалеку от Одинокой горы встретятся пять армий, и лишь кровопролитная битва определит результаты смелого гномьего похода.`,
    duration: 205,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/694633.jpg',
    frames: [
      {
        description: 'Хоббит: Битва пяти воинств',
        url: 'https://www.kinopoisk.ru/images/film_big/694633.jpg',
      },
      {
        description: 'Хоббит: Битва пяти воинств',
        url:
          'https://st.kp.yandex.net/im/kadr/2/5/4/kinopoisk.ru-The-Hobbit_3A-The-Battle-of-the-Five-Armies-2545681.jpg',
      },
      {
        description: 'Хоббит: Битва пяти воинств',
        url:
          'https://st.kp.yandex.net/im/kadr/2/5/4/kinopoisk.ru-The-Hobbit_3A-The-Battle-of-the-Five-Armies-2545680.jpg',
      },
      {
        description: 'Хоббит: Битва пяти воинств',
        url:
          'https://st.kp.yandex.net/im/kadr/2/5/4/kinopoisk.ru-The-Hobbit_3A-The-Battle-of-the-Five-Armies-2545678.jpg',
      },
      {
        description: 'Хоббит: Битва пяти воинств',
        url:
          'https://st.kp.yandex.net/im/kadr/2/5/4/kinopoisk.ru-The-Hobbit_3A-The-Battle-of-the-Five-Armies-2545677.jpg',
      },
      {
        description: 'Хоббит: Битва пяти воинств',
        url:
          'https://st.kp.yandex.net/im/kadr/2/5/4/kinopoisk.ru-The-Hobbit_3A-The-Battle-of-the-Five-Armies-2545676.jpg',
      },
    ],
  },
  3: {
    id: 3,
    name: 'Видоизмененный углерод',
    description:
      'Земля, XXVII век. Мир, в котором появилась возможность «сгружать» человеческое сознание и личность из одного тела в другое. Идеальный мир и для преступников, и для полицейских, и для армии, но вряд ли идеальный для бывшего военного спецназовца и бывшего повстанца Такеси Ковача, которого миллиардер Бэнкрофт нанял для расследования гибели одного из своих тел. Внешне — явное самоубийство, но Бэнкрофт считает себя неспособным на такой поступок, а воспоминания о последних минутах жизни уничтожены метким выстрелом в запоминающее устройство.',
    duration: 229,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/669089.jpg',
    frames: [
      {
        description: 'Видоизмененный углерод',
        url:
          'https://www.kinopoisk.ru/images/film_big/669089.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/0/8/kinopoisk.ru-Altered-Carbon-3089561.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/2/1/kinopoisk.ru-Altered-Carbon-3216791.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/2/1/kinopoisk.ru-Altered-Carbon-3216789.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/2/1/kinopoisk.ru-Altered-Carbon-3216790.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/1/2/kinopoisk.ru-Altered-Carbon-3121337.jpg',
      },
      {
        description: 'Видоизмененный углерод',
        url:
          'https://st.kp.yandex.net/im/kadr/3/1/2/kinopoisk.ru-Altered-Carbon-3121340.jpg',
      },
    ],
  },
  4: {
    id: 4,
    name: 'Борджиа',
    description:
      'В конце XV века в руках Папы Римского сосредоточилась неограниченная власть: он мог короновать и свергать королей, изменять судьбу империй. Некогда доброе имя церкви стало теперь ассоциироваться только с коррупцией и безнравственностью. В 1492 году, после смерти папы Иннокентия VIII, престол Святого Петра занял Александр VI (в миру Родриго Борджиа), который вписал в историю имя клана Борджиа отнюдь не благими деяниями…',
    duration: 236,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/521722.jpg',
    frames: [
      {
        description: 'Борджиа',
        url: 'https://www.kinopoisk.ru/images/film_big/521722.jpg',
      },
      {
        description: 'Борджиа',
        url:
          'https://st.kp.yandex.net/im/kadr/2/1/9/kinopoisk.ru-The-Borgias-2192982.jpg',
      },
      {
        description: 'Борджиа',
        url:
          'https://st.kp.yandex.net/im/kadr/2/1/9/kinopoisk.ru-The-Borgias-2192979.jpg',
      },
      {
        description: 'Борджиа',
        url:
          'https://st.kp.yandex.net/im/kadr/2/1/9/kinopoisk.ru-The-Borgias-2192978.jpg',
      },
      {
        description: 'Борджиа',
        url:
          'https://st.kp.yandex.net/im/kadr/2/1/9/kinopoisk.ru-The-Borgias-2192981.jpg',
      },
      {
        description: 'Борджиа',
        url:
          'https://st.kp.yandex.net/im/kadr/2/1/9/kinopoisk.ru-The-Borgias-2192977.jpg',
      },
    ],
  },
  // 4: {
  //   id: 4,
  //   name: 'Король говорит!',
  //   description:
  //     'Сюжет ленты расскажет о герцоге, который готовится вступить в должность британского короля Георга VI, отца нынешней королевы Елизаветы II. После того, как его брат отрекается от престола, герой неохотно соглашается на трон. Измученный страшным нервным заиканием и сомнениями в своих способностях руководить страной, Георг обращается за помощью к неортодоксальному логопеду по имени Лайонел Лог.',
  //   duration: 229,
  //   genres: ['Фэнтези', 'Приключения'],
  //   poster: 'https://www.kinopoisk.ru/images/film_big/485311.jpg',
  //   frames: [
  //     {
  //       description: 'Король говорит!',
  //       url: 'https://www.kinopoisk.ru/images/film_big/485311.jpg',
  //     },
  //     {
  //       description: 'Король говорит!',
  //       url:
  //         'https://st.kp.yandex.net/im/kadr/1/4/3/kinopoisk.ru-The-King_27s-Speech-1433002.jpg',
  //     },
  //     {
  //       description: 'Король говорит!',
  //       url:
  //         'https://st.kp.yandex.net/im/kadr/1/4/3/kinopoisk.ru-The-King_27s-Speech-1433006.jpg',
  //     },
  //     {
  //       description: 'Король говорит!',
  //       url:
  //         'https://st.kp.yandex.net/im/kadr/1/4/3/kinopoisk.ru-The-King_27s-Speech-1433004.jpg',
  //     },
  //     {
  //       description: 'Король говорит!',
  //       url:
  //         'https://st.kp.yandex.net/im/kadr/1/4/3/kinopoisk.ru-The-King_27s-Speech-1433000.jpg',
  //     },
  //     {
  //       description: 'Король говорит!',
  //       url:
  //         'https://st.kp.yandex.net/im/kadr/1/4/3/kinopoisk.ru-The-King_27s-Speech-1432996.jpg',
  //     },
  //   ],
  // },
  5: {
    id: 5,
    name: 'Игра престолов',
    description:
      'К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем, никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.',
    duration: 218,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/464963.jpg',
    frames: [
      {
        description: 'Игра престолов',
        url: 'https://www.kinopoisk.ru/images/film_big/464963.jpg',
      },
      {
        description: 'Игра престолов',
        url:
          'https://st.kp.yandex.net/im/kadr/2/7/7/kinopoisk.ru-Game-of-Thrones-2777019.jpg',
      },
      {
        description: 'Игра престолов',
        url:
          'https://st.kp.yandex.net/im/kadr/2/7/8/kinopoisk.ru-Game-of-Thrones-2786695.jpg',
      },
      {
        description: 'Игра престолов',
        url:
          'https://st.kp.yandex.net/im/kadr/3/0/3/kinopoisk.ru-Game-of-Thrones-3030604.jpg',
      },
      {
        description: 'Игра престолов',
        url:
          'https://st.kp.yandex.net/im/kadr/3/0/1/kinopoisk.ru-Game-of-Thrones-3019199.jpg',
      },
      {
        description: 'Игра престолов',
        url:
          'https://st.kp.yandex.net/im/kadr/3/0/1/kinopoisk.ru-Game-of-Thrones-3011410.jpg',
      },
    ],
  },
  6: {
    id: 6,
    name: 'Мстители: Финал',
    description:
      'Оставшиеся в живых члены команды Мстителей и их союзники должны разработать новый план, который поможет противостоять разрушительным действиям могущественного титана Таноса. После наиболее масштабной и трагической битвы в истории они не могут допустить ошибку.',
    duration: 183,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/843650.jpg',
    frames: [
      {
        description: 'Мстители: Финал',
        url: 'https://www.kinopoisk.ru/images/film_big/843650.jpg',
      },
    ],
  },
  7: {
    id: 7,
    name: 'Мстители',
    description: `Локи, сводный брат Тора, возвращается, и в этот раз он не один. Земля на грани порабощения, и только лучшие из лучших могут спасти человечество.

Ник Фьюри, глава международной организации Щ. И. Т., собирает выдающихся поборников справедливости и добра, чтобы отразить атаку. Под предводительством Капитана Америки Железный Человек, Тор, Невероятный Халк, Соколиный глаз и Чёрная Вдова вступают в войну с захватчиком.`,
    duration: 93,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/263531.jpg',
    frames: [
      {
        description: 'Мстители',
        url: 'https://www.kinopoisk.ru/images/film_big/263531.jpg',
      },
    ],
  },
  8: {
    id: 8,
    name: 'Терминатор',
    description:
      'История противостояния солдата Кайла Риза и киборга-терминатора, прибывших в 1984-й год из пост-апокалиптического будущего, где миром правят машины-убийцы, а человечество находится на грани вымирания. Цель киборга: убить девушку по имени Сара Коннор, чей ещё нерождённый сын к 2029 году выиграет войну человечества с машинами. Цель Риза: спасти Сару и остановить Терминатора любой ценой.',
    duration: 85,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/507.jpg',
    frames: [
      {
        description: 'Терминатор',
        url: 'https://www.kinopoisk.ru/images/film_big/507.jpg',
      },
    ],
  },
  9: {
    id: 9,
    name: 'Терминатор 2: Судный день',
    description: `Прошло более десяти лет с тех пор, как киборг-терминатор из 2029 года пытался уничтожить Сару Коннор — женщину, чей будущий сын выиграет войну человечества против машин.

Теперь у Сары родился сын Джон и время, когда он поведёт за собой выживших людей на борьбу с машинами, неумолимо приближается. Именно в этот момент из постапокалиптического будущего прибывает новый терминатор — практически неуязвимый и способный принимать любое обличье. Цель нового терминатора уже не Сара, а уничтожение молодого Джона Коннора.

Однако шансы Джона на спасение существенно повышаются, когда на помощь приходит перепрограммированный сопротивлением терминатор предыдущего поколения. Оба киборга вступают в смертельный бой, от исхода которого зависит судьба человечества.`,
    duration: 157,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/444.jpg',
    frames: [
      {
        description: 'Терминатор 2: Судный день',
        url: 'https://www.kinopoisk.ru/images/film_big/444.jpg',
      },
    ],
  },
  10: {
    id: 10,
    name: 'Терминатор 3: Восстание машин',
    description: `Прошло десять лет с тех пор, как Джон Коннор помог предотвратить Судный День и спасти человечество от массового уничтожения. Теперь ему 25, Коннор не живет «как все» — у него нет дома, нет кредитных карт, нет сотового телефона и никакой работы.

Его существование нигде не зарегистрировано. Он не может быть прослежен системой Skynet — высокоразвитой сетью машин, которые когда-то попробовали убить его и развязать войну против человечества. Пока из теней будущего не появляется T-X — Терминатрикс, самый сложный киборг-убийца Skynet.

Посланная назад сквозь время, чтобы завершить работу, начатую её предшественником, T-1000, эта машина так же упорна, как прекрасен её человеческий облик. Теперь единственная надежда Коннору выжить — Терминатор, его таинственный прежний убийца. Вместе они должны одержать победу над новыми технологиями T-X и снова предотвратить Судный День…`,
    duration: 60,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/319.jpg',
    frames: [
      {
        description: 'Терминатор 3: Восстание машин',
        url: 'https://www.kinopoisk.ru/images/film_big/319.jpg',
      },
    ],
  },
};
