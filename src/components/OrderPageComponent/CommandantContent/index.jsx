import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Box, CircularProgress, Typography } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid';




export default function CommandantContent({ token }) {
    const [userOrdersData, setuserOrdersData] = useState([]);
    const [selectionModel, setSelectionModel] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSelectionModelChange = (newSelectionModel) => {
        setSelectionModel(newSelectionModel);
        navigate("/dashboard/orders/"+newSelectionModel);

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

    const ChangeStatus = async (id, status) => {
        try {
            const res = await axios.post("/v0/order/editStatus",
                {

                    "order": id,
                    "status": status

                },
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                })
            GetUserOrder();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetUserOrder();
    }, [])

    const columns = [
        { field: 'id', headerName: 'Заява №1', width: 100, },
        { field: 'last_name', headerName: 'Прізвище', width: 120, },
        { field: 'first_name', headerName: "Ім'я", width: 120, },
        { field: 'sur_name', headerName: "По-батькові", width: 120, },
        { field: 'gender', headerName: "Стать", width: 120, },
        { field: 'group', headerName: "Група", width: 120, },
        { field: 'course', headerName: "course_id", width: 120, },
        { field: 'faculty', headerName: "faculty_id", width: 120, },
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
                            pageSizeOptions={[25, 50]}

                            onRowSelectionModelChange={handleSelectionModelChange}
                            rowSelectionModel={selectionModel}
                        />
                        :
                        <Box sx={{ textAlign: "center" }}><Typography>Тут поки пусто</Typography></Box>
                }
            </Box>
        </Box>
    )
}
