import { Container, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import ListDragons from "./ListDragons";

export default function Home() {
    return (
        <Container maxWidth="sm">
            <div>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            <div>
                <ListDragons/>         
            </div>
        </Container>
    );
}