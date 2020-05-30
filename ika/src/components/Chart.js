import React, {useEffect, useState} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import Moment from 'react-moment';
import * as moment from 'moment'

// Generate Sales Data

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/procedimientos", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      const response = await res.json();
      setData(response);
    }
    getData();

  })

  return (
    <React.Fragment>
      <Title>Ventas de la semana</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="dia" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Ventas ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="venta" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
