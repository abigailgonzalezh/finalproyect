import React, {useState, useEffect} from 'react';
import { Grommet, Box, Image, Button } from "grommet";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TableHead,TableRow, TableCell, TableBody} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import ImageUploader from 'react-images-upload';

var imagen1;

class Upload extends React.Component {

    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
        imagen1 = this.state.pictures.concat(picture);
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                //onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}


function InsertarSugerencias(props) {

    const [nombre, setNombre] = useState('');
    const [peticion1, setPeticion1] = useState('');

    const [value, setValue] = React.useState(5);
    const [open, setOpen] = React.useState(true);
    const [hover, setHover] = React.useState(-1);
    const [id1, setId] = useState(props.rev);
    const [allreviews, setAllreviews] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(props.isClose);
      var comprav = document.getElementById("sugerenci");
      comprav.value = " ";
    };

    const postReview = async () => {
      console.log(imagen1);
      const res = await fetch("/reviews", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: id1,
            estrellas: value,
            review: peticion1,
            imagen: imagen1,
          })
      })
      //console.log(res);
      const response = await res.json();
      //setSugerencias(response);
    }

    useEffect(() => {
    const getReviews = async() => {
      const res = await fetch("/reviews/"+id1+"", {
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

          <Upload productoInsert="fer"/>

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
                      <TableCell><img src={"data:image/jpg;base64," +  Buffer.from(allreview.imagen.data).toString('base64')} /></TableCell>
                      <TableCell>{allreview.review}</TableCell>
                      <TableCell>{allreview.estrellas}</TableCell>
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
