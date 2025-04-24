import { useState } from 'react'
import { LineChart, LineSeriesType } from '@mui/x-charts'
import { Box, Stack} from '@mui/material'

import { DataGrid, GridColDef, GridColumnHeaderMenu, GridRowsProp, GridValidRowModel } from '@mui/x-data-grid';
import { Driver } from '../interfaces/driver';
import { race } from '../interfaces/race';

function ChartLineGraph(props: {driversData: Driver[], driversPointsPerRace: number[][], racesData: race[]}) {
  const driversData = props.driversData;
  const driversPointsPerRace = props.driversPointsPerRace;
  const racesData = props.racesData;

  const driversNames = driversData.map((i) => {
    return i.driverName
  });

  const [lineArray, setLineArray] = useState<LineSeriesType[]>([]);

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'Rank', 
      flex: 1,
      maxWidth: 90,
      type: 'number', 
    },
    {
      field: 'driverName',
      headerName: 'Driver Name',
      flex: 1,
      minWidth: 150,
      type: 'string',
    },
    {
      field: 'carNumber',
      headerName: 'Car Number',
      flex: 1,
      minWidth: 100,
      type: 'number',
    },
    {
      field: 'points',
      headerName: 'Points',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'next',
      headerName: 'Next',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'ldr',
      headerName: 'Ldr',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'starts',
      headerName: 'Starts',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'wins',
      headerName: 'Wins',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't5',
      headerName: 'T5',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't10',
      headerName: 'T10',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't15',
      headerName: 'T15',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 't20',
      headerName: 'T20',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'dnfs',
      headerName: 'DNFS',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'lapsCompleted',
      headerName: 'Laps Completed',
      flex: 1,
      minWidth: 120,
      type: 'number',
    },
    {
      field: 'lapsLed',
      headerName: 'Laps Led',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'racesLed',
      headerName: 'Races Led',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'avgSta',
      headerName: 'AvgSta',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
    {
      field: 'avgFin',
      headerName: 'AvgFin',
      flex: 1,
      minWidth: 90,
      type: 'number',
    },
  ];

  let temprows: GridValidRowModel[] = [];
  
  for (let d=0;d<driversData.length;d++) {
    const driverRow: GridValidRowModel = {
      id: d+1,
      driverName: driversData[d].driverName,
      carNumber: driversData[d].carNumber,
      points: driversData[d].points,
      next: driversData[d].next,
      ldr: driversData[d].ldr,
      starts: driversData[d].starts,
      wins: driversData[d].wins,
      t5: driversData[d].t5,
      t10: driversData[d].t10,
      t15: driversData[d].t15,
      t20: driversData[d].t20,
      dnfs: driversData[d].dnfs,
      lapsCompleted: driversData[d].lapsCompleted,
      lapsLed: driversData[d].lapsLed,
      racesLed: driversData[d].racesLed,
      avgSta: driversData[d].avgSta,
      avgFin: driversData[d].avgFin,
    }

    temprows.push(driverRow);

  }

  const rows: GridRowsProp = temprows;

  const xAxisRaceArray = new Array(racesData.length).fill(null).map((_,i) => i + 1)

  return (
    <Stack direction='row' sx={{ flexGrow: 1}}>
      <Box sx={{ height: 1000, width: '50%', margin: 0, padding: '1rem' }}>
        <DataGrid
          slotProps={{columnMenu: {color: 'secondary.contrastText'}}}
          rows={rows}
          columns={columns}
          autoPageSize
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            setLineArray([]);

            let newArray: LineSeriesType[] = [];

            ids.ids.forEach(row => {
              const index = Number(row) - 1;

              const newSeries: LineSeriesType = {
                curve: "linear",
                data: driversPointsPerRace[index],
                label: driversNames[index],
                type: 'line',
                showMark: false,
              };
              
              newArray.push(newSeries);
              
            });

            newArray.sort((a: LineSeriesType, b: LineSeriesType) => {
              return b.data![b.data!.length - 1]! - a.data![a.data!.length - 1]!;
            });

            setLineArray(newArray);
          }}
        />
      </Box>

      <Box sx={{ height: 1000, width: '100%', margin: 0, padding: '1rem' }}>
        <LineChart
          slotProps={{
            noDataOverlay: {
                message: "Check Drivers in Table to Add Data",
            }
          }}
          xAxis={[{ data: xAxisRaceArray, scaleType: "point", label: 'Races' }]}
          yAxis={[{label: 'Points'}]}
          series={lineArray}
          height={1000}
          hideLegend
          grid={{ vertical: true, horizontal: true, }}
        />
      </Box>
    </Stack>
  )
}

export default ChartLineGraph
