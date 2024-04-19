import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) {
        return;
      }

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const currentPage = this._data.page;

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return ` 
        ${this._generateMarkupNextBtn(currentPage)} 
      `;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return `
        ${this._generateMarkupPrevBtn(currentPage)} 
      `;
    }

    // other page
    if (currentPage < numPages) {
      return `
        ${this._generateMarkupPrevBtn(currentPage)}  
        ${this._generateMarkupNextBtn(currentPage)}  
      `;
    }

    // Page 1 and there are no other pages
    return '';
  }

  _generateMarkupPrevBtn(currentPage) {
    return `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }

  _generateMarkupNextBtn(currentPage) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
