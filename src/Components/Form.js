import React from 'react';
import './Form.style.css';

const Form = ({ loadWeather, error }) => {
  return (
    <div className='container'>
      <div>{error ? errorfun() : null}</div>
      <form onSubmit={loadWeather}>
        <div className='row'>
          <div className='col-md-3 offset-md-2'>
            <input
              type='text'
              className='form-control'
              name='city'
              autoComplete='off'
              placeholder='City'
            />
          </div>
          <div className='col-md-3'>
            <input
              type='text'
              className='form-control'
              name='country'
              autoComplete='off'
              placeholder='Country'
            />
          </div>
          <div className='col-md-3 mt-md-0 text-md-left'>
            <button className='btn btn-warning'>Get Weather</button>
          </div>
        </div>
      </form>
    </div>
  );
};

function errorfun() {
  return (
    <div className='alert alert-danger mx-5' role='alert'>
      Please Enter City and Country
    </div>
  );
}

export default Form;
