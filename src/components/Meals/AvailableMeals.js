import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import { useCallback, useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];



const AvailableMeals = () => {
  const [error, setError] = useState();
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMenus = useCallback(async () => {
    try{
      const response = await fetch('https://react-http-1d85c-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);

      const loadedMenus = [];
      for(let key in data){
        loadedMenus.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMenus(loadedMenus);
      setIsLoading(false);
    }catch(error){
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);


  if(isLoading){
    return(
      <section>
        <p className={classes.loading}>Loading...</p>
      </section>
    )
  }
  if(error){
    return(
      <section>
        <p className={classes.error}>{error}</p>
      </section>
    )
  }


  const mealsList = menus.map(meal => 
  <MealItem 
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
  />)
  return(
      <section className={classes.meals}>
          <Card>
              <ul>{mealsList}</ul>
          </Card>
      </section>
  );
};

export default AvailableMeals;
