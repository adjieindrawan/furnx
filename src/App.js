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

const options_style = [
  { value: "Classic", label: "Classic" },
  { value: "Midcentury", label: "Midcentury" },
  { value: "Scandinavian", label: "Scandinavian" },
  { value: "Modern", label: "Modern" },
  { value: "Contemporary", label: "Contemporary" }
];

const options_date = [
  { value: "1", label: "1 Week" },
  { value: "2", label: "2 Week" },
  { value: "3", label: "3 Week" },
  { value: "4", label: "4 Week" }
];

class App extends Component {
  state = {
    furnitures: [],
    search: ""
  };

  renderSearch = (furniture_box, i) => {
    return (
      <Col md={4} className="my-2" key={i}>
        <Card>
          <CardBody>
            <p className="font-weight-bold">
              {furniture_box.name}
              <span
                className="float-right text-warning mt-1"
                style={{ fontSize: "14px" }}
              >
                IDR{" "}
                {furniture_box.price
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
              </span>
            </p>
            <p className="text-muted">
              {furniture_box.description.substring(0, 114)}
              {furniture_box.description.length > 114 && "..."}
            </p>
            <p className="text-primary">
              {furniture_box.furniture_style.join(", ")}
            </p>
            <p className="text-right">{furniture_box.delivery_time}</p>
          </CardBody>
        </Card>
      </Col>
    );
  };

  onchange = e => {
    this.setState({ search: e.target.value });
  };

  componentDidMount() {
    axios.get(api).then(res => {
      const furnitures = res.data.products;
      this.setState({ furnitures });
    });
  }

  render() {
    const { search, furnitures } = this.state;
    const filteredFurniture = furnitures.filter(furniture_box => {
      return (
        furniture_box.name.toLowerCase().indexOf(search.toLowerCase()) !== 1
      );
    });
    return (
      <div>
        <header style={{ backgroundColor: "#eaeaea" }}>
          <Container>
            <Row className="py-3">
              <Col md={12}>
                <FormGroup>
                  <Input
                    value={search}
                    type="text"
                    onChange={this.onchange}
                    placeholder="Search...."
                  />
                </FormGroup>
              </Col>
              <Col md={6} className="my-3">
                <h6>Furniture Style</h6>
                <Select
                  defaultValue={[options_style[1]]}
                  isMulti
                  name="colors"
                  options={options_style}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Col>
              <Col md={6} className="my-3">
                <h6>Delivery Time</h6>
                <Select options={options_date} />
              </Col>
            </Row>
          </Container>
        </header>
        <div className="py-3">
          <Container>
            <Row>
              {filteredFurniture.map(furniture_box => {
                return this.renderSearch(furniture_box);
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
