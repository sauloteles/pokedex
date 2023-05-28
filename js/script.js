const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-img');
const pokedexForm = document.querySelector('.pokedex-form');
const pokedexSearch= document.querySelector('.pokedex-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');


let numPokemon = 1;
let listPokemon;
const fetchPokemon = async (pokemon) =>{
    const APIreponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIreponse.status == 200){ 
        const data = await APIreponse.json();
        return  data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if(data){ 
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        listPokemon = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        numPokemon = data.id;

    }else{
        pokemonImg.style.display = 'none'
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
        numPokemon = listPokemon;

    }
}

renderPokemon(numPokemon);

pokedexForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    renderPokemon(pokedexSearch.value.toLowerCase());
    numPokemon = pokedexSearch.value;
    pokedexSearch.value = ''
})

btnNext.addEventListener('click',  ()=>{
    ++numPokemon;
    renderPokemon(numPokemon);
})

btnPrev.addEventListener('click', ()=>{
    if(numPokemon != 1){
        --numPokemon;
        renderPokemon(numPokemon);
    }
    
})
//alterar
