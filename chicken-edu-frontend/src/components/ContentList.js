import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContentList.css';

function ContentList() {
    const [contents, setContents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/contents')
            .then(response => {
                setContents(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className="content-list">
            <h2>Educational Contents</h2>
            {contents.map(content => (
                <div key={content.id} className="content-item">
                    <h3>{content.title}</h3>
                    <p>{content.body}</p>
                </div>
            ))}
        </div>
    );
}

export default ContentList;
