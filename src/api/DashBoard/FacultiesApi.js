import axios from "axios";

export const FacultiesApi = {
    async getFaculties() {
        const { data } = await axios.get("/v0/faculties");
        return data;
    },
}