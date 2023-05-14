import axios from "axios";

export const RoomApi = {
    async getRooms(body) {
        const { data } = await axios.get("/v0/rooms");
        return data;
    },
    async addNewRooms(body) {
        const { data } = await axios.post("/v0/rooms/create", body);
        return data;
    },
    async editRooms(body) {
        const { data } = await axios.patch("/v0/rooms/edit", body);
        return data;
    }

}