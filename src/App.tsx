import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUniversities } from './redux/slices/universitySlice';
import UniversityForm from './components/UniversityForm/UniversityForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://universities.hipolabs.com/search?country=United+States')
            .then(response => {
                response.data = response.data.slice(0, 30);
                dispatch(setUniversities(response.data));
            });
    }, [dispatch]);

    return (
        <div>
            <UniversityForm />
        </div>
    );
}

export default App;
