import './App.css';
import {useState} from 'react'

function App() {
  const [text, setText] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [bgc, setBgc] = useState('');
  const [firstColor,setFirstColor] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [isGradient, setGradient] = useState(false);
  let colorPeaker, banner;
  if(isGradient){
    colorPeaker=(
      <div className='colorPeaker'>
        <label for='background'>Choose 1 color: </label>
        <input id='background' onChange={(e)=>setFirstColor(e.target.value)} type='color'></input>
        <label for='background'>Choose 2 color: </label>
        <input id='background' onChange={(e)=>setBgc(e.target.value)} type='color'></input>
      </div>
    );
    banner=(
      <div className='banner' style={{background: `linear-gradient(${firstColor},${bgc})`, height:400, width:300}}>
        
        <img src={imgUrl} style={{width:200, height:300}}/>
        <h2>{text}</h2>
      </div>
    );
  }else{
    colorPeaker=(
      <div className='colorPeaker'>
        <label for='background'>Choose color: </label>
        <input id='background' onChange={(e)=>setBgc(e.target.value)} type='color'></input>
      </div>
    )
    banner=(
      <div className='banner' style={{backgroundColor: bgc, height:400, width:300}}>
        
        <img src={imgUrl} style={{width:200, height:300}}/>
        <h2>{text}</h2>
      </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Make your story here!</h1>
        <form>
          <label for='text'>Type some text here: </label>
          <input id='text' onChange={(e)=>setText(e.target.value)} type='text'></input>
          <br/>
          <label for='image-url'>Image url: </label>
          <input id='image-url' onChange={(e)=>setImgUrl(e.target.value)} type='text'></input>
          <br/>
          <label for='solid'>Solid: </label>
          <input id='solid' onChange={()=>setGradient(false)} type='radio'  name='solid-gradient'></input>
          <label for='gradient'>Gradient: </label>
          <input id='gradient' onChange={()=>setGradient(true)} type='radio' name='solid-gradient'></input>
          <br/>
          {colorPeaker}
        </form>
        {banner}
      </header>
    </div>
  );
}

export default App;
