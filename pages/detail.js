import Layout from '../components/layout';
import React from 'react';

export default function Detail({ detail, urlImage }) {
  return (
    <Layout>
      <article>
        <div className='row align-items-center'>
          <div className='col col-sm-6 col-md-5 col-lg-4 col-xl-3'>
            <div className='image-detail d-flex justify-content-start m-3'>
              <img className='rounded mx-auto d-block' src={urlImage + detail.poster_path} alt='movie'/>
            </div>
          </div>
          <div className='col col-sm-6 col-md-7 col-lg-8 col-xl-9' style={{padding: '25px'}}>
            <h4><p>{detail.title}</p></h4>
            <p><b>Release Date :</b> {detail.release_date}</p>
            <p><b>Synopsis :</b> {detail.overview}</p>
            <p><b>Rating :</b> {detail.vote_average}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const {API_KEY: apiKey, URL_IMAGE: urlImage, BASE_ADDRESS: baseAddress} = process.env;
    const results = await fetch(`${baseAddress}/movie/${query.id}?api_key=${apiKey}`);
    const detail = await results.json();
    return {
      props: { detail, urlImage }
    };
  } catch (err) {
    console.error(err);
  }
}
