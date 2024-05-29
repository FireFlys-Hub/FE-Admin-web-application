import { Box, Typography, colors, useTheme } from "@mui/material";
import { tokens } from "../theme";


const Ratebox = (props) => {
    return (
        <Box sx={{display:'flex', flexDirection:'column', backgroundColor:props.color ,borderRadius:'15px'}} >
            <Typography variant="h2"
            color={colors.grey[500]}
            sx={{ m: "15px 0 5px 20px" }}
            >
                {props.title}
            </Typography>
            <Typography variant="h2"
            color={colors.brown[500]}
            sx={{ m: "15px 0 5px 20px" }}
            >
                {props.number}
            </Typography>
            <Typography variant="h2"
            color={colors.grey[500]}
            sx={{ m: "15px 0 5px 20px" }}
            >
                Increase by {props.percent}%
            </Typography>
        </Box>
    )
}
export default Ratebox;