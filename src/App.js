import React, { useState, useEffect }  from 'react';
import './App.css';

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function App() {
 const [buttons] = useState(['A','B','C','Ç','D','Dh','E','Ë','F','G','Gj','H','I','J','K','L','Ll','M','N','Nj','O','P','Q','R','Rr','S','Sh','T','Th','U','V','X','Xh','Y','Z','Zh','Gjth'])
 const [data,setData]=useState([]);
 const [letter,setLetter]=useState('A');
 const [gender,setGender]=useState(0);
 const [meaning,setMeaning]=useState(1);
 const [nameLength,setNameLength]=useState(0);
 const [filteredData,setFilteredData]=useState([]);
 const [isClicked, setIsClicked] = useState(false);
 const letterClickHandler = (e) => {
  setLetter(e.target.value.toUpperCase());
  getData(true);
  setFilteredData(data.filter(f => (e.target.value.toLowerCase()==="gjth" || f.name.toUpperCase().startsWith(e.target.value.toUpperCase())))
  .filter(f => (f.gender?.toString()===gender?.toString() || gender?.toString()==="0"))
  .filter(f => (f.name_type?.toString()===meaning?.toString() || meaning?.toString()==="0"))
  .filter(f => (f.name_length?.toString()===nameLength?.toString() || nameLength?.toString()==="0"))
  .sort(function(a, b) {
    return compareStrings(a.name, b.name);
  }))
  //todo set bgcolor
 }

 const getData=(letterClicked)=>{
  fetch('data.json'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(function(response){
      return response.json();
    })
    .then(function(myJson) {
      setData(myJson)
      if(!letterClicked)
        setFilteredData(myJson.filter(f => f.name.toUpperCase().startsWith('A'))
        .filter(f => (f.gender?.toString()===gender?.toString() || gender?.toString()==="0"))
        .filter(f => (f.name_type?.toString()===meaning?.toString() || meaning?.toString()==="0"))
        .filter(f => (f.name_length?.toString()===nameLength?.toString() || nameLength?.toString()==="0"))
        .sort(function(a, b) {
          return compareStrings(a.name, b.name);
        }))
    });
}

const genderHandler = (e) => {
  setGender(e.target.value);
}

const meaningHandler = (e) => {
  setMeaning(e.target.value);
}

const nameLengthHandler = (e) => {
  setNameLength(e.target.value);
}

const handleLogoClick = (e) => {
  window.location.reload(false);
}

useEffect(()=>{
  getData(false)  
 
},[])

useEffect(()=>{
  setFilteredData(data.filter(f => (letter.toLowerCase()==="gjth" || f.name.toUpperCase().startsWith(letter)))
  .filter(f => (f.gender?.toString()===gender?.toString() || gender?.toString()==="0"))
  .filter(f => (f.name_type?.toString()===meaning?.toString() || meaning?.toString()==="0"))
  .filter(f => (f.name_length?.toString()===nameLength?.toString() || nameLength?.toString()==="0"))
  .sort(function(a, b) {
    return compareStrings(a.name, b.name);
  }))  
},[gender,meaning,nameLength,data,letter])


 return (
  <div>

  <div className="flex justify-center mt-5">
    <div className="block p-6 rounded-lg shadow-lg bg-white w-[720px]">
    <div className="lg:hidden sm:block grid place-items-center">
      <a href="." onClick={handleLogoClick}><img alt="logo" className="object-contain h-16 cursor-pointer" src="images/emra_logo.png" /></a>
    </div>
    <div className="mb-3 ml-5 grid  grid-flow-col">
    <div className="sm:hidden lg:block">
      <a href="." onClick={handleLogoClick}><img alt="logo" className="object-contain h-16 cursor-pointer" src="images/emra_logo.png" /></a>
    </div>
    <div>
    <label htmlFor="genders" className="text-black">Gjinia:</label>
    <div className="flex">
    <select id="genders" onChange={genderHandler} className="g-indigo-50 border border-indigo-300 text-indigo-900 text-lg font-medium	rounded focus:ring-indigo-500 focus:border-indigo-500 w-25 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
      <option value="0">-Gjitha-</option>
      <option value="1">Mashkull</option>
      <option value="2">Femër</option>
    </select>
    </div>
    </div>
    <div>
    <label htmlFor="meanings" className="text-black">Lloji:</label>
    <div className="flex">
    <select id="meanings" defaultValue="1" onChange={meaningHandler} className="g-indigo-50 border border-indigo-300 text-indigo-900 text-lg font-medium	rounded focus:ring-indigo-500 focus:border-indigo-500 w-25 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
      <option value="0">-Gjithë-</option>
      <option value="1">Fjalë e shqipes</option>
      <option value="2">Emër vendi</option>
      <option value="3">Emër i vjetër</option>
      <option value="4">Emër ilir</option>
      <option value="5">Emër mylsiman</option>
    </select>
    </div>
    </div>

    <div>
    <label htmlFor="lengths" className="text-black">Gjatësia:</label>
    <div className="flex">
    <select id="lengths" onChange={nameLengthHandler} className="g-indigo-50 border border-indigo-300 text-indigo-900 text-lg font-medium rounded focus:ring-indigo-500 focus:border-blindigoue-500 w-25 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500">
      <option value="0">-Gjitha-</option>
      <option value="1">I shkurtë</option>
      <option value="2">I mesëm</option>
      <option value="3">I gjatë</option>
    </select>
    </div>
    </div>
  
    </div>
      <div className="ml-8">
      <p>Fillon me shkronjën:</p>
      {buttons.map((btn,index)=>{
        return(
          <button onClick={letterClickHandler} id={btn} type="button" className="inline-block py-2.5 m-1 bg-indigo-900 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500 focus:shadow-lg w-8 focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" key={index} value={btn} >{btn}</button>
        )
      })}
      </div>
    </div>
      
  </div>


  <div className="flex justify-center mt-5">
    <div className="block p-6 rounded-lg shadow-lg bg-white w-[720px]">
        
    <div className="overflow-x-auto relative shadow-md">
    <a href="https://ko-fi.com/K3K0RDS3L" target="_blank"><img height="36" className="kofi-image" src="https://storage.ko-fi.com/cdn/kofi1.png?v=3" border="0" alt="Buy Me a Coffee at ko-fi.com" /></a>
    <p className="resultsInfo"><strong>82</strong> emra plotësojnë kushtet e parashtruara për kërkim:</p>    
    <table className="w-full text-sm text-left">
        <thead className="text-xs text-white uppercase bg-violet-700">
            <tr>
                <th scope="col" className="py-3 px-6 text-base">
                    EMRI
                </th>
                <th scope="col" className="py-3 px-6 text-base">
                    GJINIA
                </th>
                <th scope="col" className="py-3 px-6 text-base">
                    KUPTIMI
                </th>
            </tr>
        </thead>
        <tbody>

         { filteredData && filteredData.length>0 && filteredData.map((item,i)=>

            <tr key={i} className="border-b dark:bg-gray-800 dark:border-gray-700 even:bg-violet-300 odd:bg-violet-200">
                <td className="py-4 px-6 font-medium text-white-900 whitespace-nowrap  text-lg">
                    {item.name}
                </td>
                <td className="py-4 px-6 text-gray-900">
                  {item.gender===1? <img alt="mashkull" src="images/male.png" /> : <img alt="femër" src="images/female.png" /> }
                </td>
                <td className="py-4 px-6 text-gray-900 text-lg">
                  {item.meaning}
                </td>
            </tr>
         ) }
        </tbody>
    </table>
    </div>
    <footer className="text-center lg:text-left">
      <div className="text-gray-700 text-center p-4">
          ©2022 EMRA.info
      </div>
    </footer>
    </div>
  </div>


 

  </div>  

  );
}

export default App;
