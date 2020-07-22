import React from 'react';

const EmptyList = () => {
  return (
    <div className='card mb-1'>
      <div className='card-body'>
        <div className='d-flex justify-content-between align-items-center'>
          <span>No hay registros.</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyList;
