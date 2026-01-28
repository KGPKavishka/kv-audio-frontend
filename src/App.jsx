import './App.css'
import ProductCard from './components/productCard.jsx'

function App() {

  return (
    <div>
      <ProductCard name="Audio Setup" price="3250/-" 
      description="High-quality audio setup for professional use."
      img="https://img.drz.lazcdn.com/static/lk/p/9bc27f3356fa6569f9ca2b8596f0477c.jpg_400x400q75.avif" />

      <ProductCard name="Wireless Headphones" price="1500/-" 
      description="Wireless headphones with noise cancellation."
      img="https://img.drz.lazcdn.com/static/lk/p/6d5a0903d7fd26783ef8f644bf9dffc8.jpg_400x400q75.avif" />
    </div> 

  )
}

export default App
