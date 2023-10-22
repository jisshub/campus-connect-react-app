import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { addUniversity, editUniversity } from '../../redux/slices/universitySlice';

interface Props {
    editData?: {
        name: string;
        website: string;
        country: string;
    };
}

const UniversityForm: React.FC<Props> = ({ editData }) => {
    const [name, setName] = useState(editData?.name || "");
    const [website, setWebsite] = useState(editData?.website || "");
    const [country, setCountry] = useState(editData?.country || "");

    const universities = useSelector((state: any) => state.universities.data);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (validate()) {
            if (editData) {
                dispatch(editUniversity({ name, website, country }));
            } else {
                dispatch(addUniversity({ name, website, country }));
            }
        }
    };

    useEffect(() => {
        console.log("Universities:", universities);
    }, [universities]);

    const validate = (): boolean => {
        // Implement validation logic
        return true;
    };

    return (
        <div>  {/* Parent div */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>University Name</th>
                        <th>Country Name</th>
                        <th>Website Address</th>
                    </tr>
                </thead>
                <tbody>
                    {universities.map((uni: any) => (
                        <tr key={uni.name}>
                            <td>{uni.name}</td>
                            <td>{uni.country}</td>
                            <td><a href={uni.web_pages[0]} target="_blank" rel="noopener noreferrer">{uni.web_pages[0]}</a></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <form onSubmit={handleSubmit}>
                {/* Input fields and validation logic */}
            </form>
        </div>
    );
}

export default UniversityForm;
