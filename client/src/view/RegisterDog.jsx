import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getTemperaments, postDog} from '../redux/actions/actions'
import style from '../style/RegisterDog.module.css'


export default function RegisterDog() {
 
  const dispatch = useDispatch();
  const temperaments = useSelector((state)=> state.temperaments);


  const [Dog, setDog]= React.useState({
   
    name: '',
    image:'',
    maxHeight: 0,
    minHeight:0,
    maxWeight:0,
    minWeight:0,
    lifespan: 0,
    temperaments: []
  });

const [ submitSuccess, setSubmitSuccess] = React.useState(false);
const [seleTemp, setSeleTemp] = React.useState([]);
const [errors, setErrors] = React.useState({});
const [temperamentError, setTemperamentError] = React.useState("");



React.useEffect(()=> {
 dispatch(getTemperaments())
},[dispatch])

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    
    const dtaToSend = {
      name: Dog.name,
      image: Dog.image,
      height: `${Dog.minHeight} - ${Dog.maxHeight} cm`,
      weight: `${Dog.minWeight} - ${Dog.maxWeight} kg`,
      lifespan: `${Dog.lifespan} years`,
      temperaments: seleTemp,
    };

    const response = await dispatch(postDog(dtaToSend));

    if (response.success) {
      console.log('Perro registrado exitosamente');
      setSubmitSuccess(true);
      resetForm();
      alert('Dog Registrado con éxito');
    }

  } catch (error) {
    console.error('No se guardó la raza:', error);
    alert('No se ha podido registrar la raza del perro' + error.message);
  }
};


const handleChange = (e) => {
  const { name, value } = e.target;
  setDog({
    ...Dog,
    [name]: value,
  });

  // Pasa el objeto allValues a validateField
  const newErrors = validateField(name, value, Dog);
  setErrors((prevErrors) => ({
    ...prevErrors,
    ...newErrors,
  }));
};



const handleTempSelect = (e) => {
  const { value } = e.target;
  if (!seleTemp.includes(value)) {
    setSeleTemp([...seleTemp, value]);
  }
};

