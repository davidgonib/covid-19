import React from 'react'
import '../css/infoBox.css';


import { Card } from 'react-bootstrap';

function InfoBox(props) {
    return (
        <Card 
            className="infoBox text-center py-2"
            border="white"
            onClick={props.onClick}>
            <Card.Subtitle className="text-secondary">{props.title}</Card.Subtitle>
            <Card.Text className="currentCases font-weight-bold  text-info mb-0">{props.currentCases}</Card.Text>
            <Card.Text className="increasePercentCases mb-0">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-up-fill" fill="#17a2b8" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
                {props.increasePercentCases} respecto último dato
            </Card.Text>
            <Card.Text className="previousCases">{props.previousCases}</Card.Text>
        </Card>
    )
}

export default InfoBox
