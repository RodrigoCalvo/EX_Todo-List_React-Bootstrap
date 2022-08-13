import { Link } from 'react-router-dom';

export function Home() {
  const template = (
    <>
      <p>This is a ToDo list web</p>
      <p>
        You can use it freely <Link to={'/todo'}>here</Link>
      </p>
      <p>
        And you can contact us <Link to={'/about'}>here</Link>
      </p>
    </>
  );
  return template;
}

export default Home;
