import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function Home() {
  const template = (
    <Carousel>
      <Carousel.Item>
        <div
          style={{ height: '400px' }}
          className="border rounded bg-dark text-white text-center d-flex justify-content-center align-items-center"
        >
          <h2 className="fs-1 text-wrap" style={{ width: '250px' }}>
            This is a ToDo list web
          </h2>
        </div>
        <Carousel.Caption>
          <p>To-do list: a list of things that one wants or need to get done</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{ height: '400px' }}
          className="border rounded bg-dark text-white text-center d-flex justify-content-center align-items-center"
        >
          <h2 className="fs-1 text-wrap" style={{ width: '250px' }}>
            You can use it freely <Link to={'/todo'}>here</Link>
          </h2>
        </div>
        <Carousel.Caption>
          <p>
            Our list let you add, delete, edit or mark as complete your to-do's
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{ height: '400px' }}
          className="border rounded bg-dark text-white text-center d-flex justify-content-center align-items-center"
        >
          <h2 className="fs-1 text-wrap" style={{ width: '250px' }}>
            And you can contact us <Link to={'/about'}>here</Link>
          </h2>
        </div>
        <Carousel.Caption>
          <p>We answer your questions as soon as possible 😀</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
  return template;
}

export default Home;
