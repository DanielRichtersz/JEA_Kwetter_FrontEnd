import { Cookies } from "react-cookie";


export default class CookiesService {

    constructor() {

    }

    /**
     * GetTokenAndUserId()
     * : Dictionary<String, String>    */
    public static GetTokenAndUserId() : Map<string, string> {
        // Instantiate Cookies
        let cookies = new Cookies();

        let tokenAndUserID = new Map<string, string>();
        if (CookiesService.LoggedInCheck()) {
            tokenAndUserID.set("token", String(cookies.get("token")));
            tokenAndUserID.set("userid", String(cookies.get("userid")));
        }
        return tokenAndUserID;
    }

    /**
     * LoggedInCheck
     */
    public static LoggedInCheck(): boolean {
        // Instantiate Cookies
        let cookies = new Cookies();

        // If the cookies have a value
        if ((cookies.get("token") != null || undefined) ||
            (cookies.get("userid") != null || undefined)) {
            // User is logged in
            return true;
        }
        else {
            // Else no user is logged in', redirect to login
            console.log("No logged in user");
            console.log("You will be redirected to the login page");
            return false;
        }
    }

    /**
     * LogIn
    token: String, 
    userid: String     
    */
    public static LogIn(token: string, userid: string) {
        // Instantiate Cookies
        let cookies = new Cookies();

        // Save token and userid in cookie
        cookies.set("token", token);
        cookies.set("userid", userid);
    }

    /**
     * LogOut
     */
    public static LogOut() : void {
        // Instantiate Cookies
        let cookies = new Cookies();

        // Destroy token and userid cookies
        cookies.remove("token");
        cookies.remove("userid");

        // Redirect to login

    }
}