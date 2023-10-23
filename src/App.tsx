import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUniversities } from './redux/slices/universitySlice';
import UniversityForm from './components/UniversityForm/UniversityForm';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    const dispatch = useDispatch();
     const [bgColor, setBgColor] = useState<string>('');

    useEffect(() => {
        axios.get('http://universities.hipolabs.com/search?country=United+States')
            .then(response => {
                response.data = response.data.slice(0, 30);
                dispatch(setUniversities(response.data));
            });
        const potentialColors = ['#FFDDC1', '#C2CFF0', '#E2FFC6', '#FFEBCD', '#FFD4D4'];
        let lastColors = JSON.parse(localStorage.getItem('lastColors') || '[]');

        let newColor;
        do {
            newColor = potentialColors[Math.floor(Math.random() * potentialColors.length)];
        } while (lastColors.includes(newColor));

        lastColors.push(newColor);
        if (lastColors.length > 5) {
            lastColors.shift();
        }
        localStorage.setItem('lastColors', JSON.stringify(lastColors));

        setBgColor(newColor);
    }, [dispatch]);

    return (
        <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
            <UniversityForm />
        </div>
    );
}

export default App;
