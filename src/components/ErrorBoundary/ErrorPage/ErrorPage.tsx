import style from './ErrorPage.module.scss';

interface IErrorPage {
  resetErrorBoundary: () => void;
}

export default function ErrorPage({ resetErrorBoundary }: IErrorPage) {
  return (
    <div className={style.errorPage}>
      <div className={style.oops}>Oops!</div>
      <div className={style.message}>Something went wrong...</div>
      {resetErrorBoundary && (
        <div>
          <button className={style.retryButton} onClick={resetErrorBoundary}>
            🔄 Try Again!
          </button>
        </div>
      )}
    </div>
  );
}
