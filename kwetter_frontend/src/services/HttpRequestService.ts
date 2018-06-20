import { Cookies } from "react-cookie";


export default class HttpRequestService {

    constructor() {

    }

    public verifyLogin(email: string, password: string, callbackFunction: Function) {
        let data = 'email='+email+'&password='+password;
        this.call("POST", "/userlr/login", data, callbackFunction, true );
    }

    public postTweet(message: string, userid: string, token: string, callbackFunction: Function) {
        if (userid != undefined && token != undefined) {
            let data = 'message='+message;
            this.callWithToken("POST", "/tweets/create/"+userid, data, callbackFunction, true);
        }
        else {
            throw new Error("No cookie with an ID or token were found, tweet could not be created");
        }
    }

    public loadTimeline(startdate: string, enddate: string, userid: string, token: string, callbackFunction: Function) {
        if (userid != undefined && token != undefined) {
            let data = 'startdate='+startdate+'&enddate='+enddate;
            this.callWithToken("POST", "/timeline/load", data, callbackFunction, true);
        }
        else {
            throw new Error("No cookie with an ID or token were found, timeline could not be loaded");
        }
    }

    call(type: string, url: string, data: any, callback : Function, form: boolean) {
        var xmlHttp = new XMLHttpRequest();
        //xmlHttp.withCredentials = true;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && (xmlHttp.status >= 200 && xmlHttp.status < 300))
            {
                // If the request succeeds
                callback(xmlHttp.responseText, true, xmlHttp);
            } else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
                // If the request fails
                // Make for correct handling
                callback(xmlHttp, false);
            }
        }
        xmlHttp.open(type, url, true);
        if (form == true) {
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xmlHttp.send(data);
    }

    callWithToken(type: string, url: string, data: any, callback : Function, form: boolean) {
        var xmlHttp = new XMLHttpRequest();
        //xmlHttp.withCredentials = true;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && (xmlHttp.status >= 200 && xmlHttp.status < 300))
            {
                // If the request succeeds
                callback(xmlHttp.responseText, true, xmlHttp);
            } else if (xmlHttp.readyState === 4 && xmlHttp.status !== 200) {
                // If the request fails
                // Make for correct handling
                callback(xmlHttp, false);
            }
        }

        let cookies = new Cookies();

        xmlHttp.open(type, url, true);
        if (form == true)
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlHttp.setRequestHeader('token', String(cookies.get("token")));
            xmlHttp.setRequestHeader('userid', String(cookies.get("userid")));
        xmlHttp.send(data);
    }
}