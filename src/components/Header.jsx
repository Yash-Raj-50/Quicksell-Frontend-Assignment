import React, { useState, useEffect, useRef } from "react";
import "./componentStyle.css";

const groupings = ['Status', 'User', 'Priority'];
const orderings = ['Priority', 'Title'];

const Header = ({grouping, ordering, onChangeGroup, onChangeOrder}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="headerContent">
            <button className="headerButton" onClick={toggleDropdown}>
                <img src={require('../static/svgs/Display.svg').default} alt="Display" />
                <span>Design</span>
                <img src={require('../static/svgs/down.svg').default} alt="Down" />
            </button>
            <div style={{position:'absolute'}}>
                {isDropdownOpen && (
                    <div className="dropdownDialog" ref={dropdownRef}>
                        <div className="dropdownField">
                            <label htmlFor="grouping">Grouping:</label>
                            <select 
                                className="dropSelect" 
                                id="grouping" 
                                name="grouping" 
                                value={grouping} 
                                onChange={(e) => onChangeGroup(e.target.value)}
                            >
                                {groupings.map((group, index) => (
                                    <option key={index} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>
                        <div className="dropdownField">
                            <label htmlFor="ordering">Ordering:</label>
                            <select 
                                className="dropSelect" 
                                id="ordering" 
                                name="ordering" 
                                value={ordering} 
                                onChange={(e) => onChangeOrder(e.target.value)}
                            >
                                {orderings.map((order, index) => (
                                    <option key={index} value={order}>{order}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;