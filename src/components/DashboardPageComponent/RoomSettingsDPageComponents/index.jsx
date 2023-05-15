import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Fade, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { CheckTimeApi } from '../../../api/DashBoard/ChekTimeApi';
import { findItemInState } from '../../../utils/findItemInState';
import { CourseApi } from '../../../api/DashBoard/CourseApi';
import { FacultiesApi } from '../../../api/DashBoard/FacultiesApi';
import dayjs from 'dayjs';
import { RoomApi } from '../../../api/DashBoard/RoomApi';



export default function RoomSettingsDPageComponent() {
  const [checkTimeList, setcheckTimeList] = useState([]);
  const [courseList, setcourseList] = useState([]);
  const [facultiesList, setfacultiesList] = useState([]);
  const [currEditItem, setcurrEditItem] = useState();
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
  //Запис поточного редагованого гуртожитку
  const getCurrEditItem = () => {
    setcurrEditItem(checkTimeList[findItemInState(selectionModel[0], checkTimeList)])
  }

  useEffect(() => {

    const timer = setTimeout(() => {
      setNotification({ isOpen: false, msg: "", status: "" });
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification.isOpen]);

  useEffect(() => {
    getList();
    getCourseList();
    getFacultiesList();
  }, [])


  const getList = async () => {
    setIsLoading(true);
    try {
      const data = await RoomApi.getRooms();
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
      faculties_id: data.get("faculties_id"),
      number: data.get("number"),
      capacity: data.get("capacity"),

    }
    console.log(body);
    try {
      await RoomApi.addNewRooms(body);
      setopenAddUserModal(false);
      getList();
      setNotification({ isOpen: true, msg: "Кімнату створено", status: "success" });
    } catch (error) {
      console.log(error);
      setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
    }
  }
  const edit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      id: currEditItem?.id,
      faculties_id: data.get("faculties_id"),
      number: data.get("number"),
      capacity: data.get("capacity"),
    }
    try {
      await RoomApi.editRooms(body);
      setopenEditUserModal(false);
      getList();
      setNotification({ isOpen: true, msg: "Кімнату відредеговано", status: "success" });
    } catch (error) {
      console.log(error);
      setNotification({ isOpen: true, msg: error.response.data.errors[0].msg, status: "error" });
    }
  }
  console.log(currEditItem?.faculties_name);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
      field: 'faculties_name',
      headerName: 'Назва',
      width: 150,
    },
    {
      field: 'number',
      headerName: 'Номер',
      width: 150,
    },
    {
      field: 'capacity',
      headerName: 'К-сть місць',
      width: 150,
    },


  ];
  console.log(facultiesList);
  return (
    <Box sx={{ minHeight: "70vh", width: '100%' }}>
      {/* Function Button */}
      <Box sx={{ mb: "15px" }}>
        <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
        <Button onClick={() => { setopenAddUserModal(true) }} sx={{ mr: '15px' }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати кімнату</Button>
        <Button onClick={() => {
          setopenEditUserModal(true);
          getCurrEditItem();
        }} sx={{ mr: '15px' }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати кімнату</Button>
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
              <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Додавання кімнати</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Виберіть факультет</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='faculties_id'
                      defaultValue={""}
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
                {/* ---------- */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="number"
                    label="Номер кімнати"
                    
                  />
                </Grid>
                {/* ------- */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="capacity"
                    label="К-сть місць"
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
      {/* Edit Modal */}
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
              <Typography sx={{ textAlign: "center", fontSize: "25px", mb: "15px" }}>Редагування кімнати</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Виберіть факультет</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name='faculties_id'
                      defaultValue={currEditItem?.faculties_id}
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
                    fullWidth
                    name="number"
                    defaultValue={currEditItem?.number}
                    label="Номер кімнати"
                    
                  />
                </Grid>
                {/* ------- */}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="capacity"
                    label="К-сть місць"
                    defaultValue={currEditItem?.capacity}
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

      {notification.isOpen &&
        <Alert sx={{ position: "absolute", top: "55px", right: "10px", zIndex: "99999" }} severity={notification.status}>{notification.msg}</Alert>
      }
    </Box>
  )
}
