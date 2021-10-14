const STORAGE_TOKEN_NAME = 'gopathshalToken';

export default {   
    
    get(){
        return localStorage.getItem(STORAGE_TOKEN_NAME);
    },

    async set(token: string){
        return localStorage.setItem(STORAGE_TOKEN_NAME, token);
    },

    remove(token = STORAGE_TOKEN_NAME){
        localStorage.removeItem(token);
    }
}