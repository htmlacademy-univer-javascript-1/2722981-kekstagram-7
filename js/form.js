import { isEscapeKey } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_PATTERN = /^#[\p{L}\p{N}]{1,19}$/u;

const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error'
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const validateHashtagsFormat = (value) => getHashtags(value).every((tag) => HASHTAG_PATTERN.test(tag));

const validateHashtagsCount = (value) => getHashtags(value).length <= MAX_HASHTAGS_COUNT;

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagsFormat,
  'Хэштег должен начинаться с # и содержать от 1 до 19 букв или цифр после решётки',
  3,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsCount,
  'Можно указать не более 5 хэштегов',
  2,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUnique,
  'Хэштеги не должны повторяться',
  1,
  true
);

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  fileInput.value = '';
  pristine.reset();
};

function onDocumentKeydown(evt) {
  const isTextFieldFocused = document.activeElement === hashtagsInput || document.activeElement === descriptionInput;

  if (isEscapeKey(evt) && !isTextFieldFocused) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const onFileInputChange = () => {
  if (fileInput.files.length === 0) {
    return;
  }

  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onUploadCancelClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const onUploadFormSubmit = (evt) => {
  const isValid = pristine.validate([hashtagsInput, descriptionInput]);

  if (!isValid || !uploadForm.reportValidity()) {
    evt.preventDefault();
  }
};

fileInput.addEventListener('change', onFileInputChange);
cancelButton.addEventListener('click', onUploadCancelClick);
uploadForm.addEventListener('submit', onUploadFormSubmit);
