import React from 'react'
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
    }
  }
  function Reducer(state = INITIAL_STATE, action){
    if(action.type == 'ADMIN_LOGIN'){
      return {
        user : {
          username : action.payload.username,
          email : action.payload.email,
          role : "admin"
        }
      }
    }
  
    else if(action.type == 'LOGOUT'){
      localStorage.removeItem("token");
      return INITIAL_STATE
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