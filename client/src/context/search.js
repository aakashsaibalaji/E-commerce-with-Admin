import {useState,useContext,createContext} from 'react';
//import axios from 'axios';
//I have created a global variable and I have used context api.
const SearchContext = createContext();

const SearchProvider =({children})=>{
    const [auth,setAuth] = useState({
        keyowrd:"",
        results:[],
    });
    return (
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}
const useSearch = () =>useContext(SearchContext);

export {useSearch,SearchProvider};