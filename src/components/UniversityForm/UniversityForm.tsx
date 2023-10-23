import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, FormControl, Pagination } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {
  addUniversity,
  editUniversity,
} from "../../redux/slices/universitySlice";

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
  const [filterText, setFilterText] = useState("");
  const [errors, setErrors] = useState({
    name: '',
    website: '',
    country: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  
  const universities = useSelector((state: any) => state.universities.data);
  const dispatch = useDispatch();
  
  const filteredUniversities = universities.filter((uni: any) =>
  uni.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const currentItems = filteredUniversities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUniversities.length / itemsPerPage);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    if (validate()) {
        setErrors({
            name: '',
            website: '',
            country: ''
          });          
      if (editData) {
        dispatch(editUniversity({ name, website, country }));
      } else {
        dispatch(addUniversity({ name, website, country }));
        setName(""); // Clear the fields after dispatching
        setWebsite("");
        setCountry("");
      }
    }
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = {
        name: '',
        website: '',
        country: ''
    };

    // Name validation
    if (!name || name.length < 3) {
        isValid = false;
        newErrors.name = "Name is required and should be at least 3 characters.";
    }

    // Website validation
    const urlPattern = new RegExp(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i);
    if (!website || !urlPattern.test(website)) {
        isValid = false;
        newErrors.website = "Please enter a valid website address.";
    }

    // Country validation
    const countryPattern = /^[a-zA-Z\s]*$/;
    if (!country || !countryPattern.test(country)) {
        isValid = false;
        newErrors.country = "Country should only contain alphabets.";
    }

    setErrors(newErrors);
    return isValid;
};


  useEffect(() => {
    console.log("Universities:", universities);
  }, [universities]);

  useEffect(() => {
    if (editData) {
      validate();
    }
  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {" "}
      {/* Parent div */}
      <div style={{ marginBottom: '20px', marginTop: '20px' }}>
        <FormControl
          type="text"
          placeholder="Filter by University Name"
          onChange={(e) => setFilterText(e.target.value)}
          style={{ width: '300px', marginBottom: '20px' }}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>University Name</th>
            <th>Country Name</th>
            <th>Website Address</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((uni: any) => (
            <tr key={uni.name}>
              <td>{uni.name}</td>
              <td>{uni.country}</td>
              <td>
                {uni.web_pages && uni.web_pages.length > 0 ? (
                  <a
                    href={uni.web_pages[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {uni.web_pages[0]}
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        />
        {Array.from({ length: totalPages }).map((_, index) => (
          <Pagination.Item 
            key={index + 1} 
            active={index + 1 === currentPage} 
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
      </Pagination>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">University Name</label>
            <Form.Control
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
            />
            <FormControl.Feedback type="invalid">
                {errors.name}
            </FormControl.Feedback>
        </div>

        <div className="mb-3">
            <label htmlFor="website" className="form-label">Website</label>
            <Form.Control
                type="text"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                isInvalid={!!errors.website}
            />
            <FormControl.Feedback type="invalid">
                {errors.website}
            </FormControl.Feedback>
        </div>

        <div className="mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <Form.Control
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                isInvalid={!!errors.country}
            />
            <FormControl.Feedback type="invalid">
                {errors.country}
            </FormControl.Feedback>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};

export default UniversityForm;
