import 'antd/dist/antd.css';
import './App.css';
import {useState} from 'react'
import domtoimage from 'dom-to-image'
import { Input, Radio, Button, Row, Col } from 'antd';

function App() {
  const [text, setText] = useState('')
  const [color,setColor]=useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [bgc, setBgc] = useState('')
  const [firstColor,setFirstColor] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [isGradient, setGradient] = useState(false)
  const [linkButtonText, setLinkButtonText]= useState('Перейти')
  let colorPeaker, background;
  const linkButton=linkUrl?(<a target='blank' href={linkUrl}><Button style={{width:200}}>{linkButtonText}</Button></a>):''
  if(isGradient){
    colorPeaker=(
      <div className='colorPeaker'>
        <label for='background'>Choose first color: </label>
        <input id='background' onChange={(e)=>setFirstColor(e.target.value)} type='color'></input>
        <label for='background'>Choose second color: </label>
        <input id='background' onChange={(e)=>setBgc(e.target.value)} type='color'></input>
      </div>
    );
    background=`linear-gradient(${firstColor},${bgc})`;
  }else{
    colorPeaker=(
      <div className='colorPeaker'>
        <label for='background'>Choose background color: </label>
        <input id='background' onChange={(e)=>setBgc(e.target.value)} type='color'></input>
      </div>
    )
    background=bgc;
  }
  const img= imgUrl?(<img src={imgUrl} style={{width:300, height:170, margin:'20px 0'}}/>):'';

  function copyToClipboard(){
    const textArea = document.createElement("textarea");
    const json = JSON.stringify({text, color, imgUrl, bgc, firstColor, isGradient, linkUrl, linkButtonText})
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
      <Row>
        <Col span={12}>
          <form>
            <Input className="input" id='text'  onChange={(e)=>setText(e.target.value)} placeholder="Story text"/>
            <label for='color'>Choose color of text: </label>
            <input if='color' onChange={(e)=>setColor(e.target.value)} type='color'></input>
            <Input className="input" id='image-url' onChange={(e)=>setImgUrl(e.target.value)} placeholder='Image URL'></Input>
            <Radio.Group
              style={{margin:15}}
              options={[{label:'Solid', value:false},{label:'Gradient',value:true}]}
              onChange={(e)=>setGradient(e.target.value)}
              value={isGradient}
              optionType="button"
            />
            {colorPeaker}
            <Input className="input" id='link-url' onChange={(e)=>setLinkUrl(e.target.value)} placeholder='Link URL'></Input>
            <Input className="input" id='link-button-text' onChange={(e)=>setLinkButtonText(e.target.value)} placeholder='Link button text'></Input>
          </form>
          <Button type='primary' className='button' onClick={copyToClipboard}>Copy as JSON</Button>
          <Button type='primary' className='button' onClick={saveAsHtml}>Save as HTML</Button>
          <Button type='primary' className='button' onClick={saveAsPNG}>Save as PNG</Button>
        </Col>
        <Col span={12}>
        <div id='wrapper'>
          <div className='banner' id='banner' style={{background: background, height:400, width:300, borderRadius:20, textAlign:'center'}}>
            {img}
            <h2 style={{width:200, height:60, color:color, margin:'20px auto', lineHeight:'20px', fontSize:20, overflowWrap:'break-word',overflowY:'hidden'}}>{text}</h2>
            {linkButton}
          </div>
        </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
