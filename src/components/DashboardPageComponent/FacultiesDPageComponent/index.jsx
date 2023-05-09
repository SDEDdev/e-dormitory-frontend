import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Fade, Grid, Modal, TextField, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { findItemInState } from '../../../utils/findUserInState';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'name', headerName: 'Назва факультету', width: 220, },


];


export default function FacultiesDashboardComponent() {
    const [facultiesList, setfacultiesList] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Modals
    const [openAddFacultiesModal, setopenAddFacultiesModal] = useState(false);
    const [openEditFacultiesModal, setopenEditFacultiesModal] = useState(false);
    //Alet
    const [notification, setNotification] = useState({ isOpen: false, msg: "", status: "" });

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);

    };
    useEffect(() => {

        getFacultiesList();

    }, [])
    useEffect(() => {

        const timer = setTimeout(() => {
            setNotification({ isOpen: false, msg: "", status: "" });
        }, 2000);
        return () => clearTimeout(timer);
    }, [notification.isOpen]);

    const getFacultiesList = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/v0/faculties")
            console.log(data);
            setfacultiesList(data)
            setIsLoading(false)
        } catch (error) {
            alert("Сталася Помилка!");
            setIsLoading(false)
        }
    }

    const addNewFaculties = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            name: data.get("name"),
        }
        try {
            axios.post("/v0/faculties/create", body);
            setopenAddFacultiesModal(false);
            getFacultiesList();
            setNotification({ isOpen: true, msg: "Факульет створено", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    const editFaculties = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            id: selectionModel[0],
            name: data.get("name"),
        }
        try {
            await axios.patch("/v0/faculties/edit", body);
            setopenEditFacultiesModal(false);
            getFacultiesList()
            setNotification({ isOpen: true, msg: "Факульет відредаговано", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button sx={{ mr: '15px' }} onClick={() => { setopenAddFacultiesModal(true) }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати Факультет</Button>
                <Button sx={{ mr: '15px' }} onClick={() => { setopenEditFacultiesModal(true) }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати дані про факультет</Button>
            </Box>
            {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                :
                <DataGrid

                    rows={facultiesList}
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
            }
            {/* AddUser Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddFacultiesModal}
                onClose={() => { setopenAddFacultiesModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openAddFacultiesModal}>
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
                        <Box component={"form"} onSubmit={addNewFaculties}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Створення факультету</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Назва факультету"
                                        name='name'
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
                open={openEditFacultiesModal}
                onClose={() => { setopenEditFacultiesModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEditFacultiesModal}>
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
                        <Box component={"form"} onSubmit={editFaculties}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування факультету</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Назва факультету"
                                        name='name'
                                        defaultValue={facultiesList[findItemInState(selectionModel[0], facultiesList)]?.name}
                                        fullWidth
                                    />
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
                <Alert sx={{ position: "absolute", top: "55px", right: "10px",zIndex:"99" }} severity={notification.status}>{notification.msg}</Alert>
            }
        </Box>
    )
}
