import React from 'react'
import { Spinner } from 'reactstrap'

const CustomSpinner = () => {
    return (
        <div className='LoadingContainer'>
            <div className='LoadingBox'>
                <Spinner color='danger' />
            </div>
        </div>
    )
}

export default CustomSpinner