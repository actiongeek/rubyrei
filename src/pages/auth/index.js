import React from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import Layout from "./layout";
import { FormGroup, InputGroup, Button, Classes, /*Toaster, Position, Intent*/ } from "@blueprintjs/core";
import SectionWrapper from '../../components/SectionWrapper';
import { AxiosClient } from "../../components/Utils";

var AuthService = null;
if (typeof window !== `undefined`) {
    AuthService = require("../../components/Utils").Auth;
}

const MainWrapper = styled.div`
    display: block;
    max-width: 560px;
    margin: 0 auto;
    margin-top: 48px;

    h1, h2 {
        display: block;
        text-align: center;
    }

    h2 {
        font-weight: 400;
        font-size: 1.2em;
    }
`;

const Form = styled.form`
    background-color: #f2f2f2;
    padding: 40px;
    margin-top: 40px;

    .form-group {
        margin-bottom: 32px;
    }

    .${Classes.FORM_GROUP} label.${Classes.LABEL} {
        margin-bottom: 8px;
    }
`;

/*
const ErrorToaster = Toaster.create({
    className: 'error-toaster',
    intent: Intent.DANGER,
    position: Position.TOP
}); 
*/

class AuthPage extends React.Component {
    state = {
        username: '',
        password: ''
    }

    _onChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value});
    }

    _onSubmit = (evt) => {
        evt.preventDefault();

        AxiosClient.get("/login", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
            if(AuthService)
                AuthService.signin(res.data.sessionToken);
            setTimeout(navigate("/auth/licence_generator"), 2000);
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return(
            <Layout>
                <MainWrapper>
                    <SectionWrapper>
                        <h1>FUN with Ruby Rei</h1>
                        <h2>Licence Generator Login</h2>

                        <Form onSubmit={this._onSubmit}>
                            <FormGroup className="form-group" label="Username">
                                <InputGroup large name="username" placeholder="Your username" onChange={this._onChange}/>
                            </FormGroup>
                            <FormGroup className="form-group" label="Password">
                                <InputGroup large type="password" name="password" placeholder="Your password" onChange={this._onChange}/>
                            </FormGroup>
                            <Button large intent="success" type="submit" text="Sign in"/>
                        </Form>
                    </SectionWrapper>
                </MainWrapper>
            </Layout>
        );
    }
}

export default AuthPage;