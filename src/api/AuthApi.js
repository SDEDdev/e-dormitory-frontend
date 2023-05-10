import axios from "axios";

export const auth = {
    async Login(body){
        const {data} = await axios.post("/v0/user/login", body);
        return data;
    },
}