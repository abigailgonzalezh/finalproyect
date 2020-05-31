import React, {useState, useEffect} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TableHead,TableRow, TableCell, TableBody} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import {storage} from "../firebase/index";

function InsertarSugerencias(props) {

    const [nombre, setNombre] = useState('');
    const [peticion1, setPeticion1] = useState('');
    const [value, setValue] = React.useState(5);
    const [open, setOpen] = React.useState(true);
    const [hover, setHover] = React.useState(-1);
    const [id1, setId] = useState(props.rev);
    const [allreviews, setAllreviews] = useState([]);
    const [imageAsFile, setImageAsFile] = useState('');
    const allInputs = {imgUrl: ''};
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const finalUrl = imageAsUrl.imgUrl;

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(props.isClose);
      var comprav = document.getElementById("sugerenci");
      comprav.value = " ";
    };

    const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
      e.preventDefault()
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

    const postReview = async () => {
      const res = await fetch("/reviews", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id1.id,
            producto: id1.nombre,
            estrellas: value,
            review: peticion1,
            imagen: finalUrl,
          })
      })
      //console.log(res);
      const response = await res.json();
      //setSugerencias(response);
    }

    useEffect(() => {
      console.log(id1.id)
    const getReviews = async() => {
      const res = await fetch("/reviews/"+id1.id+"", {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      })
      const response = await res.json();
      //console.log(response);
      setAllreviews(response);
    }
    getReviews();
  })

    function agregar(){
      handleClose();
      postReview();
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

      const labels = {
        1: 'Muy malo',
        2: 'Malo',
        3: 'Regular',
        4: 'Bueno',
        5: 'Excelente',
      };

    //<TableCell>{btoa(String.fromCharCode.apply(null, new Uint8Array(allreview.imagen.data)))}</TableCell>
    // getSugerencias();

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Reseñas</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene el formulario para agregar una reseña
          </DialogContentText>

          <Rating
            name="hover-feedback"
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              setValue(newValue);
              }}
             onChangeActive={(event, newHover) => {
               setHover(newHover);
             }}
            />

          <TextField
            margin="dense"
            id="sugerenci"
            //value={precioCompra}
            onChange={(ev) => setPeticion1(ev.target.value)}
            label="Reseña"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />

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

           <div>
              <table style={styletable}>
                <TableHead>
                  <TableRow>
                      <TableCell>Imagen</TableCell>
                      <TableCell>Reseña</TableCell>
                      <TableCell>Estrellas</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {allreviews.map((allreview) =>
                    <TableRow className="data-row2">
                      <TableCell align="center">
                        <img src={allreview.imagen} width="100" height="100"/>
                      </TableCell>
                      <TableCell>{allreview.review}</TableCell>
                      <TableCell>
                        <Box component="fieldset" mb={3} borderColor="transparent">
                          <Rating name="read-only" value={allreview.estrellas} readOnly />
                        </Box>
                      </TableCell>
                   </TableRow>
                 )}
               </TableBody>
             </table>
          </div>

        </DialogContent>
        <DialogActions>
          <Button   size="medium" label="Cancelar" onClick={handleClose} >
          </Button>
          <Button id="submit-button"
              onClick={() => agregar()}
              variant="outlined"
              size="large"
              size="medium" label="Agregar">
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
}

export default InsertarSugerencias;
