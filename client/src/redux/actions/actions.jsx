import axios from 'axios';
import{

    GET_ALL_DOGS,
    RESET_PAGE,
    FIND_DOGS,
    PREV,
    NEXT,
    GET_DOGS_DETAIL,
    FILTER_DOGS_BY_ISCREATED,
    GET_TEMPERAMENTS,
    ADD_FILTER,
    ORDENAR_DOGS,
    POST_DOGS,

} from './actionstypes';

const URL = 'http://localhost:3001';


export const getAllDogs =()=>{

    return async function(dispatch){
        try {
            const { data } = await axios.get(`${URL}/dogs`);
            return dispatch({
                type: GET_ALL_DOGS,
                payload: data,
            });
            
        } catch (error) {
            console.log('No se pudo obtener los datos solicitados ', error);
            alert('No se pudo obtener los datos solicitados ', error);
        }
    };
}

export const findDogs = (params)=>{
 return async (dispatch) => {
    try {

        let dir;

        if (/^\d+$/.test(params)) {
            dir = `${URL}/dogs/${params}`;
          } else {
            dir =`${URL}/dogs/name?name=${params}`;
          }

        const {data} = await axios.get(dir);
        console.log('Respuesta de búsqueda:', data);
        dispatch({type: FIND_DOGS, payload: data});

    } catch (error) {
        console.log('No se pudo encontrar la informacion del perro', error)
        alert('No se pudo encontrar la informacion del perro', error)
    }
 }
}

export function resetPage() {
    return {
      type: RESET_PAGE,
    };
  }

  export function prev() {
    return {
      type: PREV,
    };
  }
  export function next() {
    return {
      type: NEXT,
    };
  }

  export function getDogsDetail(id){
    return async(dispatch)=>{
     try {
       const {data} = await axios.get(`${URL}/dogs/${id}`);
       dispatch({type:GET_DOGS_DETAIL, payload: data});
       
     } catch (error) {
      console.log('hubo un problema al intentar obtener los datos del perro');
      alert('Problema en el servidor Nose pudo obtener los datos del perro');
     }
  }
}

export function addFilter(temperaments){
  return{
    type: ADD_FILTER,
    payload: temperaments,
  }
 }

export function filterCrate(iscreated){
  return{
    type: FILTER_DOGS_BY_ISCREATED,
    payload:iscreated,
  }
}


export function getTemperaments(){
  return async function(dispatch){
    try {
      
      const response = await axios.get(`${URL}/temperaments`);
      const temperaments = response.data;
     dispatch({type:GET_TEMPERAMENTS, payload: temperaments});


    } catch (error) {
       console.log('No se pudo obtener los temperaments', error);
       alert('Problema en el servidor Nose pudo obtener los temperamentos ');
    }
  }
}

export function orderDogBreeds(payload){
  return{
     type: ORDENAR_DOGS,
     payload,
  }
}

export function postDog(dog){
  return async function(dispatch) {
    try {
       const response = await axios.post(`${URL}/dogs`,dog);

       if( response.status === 201 ) {
        dispatch({ type: POST_DOGS, payload: response.data});
         return {success:true};
       }
       else{
        return {success: false};
       }
      
    } catch (error) {
      console.log('error al registra la raza', error);
      return { success: false};
    }
  }
}

