import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { findItemInState } from '../../../utils/findItemInState';
import { FacultiesApi } from '../../../api/DashBoard/FacultiesApi';
import { UserApi } from '../../../api/DashBoard/UsersApi';




export default function DormitoriesDashboardComponent() {
    const [dormitoriesList, setdormitoriesList] = useState([]); //Список гуртожитків
    const [facultiesList, setfacultiesList] = useState([]); //Список факультетів для випадаючого списку
    const [adminList, setadminList] = useState([]); //Список адмінстраторів гуртожитків для випадаючого списку
    const [currEditDorm, setcurrEditDorm] = useState(); //Поточний гуртожиток, який редагується

    const [selectionModel, setSelectionModel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Modals
    const [openAddDormitoriesModal, setopenAddDormitoriesModal] = useState(false);
    const [openEditDormitoriesModal, setopenEditDormitoriesModal] = useState(false);
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
        getDormitoriesList();
        getFaculties();
        getDormitoryAdmins();
    }, [])

    //Отримання списку всіх гуртожитків
    const getDormitoriesList = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/v0/dormitory")
            console.log(data);
            setdormitoriesList(data)
            setIsLoading(false)
        } catch (error) {
            alert("Сталася Помилка!");
            setIsLoading(false)
        }
    }
    //Додавання номеру гуртожитку
    const addNewDormitories = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            number: data.get("number"),
        }
        try {
            axios.post("/v0/dormitory/create", body);
            setopenAddDormitoriesModal(false);
            getDormitoriesList();
            setNotification({ isOpen: true, msg: "Гуртожиток створено", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    //Редагування гуртожитку
    const editDormitories = async (event) => {
        event.preventDefault();
        const body = currEditDorm;
        try {
            await axios.patch("/v0/dormitory/edit", body);
            setopenEditDormitoriesModal(false);
            getDormitoriesList()
            setNotification({ isOpen: true, msg: "Гуртожиток відредаговано", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    // Видалення гуртожитків
    const deleteDormitories = async () => {
        for (let i = 0; i < selectionModel.length; i++) {
            try {
                await axios.delete("/v0/dormitory", { params: { id: selectionModel[i] } });
                setNotification({ isOpen: true, msg: "Факульет видалено", status: "success" });
            } catch (error) {
                console.log(error);
                setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
            }
        }
        getDormitoriesList();
    }
    //Запис поточного редагованого гуртожитку
    const getCurrEditDormitory = () => {
        setcurrEditDorm(dormitoriesList[findItemInState(selectionModel[0], dormitoriesList)])
    }
    //Редагування факультетів в поточному гуртожитку
    const editFacultiesInDorm = (action, name) => {

        if (action === "add") {
            if (!currEditDorm?.faculties.includes(name)) {
                setcurrEditDorm({
                    ...currEditDorm,
                    faculties: [...currEditDorm?.faculties, name]
                });
            }

            // setfacultiesList(facultiesList.filter(facult => facult.name !== name));
        }
        if (action === "remove") {

            setcurrEditDorm(
                {
                    ...currEditDorm,
                    faculties: currEditDorm?.faculties.filter(facult => facult !== name)
                }
            );
            //setfacultiesList([...facultiesList, {name:name}]);

        }

    }
    const getFaculties = async () => {
        try {
            const data = await FacultiesApi.getFaculties();
            setfacultiesList(data);
        } catch (error) {

        }
    }
    const getDormitoryAdmins = async () => {
        try {
            const data = await UserApi.getUsers({ params: { filter: "dormitory_admin" } });
            setadminList(data);
            console.log(data);
        } catch (error) {

        }
    }


    console.log(currEditDorm);
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'number', headerName: 'Номер гуртожитку', width: 220, },
        { field: 'email', headerName: 'Пошта коменданта', width: 220, },
        {
            field: 'faculties', headerName: 'Прив`язані факультети', width: 220,
            renderCell: (params) => {
                params.row.faculties.map((element,index) => <Typography key={index} sx={{ margin: "0 5px", border: "1px solid #fff" }}>{element}</Typography>)

            },
        },
    ];



    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} onClick={deleteDormitories} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button sx={{ mr: '15px' }} onClick={() => { setopenAddDormitoriesModal(true) }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати гуртожиток</Button>
                <Button sx={{ mr: '15px' }} onClick={() => {
                    setopenEditDormitoriesModal(true);
                    getCurrEditDormitory();
                }}
                    disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати дані про гуртожиток</Button>
            </Box>
            {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                :

                dormitoriesList.length
                    ?
                    <DataGrid
                        rows={dormitoriesList}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionModelChange}
                        rowSelectionModel={selectionModel}
                    />
                    :
                    <Box sx={{ textAlign: "center" }}><Typography>Тут поки пусто</Typography></Box>
            }
            {/* AddUser Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddDormitoriesModal}
                onClose={() => { setopenAddDormitoriesModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openAddDormitoriesModal}>
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
                        <Box component={"form"} onSubmit={addNewDormitories}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Створення факультету</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Номер гуртожитку"
                                        name='number'
                                        fullWidth
                                    />
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
                open={openEditDormitoriesModal}
                onClose={() => {
                    setopenEditDormitoriesModal(false);
                    getFaculties();

                }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEditDormitoriesModal}>
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
                        <Box component={"form"} onSubmit={editDormitories}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування факультету</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Номер гуртожитку"
                                        name='number'
                                        defaultValue={currEditDorm?.number}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Виберіть адміністратора</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={adminList[findItemInState(currEditDorm?.commandant_id,adminList)]?.id}
                                            label="Виберіть адміністратора"

                                            onChange={(e) => {
                                                setcurrEditDorm({
                                                    ...currEditDorm,
                                                    commandant_id: e.target.value
                                                });
                                            }}
                                        >
                                            {
                                                adminList.map(item => (
                                                    <MenuItem key={item.id} value={item.id}>{item.email}</MenuItem>
                                                ))
                                            }


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Виберіть факультети, які треба додати</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={undefined}
                                            label="Факультети"

                                            onChange={(e) => editFacultiesInDorm("add", e.target.value)}
                                        >
                                            {
                                                facultiesList.map(item => (
                                                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                                ))
                                            }


                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    {
                                        currEditDorm?.faculties.map((element, index) => (
                                            <Typography key={index} sx={{ display: "flex", alignItems: "center" }}>
                                                {element}
                                                <DeleteForeverIcon onClick={() => editFacultiesInDorm("remove", element)} /></Typography>
                                        ))
                                    }
                                </Grid>
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
                <Alert sx={{ position: "absolute", top: "55px", right: "10px", zIndex: "99" }} severity={notification.status}>{notification.msg}</Alert>
            }
        </Box>
    )
}
