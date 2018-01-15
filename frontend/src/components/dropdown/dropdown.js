import React, { Component } from 'react';
import './dropdown.css';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaCheck from 'react-icons/lib/fa/check';

class Dropdown extends Component {
    state = {
        selection: ''
    }

    handleSelection = (selection) => {
        this.setState({selection: selection.label});
        if (selection.action) {
            selection.action(selection.label);
        }
    }

    render() {
        const {label, options} = this.props;
        const {selection} = this.state;
        return (
            <div className="dropdown">
                <div className="dropbtn">
                    {(selection.length > 0) && (
                        selection
                    )}
                    {(selection.length === 0) && (
                        label
                    )}
                    <FaAngleDown className="angle-down-icon"/>
                </div>
                <div className="dropdown-content">
                    {options.map(option => (
                        <div key={option.label} onClick={() => this.handleSelection(option)}>
                            {(option.label === selection) && (<FaCheck size={10} className="check-icon"/>)}
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Dropdown;