import conf from "../conf/conf";
import {ID, Databases, Client, Query, Storage, Permission, Role} from "appwrite"

export class Service{

    client = new Client()
    databases
    storage

    constructor(){
        this.client.setEndpoint(conf.appWriteURL)
        this.client.setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title, slug, content, image, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteTableId,
                slug,
                {
                    title, 
                    content, 
                    image, 
                    status, 
                    userId
                })
        } catch (error) {
            throw error
        }
    }

    async updatePost({title, slug, content, image, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteTableId,
                slug,
                {
                    title,
                    content, 
                    image,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteTableId,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteTableId,
                slug
            )
        } catch (error) {
            throw error
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteTableId,
                queries
            )
        } catch (error) {
            throw error
        }
    } 

}

const service = new Service()

export default service