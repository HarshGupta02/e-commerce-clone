export const initialState={
    basket: [],
    user: null
}

/// selector
export const getBasketTotal = (basket) => /// this does the sum of all the elements in the new state either after inserting an element or deleting an element.
    basket?.reduce((amount,item) => item.price+amount,0); // item is like an iterator in basket array.

// reducer actually helps to add or remove compenets in and out of the data layer.
// state defines the current state of the basket.
const reducer =(state,action) =>{
    // console.log(action); /// action here is basically the dispatch
    // console.log(state);
    switch(action.type){
        case "ADD_TO_BASKET": // we perform the action to add to the basket.
            return{
                ...state,
                basket:[...state.basket,action.item], // now the basket contains the original state plus the new item to be aded.
                // this is basically an array which contains the old basket from the previous state and and a new item is
                // added to this basket and it returns the new basket.
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            };
        case "REMOVE_FROM_BASKET":
            // return{
                // ...state,
                // basket: state.basket.filter(item => item.id !== action.id), // all the items with the same id will be deleted basically all copies present in the basket will be deleted.

            // }
            const index = state.basket.findIndex( /// returns the first index of the matching of the id.
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            if(index>=0){
                newBasket.splice(index,1); /// removes 1 element from that index
            }else{
                console.warn('Cant remove product (id: ${action.id}) as it is not in the basket!')
            }
            return {
                ...state,
                basket:newBasket,
            }
        
        case "SET_USER":
            return{
                ...state,
                user: action.user, /// return the original state but update the user to either it's info or set the 
                // user to null.
            }

        default:
            return state; // returns the old basket or the state
    }
};

export default reducer; /// this reducer now has the new state of the basket 