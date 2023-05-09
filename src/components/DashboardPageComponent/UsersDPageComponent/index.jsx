import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Fade, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { UserApi } from '../../../api/UsersApi';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'email', headerName: 'Email', width: 150 },
    {
        field: 'phone',
        headerName: 'Телефон',
        width: 150,
    },

];


export default function UsersDashboardComponent() {
    const [usersList, setusersList] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Modals
    const [openAddUserModal, setopenAddUserModal] = useState(false);
    const [openEditUserModal, setopenEditUserModal] = useState(false);

    //Alet
    const [notification, setNotification] = useState({ isOpen: false, msg: "", status: "" });

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);

    };

    useEffect(() => {

        const timer = setTimeout(() => {
            setNotification({ isOpen: false, msg: "", status: "" });
        }, 2000);
        return () => clearTimeout(timer);
    }, [notification.isOpen]);

    useEffect(() => {

        getUserList();

    }, [])


    const getUserList = async () => {
        setIsLoading(true);
        try {
            const data = await UserApi.getUsers();
            console.log(data);
            setusersList(data)
            setIsLoading(false)
        } catch (error) {
            alert("Сталася Помилка!");
            setIsLoading(false)
        }
    }

    //Створення нового юзера
    const addNewUser = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            email: data.get("email"),
            phone: data.get("phone"),
            password: data.get("password"),
            role: data.get("role"),
        }
        try {
            await UserApi.addNewUser(body);
            setopenAddUserModal(false);
            getUserList();
            setNotification({ isOpen: true, msg: "Користувача створено", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    const editUser = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            id: selectionModel[0],
            email: data.get("email"),
            phone: data.get("phone"),
            password: data.get("password"),
        }
        try {
            await UserApi.editUser(body);
            setopenEditUserModal(false);
            getUserList();
            setNotification({ isOpen: true, msg: "Користувача відредаговано", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }

    const findUserInState = (userId) => {
        for (let i = 0; i < usersList.length; i++) {
            if (userId === usersList[i].id) {
                return i;

            }
        }
    }
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button onClick={() => { setopenAddUserModal(true) }} sx={{ mr: '15px' }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати користувача</Button>
                <Button onClick={() => { setopenEditUserModal(true) }} sx={{ mr: '15px' }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати користувача</Button>
            </Box>
            {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                :
                <DataGrid

                    rows={usersList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25 },
                        },
                    }}
                    pageSizeOptions={[25, 50]}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowSelectionModel={selectionModel}
                />
            }
            {/* AddUser Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddUserModal}
                onClose={() => { setopenAddUserModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openAddUserModal}>
                    <Box sx={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "auto",
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }
                    }>
                        <Box component={"form"} onSubmit={addNewUser}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Створення нового користувача</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Пошта"
                                        name='email'
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Телефон"
                                        name='phone'
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Пароль"
                                        name='password'
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        label="Роль"
                                        defaultValue={"commandant"}
                                        fullWidth
                                    >
                                        <MenuItem value={"dean"}>Деканат</MenuItem>
                                        <MenuItem value={"commandant"}>Комендант</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant='contained' color="success">
                                        Додати
                                    </Button>
                                </Grid>
                            </Grid>





                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* EditUser Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEditUserModal}
                onClose={() => { setopenEditUserModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEditUserModal}>
                    <Box sx={
                        {
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "auto",
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }
                    }>
                        <Box component={"form"} onSubmit={editUser}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування користувача</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Пошта"
                                        name='email'
                                        defaultValue={usersList[findUserInState(selectionModel[0])]?.email}
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Телефон"
                                        name='phone'
                                        defaultValue={usersList[findUserInState(selectionModel[0])]?.phone}
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}

                                <Grid item xs={12}>
                                    <TextField

                                        id="outlined-required"
                                        label="Пароль"
                                        name='password'
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                {/* <Grid item xs={12}>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        label="Роль"
                                        defaultValue={usersList[selectionModel].role}
                                        fullWidth
                                    >
                                        <MenuItem value={"dean"}>Деканат</MenuItem>
                                        <MenuItem value={"commandant"}>Комендант</MenuItem>
                                    </Select>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Button type="submit" variant='contained' color="success">
                                        Оновити
                                    </Button>
                                </Grid>
                            </Grid>





                        </Box>
                    </Box>
                </Fade>
            </Modal>

            {notification.isOpen &&
                <Alert sx={{ position: "absolute", top: "55px", right: "10px",  zIndex: "99999" }} severity={notification.status}>{notification.msg}</Alert>
            }
        </Box>
    )
}
