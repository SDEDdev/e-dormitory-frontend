import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { CheckTimeApi } from '../../../api/DashBoard/ChekTimeApi';
import {findItemInState} from '../../../utils/findItemInState';
import { CourseApi } from '../../../api/DashBoard/CourseApi';
import { FacultiesApi } from '../../../api/DashBoard/FacultiesApi';



export default function DateSettingsDPageComponent() {
  const [checkTimeList, setcheckTimeList] = useState([])
  const [courseList, setcourseList] = useState([])
  const [facultiesList, setfacultiesList] = useState([])
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
    getCourseList();
    getFacultiesList();
  }, [])


  const getUserList = async () => {
    setIsLoading(true);
    try {
      const data = await CheckTimeApi.getCheckTimeList();
      console.log(data);
      setcheckTimeList(data)
      setIsLoading(false)
    } catch (error) {
      console.log("Сталася Помилка!");
      setIsLoading(false)
    }
  }
  
  const getCourseList = async () => {
    setIsLoading(true);
    try {
      const data = await CourseApi.getCourseList();
      console.log(data);
      setcourseList(data)

    } catch (error) {
      console.log("Сталася Помилка!");
    }
  }
  const getFacultiesList = async () => {
    setIsLoading(true);
    try {
      const data = await FacultiesApi.getFaculties();
      console.log(data);
      setfacultiesList(data)

    } catch (error) {
      console.log("Сталася Помилка!");
    }
  }

  //Створення нового юзера
  const addNew = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      faculty_id: data.get("faculty_id"),
      course_id: data.get("course_id"),
      in_time: data.get("in_time"),
      out_time: data.get("out_time"),

    }
    console.log(body);
    try {
      //await UserApi.addNewUser(body);
      setopenAddUserModal(false);
      getUserList();
      setNotification({ isOpen: true, msg: "Користувача створено", status: "success" });
    } catch (error) {
      console.log(error);
      setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
    }
  }
  const edit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      id: selectionModel[0],
      email: data.get("email"),
      phone: data.get("phone"),
      password: data.get("password"),
    }
    try {
      //await UserApi.editUser(body);
      setopenEditUserModal(false);
      getUserList();
      setNotification({ isOpen: true, msg: "Користувача відредаговано", status: "success" });
    } catch (error) {
      console.log(error);
      setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
    }
  }
 //console.log();
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
      field: 'course_id', headerName: 'course_id', width: 150,
      renderCell: (params) => <Typography sx={{ margin: "0 5px" }}>{
        courseList[findItemInState(params.row.course_id,courseList)]?.name 
        }</Typography>
    },
    {
      field: 'faculty_id',
      headerName: 'faculty_id',
      width: 150,
      renderCell: (params) => <Typography sx={{ margin: "0 5px" }}>{
        facultiesList[findItemInState(params.row.faculty_id,facultiesList)]?.name 
        }</Typography>

    },
    {
      field: 'in',
      headerName: 'Заселення',
      width: 150,
    },
    {
      field: 'out',
      headerName: 'Виселення',
      width: 150,
    },

  ];
  return (
    <Box sx={{ minHeight: "70vh", width: '100%' }}>
      {/* Function Button */}
      <Box sx={{ mb: "15px" }}>
        <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
        <Button onClick={() => { setopenAddUserModal(true) }} sx={{ mr: '15px' }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати дату поселення</Button>
        <Button onClick={() => { setopenEditUserModal(true) }} sx={{ mr: '15px' }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати дату поселення</Button>
      </Box>
      {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
        :
        <DataGrid

          rows={checkTimeList}
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
            <Box component={"form"} onSubmit={addNew}>
              <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування часу поселення</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Виберіть факультет</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='faculty_id'
                                            defaultValue={undefined}
                                            label="Факультети"
                                        >
                                            {
                                                facultiesList.map(item => (
                                                    <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }


                                        </Select>
                                    </FormControl>
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
            <Box component={"form"} onSubmit={edit}>
              <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування користувача</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Пошта"
                    name='email'
                    // defaultValue={checkTimeList[findItemInState(selectionModel[0])]?.email}
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
                    //defaultValue={checkTimeList[findItemInState(selectionModel[0])]?.phone}
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
                                defaultValue={checkTimeList[selectionModel].role}
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
        <Alert sx={{ position: "absolute", top: "55px", right: "10px", zIndex: "99999" }} severity={notification.status}>{notification.msg}</Alert>
      }
    </Box>
  )
}
