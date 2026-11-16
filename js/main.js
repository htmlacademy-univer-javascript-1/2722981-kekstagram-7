import './functions.js';
import { createPhotos } from './data.js';
import { renderThumbnails } from './pictures.js';

const photos = createPhotos();

renderThumbnails(photos);
