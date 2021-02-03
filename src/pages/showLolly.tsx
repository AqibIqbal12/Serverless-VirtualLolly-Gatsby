import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Lolly from '../components/lolly';
import { useQueryParam } from 'gatsby-query-params';
import { navigate } from 'gatsby';

const ShowLolly = () => {

    const GET_LOLLY = gql`
    query getLolly($id: String!){
        getLolly(id: $id){
            id
            flvTop
            flvMiddle
            flvBottom
            recName
            msg
            senderName                
        }
    }
`;
    const id = useQueryParam('id');

    const { loading, error, data } = useQuery(GET_LOLLY, {
        variables: { id: id }
    })


    if (error) {
        console.log(error)
        return <h1>Error</h1>
    }

    if (loading) {
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <div>
            <div className='showlolly_main_div' >
                <div>
                    <Lolly
                        top={data.getLolly.flvTop}
                        middle={data.getLolly.flvMiddle}
                        bottom={data.getLolly.flvBottom} />
                </div>
                <div className='path_msg_div' >
                    <p style={{ 
                        textAlign: 'center', fontSize: '18px' }} >Your lolly is freezing. Share it with this link:</p>
                </div>
                <div className='path_msg_link' >
                    <pre>{location.origin}/showLolly/{data.getLolly.id}</pre>
                </div>
                <div className='message_div' >
                    <p className='show_recipient_name' >{data.getLolly.recName}</p>
                    <p className='show_get_message' >{data.getLolly.msg}</p>
                    <p className='show_sender_name' >{`___ ${data.getLolly.senderName}`}</p>
                </div>
            



            <div className='show_lolly_para' >
                <span><p><span style={{fontSize: '20px'}}>{data.getLolly.senderName}</span> made this virtual lollipop for you. You can <span style={{ textDecoration: 'underline', color: 'blueviolet', fontSize: '20px', cursor: 'pointer' }} onClick={() => { navigate('/') }} >make your own</span> to send to a friend who deserve some sugary treat which won't rot their teeth...</p></span>
            </div>
            </div>
        </div>
    )
}

export default ShowLolly
