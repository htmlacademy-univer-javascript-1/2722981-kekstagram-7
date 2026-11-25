import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

let currentComments = [];
let shownCommentsCount = 0;

// Создание одного комментария по разметке из задания
const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = avatar;
  picture.alt = name;
  picture.width = 35;
  picture.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(picture, text);

  return comment;
};

// Добавление следующей порции комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_STEP);

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  shownCommentsCount += nextComments.length;

  commentCounter.textContent = `${shownCommentsCount} из `;
  commentCounter.append(commentsCount, ' комментариев');
  commentsLoader.classList.toggle('hidden', shownCommentsCount >= currentComments.length);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  currentComments = [];
  shownCommentsCount = 0;
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Открытие окна с данными конкретной фотографии
const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;
  currentComments = comments;
  shownCommentsCount = 0;
  commentsList.innerHTML = '';

  commentCounter.classList.remove('hidden');
  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onCommentsLoaderClick = () => {
  renderComments();
};

closeButton.addEventListener('click', onCloseButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
