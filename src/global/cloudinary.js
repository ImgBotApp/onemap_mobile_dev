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
            console.log("+++++++++++++++++++++++++" + data.url);
            return data.url;
        })
        .catch((err) => { console.log("--------------------" + err); this.setState({ processing: false }); return null; });
}
