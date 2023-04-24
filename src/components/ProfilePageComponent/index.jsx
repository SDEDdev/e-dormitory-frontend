import React from 'react'
import MainPageHeader from '../../ui/Headers/MainPageHeader'
import { Box, Button, Container, Grid, Modal, TextField, Typography } from '@mui/material'

import { parseCookies } from 'nookies'
import axios from 'axios';

export default function ProfilePageComponent() {
    const [open, setOpen] = React.useState(false);
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

        const res = axios.post("https://e-dormitory.sded.cf/v0/order/create",data ,
            {
                headers: {
                    'Authorization': `${token}`,
                    'content-type': 'multipart/form-data'
                }
            });

        //console.log(res); 
    }

    return (
        <>
            <MainPageHeader />
            <Container >
                <Typography sx={{ fontSize: "32px" }}>Ваш профіль</Typography>
                <Button onClick={handleOpen} variant="contained" >Створити заявку</Button>
                {/* Order list */}
                <Box>

                </Box>
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
                    width: "50vw",
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {/* Form */}
                    <Box component="form" onSubmit={NewOrder}>
                        <Grid container spacing={2}>
                            {/* Прізвище */}
                            <Grid
                                item
                                sx={4}
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
                                sx={4}
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
                            {/* По-батькові */}
                            <Grid
                                item
                                sx={4}
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
                            {/* Факультет */}
                            <Grid
                                item
                                sx={4}
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
                                sx={4}
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
                                sx={4}
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
                                sx={4}
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
                                sx={4}
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
                                sx={4}
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
                                sx={4}
                            >
                                <input type="file" name="passport" id="" />
                            </Grid>
                            {/* фото паспорта 2 */}
                            <Grid
                                item
                                sx={4}
                            >
                                <input type="file" name="passport" id="" />
                            </Grid>
                            {/* ідентифікаційний код */}
                            <Grid
                                item
                                sx={4}
                            >
                                <input type="file" name="identification_code" id="" />
                            </Grid>
                            {/* медична довідка */}
                            <Grid
                                item
                                sx={4}
                            >
                                <input type="file" name="medical_reference" id="" />
                            </Grid>
                            {/* Квитанція */}
                            <Grid
                                item
                                sx={4}
                            >
                                <input type="file" name="receipt" id="" />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Додати
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </>
    )
}
