import React from "react";
import {
    AppBar,
    createTheme,
    Grid,
    ThemeProvider,
    Typography
} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectAuthorized, selectRegionDesc} from "../mapContainer/acccountSlice";


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
    const region = useAppSelector(selectRegionDesc)
    const description = useAppSelector(state => state.account.description)
    const login = localStorage.getItem("login")
    const auth = useAppSelector(selectAuthorized)

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar sx={{flexGrow: 1, height: "3,5vh"}} position={"sticky"}>
                <Grid container direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      paddingX={10}
                >
                    {
                        (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
                            <img src="https://192.168.115.134:4443/free/resources/fullLogo.svg" alt="logo"/> :
                            <img src={window.location.origin + "/free/resources/fullLogo.svg"} alt="logo"/>
                    }
                    <Typography variant="h6" sx={{userSelect: "none"}}>
                        {region}
                    </Typography>
                    <Typography variant="h6" sx={{userSelect: "none"}}>
                        АРМ
                        {
                            description === "" ? "" : " дежурного - " + description
                        }
                    </Typography>
                    <Typography variant="h6" sx={{userSelect: "none"}}>
                    </Typography>
                    <Typography variant="h6" sx={{userSelect: "none"}}>
                        {auth ? login : ""}
                    </Typography>
                </Grid>
            </AppBar>
        </ThemeProvider>
    )
}

export default MapAppBar