import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = axios.create({baseURL: "http://tech-screen.venteur.co/"});

export default class App extends React.Component {

  state = {
    zipcode: "",
    county: "",
    age: 18,
    gender: "male",
    smoker: "nonsmoker",
    term: "years10",
    minBenefitAmount: 0,
    maxBenefitAmount: 99999,
  }

  changeZip = (event) => {
    this.setState({ zipcode: event.target.value });
  }
  changeCounty = (event) => {
    this.setState({ county: event.target.value });
  }
  changeAge = (event) => {
    this.setState({ age: event.target.value });
  }
  changeGender = (event) => {
    this.setState({ gender: event.target.value });
  }
  changeSmoker = (event) => {
    this.setState({ smoker: event.target.value });
  }
  changeTerm = (event) => {
    this.setState({ term: event.target.value });
  }
  changeMinBen = (event) => {
    this.setState({ minBenefitAmount: event.target.value });
  }
  changeMaxBen = (event) => {
    this.setState({ maxBenefitAmount: event.target.value });
  }

  submitData = event => {
    event.preventDefault();
    let products = [];
    client.get('/Policies/Quote', {params:{zipCountyId:this.state.county, age:this.state.age, gender:this.state.gender, smoker:this.state.smoker}})
        .then(response => {
        console.log("response.data");
        for (let i = 0; i < response.data.length; i++) {
            products.push(<option value = {response.data[i].id}>{response.data[i].zipCountyId}, {response.data[i].carrierName}, {response.data[i].term}, {response.data[i].minBenefitAmount}, {response.data[i].maxBenefitAmount}, {response.data[i].annualPremiumRate}</option>);
        }
    })
    return products;
  }

  getCounties = event => {
    event.preventDefault();
    let counties = [];
    client.get('/ZipCounties', {params:{zip:this.state.zipcode}})
        .then(response => {
        console.log("response.data");
        for (let i = 0; i < response.data.length; i++) {
            counties.push(<option value = {response.data[i].id}>{response.data[i].city}, {response.data[i].state}, {response.data[i].country}</option>);
        }
    })
    return counties;
  }


  render() {
      return(
    <div className = "App">
    <header className = "App-header">
    <Container className = "Calculator">

      <Row className = "mb-3">
      <Navbar bg = "dark" variant = "dark">
        <Container>
        <Navbar.Brand>Benefits Calculator</Navbar.Brand>
        </Container>
    </Navbar>
    </Row>

    <Form onSubmit = {this.submitData.bind(this)}>

        <Row className = "mb-3">
            <Form.Group as = {Col} controlId = "formZipcode" size = "sm" onChange={this.changeZip.bind(this)}>
                <Form.Label >Zipcode</Form.Label>
                <Form.Control type = "text" placeholder = "Enter Zipcode"/>
            </Form.Group>
            <Form.Group as = {Col} controlId = "formCounty" size = "sm" onFocus={this.getCounties.bind(this)} onSelect={this.changeCounty.bind(this)}>
                <Form.Label>County</Form.Label>
                <Form.Select aria-label = "County">
                    <option>Select County</option>
                </Form.Select>
            </Form.Group>
        </Row>

        <Row className = "mb-3">
            <Form.Group as = {Col} controlId = "formAge" size = "sm" onBlur={this.changeAge.bind(this)}>
                <Form.Label>Age</Form.Label>
                <Form.Control type = "number" placeholder = "Enter Age"/>
            </Form.Group>
            <Form.Group as = {Col} controlId = "formGender" size = "sm" onSelect={this.changeGender.bind(this)}>
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label = "Gender">
                    <option value = "male">Male</option>
                    <option value = "female">Female</option>
                </Form.Select>
            </Form.Group>
        </Row>
        <Row className = "mb-3">
        <Form.Group as = {Col} controlId = "formSmoking" onChange={this.changeSmoker.bind(this)}>
            <Form.Check type = "checkbox" label = "Smoking"/>
        </Form.Group>
        </Row>
        <Row>
        <Button variant = "dark" type = "submit" value = "Submit">
            Submit
        </Button>
        </Row>

    </Form>
    </Container>

    <Container className = "Calculator">
        <Row className = "mb-3">
        <Navbar bg = "dark" variant = "dark">
        <Container>
        <Navbar.Brand>Benefits Calculator</Navbar.Brand>
            <Form>
            <Row className = "mb-3">
            <Form.Group as = {Col} controlId = "formMinBen">
                <Form.Label>Minimum Benefit Amount</Form.Label>
                <Form.Control type = "number" placeholder = "0"/>
            </Form.Group>
            <Form.Group as = {Col} controlId = "formMaxBen">
                <Form.Label>Maximum Benefit Amount</Form.Label>
                <Form.Control type = "number" placeholder = "99999"/>
            </Form.Group>
            <Form.Group as = {Col} controlId = "formTerm">
                <Form.Label>Term Length</Form.Label>
                <Form.Select aria-label = "Term Length">
                    <option value = "years10">10 Years</option>
                    <option value = "years20">20 Years</option>
                    <option value = "years30">30 Years</option>
                    <option value = "wholelife">Whole Life</option>
                </Form.Select>
            </Form.Group>
            </Row>
            </Form>
        </Container>
    </Navbar>
    </Row>
    <Container className = "Products">
    </Container>
    </Container>

    </header>
    </div>

  )
}
}