import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getBookById } from '../redux/book/slice';
import { Card } from 'reactstrap';
import CustomSpinner from '../components/CustomSpinner';

const View = () => {
    const { profile, loading } = useSelector((store) => store.book);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookById(id))
    }, [id])

    return (
        <>
            {loading && <CustomSpinner />}
            <div className='container'>
                <Card className='w-50 border-0 shadow-lg p-3 mx-auto mt-5'>
                    <div className='d-flex gap-3 align-items-center mb-4'>
                        <img src={profile.coverImage} alt={profile.coverImage} height={50} width={50} className='rounded-circle' />
                        <h2 className='mb-0'>{profile.title}</h2>
                    </div>
                    <div className='d-flex'>
                        <p className='font-weight-bold'>Author:&nbsp;</p>
                        <p>{profile.author}</p>
                    </div>
                    <div className='d-flex'>
                        <p className='font-weight-bold'>Description:&nbsp;</p>
                        <p>{profile.description}</p>
                    </div>
                    <div className='d-flex'>
                        <p className='font-weight-bold'>Published Year:&nbsp;</p>
                        <p>{profile?.publicationYear?.split('-')[0]}</p>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default View