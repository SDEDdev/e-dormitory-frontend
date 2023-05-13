import { useEffect, useState } from 'react';
import MainPageHeader from './../../ui/Headers/MainPageHeader/index';
import { Alert, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { FacultiesApi } from '../../api/DashBoard/FacultiesApi';


export default function CreateOrderPageComponent() {
    const [facultiesList, setfacultiesList] = useState([]); //Список факультетів для випадаючого списку

    const [status, setStatus] = useState({});

    const NewOrder = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);


        // try {
        //     const res = await axios.post("/v0/order/create", data,
        //         {
        //             headers: {
        //                 'Authorization': `${token}`,
        //                 'content-type': 'multipart/form-data'
        //             }
        //         });
        //         setOpen(false);
        //         setStatus({msg:"Заявку успішно створено", type:"success"})
        // } catch (error) {
        //     console.log(error);

        //     setStatus({msg:error?.response?.data?.errors[0]?.msg || "Невідома помилка!", type:"error"})
        // }
        // GetUserOrder();
        //console.log(res); 
    }
    const getFaculties = async () => {
        try {
            const data = await FacultiesApi.getFaculties();
            setfacultiesList(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getFaculties();
    }, [])
    return (
        <>
            <MainPageHeader />
            <Container sx={{ marginTop: "20px" }}>
                <Box sx={{

                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
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
                                    margin="normal"
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
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Ім'я"
                                    name="first_name"
                                    autoComplete="firstName"
                                    autoFocus
                                />
                            </Grid>
                            {/* По-батькові */} <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
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

                                        onChange={(e) => console.log(e.target.value)}
                                    >
                                        {
                                            facultiesList.map(item => (
                                                <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
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
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Курс"
                                    name="course"
                                    autoFocus
                                />
                            </Grid>
                            {/* Група */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
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
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Номер гуртожитку"
                                    name="hostel"
                                    autoFocus
                                />
                            </Grid>
                            {/* Паспорт номер */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
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
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="РНОКПП"
                                    name="rnocpp"
                                    autoFocus
                                />
                            </Grid>
                            {/* фото паспорта 1 */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="passport">
                                    <input
                                        style={{ display: "none" }}
                                        id="passport"
                                        name="passport"
                                        type="file"
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити фото паспорту (1 сторінка)
                                    </Button>
                                </label>

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
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити фото паспорту (2 сторінка)
                                    </Button>
                                </label>
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
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити ідентифікаційний код
                                    </Button>
                                </label>
                            </Grid>
                            {/* медична довідка */}
                            <Grid
                                item
                                xs={12}
                                sm={4}
                            >
                                <label htmlFor="medical_reference">
                                    <input
                                        style={{ display: "none" }}
                                        id="medical_reference"
                                        name="medical_reference"
                                        type="file"
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити медичну довідку
                                    </Button>
                                </label>
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
                                    />

                                    <Button
                                        component="span"
                                        variant="contained"
                                    >
                                        Завантажити квитанцію
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            xs={{ mt: 5, mb: 2 }}
                        >
                            Додати
                        </Button>

                    </Box>
                </Box>
            </Container>
        </>
    )
}
