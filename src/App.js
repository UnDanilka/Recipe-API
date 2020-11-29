import React,{useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    const APP_ID = '93210685';
    const APP_KEY = 'cc36b81765e43c66bdf858e63db63fe3';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;


    useEffect(()=>{
      getRecipes();
    }, [query]);

    const getRecipes = async () =>{
        const response = await fetch(url);
        const data = await response.json();
        setRecipes(data.hits);
    }

    const getSearch = (e) =>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    const updateSearch=(e)=>{
        setSearch(e.target.value)
    }

    return (
        <div className="App">
            <form className='search-form' onSubmit={getSearch}>
                <input className='search-bar' type='text' value={search} onChange={updateSearch}></input>
                <button className='search-button' type='submit'>search</button>
            </form>
            <div className='recipes'>
            {recipes.map(recipe =>(
                <Recipe
                key={recipe.recipe.calories}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                />
            ))}
            </div>
        </div>
    );
}

export default App;


