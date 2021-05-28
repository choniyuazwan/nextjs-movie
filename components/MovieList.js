import React from 'react';

export default function MovieList (props) {
  return (
    <div className='overlay d-flex align-items-center justify-content-center'>
      <span className='mr-2'>{props.movie.title}</span>
      <svg
        width='1em'
        height='1em'
        viewBox='0 0 16 16'
        className='bi bi-heart-fill'
        fill='red'
        xmlns='http://www.w3.org/2000/svg'
      />
    </div>
  );
}

