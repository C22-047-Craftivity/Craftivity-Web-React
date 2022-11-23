// import { useParams, useNavigate } from 'react-router-dom';
import NavBarLanding from "../../components/NavBarLanding";
import Footer from "../../components/Footer";
import populer from "../../components/PopulerSection/populer";
import DetailComponent from "../../components/Detail";
import { useEffect } from "react";

function Index() {
  const data = populer[0];
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [])

  return (
    <div>
      <NavBarLanding />
      <div className="container mt-4 mb-5">
        <h4>{data.name}</h4>
        <DetailComponent data={data} />
      </div>
      <Footer />
    </div>
  );
}

export default Index;