const handleRemoveTemp = (tempToRemove) => {
  setSeleTemp(seleTemp.filter((temp) => temp !== tempToRemove));
};
const validateField = (name, value, allValues) => {
  let fieldErrors = { ...errors };

  if (name === "name") {
    if (!value) {
      fieldErrors.name = "Se requiere un nombre";
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      fieldErrors.name =
        "El nombre no debe contener caracteres especiales ni números";
    } else {
      delete fieldErrors.name;
    }
  } else if (name === "lifespan") {
    if (parseInt(value) <= 0) {
      fieldErrors.lifespan = `${name.toUpperCase()} debe ser mayor que 0`;
    } else {
      delete fieldErrors.lifespan;
    }
  } else if (name === "maxHeight" || name === "minHeight" || name === "maxWeight" || name === "minWeight") {
    if (name === "maxHeight") {
      if (parseInt(value) <= 0) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que 0`;
      } else if (parseInt(value) <= parseInt(allValues.minHeight)) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que MINHEIGHT`;
      } else if (parseInt(allValues.minHeight) >= parseInt(allValues.maxHeight)) {
        delete fieldErrors.minHeight; // Elimina el error en minHeight si es válido
        delete fieldErrors.maxHeight; // Elimina el error en maxHeight si es válido
      } else {
        delete fieldErrors[name];
      }
    } else if (name === "minHeight") {
      if (parseInt(value) <= 0) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que 0`;
      } else if (parseInt(value) >= parseInt(allValues.maxHeight)) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser menor que MAXHEIGHT`;
      } else if (parseInt(allValues.minHeight) >= parseInt(allValues.maxHeight)) {
        delete fieldErrors.minHeight; // Elimina el error en minHeight si es válido
        delete fieldErrors.maxHeight; // Elimina el error en maxHeight si es válido
      } else {
        delete fieldErrors[name];
      }
    } else if (name === "maxWeight") {
      if (parseInt(value) <= 0) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que 0`;
      } else if (parseInt(value) <= parseInt(allValues.minWeight)) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que MINWEIGHT`;
      } else if (parseInt(allValues.minWeight) >= parseInt(allValues.maxWeight)) {
        delete fieldErrors.minWeight; // Elimina el error en minWeight si es válido
        delete fieldErrors.maxWeight; // Elimina el error en maxWeight si es válido
      } else {
        delete fieldErrors[name];
      }
    } else if (name === "minWeight") {
      if (parseInt(value) <= 0) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser mayor que 0`;
      } else if (parseInt(value) >= parseInt(allValues.maxWeight)) {
        fieldErrors[name] = `${name.toUpperCase()} debe ser menor que MAXWEIGHT`;
      } else if (parseInt(allValues.minWeight) >= parseInt(allValues.maxWeight)) {
        delete fieldErrors.minWeight; // Elimina el error en minWeight si es válido
        delete fieldErrors.maxWeight; // Elimina el error en maxWeight si es válido
      } else {
        delete fieldErrors[name];
      }
    }
  }

  if (name === "image") {
    if (!value) {
      fieldErrors.image = "Se requiere una URL de imagen";
    } else if (
      !/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*\.(jpg|jpeg|png|gif)$/.test(value)
    ) {
      fieldErrors.image = "URL de imagen inválida";
    } else {
      delete fieldErrors.image;
    }
  }

  setErrors({ ...fieldErrors });

  return fieldErrors;
};

const isFormValid = () => {
  return(
    Object.keys(errors).length === 0 &&
    Dog.name.trim() !== ''  &&
    Dog.image.trim() !== '' &&
    Dog.maxHeight >=0 && Dog.maxHeight > Dog.minHeight &&
    Dog.minHeight >=0 && Dog.minHeight < Dog.maxHeight &&
    Dog.maxWeight >=0 && Dog.minWeight < Dog.maxWeight  &&
    Dog.minWeight >=0 && Dog.maxHeight > Dog.minWeight &&
    Dog.lifespan > 0 &&
    seleTemp.length > 0
  );
};

const resetForm = () => {
  setDog({
    name: '',
    image:'',
    maxHeight: 0,
    minHeight:0,
    maxWeight:0,
    minWeight:0,
    lifespan: 0,
    temperaments: []
  });
  setSeleTemp([]);
  setErrors({});
  setTemperamentError("");
  setSubmitSuccess(false);
};


  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.label}>Nombre:</label>
      <input
        className={style.input}
        type="text"
        name="name"
        value={Dog.name}
        onChange={handleChange}
      />
      {!submitSuccess && errors.name && (
        <p className={style.error}>{errors.name}</p>
      )}
       
      <label className={style.label}>Imagen:</label>
      <input
        className={style.input}
        type="text"
        name="image"
        value={Dog.image}
        onChange={handleChange}
      />
      {!submitSuccess && errors.image && (
        <p className={style.error}>{errors.image}</p>
      )}
      
      <label className={style.label}>Altura Max:</label>
      <input
        className={style.input}
        type="number"
        name="maxHeight"
        value={Dog.maxHeight}
        onChange={handleChange}
        min="0"
      />
      {!submitSuccess && errors.maxHeight && (
        <p className={style.error}>{errors.maxHeight}</p>
      )}
      
      <label className={style.label}>Altura Min:</label>
      <input
        className={style.input}
        type="number"
        name="minHeight"
        value={Dog.minHeight}
        onChange={handleChange}
        min="0"
      />
      {!submitSuccess && errors.minHeight && (
        <p className={style.error}>{errors.minHeight}</p>
      )}
       
      <label className={style.label}>Peso Max:</label>
      <input
        className={style.input}
        type="number"
        name="maxWeight"
        value={Dog.maxWeight}
        onChange={handleChange}
        min="0"
      />
      {!submitSuccess && errors.maxWeight && (
        <p className={style.error}>{errors.maxWeight}</p>
      )}
      
      <label className={style.label}>Peso Min:</label>
      <input
        className={style.input}
        type="number"
        name="minWeight"
        value={Dog.minWeight}
        onChange={handleChange}
        min="0"
      />
      {!submitSuccess && errors.minWeight && (
        <p className={style.error}>{errors.minWeight}</p>
      )}
      
       
      <label className={style.label}>Esperanza de vida:</label>
      <input
        className={style.input}
        type="number"
        name="lifespan"
        value={Dog.lifespan}
        onChange={handleChange}
        min="0"
      />
      {!submitSuccess && errors.lifespan && (
        <p className={style.error}>{errors.lifespan}</p>
      )}

      <select
  className={style.select}
  name="temperaments"
  onChange={handleTempSelect}
  multiple
>
  {temperaments.map((temp) => (
    <option key={temp.id} value={temp.name}>
      {temp.name}
    </option>
  ))}
</select>
{temperamentError && <p className={style.error}>{temperamentError}</p>}

       
      <div className={style.selectedTypesContainer}>
        {seleTemp.map((seleTemp) => (
          <div key={seleTemp} className={style.selectedType}>
            {seleTemp}
            <button
              className={style.removeBtn}
              onClick={() => handleRemoveTemp(seleTemp)}
            >
              X
            </button>
          </div>
        ))}
      </div>


     
      <button
        className={style.button}
        type="submit"
        disabled={!isFormValid()}
      >
        Crear Pokémon
      </button>


    </form>
  )
};

