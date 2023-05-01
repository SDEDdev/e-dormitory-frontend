import { useState, useEffect } from 'react'
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';



export default function AdminContent({ token }) {
    const [userOrdersData, setuserOrdersData] = useState([]);
    const [currentOrderData, setcurrentOrderData] = useState([]);
    console.log(currentOrderData);


    const [open, setOpen] = useState(false);
    const handleOpen = (order) => {
        setOpen(true)
        setcurrentOrderData(order);
    };
    const handleClose = () => {
        setOpen(false);
        setcurrentOrderData([]);
    }



    const GetUserOrder = async () => {
        try {
            const { data } = await axios.post("/v0/order/list", {
                "limit": 10,
                "page": 0
            },
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
            console.log(data);
            setuserOrdersData(data);
        } catch (error) {
            console.log(error);
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
    return (
        <>
            {/* Order list */}
            <Grid container spacing={2} rowSpacing={2}>
                {userOrdersData?.map((item, index) => (
                    <Grid item xs={12} key={index} >
                        <Box sx={{ border: "2px solid #1976d2", borderRadius: "15px", padding: "15px" }}>
                            <Box onClick={() => handleOpen(item)} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography>Заявка №{item.id}</Typography>
                                <Typography>Статус: <span> </span>
                                    {item.status === 1 && "У розгляді"}
                                    {item.status === 2 && "Підтверджено"}
                                    {item.status === 3 && "Відхилено"}
                                    {item.status === 5 && "Відкликано"}
                                </Typography>
                            </Box>
                            <Box>
                                {item.status !== 2 && <Button onClick={() => ChangeStatus(item.id, 2)} variant='outlined' sx={{ color: "green", mr: "15px" }}>Підтвердити</Button>
                                }
                                {item.status !== 3 && <Button onClick={() => ChangeStatus(item.id, 3)} variant='outlined' sx={{ color: "red" }}>Відхилити</Button>
                                }
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "80vw",
                    height: "80vh",
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    overflow: "auto"
                }}>
                    {/* Form */}
                    <Box component="form" >
                        <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
                            {/* Прізвище */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="surName"
                                    label="Прізвище"
                                    name="last_name"
                                    autoComplete="lastName"
                                    autoFocus
                                    value={currentOrderData.last_name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Ім'я */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Ім'я"
                                    name="first_name"
                                    autoComplete="firstName"
                                    autoFocus
                                    value={currentOrderData.first_name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* По-батькові */} <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="По-батькові"
                                    name="sur_name"
                                    autoComplete="surName"
                                    autoFocus
                                    value={currentOrderData.sur_name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            {/* Факультет */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Факультет"
                                    name="faculty_id"
                                    autoFocus
                                    value={currentOrderData.faculty_id}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Курс */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Курс"
                                    name="course"
                                    autoFocus
                                    value={currentOrderData.course}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Група */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Група"
                                    name="group"
                                    autoFocus
                                    value={currentOrderData.group}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Гуртожиток */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Номер гуртожитку"
                                    name="hostel"
                                    autoFocus
                                    value={currentOrderData.hostel}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Паспорт номер */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Номер паспорту"
                                    name="passport"
                                    autoFocus
                                    value={currentOrderData.passport}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {/* Рпнппк */}
                            <Grid
                                item
                                xs={4}
                            >
                                <TextField
                                    item
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="РНОКПП"
                                    name="rnocpp"
                                    autoFocus
                                    value={currentOrderData.RNOCPP}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            {currentOrderData?.files?.map((order, index) => (

                                <Grid
                                    key={index}
                                    item
                                    xs={4}>
                                    <Box
                                        component={"img"}
                                        src={`${process.env.REACT_APP_API}/v0/static?order=${currentOrderData?.id}&file=${order}&token=${token}`} alt="photo" sx={{ width: "100px", marginRight: "5px" }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
