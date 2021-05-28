import Layout from '../components/Layout';
import Router from 'next/router';
import {Pagination, Form, Col} from 'react-bootstrap';
import React, {Fragment} from 'react';
import {useDispatch} from 'react-redux';
import MovieBox from '../components/MovieBox';
import {getPaginationNumber} from '../utils/handler';
import {addMovie, clearMovies} from '../redux/actions/movieAction';
import {clearFilters} from '../redux/actions/filterAction';

export default function Search({ results, total_pages, urlImage, query }) {
  const dispatch = useDispatch();

  results.forEach(movie => {
    let {id, title, poster_path, release_date} = movie;
    release_date = release_date ? release_date.substring(0, 4) : '';
    dispatch(addMovie({id, title, poster_path, release_date}));
  });

  const showListByPage = async (page) => {
    Router.push(`/search/?searchkey=${query.searchkey}&page=${page}`);
    dispatch(clearMovies());
    dispatch(clearFilters());
  };

  const renderFirstPageNumber = currentPage => (
    <Pagination.First
      data-testid='first-page-button'
      disabled={currentPage === 1 || total_pages === 0}
      onClick={() => { showListByPage(1); }}
    />
  );

  const renderPrevPageNumber = currentPage => (
    <Pagination.Prev
      data-testid='button-prev-page'
      disabled={currentPage === 1 || total_pages === 0}
      onClick={() => { showListByPage(currentPage - 1); }}
    />
  );

  const renderCenterPageNumber = (totalPage, currentPage) => {
    const pageNumber = getPaginationNumber(totalPage, currentPage);
    return pageNumber.map(number => (
      <Pagination.Item key={number}
        data-testid={`button-page-${number}`}
        active={number === currentPage}
        onClick={() => {
          showListByPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    ));
  };

  const renderNextPageNumber = currentPage => (
    <Pagination.Next
      data-testid='button-next-page'
      disabled={currentPage === total_pages || total_pages === 0}
      onClick={() => { showListByPage(currentPage + 1); }}
    />
  );

  const renderLastPageNumber = currentPage => (
    <Pagination.Last
      data-testid='button-last-page'
      disabled={currentPage === total_pages || total_pages === 0}
      onClick={() => { showListByPage(total_pages); }}
    />
  );

  const renderPaginationButton = () => {
    const totalPage = total_pages;
    const currentPage = parseInt(query.page);

    return (
      <Fragment>
        <Pagination>
          {renderFirstPageNumber(currentPage)}
          {renderPrevPageNumber(currentPage)}
          {renderCenterPageNumber(totalPage, currentPage)}
          {renderNextPageNumber(currentPage)}
          {renderLastPageNumber(currentPage)}
        </Pagination>
      </Fragment>
    );
  };

  const onChange = event => {
    showListByPage(event.target.value);
  };

  return (
    <Layout>
      <div className='container-fluid search-movie'>
        <MovieBox headingTitle={'Searching'} data={results} urlImage={urlImage} searchFeature filter/>
      </div>
      <div className='container-fluid movie-app'>
        <div className='row d-flex mt-4 mb-4 ml-1'>
          {renderPaginationButton()}
          <Form>
            <Col>
              <Form.Control as='select' onChange={onChange} value={query.page}>
                {Array
                  .from(Array(total_pages)
                    .keys(), x => x + 1)
                  .map(number => (
                    <option value={number} key={number}>{number}</option>
                  ))}
              </Form.Control>
            </Col>
          </Form>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  try {
    const {API_KEY: apiKey, URL_IMAGE: urlImage, BASE_ADDRESS: baseAddress} = process.env;
    const {searchkey, page} = query;
    const res = await fetch(`${baseAddress}/search/movie?api_key=${apiKey}&query=${searchkey}&page=${page}`);
    const { results, total_pages } = await res.json();
    return {
      props: { results, total_pages, urlImage, query },
    };
  } catch (err) {
    console.error(err);
  }
}
