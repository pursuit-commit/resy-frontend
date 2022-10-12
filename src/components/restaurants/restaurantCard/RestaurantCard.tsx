import { IRestaurant } from "../../../util/types";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './RestaurantCard.css';
import React from "react";

interface RestaurantCardProps {
    restaurant: IRestaurant;
}

export default class RestaurantCard extends React.Component<RestaurantCardProps> {
    render() {
        return (
            <Card className="restaurant-card" sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={require(`../../../media/images/restaurant-${Math.floor(Math.random() * 5 + 1)}.jpg`)}
                    alt="restaurant"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {this.props.restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                    }}>
                        {this.props.restaurant.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" href={'restaurants/' + this.props.restaurant.id}>More...</Button>
                </CardActions>
            </Card>
        );
    }

}