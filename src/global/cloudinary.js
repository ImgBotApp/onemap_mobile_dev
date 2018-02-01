import _ from "underscore";
import sha1 from "sha1";

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

export function uploadMedia(uri, tag) {
    var url = 'https://api.cloudinary.com/v1_1/' + cloud_name + '/media/upload';

    let timestamp = (Date.now() / 1000 | 0).toString();
    let signature = sha1("tags=" + tag + "&timestamp=" + timestamp + cloud_api_secret);

    let formdata = new FormData()
    formdata.append('file', {uri: uri, type: 'image/*', name: timestamp})
    formdata.append('timestamp', timestamp)
    formdata.append('api_key', cloud_api_key)
    formdata.append('signature', signature)

    const config = {
        method: 'POST',
        body: formdata
    }

    return fetch(url, config)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        return res.url
    })
    .catch((err) => {
        console.log(err)
    })
}
