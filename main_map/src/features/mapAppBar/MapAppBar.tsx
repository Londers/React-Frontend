import React from "react";
import {
    AppBar,
    createTheme,
    Grid,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../app/hooks";


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
    const region = useAppSelector(state => state.account.region)
    const description = useAppSelector(state => state.account.description)
    const login = localStorage.getItem("login")

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
                        {(region === "*") ? "Все регионы" : region}
                    </Typography>
                    <Typography variant="h6">
                        АРМ
                        {
                            description === "" ? "" :  " дежурного - " + description
                        }
                    </Typography>
                    <Typography variant="h6">
                        {login}
                    </Typography>
                </Grid>
            </AppBar>
        </ThemeProvider>
    )
}

export default MapAppBar