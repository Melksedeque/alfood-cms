import { Box, Container, Paper } from "@mui/material"
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

const AdminApp = () => {
    return (
        <>
            <AppHeader />
            <Box>
                <Container maxWidth="xl">
                    <Paper sx={{p: 3}}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default AdminApp;