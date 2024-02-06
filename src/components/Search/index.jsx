import style from './Search.module.scss'
import { SearchContext } from '../../App';
import { useContext } from 'react';

function Search() {
    const {searchValue, setSearchValue} = useContext(SearchContext)

    return (
        <div className={style.root}>
            <input onChange={(event) => setSearchValue(event.target.value)} value={searchValue} className={style.input} placeholder='Поиск пиццы...'/>
            <svg className={style.searchSvg} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_15_152)">
                <rect width="24" height="24" fill="white"/>
                <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" strokeLinejoin="round"/>
                <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"/>
                </g>
                <defs>
                <clipPath id="clip0_15_152">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
            </svg>

            {searchValue && (<svg onClick={() => setSearchValue('')} className={style.resetSvg} width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="#000000"/></svg>
            )}
        </div>
    );
}

export default Search;