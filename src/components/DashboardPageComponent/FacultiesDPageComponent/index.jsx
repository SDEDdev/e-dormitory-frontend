import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, CircularProgress } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'name', headerName: 'Назва факультету', width: 220,},
 

];


export default function FacultiesDashboardComponent() {
    const [facultiesList, setfacultiesList] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);

    };
    console.log(selectionModel);





    useEffect(() => {

        getFacultiesList();

    }, [])


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
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Function Button */}
            <Box sx={{ mb: "15px" }}>
                <Button sx={{ mr: '15px' }} disabled={!selectionModel.length} variant='contained' color="error" startIcon={<DeleteForeverIcon />}>Видалити</Button>
                <Button sx={{ mr: '15px' }} variant='contained' color="success" startIcon={<AddCircleIcon />}>Додати Факультет</Button>
                <Button sx={{ mr: '15px' }} disabled={selectionModel.length > 1 || selectionModel.length < 1} variant='contained' color="success" startIcon={<EditIcon />}>Редагувати дані про факультет</Button>
            </Box>
            {isLoading ? <Box sx={{width:"100%", height:"100%", display:"flex", justifyContent:"center"}}><CircularProgress /></Box>
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
        </Box>
    )
}
