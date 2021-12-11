import React from 'react'
import './App.css';
import { useState } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

export default function Writers({url}) {

    const [rows, setRows] = useState([])
    const [isLoaded, setIsLoaded] = useState(null)

    function GetRoles(e) {
        e.preventDefault()
        setIsLoaded(false)
        axios.get(url + 'queries/writerswithrolehp.php')
            .then((response) => {
                console.log(response.data);
                setRows(response.data)
                setIsLoaded(true)

            }).catch(error => {
                alert(error.response ? error.response.data.error : error)
            })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
            <button className='btn secondary-button mb-4' onClick={GetRoles}> Harry Potter-series, find out by pressing the button!</button>
                <table className='table'>
                    <thead>
                        <th>Who?</th>
                        <th>Had what role?</th>
                        <th>In what film?</th>
                    </thead>
                    <tbody>
                        {isLoaded === false ? (
                            <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : (
                        (rows?.map(row => (
                            <tr key={uuid()}>
                                <td>{row.name_}</td>
                                <td>{row.role_}</td>
                                <td>{row.primary_title}</td>
                            </tr>
                        ))) 
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
