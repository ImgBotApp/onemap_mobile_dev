export const DESIGN_WIDTH  = 1440
export const DESIGN_HEIGHT = 2542


export const ACCOUNT_MODE = {
  create: 'createAccount',
  update: 'updateAccount',
  facebook: 'facebookAccount'
}

export const APP_USER_KEY = 'onemap.user.id'

export const EMPTY_IMG = 'https://res.cloudinary.com/dioiayg1a/image/upload/c_crop,h_2002,w_1044/v1512299405/dcdpw5a8hp9cdadvagsm.jpg';

export function getMediatTypeFromURL (url) {
  let result = false;
  if(url)
  {
    let splitUrl = url.split('/');
    if(splitUrl && splitUrl.length > 0)
    {
      let filename = splitUrl[splitUrl.length-1].split('.');
      if(filename && filename.length > 0)
      {
        const filetype = filename[filename.length-1].toUpperCase();
        if(filetype == "MP4" || filetype == "AVI")
          result = true;
        else result = false;
      }
    }
  }
  return result;
}
export function getThumlnailFromVideoURL (videourl){
  if(getMediatTypeFromURL(videourl))
  {
    let splitUrl = videourl.slice(0,videourl.length-3);
    return splitUrl+"JPG";
  }
  else return videourl;
}