import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function CustomCard({ value, btnval, onclick1 }) {
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

            <CardBody>
                <CardTitle tag="h5">
                    {value.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {value.date}
                </CardSubtitle>
                <CardText>
                    {value.price}
                </CardText>
                <CardText>
                    {value.desc.substring(0,100)}
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