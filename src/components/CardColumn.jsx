import React from "react";
import "./componentStyle.css";
import Card from "./Card";

const statusSvgs = {
    "Backlog": require('../static/svgs/Backlog.svg').default,
    "Todo": require('../static/svgs/To-do.svg').default,
    "In progress": require('../static/svgs/in-progress.svg').default,
    "Done": require('../static/svgs/Done.svg').default,
    "Closed": require('../static/svgs/Cancelled.svg').default
};

const prioritySvgs = {
    0: require('../static/svgs/No-priority.svg').default,
    4: require('../static/svgs/SVG-Urgent_Priority_colour.svg').default,
    1: require('../static/svgs/Img-Low_Priority.svg').default,
    2: require('../static/svgs/Img-Medium_Priority.svg').default,
    3: require('../static/svgs/Img-High_Priority.svg').default
}

const priorityNames = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent'
};
const CardColumn = ({ title, tickets = [], grouping, ordering }) => {

    const isUserGrouping = grouping === 'User';
    const isPriorityGrouping = grouping === 'Priority';
    const nameAbbreviation = isUserGrouping ? getNameAbbreviation(title) : null;
    const randomColor = isUserGrouping ? getRandomColor() : null;

    return (
        <div className="cardColumn">
            <div className="cardColumnHeader">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    {isUserGrouping ? (
                        <div
                            style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                backgroundColor: randomColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: '10px',
                                padding: '2px'
                            }}
                        >
                            {nameAbbreviation}
                        </div>
                    ) : isPriorityGrouping ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src={prioritySvgs[title]}
                                alt={`Priority ${title}`}
                                style={{ width: '16px', height: '16px', marginRight: '8px' }}
                            />
                            <span>{priorityNames[title]}</span>
                        </div>
                    ) : (
                        <img
                            src={statusSvgs[title]}
                            alt={title}
                            style={{ width: '16px', height: '16px' }}
                        />
                    )}
                    <span>{title}</span>
                    <span style={{ color: '#9fa1a5' }}>{tickets.length}</span>
                </div>
                <div className="cardColumnHeaderButtonGrp">
                    <img
                        src={require('../static/svgs/add.svg').default}
                        alt="Add"
                        role="button"
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                    <img
                        src={require('../static/svgs/3_dot_menu.svg').default}
                        alt="Options"
                        role="button"
                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                    />
                </div>
            </div>
            <div className="cardList">
                {tickets.map((ticket, index) => (
                    <Card key={index} ticket={ticket} grouping={grouping} ordering={ordering} />
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

export default CardColumn;
