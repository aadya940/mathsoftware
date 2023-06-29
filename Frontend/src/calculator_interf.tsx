import { Button, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { KeyboardEvent } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { openDB, addToDB, retriveDB } from "./database_ops";
import { SocialIcon } from "react-social-icons";
import { useEffect } from "react";
import { deleteAllDB } from "./database_ops";
import { SiXrp } from "react-icons/si";
import PolynomialPlot from "./plot_api_call";

function CalcInter() {
  openDB();

  const [value, setValue] = useState("");

  const [showImage, setShowImage] = useState(false);

  const handlePlot = () => {
    setShowImage(true);
  };

  useEffect(() => {
    const handleWindowClose = (event: BeforeUnloadEvent) => {
      // Custom logic or cleanup code here

      deleteAllDB("CalculatorDB", "calculations").then(() => {
        console.log("Deletion Done");
      });

      event.preventDefault(); // This is necessary for older browsers
      return (event.returnValue = ""); // This is necessary for modern browsers
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Backspace") {
      // Handle backspace key press here
      // For example, you can remove the last character from the value
      const updatedValue = value.slice(0, -1);
      setValue(updatedValue);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: "times-new-roman",
          minHeight: "100vh",
          minWidth: "100vh",
          alignContent: "center",
          padding: "10px",
        }}
      >
        <h1
          style={{
            paddingBottom: "100px",
            paddingRight: "500px",
            color: "white",
            position: "relative",
          }}
        >
          Plotting/Calculation Software by Aadya Chinubhai
        </h1>
        <Container
          style={{
            width: "80%",
            position: "absolute",
            left: "35px",
            top: "200px",
          }}
          id="button_grid_container_1"
        >
          <Row
            className="my-calc-rows"
            style={{
              width: "400px",
              paddingBottom: "15px",
              position: "relative",
              left: "10px",
            }}
          >
            <Form.Control
              id="form_display"
              type="text"
              placeholder="Enter Values"
              value={value}
              maxLength={64}
              style={{ paddingBottom: "10px", width: "100%" }}
              onKeyDown={handleKeyPress}
            />
          </Row>
          <Row className="my-calc-rows" style={{ width: "400px" }}>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    if (value != "") {
                      setValue(value + "0");
                    } else {
                      setValue(value);
                    }
                  }}
                >
                  0
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "/");
                  }}
                >
                  /
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "+");
                  }}
                >
                  +
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "-");
                  }}
                >
                  -
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="my-calc-rows" style={{ width: "400px" }}>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "1");
                  }}
                >
                  1
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "2");
                  }}
                >
                  2
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "3");
                  }}
                >
                  3
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "*");
                  }}
                >
                  *
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="my-calc-rows" style={{ width: "400px" }}>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "4");
                  }}
                >
                  4
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "5");
                  }}
                >
                  5
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "6");
                  }}
                >
                  6
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue("");
                  }}
                >
                  Clear
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="my-calc-rows" style={{ width: "400px" }}>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "7");
                  }}
                >
                  7
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "8");
                  }}
                >
                  8
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "9");
                  }}
                >
                  9
                </Button>
              </div>
            </Col>

            {/** Submit Block below : */}
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    let temp = value;
                    setValue(eval(value));
                    addToDB(temp + " = " + eval(temp));
                  }}
                >
                  =
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="my-calc-rows" style={{ width: "400px" }}>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + ".");
                  }}
                >
                  .
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "(");
                  }}
                >
                  (
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + ")");
                  }}
                >
                  )
                </Button>
              </div>
            </Col>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    retriveDB().then((_vals) => {
                      var myTemp: string = "";
                      for (let i = 0; i < _vals.length; i++) {
                        myTemp = myTemp + "  " + String(i) + ") " + _vals[i];
                      }
                      setValue(myTemp);
                    });
                  }}
                >
                  <AiFillClockCircle />
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={2} sm={2} md={3}>
              <div className="button-wrappers">
                <Button
                  onKeyDown={handleKeyPress}
                  style={{ width: "100px" }}
                  variant="dark"
                  className="btn btn-lg"
                  onClick={() => {
                    setValue(value + "x");
                  }}
                >
                  <SiXrp />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ minHeight: "100vh", padding: "10px" }}>
          <Container>
            <Row noGutters>
              <Col xs={2} sm={2} md={6}>
                <SocialIcon
                  url="https://www.linkedin.com/in/aadya-chinubhai-1a341b213/"
                  style={{
                    position: "relative",
                    right: "-150px",
                    marginBottom: "100px",
                    top: "400px",
                  }}
                />
              </Col>

              <Col xs={2} sm={2} md={6}>
                <SocialIcon
                  url="https://www.github.com/aadya940/"
                  style={{
                    position: "relative",
                    right: "100px",
                    marginBottom: "100px",
                    top: "400px",
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div>
        <Container
          style={{
            width: "80%",
            position: "absolute",
            left: "1000px",
            top: "200px",
          }}
        >
          <Button
            onKeyDown={handleKeyPress}
            style={{ width: "150px", position: "absolute", left: "-400px" }}
            variant="dark"
            className="btn btn-lg"
            onClick={handlePlot}
          >
            Plot Polynomial
          </Button>
          <div
            style={{
              position: "absolute",
              left: "-200px",
              bottom: "-400px",
            }}
          >
            {showImage && <PolynomialPlot expression={value} />}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default CalcInter;
