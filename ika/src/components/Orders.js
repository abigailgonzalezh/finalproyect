import React, {useEffect, useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Moment from 'react-moment';
import * as moment from 'moment';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/procedimientos/historial", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      const response = await res.json();
      setRows(response);
    }
    getData();

  })
  return (
    <React.Fragment>
      <Title>Ultimas Ventas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell><Moment format="DD-MM-YYYY">{row.fecha}</Moment></TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.cantidad}</TableCell>
              <TableCell>$ {row.totalVenta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
