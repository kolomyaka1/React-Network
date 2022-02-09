import { useState } from 'react';
import s from './paginator.module.css'
import cn from 'classnames'
import { PropsType } from '../../types/types';




let Pagination: React.FC<PropsType> = ({ totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    
    let pagesCount = Math.ceil(totalUsersCount / pageSize); // Считаем кол-во наших страниц

    let pages = [];  // Делаем массив с нашими страницами
    for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)  // Счетчик порций
    let [portionNumber, setPortionNumber] = useState(1);  // Устанавливаем current порцию и функцию для ее изменения
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1; 
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={s.paginator}>
            {portionNumber > 1 &&
                <button className={s.portion__button} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

            {pages 
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return (
                        <span className={cn({
                            [s.selectedPage] : currentPage === p
                        }, s.pageNumber) }
                        key={p}
                        onClick={(e) => {
                            onPageChanged(p);
                        }}
                        >{p}</span>
                    )
                })
            }
            {portionCount > portionNumber && 
                <button className={s.portion__button} onClick={() => { setPortionNumber(portionNumber + 1)}}>NEXT</button>
            }    
        </div>
    )
}

export default Pagination;