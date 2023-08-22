import React, { useContext } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import FavoriteBorderIcon from '@mui/icons-material/Favorite';
import { ThemeContext } from '../../../context/ThemeContext';

function CustomCard({ value, btnval, onclick1, favItem }) {
    
    const theme = useContext(ThemeContext)
    return (
        <Card
            style={{
                width: '18rem',
                height: '15rem',

            }}
        >
            {
                value.url ?
                    <img
                        alt="Sample"
                        src="https://picsum.photos/300/200"
                    /> : null
            }

            <CardBody className={`${theme.theme}`}>
                <CardTitle tag="h5" className={`${theme.theme}`}>
                    {value.name}
                    <FavoriteBorderIcon onClick={() => favItem(value.id)} sx={{ color: "red", position: 'absolute', right: '30px' }} />

                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {value.date}
                </CardSubtitle>
                <CardText className={`${theme.theme}`}>
                    {value.price}
                </CardText>
                <CardText>
                    {value.desc.substring(0, 100)}
                    {value.desc.length > 50 ? '...' : ''}
                </CardText>

                {
                    btnval ? <Button onClick={() => onclick1(value.id)}>
                        {btnval}
                    </Button> : null
                }

            </CardBody>
        </Card>
    );
}

export default CustomCard;