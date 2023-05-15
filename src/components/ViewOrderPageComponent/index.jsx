import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export default function ViewOrderPageComponent() {
  const { id } = useParams();
  const user = JSON.parse(Cookies.get("user") || null);
  const token = Cookies.get("token")
  const [data, setData] = useState();

  useEffect(() => {

    getData()
  }, [id])

  const getData = async () => {
    const { data } = await axios.get("/v0/order/" + id)
    setData(data[0]);
  }

  const ChangeStatus = async (id, status) => {
    try {
      const res = await axios.patch("/v0/order/editStatus",
        {

          "order": id,
          "status": status

        },
        {
          headers: {
            'Authorization': `${token}`,
          }
        })
      getData();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(data);
  return (
    <Box sx={{ minWidth: "800px" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: "800" }}>Заява №{id}</Typography>
        <Typography sx={{ fontSize: "16px", }}>Дата створення заявки: {dayjs(data?.created_at).format('DD-MM-YYYY HH:mm:ss')}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: "center", mb: "10px" }}>
        <Typography sx={{ mr: "15px", width: "90px" }}>Статус: </Typography>
        <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.status}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: "center", mb: "10px" }}>
        <Typography sx={{ mr: "15px", width: "90px" }}>П.І.Б: </Typography>
        <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{`${data?.last_name} ${data?.first_name} ${data?.sur_name}`}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: "center", mb: "10px" }}>
        <Typography sx={{ mr: "15px", width: "90px" }}>Стать: </Typography>
        <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.gender}</Typography>
      </Box>
      {/* ------------------ */}
      <Box sx={{ display: "flex", alignItems: "center", }}>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", mr: "15px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "90px" }}>Факультет: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.faculty}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "40px" }}>Курс: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.course}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "40px" }}>Група: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.group}</Typography>
        </Box>
      </Box>
      {/* -------------------- */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", mr: "15px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "90px" }}>Гуртожиток: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.dormitory}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", }}>Кімната: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.room}</Typography>
        </Box>
      </Box>
      {/* -------------------- */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", mr: "15px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "90px" }}>Номер паспорту: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.passport}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", }}>РНОКПП: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.RNTRC}</Typography>
        </Box>
      </Box>
      {/* -------------------- */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", mr: "15px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "90px" }}>Дата поселення: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{dayjs(data?.check_in).format("DD-MM-YYYY")}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", }}>Дата виселення: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{dayjs(data?.check_out).format("DD-MM-YYYY")}</Typography>
        </Box>
      </Box>
      {/* -------------------- */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", mr: "15px", width: "100%" }}>
          <Typography sx={{ mr: "15px", width: "90px" }}>Пільга: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.benefit_name || "Пільга відсутня"}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: "center", mb: "10px", width: "100%" }}>
          <Typography sx={{ mr: "15px", }}>Знижка: </Typography>
          <Typography sx={{ width: "100%", pb: "5px", borderBottom: "solid 1px #000" }}>{data?.benefit_discount || 0}%</Typography>
        </Box>
      </Box>
      {/* Images */}
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {data?.files.length > 0 &&
          data.files.map((item, index) => (
            <Box key={index}>
              <Typography>{item}</Typography>
              <Box
                sx={{ width: "250px" }}
                component={"img"}
                src={`${process.env.REACT_APP_API}/v0/static?order=${id}&file=${item}&token=${token}`}
              />
            </Box>
          ))
        }
      </Box>
      <Box>
        {user?.roles[0] === "commandant" &&
          <Button disabled={data?.status === "Підтверджено 1/2" ? true : false} onClick={() => ChangeStatus(id, 6 )} variant='outlined' sx={{ color: "green", mr: "15px" }}>Підтвердити 1</Button>
        }
        {user?.roles[0] === "dean" &&
          <Button disabled={data?.status === "Підтверджено 2/2" ? true : false} onClick={() => ChangeStatus(id, 2 )} variant='outlined' sx={{ color: "green", mr: "15px" }}>Підтвердити 2</Button>
        }
        {user?.roles[0] === "commandant" &&
        <Button disabled={data?.status === "Відхилено" ? true : false}  onClick={() => ChangeStatus(id, 3)} variant='outlined' sx={{ color: "red" }}>Відхилити</Button>
        }
        {user?.roles[0] === "dean" &&
        <Button disabled={data?.status === "Відхилено" ? true : false}  onClick={() => ChangeStatus(id, 3)} variant='outlined' sx={{ color: "red" }}>Відхилити</Button>
        }
        {user?.roles[0] === "user" &&
        <Button disabled={data?.status === "Відкликано" ? true : false}  onClick={() => ChangeStatus(id, 5)} variant='outlined' sx={{ color: "red" }}>Відкликати</Button>
        }
          
        

      </Box>
    </Box>
  )
}
