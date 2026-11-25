import './functions.js';
import './form.js';
import { createPhotos } from './data.js';
import { renderThumbnails } from './pictures.js';
import { openBigPicture } from './bigpictures.js';

const photos = createPhotos();

renderThumbnails(photos, openBigPicture);
