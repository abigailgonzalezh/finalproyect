import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarReview from './InsertarReview';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Header from './Header';
import Footer from './Footer';
import { hp } from "grommet-theme-hp"
import {
  Box,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Button
} from "grommet";
import { grommet } from "grommet/themes";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function Productos(props) {
    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false);};
    var id2 = '';

    const useStyles = makeStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        width: 140,
        height: 140,
      },
    });
  
  function review(producto){
      console.log(producto.id);
      setId(producto.id);
      setOpen(true);
  }
  
  const classes = useStyles();

    useEffect(() => {


      const getProductos = async () => {
        const res = await fetch("/products", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        //console.log(res);
        const response = await res.json();
        setProductos(response);
      }
      getProductos();
    })

    return (
      <Grommet theme={hp} full>
        {id && open && <InsertarReview rev={id} isOpen = {open} isClose = {handleClose} /> }
        <Header/>
          <br />
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
      <Box align="center" pad="large">
        {productos.map((producto) =>
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={producto.imagen}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {producto.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                PRECIO: ${producto.precio_venta}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button variant="outlined" onClick={() => review(producto)} > <EditIcon/> </Button>
          </CardActions>
          </Card>
        )}
      </Box>
      </Grid>
      <Footer/>
      </Grommet>
    );
}

export default Productos;
