export const DESIGN_WIDTH = 1440
export const DESIGN_HEIGHT = 2542


export const ACCOUNT_MODE = {
  create: 'createAccount',
  update: 'updateAccount',
  facebook: 'facebookAccount'
}

export const APP_USER_KEY = 'onemap.user.id'
export const PLACES_APIKEY = __DEV__ ?
  // Development
  'AIzaSyDqbVkKnQIprdvj8OOk9DYxPz0dnP0y4zA'
  :
  // Production
  'AIzaSyAfeysdEjFq8v3wfPs7RIv8AHIcOkyGw_s'

export const EMPTY_IMG = 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg';

export function getMediaTypeFromURL(url) {
  let result = false;
  if (url) {
    let splitUrl = url.split('/');
    if (splitUrl && splitUrl.length > 0) {
      let filename = splitUrl[splitUrl.length - 1].split('.');
      if (filename && filename.length > 0) {
        const filetype = filename[filename.length - 1].toUpperCase();
        // if (filetype === 'JPG' || filetype === 'PNG')
        //   result = false;
        // else result = true;
        if (filetype == "MP4" || filetype == "AVI" || filetype == "MOV")
          result = true;
        else result = false;
      }
    }
  }
  return result;
}
export function getThumlnailFromVideoURL(videourl) {
  if (getMediaTypeFromURL(videourl)) {
    let splitUrl = videourl.slice(0, videourl.length - 3);
    return splitUrl + "JPG";
  }
  else return videourl;
}
