import{
    GET_ALL_DOGS,
    RESET_PAGE,
    FIND_DOGS,
    PREV,
    NEXT, 
    GET_DOGS_DETAIL,
    ADD_FILTER,
    FILTER_DOGS_BY_ISCREATED,
    GET_TEMPERAMENTS,
    ORDENAR_DOGS,
    POST_DOGS,
  

} from '../actions/actionstypes';

import {Mayor} from '../../Helper/mayoraMenor';
import {Menor} from '../../Helper/menoraMayor'


const initialState={
Dogs: [],
allDogs:[],
detail:[],
temperaments:[],
numPage:1,
};

function reducer( state = initialState, {type,payload}){
    switch(type){
        case GET_ALL_DOGS:
            return {
                ...state,
                Dogs: payload,
                allDogs: payload,
            }
        case GET_TEMPERAMENTS:
            return{
               ...state,
               temperaments: payload,
            }


        case POST_DOGS: 
            return {
            ...state,
            Dogs: payload,
            };

        case FIND_DOGS:
            return {
                ...state,
                Dogs: payload,
                allDogs: payload,
            };
        
            case ADD_FILTER:
            if (payload) {
                const filteredDogs = state.allDogs.filter(dog =>
                dog.temperaments && dog.temperaments.includes(payload)
                );
        
                return {
                ...state,
                Dogs: filteredDogs,
                };
            } else {
                // Si no se proporciona un filtro, muestra todos los perros sin filtrar.
                return {
                ...state,
                Dogs: state.allDogs,
                };
            }
               
            case FILTER_DOGS_BY_ISCREATED:
                const iscreatedValue = payload;
                let filteredDogs = [];
                if (iscreatedValue === true) {
                    filteredDogs = state.allDogs.filter((dog) => dog.iscreated === true);
                } else if (iscreatedValue === false) {
                    filteredDogs = state.allDogs.filter((dog) => dog.iscreated === false);
                } else {
                    filteredDogs = [...state.allDogs]; 
                }
                return {
                    ...state,
                    iscreated: iscreatedValue,
                    Dogs: filteredDogs,
                };

            

                case ORDENAR_DOGS:
                    const sortOrder = payload;
                    let filteredDogsToSort = [...state.Dogs];
                    let filteredDogsOrder;
                
                    switch (sortOrder) {
                        case "all":
                            filteredDogsOrder = filteredDogsToSort.sort((a, b) => a.id -b.id);
                            break;
                        case "asc":
                            filteredDogsOrder = filteredDogsToSort.sort((a, b) => a.name.localeCompare(b.name));
                            break;
                        case "des":
                            filteredDogsOrder = filteredDogsToSort.sort((a, b) => b.name.localeCompare(a.name));
                            break;
                            case "weight asc":
                                filteredDogsOrder = Mayor(filteredDogsToSort);
                                break;
                              case "weight des":
                                filteredDogsOrder = Menor(filteredDogsToSort);
                                break;                              
                        default:
                            filteredDogsOrder = filteredDogsToSort;
                    }
                
                    return {
                        ...state,
                        Dogs: filteredDogsOrder,
                        sortOrder,
                    };

        case RESET_PAGE:
            return{
                ...state,
            } 
            
        case PREV:
            return {
           ...state,
           numPage: state.numPage - 1,
        };
  
        case NEXT:
            return {
            ...state,
            numPage: state.numPage + 1,
        };

        case GET_DOGS_DETAIL:
            return{
                ...state,
                detail: payload,
            }
            
        default:
            return state;     

    }
}

export default reducer;