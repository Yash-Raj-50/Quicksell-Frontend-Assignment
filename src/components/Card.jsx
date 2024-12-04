import React from "react";
import "./componentStyle.css";

const prioritySvgs = {
    0: require('../static/svgs/No-priority.svg').default,
    1: require('../static/svgs/Img-Low_Priority.svg').default,
    2: require('../static/svgs/Img-Medium_Priority.svg').default,
    3: require('../static/svgs/Img-High_Priority.svg').default,
    4: require('../static/svgs/SVG-Urgent_Priority_colour.svg').default
};

const Card = ({ ticket, grouping }) => {
    const nameAbbreviation = getNameAbbreviation(ticket.userName);
    const randomColor = getRandomColor();
    console.log(ticket);
    return (
        <div className="card">
            <div className="cardHeader">
                <span>{ticket.id}</span>
                {grouping !== 'User' && <div
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: randomColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '10px',
                        padding: '2px',
                        position: 'relative'
                    }}
                >
                    {nameAbbreviation}
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: ticket.userAvailable ? '#e0b20e' : '#dededc',
                            position: 'absolute',
                            bottom: '-2px',
                            right: '-2px'
                        }}
                    />
                </div>}
            </div>
            <div className="cardBody">
                <span style={{ fontWeight: '550' }}>{ticket.title}</span>
            </div>
            <div className="cardFooter">
                {grouping !== 'Priority' && (
                    <img
                        src={prioritySvgs[ticket.priority]}
                        alt={`Priority ${ticket.priority}`}
                        className="footerIcon"
                    />
                )}
                {ticket.tag && ticket.tag.map((tag, index) => (
                    <span key={index} className="footerTag">
                        <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#c0c2c2',
                        }}
                    />{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

const getNameAbbreviation = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
    }
    return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default Card;