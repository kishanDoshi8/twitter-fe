import React from 'react';

const Nav = ({isSelected, children}) => {
    return (
        <>
            {isSelected ? (
                <div> {children} </div>
            ) : null}
        </>
    );
}

export default Nav;