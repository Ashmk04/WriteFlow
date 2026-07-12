import { cache } from "react";
import conf from "../conf/conf";
import {Account, Client, ID} from "appwrite"

export class AuthService{

    client = new Client()
    account

    constructor(){
        this.client
            .setEndpoint(conf.appWriteURL)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
        
    }

    async createAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email,password})
            } else {
                return userAccount
            }
        }
        catch(error)
        {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            return JSON.parse(JSON.stringify(user))
        } catch (error) {
            console.log("Appwrite currentUser:", error.message);
            return null
        }
    }

async logout() {
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        console.log("Appwrite logout:", error.message);    
    }
}

}

const authService = new AuthService

export default authService