import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Alert, Box, Button, CircularProgress, Fade, Grid, Modal, Switch, TextField, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';




export default function BenefitDashboardComponent() {
    const [benefitList, setbenefitList] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //Modals
    const [openAddBenefitModal, setopenAddBenefitModal] = useState(false);
    const [openEditBenefitModal, setopenEditBenefitModal] = useState(false);

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
        getBenefitList();
    }, [])

    // Отримання списку знижок
    const getBenefitList = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/v0/benefit")
            console.log(data);
            setbenefitList(data)
            setIsLoading(false)
        } catch (error) {
            alert("Сталася Помилка!");
            setIsLoading(false)
        }
    }
    //Додавання нових знижок
    const addNewBenefits = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            name: data.get("name"),
            discount: data.get("discount"),
        }
        if (body.discount > 100 || body.discount < 0) return setNotification({ isOpen: true, msg: "Знижка вказана невірно (0-100%)", status: "error" });
        try {
            axios.post("/v0/benefit/create", body);
            setopenAddBenefitModal(false);
            getBenefitList();
            setNotification({ isOpen: true, msg: "Пільгу створено", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    //Редагування знижки
    const editBenefits = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            id: selectionModel[0],
            name: data.get("name"),
            discount: data.get("discount"),
        }
        if (body.discount > 100 || body.discount < 0) return setNotification({ isOpen: true, msg: "Знижка вказана невірно (0-100%)", status: "error" });
        try {
            await axios.patch("/v0/benefit/edit", body);
            setopenEditBenefitModal(false);
            getBenefitList()
            setNotification({ isOpen: true, msg: "Пільгу оновлено", status: "success" });
        } catch (error) {
            console.log(error);
            setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
        }
    }
    //Увімкнення/вимкнення знижки
    const changeStatus = async (id) => {
        try {
            await axios.patch("/v0/benefit/changeStatus", { id: id })
            console.log("change");
        } catch (error) {
            console.log("err");
        }
    }
    //Знаходження елементу в стейті
    const findItemInState = (userId) => {
        for (let i = 0; i < benefitList.length; i++) {
            if (userId === benefitList[i].id) {
                return i;

            }
        }
    }
    //Видалення знижки
    const deletebenefits = async () => {
        for (let i = 0; i < selectionModel.length; i++) {
            try {
                await axios.delete("/v0/dormitory", { params: { id: selectionModel[i] } });
                setNotification({ isOpen: true, msg: "Факульет видалено", status: "success" });
            } catch (error) {
                console.log(error);
                setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
            }
        }
        getBenefitList();
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'name', headerName: 'Назва пільги', width: 220, },
        { field: 'discount', headerName: 'Знижка(%)', width: 220, },
        {
            field: 'available', headerName: 'Статуc', width: 80,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Switch sx={{ position: "relative", zIndex: "9999" }} defaultChecked={params.row.available === 1 ? true : false} onChange={() => { changeStatus(params.row.id) }} />
            ),
        },


    ];
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} onClick={deletebenefits} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button sx={{ mr: '15px' }} onClick={() => { setopenAddBenefitModal(true) }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати пільгу</Button>
                <Button sx={{ mr: '15px' }} onClick={() => { setopenEditBenefitModal(true) }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати дані про пільгу</Button>
            </Box>
            {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                :
                <DataGrid

                    rows={benefitList}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 25 },
                        },
                    }}
                    pageSizeOptions={[25, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowSelectionModel={selectionModel}
                />
            }
            {/* AddUser Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddBenefitModal}
                onClose={() => { setopenAddBenefitModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openAddBenefitModal}>
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
                        <Box component={"form"} onSubmit={addNewBenefits}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Створення нового знижки</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Назва пільги"
                                        name='name'
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Знижка"
                                        name='discount'
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
            {/* editBenefits Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEditBenefitModal}
                onClose={() => { setopenEditBenefitModal(false) }}
                closeAfterTransition

                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEditBenefitModal}>
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
                        <Box component={"form"} onSubmit={editBenefits}>
                            <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування знижки</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Назва пільги"
                                        name='name'
                                        defaultValue={benefitList[findItemInState(selectionModel[0])]?.name}
                                        fullWidth
                                    />
                                </Grid>
                                {/* ------- */}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Знижка"
                                        name='discount'
                                        defaultValue={benefitList[findItemInState(selectionModel[0])]?.discount}
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
                <Alert sx={{ position: "absolute", top: "55px", right: "10px", zIndex: "99999" }} severity={notification.status}>{notification.msg}</Alert>
            }
        </Box>
    )
}
