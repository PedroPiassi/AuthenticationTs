import { makeAutoObservable } from "mobx";

class AuthStore {
    constructor () {
        makeAutoObservable(this);
    }

    token:string = '';
    user:any = {};

    setToken(token:string) {
        this.token = token;
    }; 

    setUser(user:any) {
        this.user = user;
    }; 
};

export const authStore = new AuthStore();