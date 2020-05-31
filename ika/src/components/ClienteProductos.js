import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InsertarReview from './InsertarReview';
import Grid from '@material-ui/core/Grid';
import { Star } from 'grommet-icons';
import HeaderCliente from './HeaderCliente';
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
import Container from '@material-ui/core/Container';

function Productos(props) {
    const [productos, setProductos] = useState([]);
    const [id, setId] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {setOpen(false);};
    var id2 = '';

    const useStyles = makeStyles((theme) => ({
      icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
      },
      cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      media: {
       width: 220,
       height: 220,
     },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
      root: {
  maxWidth: 345,
},
    }));

  function review(producto){
      console.log(producto.id);
      setId(producto);
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
        <HeaderCliente/>
          <br />
        <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {productos.map((producto) => (
            <Grid item key={producto} xs={6} sm={5} md={3}>
              <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={producto.imagen}
                alignItems="center"
              />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    PRECIO: ${producto.precio_venta}
                  </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="outlined" onClick={() => review(producto)} >Reseña <Star color='brand' />   </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer/>
      </Grommet>
    );
}

export default Productos;
