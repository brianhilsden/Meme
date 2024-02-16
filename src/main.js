import { useState } from 'react';
import { useEffect } from 'react';
import './main.css'

function Main(){
const[memeData,setMemeData]=useState({top:"",randomImage:'./Laughing-Meme-Face-PNG.png',bottom:""});
const[allMemes,setAllMemes]=useState("")

useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res=>res.json())
    .then(data=>setAllMemes(data.data.memes))
    
},[])

const[color,setColor]=useState(true);
function handleTextColor(){
    setColor(!color)
}
const styles=color?{color:"white"}:{color:"black"};
function handleChange(event){
    const {name,value}=event.target;
    setMemeData(prevMemeData=>({...memeData,[name]:value}))

}

function RandomMeme(){
    const randomIndex=Math.floor(Math.random()*allMemes.length);
    const url=allMemes[randomIndex].url;
    setMemeData(prevMemeData=>({...prevMemeData,randomImage:url}))
}
    return(
        <main className='main'>
            <div className='form'>
                <div className='text'>
                    <input type='text' placeholder='Enter top text' id='first_text' name='top' className='first-text' value={memeData.top} onChange={handleChange}/>
                    <input type='text' placeholder='Enter bottom text' id='last_text' name='bottom' className='last-text' value={memeData.bottom} onChange={handleChange}/>
                </div>

                <button className='button' onClick={RandomMeme}><h1>Get a new meme image</h1></button>
                <div className='buttonColor' onClick={handleTextColor}><button ><h2>Change Text Color</h2></button></div>
                <div className='meme'>
                    <div className='meme-text top' style={styles}>{memeData.top}</div>
                    <div className='meme-text bottom'style={styles}>{memeData.bottom}</div>
                    <img src={memeData.randomImage}/>
                    
                </div>
                
                
            </div>
            

        
        </main>
        
    )
}

export default Main;