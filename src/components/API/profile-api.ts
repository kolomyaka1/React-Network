import { instance, ResultCodesEnum } from "./api";

type UpdateStatusType = {
    resultCode : ResultCodesEnum
    messages : Array<string>
    data : {
        status : string
    }
}



export const profileAPI = {
    getStatus(userId:number) {
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status:string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status : status});
    },
    updatePhoto(photos:string) {
        const formData = new FormData();
        formData.append('image', photos);
        return instance.put(`profile/photo`, formData , {
            headers : {
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
}