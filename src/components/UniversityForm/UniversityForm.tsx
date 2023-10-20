import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';

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
    // useSelector hook to get the universities from the store
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
        // log uniersities to the console
        console.log("Universities:", universities);
    }, [universities]);

    const validate = (): boolean => {
        // Implement validation logic
        return true;
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields and validation logic */}
        </form>
    );
}

export default UniversityForm;
