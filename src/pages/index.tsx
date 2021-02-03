import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import "./styles.css";
import { navigate } from 'gatsby';


const ADD_LOLLY = gql`
    mutation addLolly(
        $flvTop: String!, 
        $flvMiddle: String!,
        $flvBottom: String!,
        $recName: String!,
        $msg: String!
        $senderName: String!
        ){
            addLolly(flvTop: $flvTop, flvMiddle: $flvMiddle, flvBottom: $flvBottom, recName: $recName, msg: $msg ,senderName: $senderName){
                id    
            }
    }
`
export default function Home() {

    const [flvTop, setFlvTop] = useState("#deaa43");
    const [flvMiddle, setFlvMiddle] = useState("#e95946");
    const [flvBottom, setFlvBottom] = useState("#d52358");

    const recName = useRef('');
    const msgField = useRef('');
    const senderName = useRef('');
    


    const [addLolly] = useMutation(ADD_LOLLY);

    const handleSubmit = async () => {
        const result = await addLolly({
            variables: {
                flvTop, flvMiddle, flvBottom,
                recName: recName.current.value,
                msg: msgField.current.value,
                senderName: senderName.current.value,
            }
        })
        console.log(result.data.addLolly.id)
        navigate(`/showLolly?id=${result.data.addLolly.id}`)
    }

    return (<div className="container">
        <h1>Create Lolly</h1>
        <div className="main-container">

            <div>
                <Lolly top={flvTop} middle={flvMiddle} bottom={flvBottom} />
                <br />
                <input type="color" value={flvTop} onChange={(e) => { setFlvTop(e.target.value) }} />
                <input type="color" value={flvMiddle} onChange={(e) => { setFlvMiddle(e.target.value) }} />
                <input type="color" value={flvBottom} onChange={(e) => { setFlvBottom(e.target.value) }} />
            </div>
            <div className="form-container">
                <input type="text" placeholder="To" ref={recName} />
                <textarea placeholder="Enter your message!" ref={msgField}></textarea>
                <input type="text" placeholder="From" ref={senderName} />
                <button onClick={handleSubmit}>Send</button>
            </div>
        </div>
    </div>
    )
}