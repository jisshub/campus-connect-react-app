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
              // only fetch 20 universities
                response.data = response.data.slice(0, 20);
                dispatch(setUniversities(response.data));
            });
    }, [dispatch]);

    // rest of the components, UI and logic...

    return (
        <div>
            <UniversityForm />
        </div>
    );
}

export default App;
