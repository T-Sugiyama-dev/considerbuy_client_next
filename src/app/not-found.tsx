import notFound from './notFound.module.css';

export default function NotFound() {
  return (
    <div className={notFound.container}>
      <div className={notFound.wrapper}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </div>
    </div>
  );
}