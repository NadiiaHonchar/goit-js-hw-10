export {fetchCountries};
import './css/styles.css';
import renderTemplate from './templates/render.hbs';
import renderList from './templates/renderList.hbs';
import {resetRender} from './index';
import Notiflix from 'notiflix';

const setRender=document.querySelector('.country-info');  
const setRenderList = document.querySelector('.country-list');

function fetchCountries(name) {   
    fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)       
    .then(response =>
    {      
        if(response.status == 404) 
        {
            // throw ("Oops, there is no country with that name");
            throw Notiflix.Notify.failure(
                'Oops, there is no country with that name',
                {
                  timeout: 1500,
                },
              );
            return;
        }         
        return response.json();
    })
    .then(array =>{
        if(array.length>10)
        {
            resetRender();
            resetRenderList();            
            Notiflix.Report.info('Too many matches found. Please enter a more specific name.');
            return;           
        };
        if(array.length>1 && array.length<=10)
        {
            resetRender();
            resetRenderList()
            renderCountryList(array);
            return;           
        };  
        resetRender(); 
        resetRenderList()     
        renderCountry(array);
    })
    .catch(error =>console.log(error))  
};

function renderCountry(country)
{
    const markup = renderTemplate(country);
    setRender.innerHTML=markup;  
}

function renderCountryList(item)
{
    const markupList = renderList(item);
    setRenderList.innerHTML=markupList;
}

function resetRenderList()
{
    setRenderList.innerHTML='';
} 
