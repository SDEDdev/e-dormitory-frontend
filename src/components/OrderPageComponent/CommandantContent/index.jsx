import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Box, Button, CircularProgress, Typography } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';




export default function CommandantContent({ token }) {
    const [userOrdersData, setuserOrdersData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
    };

    const GetUserOrder = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/v0/order/list");
            setuserOrdersData(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const dowloadExel = async () => {
        window.location.replace(process.env.REACT_APP_API + '/v0/export/xlsx?orders='+JSON.stringify(selectionModel));

    }
    const dowloadPDF = async () => {
        window.open(process.env.REACT_APP_API + '/v0/export/pdf?orders='+JSON.stringify(selectionModel),'_blank');

    }

    const handleCellClick = (params, event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            // Клікнуто по прапорцю Checkbox
            console.log('Клікнуто по Checkbox:', params);

        } else {
            // Клікнуто по рядку DataGrid
            console.log('Клікнуто по рядку:', params);
            navigate("/dashboard/orders/" + params?.row?.id);
        }
    };

    useEffect(() => {
        GetUserOrder();
    }, [])

    const columns = [
        { field: 'id', headerName: 'Заява №', width: 100, },
        { field: 'last_name', headerName: 'Прізвище', width: 120, },
        { field: 'first_name', headerName: "Ім'я", width: 120, },
        { field: 'sur_name', headerName: "По-батькові", width: 120, },
        { field: 'gender', headerName: "Стать", width: 120, },
        { field: 'group', headerName: "Група", width: 120, },
        { field: 'course_id', headerName: "course_id", width: 120, },
        { field: 'faculty_id', headerName: "faculty_id", width: 120, },
        { field: 'created_at', headerName: "Дата створення", width: 120, },
        // {
        //     field: 'faculties', headerName: 'Прив`язані факультети', width: 220,
        //     renderCell: (params) => {
        //         params.row.faculties.map((element,index) => <Typography key={index} sx={{ margin: "0 5px", border: "1px solid #fff" }}>{element}</Typography>)

        //     },
        // },
    ];
    return (
        <Box sx={{ minHeight: "70vh", width: '100%' }}>
            {/* Order list */}
            <Button onClick={dowloadExel}>завантажити exel звіт</Button>
            <Button onClick={dowloadPDF}>завантажити pdf звіт</Button>
            <Box>
                {isLoading ? <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}><CircularProgress /></Box>
                    :

                    userOrdersData.length
                        ?
                        <DataGrid
                            rows={userOrdersData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 25 },
                                },
                            }}
                            onCellClick={handleCellClick}
                            pageSizeOptions={[25, 50, userOrdersData.length]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionModelChange}
                        />
                        :
                        <Box sx={{ textAlign: "center" }}><Typography>Тут поки пусто</Typography></Box>
                }
            </Box>
        </Box>
    )
}
