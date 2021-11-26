import './css/styles.css';
import { fetchCountries } from './fetchCountries';
export {resetRender};
import Notiflix from 'notiflix';
import  debounce  from 'lodash.debounce'; 

const DEBOUNCE_DELAY = 300;
const setList=document.querySelector('.country-list');
const setRender=document.querySelector('.country-info');
let getCountry;
const inputCountry =document.querySelector('#search-box');

inputCountry.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(e)
{   
    getCountry = e.target.value.trim();    
    if(!getCountry)
    {
        resetRender();
        resetList();       
        return;
    }    
    fetchCountries(getCountry);    
}

function resetList()
{
    setList.innerHTML='';
}

function resetRender()
{
    setRender.innerHTML='';
} 