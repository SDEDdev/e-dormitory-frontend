import axios from 'axios';

export const UserApi = {
    async getUsers(){
        const {data} = await axios.get("/v0/user/list");
        return data;
    },
    async addNewUser(body){
        const {data} = await axios.post("/v0/user/register",body);
        return data;
    },
    async editUser(body){
        const {data} = await axios.patch("/v0/user/edit",body);
        return data;
    }
    
}