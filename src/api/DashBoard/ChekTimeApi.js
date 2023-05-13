import axios from "axios";

export const CheckTimeApi = {
    async getCheckTimeList() {
        const { data } = await axios.get("/v0/checkTime");
        return data;
    },
    async createCheckTimeList(body) {
        const { data } = await axios.post("/v0/checkTime/create",body);
        return data;
    },
    async editCheckTimeList(body) {
        const { data } = await axios.patch("/v0/checkTime/edit",body);
        return data;
    },
}