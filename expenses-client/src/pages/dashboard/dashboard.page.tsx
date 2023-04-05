
import React from 'react';
import { Box } from '@mui/material';
import { VictoryPie } from 'victory';

import { getChartData } from '../../shared/services/expenses.service';
import { log } from 'console';


const Dashboard = () => {

  const [chartData, setChartData] = React.useState<any>({
    totalCountFood: 0,
    totalCountMovies: 0,
    totalCountOnlineSubscription: 0,
    totalCountTraveling: 0,
  });

  React.useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async (): Promise<any> => {
    try {
      const result = (await getChartData())?.data;
      if (result && result.data) {
        setChartData(result?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Box width={'50%'} height={'60%'}>
        <VictoryPie
          colorScale={["green", "orange", "blue", "red"]}
          data={[
            { x: "Food", y: chartData.totalCountFood },
            { x: "Movies", y: chartData.totalCountMovies },
            { x: "Online Subscription", y: chartData.totalCountOnlineSubscription },
            { x: "Traveling", y: chartData.totalCountTraveling },
          ]}
        />
      </Box>
    </>
  )
}

export default Dashboard;
