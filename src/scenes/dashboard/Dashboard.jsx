import { Box, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Ratebox from "../../components/Ratebox";
import useDashboardService from "../../data/dashboard";
import { useEffect, useState } from "react";
import BarChart from "../../components/BarChart";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { getDashboardData } = useDashboardService();
    const [numberOfUser, setNumberOfUser] = useState(0);
    const [numberOfOrder, setNumberOfOrder] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [dataChart, setDataChart] = useState([]);
    const [dataFetched, setDataFetched] = useState(false); // State to track if data has been fetched

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDashboardData();
                setNumberOfUser(data.userCount);
                setNumberOfOrder(data.orderCount);
                setRevenue(data.revenue);
                setDataChart(data.chartData);
                setDataFetched(true); // Set dataFetched to true after fetching data
                console.log(">>>> request");
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!dataFetched) {
            fetchData();
        }
    }, [getDashboardData, dataFetched]);

    const rateboxData = [
        { title: "Number of users", number: numberOfUser, color: colors.greenAccent[300] },
        { title: "Total Orders", number: numberOfOrder, color: colors.orangeContrast[500] },
        { title: "Revenue", number: `$ ${revenue}`, color: colors.cyanContrast[500] }
    ];

    return (
        <Box marginLeft={"10px"} height="100%">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Grid container spacing={3} paddingLeft={"20px"} height="60%">
                {rateboxData.map((data, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Ratebox
                            title={data.title}
                            number={data.number}
                            color={data.color}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid item xs={12} height="40%" paddingTop='20px'>
                <Box height="100%">
                    <BarChart data={dataChart} />
                </Box>
            </Grid>
        </Box>
    );
}

export default Dashboard;
