import React, { useMemo } from "react";
import CardColumn from "./CardColumn";
import "./componentStyle.css";

const Dashboard = ({ grouping, ordering, data }) => {
    //I have memoised the data to avoid re-rendering the component when the data changes
    const filteredData = useMemo(() => {
        if (!data || !data.tickets) {
            return {};
        }
        // Grouping the data based on the selected grouping
        let groupedData = {};

        if (grouping === 'Status') {
            groupedData = {
                Backlog: [],
                Todo: [],
                'In progress': [],
                Done: [],
                Closed: []
            };

            data.tickets.forEach(ticket => {
                if (groupedData[ticket.status]) {
                    const user = data.users.find(user => user.id === ticket.userId) || {};
                    groupedData[ticket.status].push({
                        ...ticket,
                        userAvailable: user.available || false,
                        userName: user.name || 'Unknown User'
                    });
                }
            });
        } else if (grouping === 'User') {
            const userMap = data.users.reduce((acc, user) => {
                acc[user.id] = { name: user.name, available: user.available };
                return acc;
            }, {});

            groupedData = data.tickets.reduce((acc, ticket) => {
                const user = userMap[ticket.userId] || { name: 'Unknown User', available: false };
                const userName = user.name;
                if (!acc[userName]) {
                    acc[userName] = [];
                }
                acc[userName].push({
                    ...ticket,
                    userAvailable: user.available,
                    userName: user.name
                });
                return acc;
            }, {});
        } else if (grouping === 'Priority') {
            groupedData = {
                0: [],
                1: [],
                2: [],
                3: [],
                4: []
            };

            data.tickets.forEach(ticket => {
                if (groupedData[ticket.priority] !== undefined) {
                    const user = data.users.find(user => user.id === ticket.userId) || {};
                    groupedData[ticket.priority].push({
                        ...ticket,
                        userAvailable: user.available || false,
                        userName: user.name || 'Unknown User'
                    });
                }
            });
        }

        Object.keys(groupedData).forEach(key => {
            groupedData[key].sort((a, b) => {
                if (ordering === 'Priority') {
                    return a.priority - b.priority;
                } else if (ordering === 'Title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        });

        return groupedData;
    }, [grouping, ordering, data]);

    const cardColumns = useMemo(() => {
        const priorityOrder = [0, 4, 1, 2, 3];
        const keys = grouping === 'Priority' ? priorityOrder : Object.keys(filteredData);
        
        return keys.map(key => (
            <CardColumn
                key={key} 
                title={key} 
                tickets={filteredData[key]} 
                grouping={grouping} 
                ordering={ordering} 
                data={data}
            />
        ));
    }, [filteredData, grouping, ordering, data]);

    return (
        <div className="dashboardContent">
            {cardColumns}
        </div>
    );
};

export default Dashboard;