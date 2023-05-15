import axios from "axios";

export const DormitoryApi = {
    async getDormitoryList(params) {
        const { data } = await axios.get("/v0/dormitory",params);
        return data;
    },
}