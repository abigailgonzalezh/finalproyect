import React, {useState} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import { hp } from "grommet-theme-hp";
import { makeStyles } from '@material-ui/core/styles';
import {storage} from "../firebase/index";

function EditarCategoria(props){
    const idCategoria = props.categoriaEdit;
    const nombreCategoria = props.categoriaNombre;

    const [id, setId] = useState(idCategoria);
    const [nombre, setNombre] = useState(nombreCategoria);
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(props.isClose);
        var limpiar = document.getElementById("nombr");
        limpiar.value = " ";
        setId('');
    };

    const editCategorias = async () => {
        const res = await fetch("/categories", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: idCategoria,
              nombre4: nombre
            })
        })

        const response = await res.json();
  
        var limpiar = document.getElementById("nombr");
        limpiar.value = " ";
        setId('');
        setOpen(false);
    }

    function editar(){
        handleClose();
        editCategorias();
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

    return(
        <Grommet theme={hp} >
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Llene el formulario para editar categorias
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
                    <DialogActions>
                        <Button  size="medium" label="Cancelar" onClick={handleClose}></Button>
                        <Button id="submit-button"
                            onClick={() => editar()}
                            size="large"
                            size="medium" label="Editar">
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Grommet>
    );
}

export default EditarCategoria;