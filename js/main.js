const PHOTO_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;
const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const names = [
  'Артём',
  'Мария',
  'Михаил',
  'Геннадий',
  'Георгий',
  'Ольга',
  'Карина',
  'Алёна'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const descriptions = [
  'Тестим новую камеру!',
  'Тусим с друзьями на природе',
  'Мой любимый город',
  'Тут очень красиво!',
  'Отдыхаем...',
  'Случайный кадр, но мне очень нравится',
  'Утро началось с кофе, прогулки и кофе',
  'Сегодня отличная погода, фото тоже отличное'
];

let counterCommentId = 0;

// Функция получения случайного целого числа
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Текст комментария: одно или два предложения
const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(messages)).join(' ');

// Функция создания одного комментария
const createComment = () => {
  counterCommentId += 1;
  return {
    id: counterCommentId,
    avatar: `img/avatar-${getRandomInteger(AVATAR_MIN, AVATAR_MAX)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(names)
  };
};

// Функция создания одной фотографии. Принимает уникальный id
const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(descriptions),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(COMMENTS_MIN, COMMENTS_MAX)}, createComment)
});

// Массив из 25 фотографий
const photos = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
  photos.push(createPhoto(i));
}
