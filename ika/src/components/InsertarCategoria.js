import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

function InsertarCategoria(props){
    const [nombre, setNombre] = useState('');
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        var limpiarn = document.getElementById("nombr");
        limpiarn.value = " ";
    };

    const postCategorias = async () => {
        const res = await fetch("/categories", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              nombre4: nombre
            })
        })
        const response = await res.json();
  
        var limpiar = document.getElementById("nombr");
        limpiar.value = " ";
    }

    function agregar(){
        handleClose();
        postCategorias();
    }

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

    return(
        <div>
        <Button primary size="medium" label="Agregar categoria" onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Llene el formulario para agregar categorias
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nombr"
                    onChange={(ev) => setNombre(ev.target.value)}
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button  size="medium" label="Cancelar" onClick={handleClose} ></Button>
                <Button id="submit-button"
                    onClick={() => agregar()}
                    size="large"
                    size="medium" label="Agregar">
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default InsertarCategoria;