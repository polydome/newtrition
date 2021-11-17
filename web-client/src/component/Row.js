import {Grid} from "@mui/material";

export const Row = ({horizontalSpacing, maxWidth, children}) =>
    <Grid container spacing={horizontalSpacing} maxWidth={maxWidth} sx={{border: "1px grey"}}>
        {children.map(child => <Grid item xs={12}>{child}</Grid>)}
    </Grid>