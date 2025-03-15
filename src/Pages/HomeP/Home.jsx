import Navbar from "../../Components/navbar"; 
import Footer from "./../../Components/Footer";
import Banner from "./Banner";
import Topsellers from "./Topsellers";
import Recommened from "./Recommened";
import News from "./News";



const Home = () => {
  return (
    <div>
      <>
      <Navbar />
        
        <Banner/>
        <Topsellers/>
        <Recommened/>
        <News/>
        <Footer/>
        
      </>
    </div>
  );
};

export default Home;
