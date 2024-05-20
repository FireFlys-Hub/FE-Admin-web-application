import { Box, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Ratebox from "../../components/Ratebox";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const rateboxData = [
        { title: "Number of users", number: 10, percent: 20, color: colors.greenAccent[300] },
        { title: "Weekly Orders", number: 20, percent: 30, color: colors.orangeContrast[500] },
        { title: "Revenue", number: 30, percent: 40, color: colors.cyanContrast[500] }
    ]

    return (
        <Box marginLeft={"10px"}>
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Grid container spacing={3}  paddingLeft={"20px"}>
                {rateboxData.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Ratebox
                            title={data.title}
                            number={data.number}
                            percent={data.percent}
                            color={data.color}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;