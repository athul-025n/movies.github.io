import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchFilms } from "../action";

function Header(props) {

  const { filmsData, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [searchFlag, setSearchFlag] = useState(false);

  function openSearch (e) {
    setSearchFlag(true)
  }
  function cancelSearch (e) {
    setSearchFlag(false)
  }
  function handleChange (e) {
    var text = e.target.value
    dispatch(searchFilms(text));
  }
  return (
      <nav className="bg-black fixed w-screen shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div onClick={cancelSearch} className="flex items-center h-full mb-2">
              <div className="flex-shrink-0 mt-8">
                <img
                  className="h-5 w-5"
                  src="images/Back.png"
                  alt="Workflow"
                />
              </div>
            </div>
            {!searchFlag &&
              <div className="flex items-left w-full h-full">
                <div className="flex-shrink-0 mt-8 px-4">
                  <p className="text-white text-lg font-titillium">{props.name}</p>
                </div>
              </div> 
            }
            {searchFlag &&
                <div className="flex items-left w-full h-full">
                  <div className="flex-shrink-0 mt-8 px-4">
                  <input  type="text" className="bg-black text-white w-auto  h-8 mt-auto px-2 pb-1.5 text-primary outline-none text-base font-light rounded-md" placeholder="Search..." name="filterText" onChange={handleChange}/>
                  </div>
              </div>
            }

            <div onClick={openSearch} className="flex items-center h-full">
              {!searchFlag &&
                  <div className="mr-2 flex md:hidden mt-8">
                      <img
                      className="h-5 w-5"
                      src="images/search.png"
                      alt="Workflow"
                      />
                  </div>
              }
            </div>
          </div>
        </div>
      </nav>
  );
}
export default Header;