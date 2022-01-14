import loader from '../../img/loader.svg';
import s from './loader.module.css';

let Loader = (props) => {
    return (
            <div className={s.loader__wrapper}>
                <img src={loader} className={s.loader} alt='Loader'/>
            </div>
    )
}

export default Loader;