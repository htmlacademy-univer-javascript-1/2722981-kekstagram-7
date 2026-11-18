const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

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

// Отрисовка списка комментариев через DocumentFragment
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.innerHTML = '';
  commentsList.append(fragment);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
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
  renderComments(comments);

  commentCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
