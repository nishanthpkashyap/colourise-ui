import './App.css';
// import {DisplayImage} from "./components/display_image"
import { Header } from './components/header';
import {Carousel} from './components/carousel';
import { Colourise } from './components/colourise';
import { ContactUs } from './components/contact_us';
import { AboutUs } from './components/about_us';
import { Footer } from './components/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <section className='bodySection'>
        <Carousel />
        <Colourise />
        <AboutUs />
        <ContactUs/>
        <Footer/>
      </section>
    </div>
  );
}

export default App;
