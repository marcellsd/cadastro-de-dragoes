import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function App() {
    const [dragonsList, setDragonsList] = useState([])

    async function getDragonsList() {
        const { data } = await axios.get("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon")
        setDragonsList(data)
    }

    useEffect(() => {
        getDragonsList();
      }, []);

    const dragons = dragonsList?.map((dragon, index) => (
        <span
            key={index}>
            {dragon}
        </span>
    ))

    return (
        <div>
            <div>
                {dragonsList.map((dragon, index) => (
                    <div key={index}>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Id: {dragon['id']}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nome: {dragon['name']}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Tipo: {dragon['type']}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}