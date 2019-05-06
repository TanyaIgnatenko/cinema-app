import React from 'react';

import './ErrorPage.scss';

const reloadPage = () => window.location.reload();

function ErrorPage() {
  return (
    <p className='error-page-info'>
      Произошла ошибка
      <br />
      <span className='error-page-request'>
        Попробуйте&nbsp;
        <a className='reload-link' onClick={reloadPage}>
          перезагрузить страницу
        </a>
      </span>
    </p>
  );
}

export default ErrorPage;
