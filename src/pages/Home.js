import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { booksList } from '../redux/book/slice';
import CustomSpinner from '../components/CustomSpinner';
import { Eye } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { data, loading } = useSelector((store) => store.book);
    const [searchItem, setSearchItem] = useState('')
    const [filteredData, setFilteredData] = useState(data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredData(data)
    }, [data])

    useEffect(() => {
        dispatch(booksList());
    }, []);

    const handleInputChange = (e) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = data.filter((user) =>
            user.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filteredItems);
    };

    return (
        <>
            {loading &&
                <CustomSpinner />
            }
            <div className='container shadow-lg p-0 mt-5 bg-white rounded'>
                <div className='py-3 px-3'>
                    <input
                        className='w-100 p-2 border border-white bg-light rounded'
                        type="text"
                        value={searchItem}
                        onChange={handleInputChange}
                        placeholder='Type to search'
                    />
                </div>
                <table className='w-100 table table-striped text-center'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <td className='py-4'>
                                        {item.id}
                                    </td>
                                    <td>
                                        <img src={item.coverImage} alt={item.coverImage} className='rounded-circle' height={50} width={50} />
                                    </td>
                                    <td className='py-4'>
                                        {item.title}
                                    </td>
                                    <td className='py-4'>
                                        {item.author}
                                    </td>
                                    <td>
                                        <div role="button" className='py-3' onClick={() => navigate(`/${item.id}`)}>
                                            <Eye color='gray' size={15} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {!filteredData.length && <p className='text-center pb-3'>No data found.</p>}
            </div>
        </>
    )
}

export default Home