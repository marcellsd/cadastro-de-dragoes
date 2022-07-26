import { useEffect, useState } from "react";
import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

interface Dragon {
    id: string
    name: string
    type: string
    histories: []
}

export default function ListDragons() {
    const [dragonsList, setDragonsList] = useState<Dragon[]>([]) 

    async function getDragonsList() {
        const { data } = await axios.get("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon")
        setDragonsList(data)
    }

    const navigate = useNavigate();

    function toEdit(id: string){
        navigate('/edit/' + id)
    }

    useEffect(() => {
        getDragonsList();
    }, []);

    async function deletarDragao(id: string) {
        await axios.delete("http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/" + id);
        window.location.reload();
    }

    return (
        <div>
            <div>
                {dragonsList.map((dragon, index) => (
                    <div key={index}>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Id: {dragon.id}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Nome: {dragon.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Tipo: {dragon.type}
                                </Typography><Typography variant="h5" component="div">
                                    Detalhes: {dragon.histories}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton onClick={() => toEdit(dragon.id)} aria-label="Edit dragon">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => deletarDragao(dragon.id)} aria-label="Delete dragon">
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}