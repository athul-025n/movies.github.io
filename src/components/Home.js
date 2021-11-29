import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestFilms } from "../action";
import data from "../data.json";
import Header from "./Header"
import './Home.css';

const Home = () => {
  const { filmsData, searchText, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();
  var timeout;

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);
  const [filmArray, setFilmArray] = useState([]);
  const list = useRef();


  useEffect(() => {
    if(pageCount===1 &&!searchText&&filmsData.length===0) dispatch(requestFilms(data,pageCount));
    if(searchText){
      const filteredArray = filmsData.filter((value,key)=>{
        return value.name.toLowerCase().includes(searchText.toLowerCase())
      })
      setFilmArray(filteredArray);      
    }else{
      setFilmArray(filmsData);    
    }    
  }, [searchText,filmsData]);
 
  function onScroll (e) {
    const scrollY = window.scrollY 
    clearTimeout(timeout);  
    timeout = setTimeout(function() {
        const currentScrollY = e.target.scrollTop;
        setPageHeight(document.getElementById('all-container').clientHeight)
        if (prevScrollY.current < currentScrollY && goingUp) {
          setGoingUp(false);
        }
        if (prevScrollY.current > currentScrollY && !goingUp) {
          setGoingUp(true);
        }
        prevScrollY.current = currentScrollY;
        if(!goingUp && currentScrollY>(pageHeight/2) && pageCount<4){
          setPageCount(pageCount+1);  
          if(pageCount > 1 && pageCount < 4){
            dispatch(requestFilms(data,pageCount));
          }      
        }
    }, 50);
  }

  return (
    <div onScroll={onScroll} id="all-container"  className="overflow-scroll flex flex-col h-screen">
        <Header name="Romantic Comedy"/>
      <div key="0"   className="w-full mt-20 mb-20 h-screen container px-2 py-2 grid grid-cols-3 gap-2 mx-auto">

        {isLoading && <div className="loading">Data loading...</div>}
        {filmArray.length!== 0 && filmArray.map((data,key) => {

          return (                      
              <div  key={key}  className="w-full rounded px-0.5 py-1">
                  <img src={"images/"+data['poster-image']} alt="image"/>
                  <p className="text-white font-titillium text-sm text-opacity-60 py-1 px-1">{data.name}</p>
              </div>   
          );
        })}
        </div>
      </div>
  );
}

export default Home;
