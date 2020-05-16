import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  Text,
  Button
} from "grommet";
import { grommet } from "grommet/themes";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function Balance(props) {
const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async () => {
      const res = await fetch("/bal", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      //console.log(res);
      const response = await res.json();
      setProductos(response);
    }
    getProductos();
  })

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  //console.log(plot);

  const mystlye = {
    minWidth: "50%",
    minHeight: 50
  };

  //
  const classes = useStyles();
  return (
    <div>
      <Header/>
        <br />
        <Grommet theme={grommet}>
      <Box align="center" pad="large">
      <Table className={classes.table}>
        <TableHeader>
          <TableRow>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Entradas</strong></TableCell>
          <TableCell align="center" size="small" scope="col" border="bottom"><strong>Salidas</strong></TableCell>
          <TableCell align="center" scope="col" border="bottom"><strong>Total</strong></TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((producto) =>
            <TableRow className="data-row">
              <TableCell align="center" >{producto.entradas}</TableCell>
              <TableCell align="center" >{producto.salidas}</TableCell>
              <TableCell align="center" >{producto.total}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </Box>
        </Grommet>
    </div>
  );
}

export default Balance;