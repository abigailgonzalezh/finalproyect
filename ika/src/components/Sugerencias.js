import React, {useEffect, useState} from 'react';
import {Button, TableHead, TableRow, TableCell, TableBody, Table} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarProductos from './InsertarProductos';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/CheckBox';

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

function Sugerencias(props) {
    const [sugerencias, setSugerencias] = useState([]);
    
    useEffect(() => {
      const getSugerencias = async () => {
        const res = await fetch("/sugerencias", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        //console.log(res);
        const response = await res.json();
        console.log(response);
        setSugerencias(response);
      }
      getSugerencias();
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
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Sugerencia</StyledTableCell>
              <StyledTableCell size="small">Extras</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sugerencias.map((sugerencia) =>
              <TableRow className="data-row">
                <StyledTableCell>{sugerencia.cliente}</StyledTableCell>
                <StyledTableCell>{sugerencia.peticion}</StyledTableCell>
                <StyledTableCell size="small"> 
                <Button variant="outlined" ><CheckIcon /> </Button>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
}

export default Sugerencias;