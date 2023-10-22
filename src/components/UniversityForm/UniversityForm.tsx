import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Button } from "react-bootstrap";
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

  const universities = useSelector((state: any) => state.universities.data);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    if (validate()) {
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

  useEffect(() => {
    console.log("Universities:", universities);
  }, [universities]);

  const validate = (): boolean => {
    // Implement validation logic
    return true;
  };

  return (
    <div>
      {" "}
      {/* Parent div */}
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
                  "N/A" // Placeholder text when web_pages is not available
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="universityName">
          <Form.Label>University Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter University Name"
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter Country Name"
          />
        </Form.Group>

        <Form.Group controlId="website">
          <Form.Label>Website Address</Form.Label>
          <Form.Control
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter Website Address"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UniversityForm;
