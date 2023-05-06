import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, CircularProgress } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

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

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);

    };
    console.log(selectionModel);





    useEffect(() => {

        getUserList();

    }, [])


    const getUserList = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/v0/user/list")
            console.log(data);
            setusersList(data)
            setIsLoading(false)
        } catch (error) {
            alert("Сталася Помилка!");
            setIsLoading(false)
        }
    }
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button sx={{ mr: '15px' }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати користувача</Button>
                <Button sx={{ mr: '15px' }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати користувача</Button>
            </Box>
            {isLoading ? <Box sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center"}}><CircularProgress /></Box>
                :
                <DataGrid

                    rows={usersList}
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
        </Box>
    )
}
