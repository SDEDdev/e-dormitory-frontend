import { useState, useEffect } from 'react'
import { Alert, Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';



export default function UserContent({ token }) {
    const navigate = useNavigate();

    const [userOrdersData, setuserOrdersData] = useState(null);
    const [status, setStatus] = useState({});

    const GetUserOrder = async () => {
        try {
            const { data } = await axios.get("/v0/order/list");
            console.log(data);
            setuserOrdersData(data);
        } catch (error) {
            console.log(error);
        }
    }

    const revokeOrder = async (id) => {
        try {
            await axios.post("/v0/order/revoke", {},
                {
                    headers: {
                        'Authorization': `${token}`,
                    }
                });
            GetUserOrder();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetUserOrder();
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus();
        }, 3000);
        return () => clearTimeout(timer);
    }, [status]);
    return (
        <>

            <Button sx={{ marginBottom: "35px", backgroundColor: "#000", "&:hover": { backgroundColor: "rgba(43,48,59,0.8)" } }} variant="contained" >
                <Link to={"/create-order"}>
                    Створити заявку
                </Link>
            </Button>
            {/* Order list */}
            <Grid container spacing={2} rowSpacing={2}>
                {userOrdersData
                    ?
                    userOrdersData?.map((item, index) => (
                        <Grid item xs={12} key={index} >
                            <Box onClick={()=> navigate("/order/"+item?.id)} sx={{ border: "2px solid #1976d2", borderRadius: "15px", padding: "15px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography>Заявка №{item.id}</Typography>
                                    <Typography>Статус: {item.status}
                                    </Typography>
                                </Box>
                                <Box>

                                    {item?.files?.map((photo, index) => (
                                        <Box key={index} component={"img"} src={`${process.env.REACT_APP_API}/v0/static?order=${item.id}&file=${photo}&token=${token}`} alt="photo" sx={{ width: "100px", marginRight: "5px" }} />
                                    ))}
                                </Box>
                                {item.status === 1 && <Button onClick={() => revokeOrder(item.id)}>Відкликати заявку</Button>}
                            </Box>
                        </Grid>
                    ))
                    :
                    <Typography>
                        Тут поки пусто
                    </Typography>
                }
            </Grid>
            {status?.msg && <Alert sx={{ position: "absolute", top: "5px", right: "5px", zIndex: "99999999999" }} severity={status?.type}>{status?.msg}</Alert>}

        </>
    )
}
