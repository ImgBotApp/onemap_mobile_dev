
export const DESIGN_WIDTH = 1440
export const DESIGN_HEIGHT = 2542

export const LATITUDE = 37.78825
export const LONGITUDE = -122.4324
export const LATITUDE_DELTA = 0.0922
export const LONGITUDE_DELTA = 0.0555929

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
export const THUMB_SIZE = 200;
export const TABBAR_HEIGHT = 60;

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
export function getImageFromVideoURL(videourl) {
  if (getMediaTypeFromURL(videourl)) {
    let splitUrl = videourl.slice(0, videourl.length - 3);
    return splitUrl + "JPG";
  }
  else return videourl;
}
export function convertImageToThumbURL(url){
  //https://lh3.googleusercontent.com/p/AF1QipPYcHqGh5yfPkVAN6PPQGobh079i_sN5hW24nRh=s300
  let result = url;

  if (url) {
    let splitUrl = url.split('/');
    if (splitUrl && splitUrl.length > 2) {
      switch(splitUrl[2].toLowerCase())//url type
      {
        case "lh3.googleusercontent.com":{
          let filename = splitUrl[splitUrl.length - 1].split('=s');
          if (filename && filename.length == 2) {
            filename[filename.length-1]= '=s'+THUMB_SIZE;
          }
          let str='';
          for(var i=0; i<filename.length; i++)
            str+=filename[i];
          splitUrl[splitUrl.length-1] = str;

          result = '';
          for(var j=0; j<splitUrl.length-1 ;j++)
            result +=splitUrl[j]+'/';
          result += splitUrl[splitUrl.length-1];
          return result;
        }
        case 'maps.googleapis.com':{
          let filename = splitUrl[splitUrl.length - 1].split('&');
          for(var i=0; i<filename.length;i++)
          {
            let subname = filename[i];
            if(subname.substring(0,8)=="maxwidth" || subname.substring(0,9)=="maxheight")
            {
              filename[i]="maxwidth="+THUMB_SIZE;
              break;
            }
            let str='';
            for(var i=0; i<filename.length-1; i++)
              str+=filename[i]+"&";
            str += filename[filename.length-1];
            splitUrl[splitUrl.length-1] = str;

            result = '';
            for(var j=0; j<splitUrl.length-1 ;j++)
              result +=splitUrl[j]+'/';
            result += splitUrl[splitUrl.length-1];
            return result;
          }
        }
        defalut:{
          break;
        }
      }
    }
  }
  return result;
}

