/* eslint-disable no-use-before-define */
import { getTodayDate, getTodayStartMoment, getTomorrowDate } from '../../utils/date';

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.name = 'NotFoundError';
    this.message = message;
  }
}

function getMovies(date) {
  const today = getTodayDate();
  const tomorrow = getTomorrowDate();

  switch (date) {
    case today:
      return todayMovies;
    case tomorrow:
      return tomorrowMovies;
    default:
      return [];
  }
}

function getMovie(id) {
  let movie = todayMovies.find(movie => movie.id === id);
  if (movie) return movie;

  movie = tomorrowMovies.find(movie => movie.id === id);
  if (movie) return movie;

  return new NotFoundError('Movie with given id is not found');
}

function fetchMovies(date) {
  return new Promise(resolve => {
    setTimeout(() => resolve(getMovies(date)), 1000);
  });
}

function fetchMovie(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(getMovie(id)), 1000);
  });
}

export { fetchMovies, fetchMovie };

const todayMovies = [
  {
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
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(26)
            .minutes(0)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Хоббит: Битва пяти воинств',
    description: `Когда отряд из тринадцати гномов нанимал хоббита Бильбо Бэгинса в качестве взломщика и четырнадцатого, «счастливого», участника похода к Одинокой горе, Бильбо полагал, что его приключения закончатся, когда он выполнит свою задачу — найдет сокровище, которое так необходимо предводителю гномов Торину. Путешествие в Эребор, захваченное драконом Смаугом королевство гномов, оказалось еще более опасным, чем предполагали гномы и даже Гэндальф — мудрый волшебник, протянувший Торину и его отряду руку помощи.

В погоню за гномами устремилась армия орков, ведомых пробудившимся в руинах древним злом, а эльфы и люди, с которыми Бильбо и его товарищам пришлось иметь дело во время путешествия и которые пострадали от последствий желания гномов вернуть свой дом, предъявили права на щедрое вознаграждение — часть сокровищ Одинокой горы. Скоро неподалеку от Одинокой горы встретятся пять армий, и лишь кровопролитная битва определит результаты смелого гномьего похода.`,
    duration: 205,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/694633.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Борджиа',
    description:
      'В конце XV века в руках Папы Римского сосредоточилась неограниченная власть: он мог короновать и свергать королей, изменять судьбу империй. Некогда доброе имя церкви стало теперь ассоциироваться только с коррупцией и безнравственностью. В 1492 году, после смерти папы Иннокентия VIII, престол Святого Петра занял Александр VI (в миру Родриго Борджиа), который вписал в историю имя клана Борджиа отнюдь не благими деяниями…',
    duration: 236,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/521722.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(0)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 4,
    name: 'Король говорит!',
    description:
      'Сюжет ленты расскажет о герцоге, который готовится вступить в должность британского короля Георга VI, отца нынешней королевы Елизаветы II. После того, как его брат отрекается от престола, герой неохотно соглашается на трон. Измученный страшным нервным заиканием и сомнениями в своих способностях руководить страной, Георг обращается за помощью к неортодоксальному логопеду по имени Лайонел Лог.',
    duration: 229,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/485311.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 5,
    name: 'Игра престолов',
    description:
      'К концу подходит время благоденствия, и лето, длившееся почти десятилетие, угасает. Вокруг средоточия власти Семи королевств, Железного трона, зреет заговор, и в это непростое время король решает искать поддержки у друга юности Эддарда Старка. В мире, где все — от короля до наемника — рвутся к власти, плетут интриги и готовы вонзить нож в спину, есть место и благородству, состраданию и любви. Между тем, никто не замечает пробуждение тьмы из легенд далеко на Севере — и лишь Стена защищает живых к югу от нее.',
    duration: 218,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/464963.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
];
const tomorrowMovies = [
  {
    id: 6,
    name: 'Мстители: Финал',
    description:
      'Оставшиеся в живых члены команды Мстителей и их союзники должны разработать новый план, который поможет противостоять разрушительным действиям могущественного титана Таноса. После наиболее масштабной и трагической битвы в истории они не могут допустить ошибку.',
    duration: 183,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/843650.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 7,
    name: 'Мстители',
    description: `Локи, сводный брат Тора, возвращается, и в этот раз он не один. Земля на грани порабощения, и только лучшие из лучших могут спасти человечество.

Ник Фьюри, глава международной организации Щ. И. Т., собирает выдающихся поборников справедливости и добра, чтобы отразить атаку. Под предводительством Капитана Америки Железный Человек, Тор, Невероятный Халк, Соколиный глаз и Чёрная Вдова вступают в войну с захватчиком.`,
    duration: 93,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/263531.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
    id: 8,
    name: 'Терминатор',
    description:
      'История противостояния солдата Кайла Риза и киборга-терминатора, прибывших в 1984-й год из пост-апокалиптического будущего, где миром правят машины-убийцы, а человечество находится на грани вымирания. Цель киборга: убить девушку по имени Сара Коннор, чей ещё нерождённый сын к 2029 году выиграет войну человечества с машинами. Цель Риза: спасти Сару и остановить Терминатора любой ценой.',
    duration: 85,
    genres: ['Фэнтези', 'Приключения'],
    poster: 'https://www.kinopoisk.ru/images/film_big/507.jpg',
    frames: [
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
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
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
  {
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
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
      {
        description: 'Битва на черноводной',
        url:
          'https://st.kp.yandex.net/im/kadr/1/5/3/kinopoisk.ru-The-Lord-of-the-Rings_3A-The-Fellowship-of-the-Ring-1530919.jpg',
      },
    ],
    seances: {
      '3D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(14)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(16)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(50)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
      '2D': [
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(12)
            .minutes(40)
            .seconds(0)
            .unix(),
          price: '200',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(15)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(17)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(19)
            .minutes(20)
            .seconds(0)
            .unix(),
          price: '250',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(21)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(22)
            .minutes(30)
            .seconds(0)
            .unix(),
          price: '270',
        },
        {
          startTime: getTodayStartMoment()
            .add(1, 'days')
            .hours(0)
            .minutes(10)
            .seconds(0)
            .unix(),
          price: '270',
        },
      ],
    },
  },
];

// eslint-disable-next-line no-unused-vars
const dayAfterTomorrowMovies = [
  {
    id: 11,
    name: 'Остров сокровищ',
    description:
      'ornare sagittis felis. Donec tempor, est ac mattis semper, dui lectus rutrum urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices',
    duration: 143,
  },
  {
    id: 12,
    name: 'Король лев',
    description:
      'eu, ligula. Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu.',
    duration: 187,
  },
  {
    id: 13,
    name: 'Мадагаскар',
    description:
      'Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi',
    duration: 196,
  },
  {
    id: 14,
    name: 'Мадагаскар 2',
    description:
      'egestas. Aliquam fringilla cursus purus. Nullam scelerisque neque sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate,',
    duration: 98,
  },
  {
    id: 15,
    name: 'Шрек 2',
    description:
      'tincidunt tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit',
    duration: 131,
  },
];

// eslint-disable-next-line no-unused-vars
const afterDayAfterTomorrowMovies = [
  {
    id: 16,
    name: 'Пираты карибского моря',
    description:
      'Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at pede. Cras vulputate velit eu sem. Pellentesque ut ipsum ac mi',
    duration: 114,
  },
  {
    id: 17,
    name: 'Пираты карибского моря 2',
    description:
      'Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla est. Mauris eu turpis.',
    duration: 210,
  },
  {
    id: 18,
    name: 'Пираты карибского моря 3',
    description:
      'mi enim, condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed pede. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique pharetra. Quisque ac libero nec ligula',
    duration: 114,
  },
  {
    id: 19,
    name: 'Унесенные призраками',
    description:
      'aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus ligula. Aliquam erat',
    duration: 141,
  },
  {
    id: 20,
    name: 'Ходячий замок',
    description:
      'lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero. Integer in magna. Phasellus dolor',
    duration: 68,
  },
];
