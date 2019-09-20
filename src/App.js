import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Card,
  CardBody
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { api } from "./api/config";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

class App extends Component {
  componentDidMount() {
    axios
      .get(api)
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
  render() {
    return (
      <div>
        <header style={{ backgroundColor: "#eaeaea" }}>
          <Container>
            <Row className="py-3">
              <Col md={12}>
                <FormGroup>
                  <Input type="text" placeholder="Search...." />
                </FormGroup>
              </Col>
              <Col md={6} className="my-3">
                <h6>Furniture Style</h6>
                <Select
                  defaultValue={[options[1]]}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
              <Col md={6} className="my-3">
                <h6>Delivery Time</h6>
                <Select options={options} />
              </Col>
            </Row>
          </Container>
        </header>
        <div className="py-3">
          <Container>
            <Row>
              <Col md={4}>
                <Card>
                  <CardBody>
                    <h5>
                      Product Name{" "}
                      <span
                        className="float-right mt-1"
                        style={{ fontSize: "14px", color: "#DAA520" }}
                      >
                        price
                      </span>
                    </h5>
                    <p>Desc</p>
                    <p>Furniture Style</p>
                    <p className="text-right">Delivery Time</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
