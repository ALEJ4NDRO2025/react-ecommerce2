import Navbar from "./components/Layout/Navbar.jsx"
import Categories from "./components/Layout/Categories.jsx"
import Hero from "./components/Layout/Hero.jsx"
import Footer from "./components/Layout/Footer.jsx"
import FeaturedProducts from "./components/Layout/Featureproductos.jsx"
import Newsletter from "./components/Layout/Newletter.jsx"

function App() {


  return (
    
    <div>
   <Navbar/>
   <Hero/>
   <Categories/>
   <FeaturedProducts/>
   <Newsletter/>
   <Footer/>
    
    </div>
    
  )
}

export default App
