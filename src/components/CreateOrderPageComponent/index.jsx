import { useEffect, useState } from 'react';
import MainPageHeader from './../../ui/Headers/MainPageHeader/index';
import { Alert, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { FacultiesApi } from '../../api/DashBoard/FacultiesApi';
import { CourseApi } from '../../api/DashBoard/CourseApi';
import { DormitoryApi } from '../../api/DashBoard/DormitoryApi';
import { RoomApi } from '../../api/DashBoard/RoomApi';
import { CheckTimeApi } from '../../api/DashBoard/ChekTimeApi';
import { BenefitsApi } from '../../api/DashBoard/BenefitsApi';
import axios from 'axios';


export default function CreateOrderPageComponent() {
    const [facultiesList, setfacultiesList] = useState([]); //Список факультетів для випадаючого списку
    const [courseList, setcourseList] = useState([]);
    const [dormList, setdormList] = useState([]);
    const [roomList, setroomList] = useState([]);
    const [dateList, setdateList] = useState([]);
    const [benefitsList, setbenefitsList] = useState([]);

    const [status, setStatus] = useState({});

    const [currentCourse, setCurrentCourse] = useState("");
    const [currentFaculty, setCurrentFaculty] = useState("");
    const [currenDorm, setcurrenDrom] = useState("");

    const [isBenefit, setIsBenefit] = useState(false);

    const [passport1, setpassport1] = useState("");
    const [passport2, setpassport2] = useState("");
    const [identificationCode, setidentificationCode] = useState("");
    const [medicalReference, setmedicalReference] = useState("");
    const [receipt, setreceipt] = useState("");
    const [benefit, setbenefit] = useState("");

    const handleFileSelect = (e,setState) => {
        const file = e.target.files[0];
        if (file?.size > 2048 * 2048) {
          alert("Файл перевищує максимальний розмір 2 МБ");
        } else {
            setState(URL.createObjectURL(file));
          ;
        }
      };

    const NewOrder = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        data.append("check_in", data.get("date").split("/")[0]);
        data.append("check_out", data.get("date").split("/")[1]);
        try {
            await axios.post("/v0/order/create", data);
            setStatus({ msg: "Заявку успішно створено", type: "success" })
        } catch (error) {
            console.log(error);

            setStatus({ msg: error?.response?.data?.errors[0]?.msg || "Невідома помилка!", type: "error" })
        }
    }
    const getFaculties = async () => {
        try {
            const data = await FacultiesApi.getFaculties();
            setfacultiesList(data);
        } catch (error) {

        }
    }
    const getCourse = async () => {
        try {
            const data = await CourseApi.getCourseList();
            setcourseList(data);
        } catch (error) {

        }
    }
    const getDormitories = async (faculty_id) => {
        try {
            const data = await DormitoryApi.getDormitoryList({ params: { faculty_id: faculty_id } });
            setdormList(data);
        } catch (error) {

        }
    }
    const getRooms = async (faculty_id, dormitory_id) => {
        try {
            const data = await RoomApi.getRooms({
                params: {
                    faculty_id: faculty_id,
                    dormitory_id: dormitory_id
                }
            });
            setroomList(data);
        } catch (error) {

        }
    }
    const getBenefits = async () => {
        try {
            const data = await BenefitsApi.getBenefitsList();
            setbenefitsList(data);
        } catch (error) {

        }
    }
    const getDate = async (faculty_id, course_id) => {
        try {
            const data = await CheckTimeApi.getCheckTimeList({
                params: {
                    faculty_id: faculty_id,
                    course_id: course_id,
                }
            });
            setdateList(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getFaculties();
        getCourse();
        getBenefits();
    }, [])
    return (
        <>
            <MainPageHeader />
            <Container sx={{ marginTop: "20px" }}>
                <Box sx={{
                    p: 4,
                    overflow: "auto"
                }}>
                    {/* Form */}
                    <Box component="form" onSubmit={NewOrder}>
                        <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
                            {/* Прізвище */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    id="surName"
                                    label="Прізвище"
                                    name="last_name"
                                    autoComplete="lastName"
                                    autoFocus
                                />
                            </Grid>
                            {/* Ім'я */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    label="Ім'я"
                                    name="first_name"
                                    autoComplete="firstName"
                                    autoFocus
                                />
                            </Grid>
                            {/* По-батькові */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    label="По-батькові"
                                    name="sur_name"
                                    autoComplete="surName"
                                    autoFocus
                                />
                            </Grid>
                            {/* Gender */}
                            <Grid item
                                xs={12}
                                sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="genderlabel">Вкажіть вашу стать</InputLabel>
                                    <Select
                                        labelId="genderlabel"
                                        id="demo-simple-select"
                                        defaultValue={undefined}
                                        label="Sex"
                                        name="gender"
                                    >
                                        <MenuItem value={"Жіноча"}>Жіноча</MenuItem>
                                        <MenuItem value={"Чоловіча"}>Чоловіча</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Факультет */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Виберіть факультет</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={undefined}
                                        label="Факультети"
                                        name="faculty_id"
                                        onChange={(e) => setCurrentFaculty(e.target.value)}
                                    >
                                        {
                                            facultiesList.map(item => (
                                                <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Курс */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Виберіть курс</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={undefined}
                                        label="Курс"
                                        name="course_id"
                                        onChange={(e) => setCurrentCourse(e.target.value)}
                                    >
                                        {
                                            courseList.map(item => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Група */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    label="Група"
                                    name="group"
                                    autoFocus
                                />
                            </Grid>
                            {/* Гуртожиток */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Виберіть гуртожиток</InputLabel>
                                    <Select
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={undefined}
                                        onOpen={() => { getDormitories(currentFaculty) }}
                                        name="dormitory_id"
                                        onChange={(e) => setcurrenDrom(e.target.value)}
                                    >
                                        {
                                            dormList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>{item.number}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Кімната */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Виберіть кімнату</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={undefined}
                                        name="room_id"
                                        onOpen={() => { getRooms(currentFaculty, currenDorm) }}

                                    //onChange={(e) => console.log(e.target.value)}
                                    >
                                        {
                                            roomList.map(item => (
                                                <MenuItem key={item.id} value={item.id}>{item.number}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Дата вселення */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Виберіть дату поселення/виселення</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={""}
                                        name="date"
                                        onOpen={() => { getDate(currentFaculty, currentCourse) }}


                                    >
                                        {
                                            dateList.map((item, index) => (
                                                <MenuItem key={index} value={`${item.in}/${item.out}`}>{item.in} -- {item.out}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Паспорт номер */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    label="Номер паспорту"
                                    name="passport"
                                    autoFocus
                                />
                            </Grid>
                            {/* Рпнппк */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="none"
                                    required
                                    fullWidth
                                    label="РНОКПП"
                                    name="rntrc"
                                    autoFocus
                                />
                            </Grid>
                            {/* фото паспорта 1 */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="passport" style={{ width: "100%" }}>
                                    <input
                                        style={{ display: "none", width: "100%" }}
                                        id="passport"
                                        name="passport"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setpassport1)}
                                    />

                                    <Button
                                        fullWidth
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити фото паспорту (1 сторінка)
                                    </Button>
                                </label>
                                {passport1 && (
                                    <img src={passport1} alt="passport1" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                            {/* фото паспорта 2 */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="passport2">
                                    <input
                                        style={{ display: "none" }}
                                        id="passport2"
                                        name="passport"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setpassport2)}
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити фото паспорту (2 сторінка)
                                    </Button>
                                </label>
                                {passport2 && (
                                    <img src={passport2} alt="passport2" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                            {/* ідентифікаційний код */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="identification_code">
                                    <input
                                        style={{ display: "none" }}
                                        id="identification_code"
                                        name="identification_code"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setidentificationCode)}
                                    />
                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити ідентифікаційний код
                                    </Button>
                                </label>
                                {identificationCode && (
                                    <img src={identificationCode} alt="passport2" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                            {/* медична довідка */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="medical_reference" style={{ width: "100%" }}>
                                    <input
                                        style={{ display: "none" }}
                                        id="medical_reference"
                                        name="medical_reference"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setmedicalReference)}
                                    />

                                    <Button
                                        fullWidth
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити медичну довідку
                                    </Button>
                                </label>
                                {medicalReference && (
                                    <img src={medicalReference} alt="passport2" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                            {/* Квитанція */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="receipt">
                                    <input
                                        style={{ display: "none" }}
                                        id="receipt"
                                        name="receipt"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setreceipt)}
                                    />

                                    <Button
                                        fullWidth
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити квитанцію
                                    </Button>
                                </label>
                                {receipt && (
                                    <img src={receipt} alt="passport2" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                            >
                                <Typography component={"h1"} sx={{ fontWeight: "800",fontSize:"32px", mt:"15px" }}>Пільги</Typography>
                                <Typography sx={{mb:"25px"}}>*якщо у вас немає пільг залиште ці поля пустими</Typography>
                                <FormControl fullWidth sx={{mb:"25px"}} >
                                    <InputLabel id="demo-simple-select-label">Виберіть пільгу</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={""}
                                        name="benefit_id"
                                        onOpen={() => { getDate(currentFaculty, currentCourse) }}
                                        onChange={()=>setIsBenefit(true)}
                                    >
                                    <MenuItem  value={""}>{"Виберіть це, якщо хочете відмінити пільгу!!"}</MenuItem>
                                        {
                                            benefitsList.map((item, index) => (
                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                            ))
                                        }


                                    </Select>
                                </FormControl>
                                <label htmlFor="benefit" >
                                    <input
                                        style={{ display: "none" }}
                                        id="benefit"
                                        name="benefit"
                                        type="file"
                                        onChange={e =>handleFileSelect(e,setbenefit)}
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                        disabled={!isBenefit}
                                        sx={{marginBottom: "15px"}}
                                    >
                                        Завантажити фото пільги
                                    </Button>
                                </label>
                                {benefit && (
                                    <img src={benefit} alt="passport2" style={{ maxWidth: "100%" }} />
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color='success'
                            xs={{ mt: 5, mb: 2,  }}
                            sx={{fontSize:"24px"}}
                        >
                            Створити заяву на поселення
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    )
}
