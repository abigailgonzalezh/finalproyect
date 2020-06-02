import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import { hp } from "grommet-theme-hp";
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

function Reviews(props) {
    const [reviews, setReviews] = useState([]);
    var id2 = '';

    useEffect(() => {
      const getReviews = async () => {
        const res = await fetch("/reviews", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        console.log(res);
        const response = await res.json();
        //console.log(response);
        setReviews(response);
      }
      getReviews();
    })

    function eliminar(reviews){
      console.log("EL id de sugerencia es: ");
      console.log(reviews.cliente);
      id2 = reviews._id;
      deleteReviews();
      //window.location.reload();
    }

    const deleteReviews = async () => {
      console.log("entro");
      console.log(id2);
      const res = await fetch("/reviews/"+id2+"", {
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
    const gettoken = localStorage.getItem('token');
    if(gettoken==1){
      return (
        <Grommet theme={grommet}>
          <Header/>
          <br/>
        <Box align="center" pad="large">
          <Table className={classes.table}>
            <TableHeader>
              <TableRow>
              <TableCell scope="col" border="bottom"><strong>Producto</strong></TableCell>
              <TableCell align="center" size="small" scope="col" border="bottom"><strong>Review</strong></TableCell>
              <TableCell align="center" scope="col" border="bottom"><strong>Imagen</strong></TableCell>
              <TableCell align="end" scope="col" border="bottom"><strong>Calificacion</strong></TableCell>
              <TableCell align="end" scope="col" border="bottom"><strong></strong></TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((reviews) =>
                <TableRow className="data-row">
                  <TableCell align="center" >{reviews.producto} </TableCell>
                  <TableCell align="center" >{reviews.review}</TableCell>
                  <TableCell align="center" ><img src={reviews.imagen}  width="180" height="100"/></TableCell>
                  <TableCell align="center" >{reviews.estrellas}</TableCell>
                  <TableCell align="center">
                  <Button hoverIndicator="true" variant="outlined" onClick={() => eliminar(reviews)} ><DeleteIcon /> </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </Box>
          </Grommet>
      );
    } else{
      if (gettoken == 2) {
        return(
          <p>El acceso a esta página es solo para personal autorizado</p>
        );
      } else{
        return(
          <p>Tienes que iniciar sesion</p>
        );
      }

    }
}

export default Reviews;
