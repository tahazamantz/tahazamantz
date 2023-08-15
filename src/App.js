
import './App.css';
import React, { useEffect, useRef, useState } from "react";
//import addNotification from 'react-push-notification';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
//import { RecaptchaVerifier } from "firebase/auth";
//import ImageSlider from "image-slider-react";
//import Speech from 'react-speech';
/*

import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import useSound from 'use-sound';

import mouse from './/mouse-click-153941.mp3';


<Speech
  text="I have all properties set to their default"
  pitch="1"
  rate="1"
  volume="1"
  lang="en-GB"
  voice="Google UK English Male" />

function sos() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [play] = useSound(mouse);

}

const FanfareButton = () => {
  const [play] = useSound(mouse);

  return (
    <button onMouseEnter={play} >
      <span role="img" aria-label="trumpet">
        🎺
      </span>
    </button>
  );
};

const images = [
  './LOGO.jpg',
  './Purple Yellow Modern Chat Application Logo.png',
 
 './a1.jpeg',
 './b.jpg',
 './c.jpg'
  
];

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Zoom scale={0.1}>
          {
            images.map((each, index) => <img key={index} style={{width: "199px"}} src={each} />)
          }
        </Zoom>
      </div>
    )
}
*/
//dependices area

//firebase api key
firebase.initializeApp({
  apiKey: "AIzaSyC5Ain1hiBevpHbvTrNGkxFhInQEaVkgcc",
  authDomain: "ansta-a198c.firebaseapp.com",
  databaseURL: "https://ansta-a198c-default-rtdb.firebaseio.com",
  projectId: "ansta-a198c",
  storageBucket: "ansta-a198c.appspot.com",
  messagingSenderId: "533608083687",
  appId: "1:533608083687:web:63b232563d0450be1a3242",
  measurementId: "G-HHDTX547MB"
})

// authentication from firestore
const auth = firebase.auth();
// firestore message database
const firestore = firebase.firestore();



/* push notifications

  const pushnoti = () => {
    addNotification({
        title: 'Message from Chattar-Pattar',
        subtitle: 'This is a subtitle',
        message: 'A secret message from C-P.',
        duration: '10000',
        backgroundTop: 'green',
        theme: 'blue',
        native: true // when using native, your OS will handle theming.
    });
};

*/











const googleauth = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}
const facebookauth = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider);
}

const appleauth = () => {
  const provider = new firebase.auth.OAuthProvider()
  auth.signInWithPopup(provider);
}
const githubauth = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  auth.signInWithPopup(provider);
}


const microsoftauth = () => {
  const provider = new firebase.auth.OAuthProvider(); 
  auth.signInWithPopup(provider);
}








// main
function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main className='mainchat'>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form className='form' onSubmit={sendMessage}>

      <input className='input' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button id='subbtn' type="submit" disabled={!formValue}>Enter</button>

    </form>
  </>)
}

function SgnIn() {

 return(
   <div className='signindiv'>

    <button id='123' className='signin1' onClick={googleauth}>Sign In aWith Google</button>
  <button clasName='signin2' onClick={githubauth}>Sign In Withhey GitHub</button>
  <button className='signin3' onClick={microsoftauth}>Sign In With Microsoft</button>
 </div>
 )
  
}

// for user signout
function SignOut() {
  return auth.currentUser && (
    <button className='signout' onClick={() => auth.signOut()}>Sign Out</button>
  )
}



function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
  
    <div className={`message ${messageClass}`}>
      <img id='googleimg' src={photoURL}/>
      <p id='p'>{text}</p>
    </div>
  </>)
}


function App() {
  const  [user] = useAuthState(auth);;
 
  
  return(<>
    <section data-aos="zoom-in-up" className='section'>
    
      <a className='l1' href='a' id='home'>Home</a> 

      <a href='a' id='2'> About Me</a>

      <a href='a' id='3'>Contact</a>

      <a href='a'>Projects</a>

      <br/>
   
    </section>

    <div className='chatdiv'>
    <header>
      <button></button>
     <SignOut></SignOut>
    </header>
    <section>
      {user ? <ChatRoom/> : <SgnIn/>}
    </section>
  </div>
    
  </>)
  
}

/*function chat() {

  const  [user] = useAuthState(auth);;
  
    return(
        <div>
          <header>
            <button></button>
           <SignOut></SignOut>
          </header>
          <section>
            {user ? <ChatRoom/> : <SgnIn/>}
          </section>
        </div>
    )
    
  }
*/

export default App;