const initialState = {
    dogs: [],
    allDogs: [],
    temperaments:[],
    dogDetail:[]
};


function rootReducer (state = initialState, action) {
    switch (action.type){ 
        case 'GET_ALL_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        
        case 'GET_DETAIL':
            return{
                ...state,
                dogDetail:action.payload,
            }
            
        case 'GET_NAME_DOG':
            return{
                ...state,
                dogs: action.payload
            }
            
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.dogs.sort(function (a, b) {
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : 
            state.dogs.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;  
            })
        return{
            ...state,
            dogs: sortedArr,
        };
        
        case 'FILTER_BY_VALUE':
            const allDogs = state.allDogs;
            const tempsFiltered = action.payload === 'All' ? allDogs :
            allDogs.filter(item => item.temperament && item.temperament.includes(action.payload));
            return{
                ...state,
            dogs: tempsFiltered,
        }
        
        case 'GET_TEMPERAMENTS':
            return{
            ...state,
            temperaments: action.payload
        };

    case 'CREATE_DOG':
        return {
            ...state,
        }

    default: 
        return state;
    }
};

export default rootReducer;