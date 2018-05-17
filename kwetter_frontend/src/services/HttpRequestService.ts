

export class HttpRequestService {

    constructor() {

    }

    public verifyLogin(email: string, password: string, callbackFunction: Function) {
        let data = new FormData();
        data.append('email', email);
        data.append('password', password);
        this.call("POST", "/users/login", data, callbackFunction, true );
    }

    call(type: string, url: string, data: FormData, callback : Function, form: boolean) {
        var xmlHttp = new XMLHttpRequest();
        //xmlHttp.withCredentials = true;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && (xmlHttp.status >= 200 && xmlHttp.status < 300))
            {
                //If the request succeeds
                callback(xmlHttp.responseText, true, xmlHttp);
            } else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
                //If the request fails
                //Make for correct handling
                callback(xmlHttp, false);
            }
        }
        xmlHttp.open(type, url, true);
        if (form == true)
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.send(data);
    }
}