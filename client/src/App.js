import './App.css';
import {useState} from 'react'
import domtoimage from 'dom-to-image'

function App() {
  const [text, setText] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [bgc, setBgc] = useState('');
  const [firstColor,setFirstColor] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [isGradient, setGradient] = useState(false);
  const [linkButtonText, setLinkButtonText]= useState('Перейти')
  let colorPeaker, banner;
  const linkButton=linkUrl?(<a target='blank' href={linkUrl}><button>{linkButtonText}</button></a>):''
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
      <div className='banner' id='banner' style={{background: `linear-gradient(${firstColor},${bgc})`, height:400, width:300}}>
        
        <img src={imgUrl} style={{width:200, height:300}}/>
        <h2>{text}</h2>
        {linkButton}
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
      <div className='banner' id='banner' style={{backgroundColor: bgc, height:400, width:300}}>
        
        <img src={imgUrl} style={{width:200, height:300}}/>
        <h2>{text}</h2>
        {linkButton}
      </div>
    )
  }

  function copyToClipboard(){
    const textArea = document.createElement("textarea");
    const json = JSON.stringify({text, imgUrl, bgc, firstColor, isGradient, linkUrl})
    textArea.value = json;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  function saveAsPNG(){
    domtoimage.toPng(document.getElementById('banner'))
    .then(function (dataUrl) {
      let link = document.createElement('a');
      link.download = 'banner.png';
      link.href = dataUrl;
      link.click();
      link.remove();
    })
  }

  function saveAsHtml(){
    const textFileAsBlob = new Blob([document.getElementById('wrapper').innerHTML], {type:'text/plain'});
    let link = document.createElement('a');
    link.download = 'banner.html';
    link.href = window.webkitURL.createObjectURL(textFileAsBlob);;
    link.click();
    link.remove();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Make your story here!</h1>
      </header>
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
        <br/>
        <label for='link-url'>Link url: </label>
        <input id='link-url' onChange={(e)=>setLinkUrl(e.target.value)} type='text'></input>
        <br/>
        <label for='link-button-text'>Link button text: </label>
        <input id='link-button-text' onChange={(e)=>setLinkButtonText(e.target.value)} type='text'></input>
      </form>
      <div id='wrapper'>
        {banner}
      </div>
      <button onClick={copyToClipboard}>Copy as JSON</button>
      <button onClick={saveAsHtml}>Save as HTML</button>
      <button onClick={saveAsPNG}>Save as PNG</button>
    </div>
  );
}

export default App;
