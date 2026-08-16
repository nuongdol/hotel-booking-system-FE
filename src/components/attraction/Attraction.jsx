import moment from 'moment';
import React from 'react'
import { BsSearch } from "react-icons/bs";
import { BsCalendar2 } from "react-icons/bs";

const Attraction = () => {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id='address-type-filter'>
                    <BsSearch />
                </span>
                <input type='text' className='form-control' placeholder='Where are you doing' aria-label='Address' aria-describedby='address-type-filter' />
                <label className='input-group-text'><BsCalendar2 />  <span>Select your dates</span></label>
                <input className='form-control' placeholder='selectDates' type='date' name='selectDay' min={moment().format("YYYY-MM-DD")} />
            </div>
            <div>
                <h2 className='fs-2 fw-bold'>Recommended addresses and places arround you </h2>
                <p className='text-primary fst-italic'>Our pick of top experiences to get you started</p>
                <div class="row">
                    <div class="col-sm-4">
                        <img src="src/assets/images/Doubebr.png" className="rounded-circle" alt="image" height="300px" width="300px" />
                    </div>

                </div>
            </div>
            <hr></hr>
            <div>
                <h2 className='fw-bold'>Nearby destinations</h2>
                <img src="src/assets/images/Doubebr.png" className="rounded" alt="image" width="304" height="236"></img>
            </div>
            <hr></hr>
            <div>
                <h2 className='fw-bold'>Explore more destinations</h2>
                <p className='text-primary fst-italic'>Find things to do in cities around the world</p>
                <nav class="navbar navbar-expand-sm bg-light">
                    <div class="container-fluid">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#">Europe</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">North America</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Asia</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='#'>Africa</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='#'>Oceania</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='#'>Middle East</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='#'>South America</a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='#'>Central America</a>
                            </li>
                        </ul>
                    </div>

                </nav>
                <img src="src/assets/images/Doubebr.png" className="rounded" alt="image" width="304" height="236"></img>
            </div>

        </>

    )
}

export default Attraction
