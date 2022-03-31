import React from "react";
import {
    AppBar,
    createTheme,
    Grid,
    ThemeProvider,
    Typography
} from "@mui/material";


const darkTheme = createTheme({
    palette: {
        primary: {
            main: 'rgb(97,79,105)',
            contrastText: '#ffffff',
        },
    },
    spacing: 6,
});

function MapAppBar() {

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar sx={{flexGrow: 1, height: "3,5vh"}} position={"sticky"}>
                <Grid container direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingX={10}
                >
                    <img src="https://192.168.115.134:4443/free/resources/fullLogo.svg" alt="logo"/>
                    <Typography variant="h6">
                        Все регионы
                    </Typography>
                    <Typography variant="h6">
                        АРМ дежурного - Popugai
                    </Typography>
                    <Typography variant="h6">
                        Admin
                    </Typography>
                </Grid>
            </AppBar>
        </ThemeProvider>
    )
}

export default MapAppBar