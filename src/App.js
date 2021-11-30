import "./App.css";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { calculateSinusTangensCosinus } from "./globalhelper/SinusCosinusTangens.js";
import * as sideLengthAnglesType from "./calculateSideLengthandAngles/anglesAndSideLengthOfTriangles.mjs";
import {
  findoutSideLengthAnglesState,
  default as sideLengthAnglesState,
} from "./globalhelper/MethodMatcher.js";
import {degreesToRadians}from "./globalhelper/globalhelper.mjs"

function App() {
  const [seiteA, setSeiteA] = useState(0);
  const [seiteB, setSeiteB] = useState(0);
  const [seiteC, setSeiteC] = useState(0);
  const [alpha, setAlpha] = useState(0);
  const [beta, setBeta] = useState(0);
  const [gamma, setGamma] = useState(0);
  const [triangleSpecies, setTriangleSpecies] = useState("");
  const [stateFromApp, setStateFromApp] = useState(
    sideLengthAnglesState.INITIALSTATE
  );
  const [sinusAlpha, setSinusAlpha] = useState(0);
  const [sinusBeta, setSinusBeta] = useState(0);
  const [tangensAlpha, setTangensAlpha] = useState(0);
  const [tangensBeta, setTangensBeta] = useState(0);
  const [cosineAlpha, setCosineAlpha] = useState(0);
  const [cosineBeta, setCosineBeta] = useState(0);
  const [heighta, setHeightA] = useState(0) 
  const [heightb, setHeightB] = useState(0)
  const [heightc, setHeightC] = useState(0)
  const [triangleArea, setTriangleArea] = useState(0);

  useEffect(() => {
    setStateFromApp(
      findoutSideLengthAnglesState(seiteA, seiteB, seiteC, alpha, beta, gamma)
    );
    console.log(`state change, ${stateFromApp} `);
  }, [seiteA, seiteB, seiteC, alpha, beta, gamma]);


  function calculateTriangle() {
    const resultObjects = findMethodForValues();
    if (resultObjects) {
      const cosineTangensAndSine = calculateSinusTangensCosinus(
        seiteA,
        seiteB,
        seiteC
      );
      setSinusAlpha(cosineTangensAndSine.sinusAlpha);
      setSinusBeta(cosineTangensAndSine.sinusBeta);
      setTangensAlpha(cosineTangensAndSine.tangensAlpha);
      setTangensBeta(cosineTangensAndSine.tangensBeta);
      setCosineAlpha(cosineTangensAndSine.cosineAlpha);
      setCosineBeta(cosineTangensAndSine.cosineBeta);
      findTriangleSpecies();
      initializeCanvas();
      if (stateFromApp === "INVALID") {
        setStateFromApp(
          findoutSideLengthAnglesState(
            seiteA,
            seiteB,
            seiteC,
            alpha,
            beta,
            gamma
          )
        );
      }
      console.log(stateFromApp);
    }
    

  }

  function findMethodForValues() {
    const resultObjects = callAppropriateMethods();

    if (resultObjects.angleAlpha) {
      setAlpha(resultObjects.angleAlpha);
    }
    if (resultObjects.angleBeta) {
      setBeta(resultObjects.angleBeta);
    }
    if (resultObjects.angleGamma) {
      setGamma(resultObjects.angleGamma);
    }
    if (resultObjects.seiteB) {
      setSeiteB(resultObjects.seiteB);
    }
    if (resultObjects.seiteC) {
      setSeiteC(resultObjects.seiteC);
    }
    if (resultObjects.seiteA) {
      setSeiteA(resultObjects.seiteA);
    }
    setHeightA(seiteC * Math.sin(degreesToRadians(beta)))
    setHeightB(seiteA * Math.sin(degreesToRadians(gamma)))
    setHeightC(seiteB * Math.sin(degreesToRadians(alpha)))
    setTriangleArea((alpha * heighta) / 2)
    return resultObjects;
  }

  function callAppropriateMethods() {
    let resultObjects = {};
    if (stateFromApp === sideLengthAnglesState.SSS) {
      resultObjects = sideLengthAnglesType.SSS(seiteA, seiteB, seiteC);
      console.log(stateFromApp);
    }
    if (stateFromApp === sideLengthAnglesState.SSW) {
      resultObjects = sideLengthAnglesType.SSW(seiteA, seiteB, alpha);
    }
    if (stateFromApp === sideLengthAnglesState.SSW2) {
      resultObjects = sideLengthAnglesType.SSW2(seiteA, seiteB, beta);
    }
    if (stateFromApp === sideLengthAnglesState.SSW3) {
      resultObjects = sideLengthAnglesType.SSW3(seiteA, seiteC, alpha);
    }
    if (stateFromApp === sideLengthAnglesState.SSW4) {
      resultObjects = sideLengthAnglesType.SSW4(seiteB, seiteC, beta);
    }
    if (stateFromApp === sideLengthAnglesState.SSW5) {
      resultObjects = sideLengthAnglesType.SSW5(seiteB, seiteC, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.SWS) {
      resultObjects = sideLengthAnglesType.SWS(seiteA, seiteB, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.SWS2) {
      resultObjects = sideLengthAnglesType.SWS2(seiteA, seiteC, beta);
    }
    if (stateFromApp === sideLengthAnglesState.SWS3) {
      resultObjects = sideLengthAnglesType.SWS3(seiteB, seiteC, alpha);
    }
    if (stateFromApp === sideLengthAnglesState.WWS) {
      resultObjects = sideLengthAnglesType.WWS(seiteA, alpha, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.WWS2) {
      resultObjects = sideLengthAnglesType.WWS2(seiteA, alpha, beta);
    }
    if (stateFromApp === sideLengthAnglesState.WWS3) {
      resultObjects = sideLengthAnglesType.WWS3(seiteB, alpha, beta);
    }
    if (stateFromApp === sideLengthAnglesState.WWS4) {
      resultObjects = sideLengthAnglesType.WWS4(seiteB, beta, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.WWS5) {
      resultObjects = sideLengthAnglesType.WWS5(seiteC, alpha, beta);
    }
    if (stateFromApp === sideLengthAnglesState.WWS6) {
      resultObjects = sideLengthAnglesType.WWS6(seiteC, alpha, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.WWS7) {
      resultObjects = sideLengthAnglesType.WWS7(seiteC, beta, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.WSW5) {
      resultObjects = sideLengthAnglesType.WSW5(seiteA, beta, gamma);
    }
    if (stateFromApp === sideLengthAnglesState.WSW6) {
      resultObjects = sideLengthAnglesType.WSW6(seiteB, alpha, gamma);
    }
    return resultObjects;
  }

  function findTriangleSpecies() {
    if (seiteA === seiteB && seiteA === seiteC && seiteB === seiteC) {
      setTriangleSpecies("gleichseitig");
    } else if (seiteB === seiteA || seiteB === seiteC || seiteC === seiteA) {
      setTriangleSpecies(`gleichschenklig`);
    } else if (alpha === 90 || beta === 90 || gamma === 90) {
      if (triangleSpecies !== "") {
        const currentSpecies = triangleSpecies;
        setTriangleSpecies(`rechtwinklig-${currentSpecies}`);
      } else {
        setTriangleSpecies(`rechtwinklig`);
      }
    } else {
      setTriangleSpecies("normal");
    }
  }

  const initializeCanvas = () => {
    if (document.querySelector("#canvas")) {
      let canvasElement = document.querySelector("#canvas");
      let ctx = canvasElement.getContext("2d");
      // the width of the canvas
      let cw = (canvasElement.width = 150),
        cx = cw / 2;
      //the height of the canvas
      let ch = (canvasElement.height = 150),
        cy = ch / 2;
      //your data
      let a = seiteA,
        b = seiteB,
        c = seiteC;
      // In this case you have an isosceles triangle since a = b = 30
      // this triangle is circumscribed in a circle with a radius = 30
      let R = 70;
      // calculate the angle between the two sides of equal length

      //draw the circumscribed circle:
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 2 * Math.PI);
      ctx.stroke();

      let triangle = {
        //the first vertex is in the center of the canvas
        //you may decide to change this.
        x1: cx,
        y1: cy,
        //the second vertex is on the circumscribed circle at 0 radians where R is the radius of the circle ( a = 30, b=30 )
        //you may decide to change this.
        x2: cx + R,
        y2: cy,
        //calculate the 3-rd vertex
        x3: cx + R * Math.cos(alpha),
        y3: cy + R * Math.sin(beta),
      };

      ctx.strokeStyle = "red";

      ctx.beginPath();
      ctx.moveTo(triangle.x1, triangle.y1);
      ctx.lineTo(triangle.x2, triangle.y2);
      ctx.lineTo(triangle.x3, triangle.y3);
      ctx.lineTo(triangle.x1, triangle.y1);
      ctx.closePath();
      ctx.stroke();
    }
  };


  function resetVars() {
    setSeiteA(0)
    setSeiteB(0)
    setSeiteC(0)
    setAlpha(0)
    setBeta(0)
    setGamma(0)
    setTriangleSpecies("")
    setHeightA(0)
    setHeightC(0)
    setHeightB(0)
    setCosineAlpha(0)
    setCosineBeta(0)
    setTangensBeta(0)
    setTangensAlpha(0)
    setSinusBeta(0)
    setSinusAlpha(0)
    setTriangleArea(0)
    setStateFromApp(sideLengthAnglesState.INITIALSTATE)
  }

  return (
    <Container
      style={{ alignItems: "center", textAlign: "center" }}
      className="App"
    >
      <div>
        <h1>TRIGO</h1>
        <br />
        <br />
        <table>
          <tr>
            <td>
              {/*Gegenkathete*/}
              <h5>Seite a</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setSeiteA(e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              {/*Ankathete*/}
              <h5>Seite b</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setSeiteB(e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              {/*Hypotenuse*/}
              <h5>Seite c</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setSeiteC(e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              {/*Alpha*/}
              <h5>Alpha</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setAlpha(e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              {/*Beta*/}
              <h5>Beta</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setBeta(e.target.value)}
                />
              </InputGroup>
            </td>
            <td>
              {/*Gamma*/}
              <h5>Gamma</h5>
              <InputGroup className="form-group w-50">
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setGamma(e.target.value)}
                />
              </InputGroup>
            </td>
          </tr>
        </table>
        <br />
        {/*Berechnen*/}
        <Button onClick={() => calculateTriangle()}>Calculate</Button>
        <Button onClick={() => resetVars()}>Reset All</Button>
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                {/*Sinus Cosinus*/}
                <div>
                  <h3>Sinus Cosinus</h3>
                  <p>Sinus Alpha: {sinusAlpha}</p>
                  <p>Sinus Beta: {sinusBeta}</p>
                  <p>Cosinus Alpha: {cosineAlpha}</p>
                  <p>Cosinus Beta: {cosineBeta}</p>
                </div>
              </td>
              <td>
                {/*Tangens*/}
                <div>
                  <h3>Tangens</h3>
                  <p>Tangens Alpha: {tangensAlpha} </p>
                  <p>Tangens Beta: {tangensBeta}</p>
                </div>
              </td>
              <td>
                <div>
                  <h3>Seiten</h3>
                  <p>a: {seiteA} </p>
                  <p>b: {seiteB} </p>
                  <p>c : {seiteC}</p>
                </div>
              </td>
              <td>
                <div>
                  <h3>Angles</h3>
                  <p>Winkel Alpha: {alpha}</p>
                  <p>Winkel Beta: {beta}</p>
                  <p>Winkel Gamma: {gamma}</p>
                </div>
              </td>
              <td>
                <div>
                  <h3>Triangle Species</h3>
                  <p>{triangleSpecies}</p>
                  <h3>Calculation State</h3>
                  <p>{stateFromApp}</p>
                  <h3>Triangle Area</h3>
                  <p>{triangleArea}</p>
                  <h3>SideHeights</h3>
                  <p>ah: {heighta}</p>
                  <p>bh: {heightb}</p>
                  <p>ch: {heightc}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        {/* <Button onClick={() => initializeCanvas}>Create Triangle</Button> */}
        <canvas id="canvas"></canvas>
        {/*Seiten*/}
        <br />
      </div>
    </Container>
  );
}

export default App;
