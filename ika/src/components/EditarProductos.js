import React, {useEffect, useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { hp } from "grommet-theme-hp";
import { makeStyles } from '@material-ui/core/styles';
import {storage} from "../firebase/index";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NumberFormat from 'react-number-format';


function EditarProductos(props){
    const idProducto = props.productoEdit;
    const nombreProducto = props.productoNombre;
    const precioCompraProducto = props.productoPrecioCompra;
    const precioVentaProducto = props.productoPrecioVenta;
    const cantidadProducto = props.productoCantidad;
    const urlProducto = props.productoUrl;
    const categoriaProducto = props.productoCategoria;

    const [id, setId] = useState(idProducto);
    const [nombre, setNombre] = useState(nombreProducto);
    const [precioCompra, setPrecioCompra] = useState(precioCompraProducto);
    const [precioVenta, setPrecioVenta] = useState(precioVentaProducto);
    const [cantidad, setCantidad] = useState(cantidadProducto);
    const [open, setOpen] = React.useState(true);
    const allInputs = {imgUrl: urlProducto};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(categoriaProducto);

    console.log(categoria);

    useEffect(() => {

      const getCategorias = async () => {
        const res = await fetch("/categories", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        //console.log(res);
        const response = await res.json();
        setCategorias(response);
        console.log(categorias);
      }
      getCategorias();
  })

    const handleClose = () => {
      setOpen(props.isClose);
      var limpiar = document.getElementById("nombr");
      limpiar.value = " ";
      var comprav = document.getElementById("compr");
      comprav.value = " ";
      var venti = document.getElementById("vent");
      venti.value = " ";
      var compri = document.getElementById("cant");
      compri.value = " ";
      setCategoria(" ");
      setId('');
    };

    console.log(imageAsFile)
    const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
      e.preventDefault()
      console.log('start of upload')
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      //initiates the firebase side uploading
      uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        })
      })
    }

    console.log(imageAsUrl.imgUrl);

    const finalUrl = imageAsUrl.imgUrl;

    const editProductos = async () => {
      const res = await fetch("/products", {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: idProducto,
            nombre1: nombre,
            precioCompra1: precioCompra,
            precioVenta1: precioVenta,
            cantidad1: cantidad,
            category: categoria,
            imagen1: finalUrl
          })
      })
      //console.log(res);
      const response = await res.json();
      //setProductos(response);

      var limpiar = document.getElementById("nombr");
      limpiar.value = " ";
      var comprav = document.getElementById("compr");
      comprav.value = " ";
      var venti = document.getElementById("vent");
      venti.value = " ";
      var compri = document.getElementById("cant");
      compri.value = " ";
      setId('');
      setCategoria(" ");
      setOpen(false);
    }

    function editar(){
      setCategoria(categoria.id);
      handleClose();
      editProductos();
      //window.location.reload();
    }
    //console.log(plot);

    const mystlye = {
      minWidth: "50%",
      minHeight: 50
    };

    const mystlye1 = {
        minWidth: "30%",
        minHeight: 50,
        top: 20,
        right: 30
      };

    const mystlye2 = {
        minWidth: "30%",
        minHeight: 50,
        top: 20

      };

      const mystlye3 = {
        minWidth: "30%",
        minHeight: 50,
        marginTop: 40,
        right: 30
      };

      const styletable = {
         width: "100%",
         marginTop:20
      };

      const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));


    const classes = useStyles();

    return (
      <Grommet theme={hp} >
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para editar productos
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombr"
            value={nombre}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre"
            variant="outlined"
            fullWidth
          />
          <NumberFormat
            margin="dense"
            id="compr"
            value={precioCompra}
            onChange={(ev) => setPrecioCompra(ev.target.value)}
            label="Precio de Compra"
            customInput={TextField}
            variant="outlined"
            fullWidth
          />
          <NumberFormat
            margin="dense"
            id="vent"
            value={precioVenta}
            onChange={(ev) => setPrecioVenta(ev.target.value)}
            label="Precio de Venta"
            customInput={TextField}
            variant="outlined"
            fullWidth
          />
          <NumberFormat
            margin="dense"
            id="cant"
            value={cantidad}
            onChange={(ev) => setCantidad(ev.target.value)}
            customInput={TextField}
            label="Cantidad"
            variant="outlined"
            fullWidth
          />
          <br/>
          <br/>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categorias}
              onChange={(ev) => setCategoria(ev.target.value)}
            >
              {categorias.map((categoria) =>
              <MenuItem value={categoria.id}>{categoria.nombre}</MenuItem>
              )}
            </Select>
          </FormControl>
          <form onSubmit={handleFireBaseUpload}>
            <br/>
            <input
              type="file"
              id="i"
              onChange={handleImageAsFile}
            />
            <br/>
            <button>Subir</button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button  size="medium" label="Cancelar" onClick={handleClose} >
          </Button>
          <Button id="submit-button"
              onClick={() => editar()}
              size="large"
              size="medium" label="Editar">
          </Button>
        </DialogActions>
      </Dialog>
    </Grommet>
    );
}

export default EditarProductos;
