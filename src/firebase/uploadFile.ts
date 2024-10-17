import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config"

export const uploadFile = (file: any, filePath: any): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const storageRef = ref(storage, filePath);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            resolve(url);
        } catch (error) {
            reject(error);
        }
    });
}
