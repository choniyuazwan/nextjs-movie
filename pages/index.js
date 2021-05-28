import React from 'react';
import Layout from '../components/Layout';
import MovieBox from '../components/MovieBox';

export default function Home({ resultNowPlaying, resultTopRated, resultUpcoming, urlImage }) {
  return (
    <Layout>
      <div className='container-fluid movie-app'>
        <MovieBox headingTitle='Now Playing' data={resultNowPlaying} urlImage={urlImage} searchFeature />
        <MovieBox headingTitle='Top Rated' data={resultTopRated} urlImage={urlImage} />
        <MovieBox headingTitle='Upcoming' data={resultUpcoming} urlImage={urlImage} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const {API_KEY: apiKey, URL_IMAGE: urlImage, BASE_ADDRESS: baseAddress} = process.env;
    const resNowPlaying = await fetch(`${baseAddress}/movie/now_playing?api_key=${apiKey}`);
    const resTopRated = await fetch(`${baseAddress}/movie/top_rated?api_key=${apiKey}`);
    const resUpcoming = await fetch(`${baseAddress}/movie/upcoming?api_key=${apiKey}`);
    const { results: resultNowPlaying } = await resNowPlaying.json();
    const { results: resultTopRated } = await resTopRated.json();
    const { results: resultUpcoming } = await resUpcoming.json();
    return {
      props: { resultNowPlaying, resultTopRated, resultUpcoming, urlImage },
    };
  } catch (err) {
    console.error(err);
  }
}
