import { AppBar, Box, Button, Container, Link, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AppHeader = () => {
    return (
        <AppBar position="static" sx={{mb: 3}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6">
                        Administração
                    </Typography>
                    <Box sx={{display: 'flex', flexGrow: 1}}>
                        <Link component={RouterLink} to="/admin/restaurantes" underline="none">
                            <Button sx={{my: 2, color: 'white'}}>Restaurantes</Button>
                        </Link>
                        <Link component={RouterLink} to="/admin/pratos" underline="none">
                            <Button sx={{my: 2, color: 'white'}}>Pratos</Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AppHeader;