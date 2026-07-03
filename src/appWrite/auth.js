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
                this.login({email,password})
            } else {
                return userAccount
            }
        }
        catch(error)
        {
            throw error
        }
    }

    async login() {
        try {
            return await this.account.createEmailPasswordSession({email, password})
        } catch (error) {
            throw error
        }
    }

    async currentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
        return null
    }

async logout() {
    try {
        return await this.account.deleteSessions()
    } catch (error) {
        throw error
    }
}

}

const authService = new AuthService

export default authService