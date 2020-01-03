import React from 'react';
import './SideBar.css';

export default function SideBar({ className, ...props}) {
    return ( 
        <div className={['SideBar', className].join(' ')} {...props} />
    );
}