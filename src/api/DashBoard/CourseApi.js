import axios from "axios";

export const CourseApi = {
    async getCourseList() {
        const { data } = await axios.get("/v0/Course");
        return data;
    },
}