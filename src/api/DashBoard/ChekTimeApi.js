import axios from "axios";

export const CheckTimeApi = {
    async getCheckTimeList() {
        const { data } = await axios.get("/v0/checkTime");
        return data;
    },
}