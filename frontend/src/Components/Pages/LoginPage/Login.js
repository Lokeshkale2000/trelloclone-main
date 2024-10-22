import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../../Services/userService";
import Background from "../../Background";
import {
  BgContainer,
  Container,
  TrelloIconContainer,
  FormSection,
  FormCard,
  Form,
  Title,
  Input,
  Button,
  Icon,
  Hr,
  Link,
} from "./Styled";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [userInformations, setUserInformations] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Log in to Trello Clone";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInformations((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userInformations, dispatch);
      history.push("/dashboard"); // Redirect on successful login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <BgContainer>
        <Background />
      </BgContainer>
      <Container>
        <TrelloIconContainer onClick={() => history.push("/")}>
          <Icon
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/trello-header-logos/167dc7b9900a5b241b15ba21f8037cf8/trello-logo-blue.svg"
            alt="Trello Logo"
          />
        </TrelloIconContainer>
        <FormSection>
          <FormCard>
            <Form onSubmit={handleSubmit}>
              <Title>Log in to Trello</Title>

              {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={userInformations.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                value={userInformations.password}
                onChange={handleChange}
              />
              <Button type="submit">Log in</Button>

              <Hr />

              <Link fontSize="0.85rem" onClick={() => history.push("/register")}>
                Sign up for an account
              </Link>
            </Form>

            <hr style={{ margin: "1rem 0" }} />

            <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>ATLASSIAN</h2>
            <div style={{ textAlign: "center", fontSize: "0.85rem",fontFamily:"sans-serif" }}>
              <p>One account for Trello, Jira, Confluence, and more.</p>
              <p>
                This site is protected by reCAPTCHA and the Google<br />
                Privacy Policy and Terms of Service apply.
              </p>
            </div>
          </FormCard>
        </FormSection>
      </Container>
    </>
  );
};

export default Login;
