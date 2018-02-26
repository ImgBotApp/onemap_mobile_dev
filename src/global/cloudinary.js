import _ from "underscore";
import sha1 from "sha1";
import { THUMB_SIZE } from './const';
const cloud_api_key = "467698848195651";
const cloud_api_secret = "ya2mX_kNtFG4omnouxxWW3ozQHo";
const cloud_name = "onemap-co";

export function uploadImage(imgdata, tag) {
    var url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/image/upload';

    var header = {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    var timestamp = Date.now();
    var values = {
        file: 'data:image/png;base64,' + imgdata,
        api_key: cloud_api_key,
        timestamp: timestamp,
        tags: tag,
        signature: sha1("tags=" + tag + "&timestamp=" + timestamp + cloud_api_secret)
    };

    var request = _.extend({
        body: JSON.stringify(values)
    }, header);

    return fetch(url, request)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                alert(data.error.message);
                return null;
            } else {
              return data.url;
            }
        })
        .catch((err) => {
            return null;
        });
}

export function uploadMedia(videoData, tag) {
    var url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/video/upload';

    var timestamp = Date.now();
    let signature = sha1("tags=" + tag + "&timestamp=" + timestamp + cloud_api_secret);

    var movVideo = {
      uri: videoData.uri,
      type: 'video/mp4',
      name: signature+'.mp4',
    };

    var body = new FormData();
    body.append('file', movVideo);
    body.append('api_key', cloud_api_key)
    body.append('upload_preset','bztfvbid');

    return fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: body,
    }).then((response) => response.json())
      .then((responseJson) => {
        //only the first frame of the video got uploaded
        console.log(responseJson.url);
        return responseJson.url;
    }).catch(error =>{
      return null;
    });

}

export function fetchThumbFromCloudinary(imageurl){
    const fetchurl= 'http://res.cloudinary.com/'+cloud_name+'/image/fetch/w_'+THUMB_SIZE+',g_face,c_fill/';
    return fetchurl+imageurl.replace('?','%3F');
}

export function getGrayImage(imageUrl, thumbnail=true) {
    if (thumbnail) {
        return fetchThumbFromCloudinary(imageUrl.replace('/upload/', '/upload/e_grayscale/'))
    } else {
        return imageUrl.replace('/upload/', '/upload/e_grayscale/')
    }
}