import axios from "axios";

export const BenefitsApi = {
    async getBenefitsList() {
        const { data } = await axios.get("/v0/benefit");
        return data;
    },
}