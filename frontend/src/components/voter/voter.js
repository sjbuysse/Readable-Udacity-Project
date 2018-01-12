import React from 'react';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
import ChevronUp from 'react-icons/lib/fa/chevron-up';
import './voter.css';

const Voter = ({id, voteUp, voteDown}) => {
    return (
        <div className="voter">
            <div>
                <ChevronUp className="vote-button" onClick={() => voteUp(id)}/>
            </div>
            <div>
                <ChevronDown className="vote-button" onClick={() => voteDown(id)}/>
            </div>
        </div>
    )
};

export default Voter;