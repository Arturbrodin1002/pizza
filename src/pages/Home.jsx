import React from 'react';
import { setCategoryId } from '../redux/slices/filterSlice';
import { useState, useEffect, useContext } from 'react';
import PizzaBlock from '../components/PizzaBlock/';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sortProperty);

  const onClickCategories = (id) => {
    dispatch(setCategoryId(id));
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoadind, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType;
    console.log('sortBy:', sortBy);
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(
      `https://630366f50de3cd918b349696.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}`, //order=${order},
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj, index) => (
      <PizzaBlock
        key={index}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        types={obj.types}
        sizes={obj.sizes}
      />
    ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategories={onClickCategories} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoadind ? skeleton : pizzas}</div>
      <Pagination changePage={(number) => setCurrentPage(number)} />
    </>
  );
};

export default Home;
