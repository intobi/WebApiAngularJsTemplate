module Services {

    import IStorageService = angular.storage.IStorageService;

    export interface IActionAccess {
        actionID: number;
        actionName: string;
        accessLevel: number;
        parentID: number;
        parentName: string;
    }

    export interface IAuthData {
        aud: string;
        exp: number;
        iss: string;
        lang: string;
        nbf: number;
        role: string;
        role_id: string;
        unique_name: string;
        nameid: string;
        user_name: string;
    }

    export interface ISessionStorage extends IStorageService {
        accessLevelData: IActionAccess[];
        token: string;
        userName: string;
    }

    export interface ILocalStorage extends IStorageService {
        accessLevelData: IActionAccess[];
        token: string;
        userName: string;
    }

    export interface IStorageHelper {
        resetLocal(): void;
        resetSession(): void;
        accessLevelDataInSession: IActionAccess[];
        accessLevelDataInLocal: IActionAccess[];
        tokenInSession: string;
        tokenInLocal: string;
        userNameInLocal: string;
        readonly authData: IAuthData;
        readonly token: string;
        readonly accessLevelData: IActionAccess[];
    }

    export class StorageHelper implements IStorageHelper {
        static $inject = ["$localStorage", "$sessionStorage", "jwtHelper"];
        constructor(private $localStorage: ILocalStorage, private $sessionStorage: ISessionStorage, private jwtHelper: any) {
        }

        resetLocal(): void {
            this.$localStorage.$reset();
        }

        resetSession(): void {
            this.$sessionStorage.$reset();
        }

        //#region "Token"

        get token(): string {
            if (this.tokenInLocal != null) {
                return this.tokenInLocal;
            }

            if (this.tokenInSession != null) {
                return this.tokenInSession;
            }

            return null;
        }

        get tokenInSession(): string {
            const result = this.$sessionStorage.token;
            return result;
        }
        set tokenInSession(newToken: string) {
            this.$sessionStorage.token = newToken;
        }

        removeTokenInSession() {
            delete this.$sessionStorage.token;
        }

        get tokenInLocal(): string {
            const result = this.$localStorage.token;
            return result;
        }
        set tokenInLocal(newToken: string) {
            this.$localStorage.token = newToken;
        }

        removeTokenInLocal() {
            delete this.$localStorage.token;
        }

        //#endregion "Token"

        //#region "AuthData"

        get authData(): any {
            if (this.token != null) {
                return this.jwtHelper.decodeToken(this.token);
            }

            return null;
        }

        //#endregion "AuthData"


        //#region "ActionAccess"
        get accessLevelDataInSession(): IActionAccess[] {
            const result = this.$sessionStorage.accessLevelData;
            return result;
        }
        set accessLevelDataInSession(accessLevelData: IActionAccess[]) {
            this.$sessionStorage.accessLevelData = accessLevelData;
        }

        removeAccessLevelDataInSession() {
            delete this.$sessionStorage.accessLevelData;
        }

        get accessLevelDataInLocal(): IActionAccess[] {
            const result = this.$localStorage.accessLevelData;
            return result;
        }
        set accessLevelDataInLocal(accessLevelData: IActionAccess[]) {
            this.$localStorage.accessLevelData = accessLevelData;
        }

        removeAccessLevelDataInLocal() {
            delete this.$localStorage.accessLevelData;
        }

        get accessLevelData(): IActionAccess[] {
            if (this.$sessionStorage.accessLevelData != null)
                return this.$sessionStorage.accessLevelData;

            if (this.$localStorage.accessLevelData != null)
                return this.$localStorage.accessLevelData;

            return null;
        }

        //#endregion "ActionAccess"

        //#region "UserName"
        get userNameInLocal(): string {
            const result = this.$localStorage.userName;
            return result;
        }
        set userNameInLocal(userName: string) {
            this.$localStorage.userName = userName;
        }

        //#endregion "UserName"



    }
    angular.module("app").service("storageHelper", StorageHelper);
}