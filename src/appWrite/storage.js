import conf from "../conf/conf";
import {ID, Databases, Client, Query, Storage, Permission, Role} from "appwrite"

export class StorageServices{
    client = new Client()
    storage

    constructor() {
        this.client.setEndpoint(conf.appWriteURL)
        this.client.setProject(conf.appWriteProjectId)

        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFileView(
            conf.appWriteBucketId,
            fileId
        )      
    }

}

const storageServices = new StorageServices() 

export default storageServices