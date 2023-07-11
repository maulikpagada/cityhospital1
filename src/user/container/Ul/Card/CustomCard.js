import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function CustomCard({ value }) {
    return (
        <Card
            style={{
                width: '18rem'
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
                    {value.desc}
                </CardText>
                {
                    value.valbtn ?
                        <Button>
                            Button
                        </Button> : null
                }

            </CardBody>
        </Card>
    );
}

export default CustomCard;