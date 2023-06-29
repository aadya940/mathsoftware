import React, { useEffect, useState } from "react";

interface PolynomialPlotProps {
  expression: string;
}

const PolynomialPlot: React.FC<PolynomialPlotProps> = ({ expression }) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/myapp/plot${expression}`
        );
        const data = await response.json();
        setImageSrc(`data:image/png;base64,${data.image}`);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [expression]);

  return <img src={imageSrc} alt="Polynomial Image" />;
};

export default PolynomialPlot;
