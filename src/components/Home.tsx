import { Container, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import ListDragons from "./ListDragons";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate(); 
    
    function toRegistration(){
        navigate('/registration')
    }

    return (
        <Container maxWidth="sm">
            <div>
                <Fab onClick={toRegistration} color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <div>
                <ListDragons/>         
            </div>
        </Container>
    );
}