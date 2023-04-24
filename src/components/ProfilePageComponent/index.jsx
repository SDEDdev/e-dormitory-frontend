import { useState, useEffect } from 'react'
import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'

import { parseCookies } from 'nookies'
import axios from 'axios';

export default function ProfilePageComponent() {
    const [userOrdersData, setuserOrdersData] = useState([]);


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const user = JSON.parse(parseCookies().user);
    const { token } = parseCookies();
    console.log(user);

    const NewOrder = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        for (const key of data.keys()) {
            console.log(key);
        }

        try {
            const res = axios.post("/v0/order/create", data,
                {
                    headers: {
                        'Authorization': `${token}`,
                        'content-type': 'multipart/form-data'
                    }
                });
        } catch (error) {
            console.log(error);
        }

        //console.log(res); 
    }

    useEffect(() => {
        GetUserOrder();
    }, [])

    const GetUserOrder = async () => {
        try {
            const { data } = await axios.post("/v0/order/list", {
                "limit": 10,
                "page": 0
            },
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
            console.log(data);
            setuserOrdersData(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <MainPageHeader />
            <Container >
                <Typography sx={{ fontSize: "32px" }}>Ваш профіль</Typography>
                <Button sx={{ marginBottom: "35px" }} onClick={handleOpen} variant="contained" >Створити заявку</Button>
                {/* Order list */}
                <Grid container spacing={2} rowSpacing={2}>
                    {userOrdersData?.map((item, index) => (
                        <Grid item xs={12} key={index} >
                            <Box sx={{ border: "2px solid #1976d2", borderRadius: "15px", padding: "15px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography>Заявка №{item.id}</Typography>
                                    <Typography>Статус: <span> </span>
                                        {item.status === 1 && "У розгляді"}
                                        {item.status === 2 && "Підтверджено"}
                                        {item.status === 3 && "Відхилено"}
                                        {item.status === 5 && "Відкликано"}
                                    </Typography>
                                </Box>
                                <Box>

                                    {item?.files?.map((photo, index) => (
                                        <Box component={"img"} src={`http://localhost:3000/v0/static?order=${item.id}&file=${photo}&token=${token}`} alt="photo" sx={{ width: "100px", marginRight:"5px" }} />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80vw",
                    height: "80vh",
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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

                            {/* Факультет */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Факультет"
                                    name="faculty_id"
                                    autoFocus
                                />
                            </Grid>
                            {/* Курс */}
                            <Grid
                                item
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
                                xs={4}
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
            </Modal>
        </>
    )
}
