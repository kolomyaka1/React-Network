import { PhotosType, ProfileType } from "../../types/types";
import { instance, ResponseType } from "./api";

type SavePhotoReponseDataType = {
    photos : PhotosType
}


export const profileAPI = {
    getStatus(userId:number) {
        return instance.get<string>(`profile/status/${userId}`);
    },
    updateStatus(status:string) {
        return instance.put<ResponseType>(`profile/status`, {status : status});
    },
    updatePhoto(photos:string) {
        const formData = new FormData();
        formData.append('image', photos);
        return instance.put<ResponseType<SavePhotoReponseDataType>>(`profile/photo`, formData , {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    getProfile(id:number) {
        return instance.get<ProfileType>(`profile/${id}`)
        .then(response => response.data)
    },
}
