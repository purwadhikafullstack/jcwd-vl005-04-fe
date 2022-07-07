import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore} from 'redux'
import { Provider } from 'react-redux'

// import main component
import App from './main'
import { ChakraProvider } from '@chakra-ui/react'

const INITIAL_STATE = {
    user : {
      username : "",
      email : "",
      role : ""
    },
    loading : false
  }
  function Reducer(state = INITIAL_STATE, action){
    
    if(action.type == 'ADMIN_LOGIN'){
      return {
        ...state,
        user : {
          username : action.payload.username,
          email : action.payload.email,
          role : "admin"
        }
      }
    }
  
    else if(action.type == 'ADMIN_LOADING_START'){
      return {
        ...state,
        loading:true
      }
    }
    else if(action.type == 'ADMIN_LOADING_END'){
      return {
        ...state,
        loading:false
      }
    }
    else if(action.type == 'ADMIN_LOGOUT'){
      localStorage.removeItem("admintoken");
      return INITIAL_STATE
    }

    else if(action.type == 'ADMIN_GET_DATA', action){
      return {
        ...state,
        adminstorage : action.payload?action.payload:[]
      }
    } 
    
    else{
      return state;
    }
  }
  const store = createStore(Reducer);

// render main component
ReactDOM.render( 
  <ChakraProvider>
      <BrowserRouter>
          <Provider store = {store}>
              <App/>
          </Provider>
      </BrowserRouter>
    </ChakraProvider>
    ,document.getElementById("root")
)