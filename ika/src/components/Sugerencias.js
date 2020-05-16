import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';  
import CheckIcon from '@material-ui/icons/CheckBox';
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

function Sugerencias(props) {
    const [sugerencias, setSugerencias] = useState([]);
    var id2 = '';

    useEffect(() => {
      const getSugerencias = async () => {
        const res = await fetch("/suggestions", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        console.log(res);
        const response = await res.json();
        //console.log(response);
        setSugerencias(response);
      }
      getSugerencias();
    })
    
    function eliminar(sugerencia){
      console.log("EL id de sugerencia es: ");
      console.log(sugerencia.cliente);
      id2 = sugerencia._id;
      deleteSugerencias();
      //window.location.reload();
    }

    const deleteSugerencias = async () => {
      console.log("entro");
      console.log(id2);
      const res = await fetch("/suggestions/"+id2+"", {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
      })
    }

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
        <br/>
        <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
            <TableCell scope="col" border="bottom"><strong>Cliente</strong></TableCell>
            <TableCell align="center" size="small" scope="col" border="bottom"><strong>Sugerencias</strong></TableCell>
            <TableCell align="end" scope="col" border="bottom"><strong>Extras</strong></TableCell>
              </TableRow>
          </TableHeader>
          <TableBody>
            {sugerencias.map((sugerencia) =>
              <TableRow className="data-row">
                <TableCell align="center" >{sugerencia.cliente}</TableCell>
                <TableCell align="center" >{sugerencia.peticion}</TableCell>
                <TableCell> 
                <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(sugerencia)} ><CheckIcon /> </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Box>
        </Grommet>
      </div>
    );
}

export default Sugerencias;