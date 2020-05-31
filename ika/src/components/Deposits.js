import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/procedimientos/ventas", {
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
      <Title>Ventas totales</Title>
      <Typography component="p" variant="h4">
        $ {data.map((ventas) =>
          ventas.venta
        )}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        En esta semana
      </Typography>
    </React.Fragment>
  );
}
