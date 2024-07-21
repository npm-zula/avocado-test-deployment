import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: 'https://cloud.appwrite.io/v1',
  projectId: '65ab9816316640d049a7',
  databaseId: '65ab9882bcec97a4c229',
  storageId: '65ab98b5751b7aec967c',
  userCollectionId: '65ab99271bc1d6a33da7',
  postCollectionId: '65ab996da30c0657e2fd',
  savesCollectionId: '65ab998fa35c76a13268',
};

export const client = new Client();
console.log('fffffffffffffffffff',appwriteConfig.url);

client.setEndpoint('https://cloud.appwrite.io/v1');
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
