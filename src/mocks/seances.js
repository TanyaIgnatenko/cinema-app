import { getTodayStartMoment } from '../utils/date';

export const todaySeances = {
  '3D': [
    {
      startTime: getTodayStartMoment()
        .hours(12)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '200',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 77, 100],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(14)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 32, 112, 117],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(16)
        .minutes(50)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [91, 92, 93, 97, 102],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(17)
        .minutes(50)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(19)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
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
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(15)
        .minutes(10)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(17)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(19)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(21)

        .minutes(30)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(22)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .hours(26)
        .minutes(0)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
  ],
};

export const tomorrowSeances = {
  '3D': [
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(10)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '200',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(14)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(16)
        .minutes(50)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(17)
        .minutes(50)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(19)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
  ],
  '2D': [
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(12)
        .minutes(40)
        .seconds(0)
        .unix(),
      price: '200',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(15)
        .minutes(10)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(17)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(19)
        .minutes(20)
        .seconds(0)
        .unix(),
      price: '250',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
    {
      startTime: getTodayStartMoment()
        .add(1, 'd')
        .hours(21)
        .minutes(30)
        .seconds(0)
        .unix(),
      price: '270',
      hall: {
        id: 1,
        seats: {
          taken: [1, 2, 3, 17, 22],
        },
      },
    },
  ],
};