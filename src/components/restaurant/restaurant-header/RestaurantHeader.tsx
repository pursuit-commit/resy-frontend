import './RestaurantHeader.css';
import { IRestaurant, Price } from '../../../util/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
type PriceKeys = keyof typeof Price;

interface RestaurantHeaderProps {
    restaurant: IRestaurant;
}
export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {

    return (
        <div className='header-container'>
            <h1 className='header-title'>{restaurant.name}</h1>
            <div className='header-row'>
                <span className="">{restaurant.cuisine}</span>
                <div className='separator'></div>
                <span>{Price[restaurant.price as PriceKeys]}</span>
            </div>
            <div className='header-row'>
                <LocationOnIcon />
                <span>{restaurant.location}</span>
                </div>
        </div>
    );
}