import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCheck } from "@fortawesome/free-solid-svg-icons";

import dummyCategories from "../../dummyData/categories";

class CategorySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategories: dummyCategories,
      categoriesOpen: false
    };

    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.toggleCategoriesList = this.toggleCategoriesList.bind(this);
  }

  toggleCategoriesList() {
    this.setState(prevState => ({
      categoriesOpen: !prevState.categoriesOpen
    }));
  }

  handleCategorySelect(id) {
    const { selectedCategories, setSelectedCategories } = this.props;

    const newSelectedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter(cat => cat !== id)
      : [...selectedCategories, id];

    setSelectedCategories(newSelectedCategories);
  }

  render() {
    const { selectedCategories } = this.props;
    const { allCategories, categoriesOpen } = this.state;

    return (
      <div>
        <FontAwesomeIcon
          className="pointer gray dim black-40 mh4"
          icon={faTag}
          size="2x"
          onClick={this.toggleCategoriesList}
        />
        {categoriesOpen ? (
          <ul className="list absolute bg-white black-90 ba b--light-silver br3 pb3 pt3 ph0 ma4 z-999 w-auto minwidth-300 positionCategories cursorDefault">
            {allCategories.map(item => (
              <li
                className="listItem ph0 pv2"
                key={item.title}
                onClick={() => this.handleCategorySelect(item.id)}
                role="presentation"
              >
                <div className="ml3 dib w-10">
                  {selectedCategories.includes(item.id) && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
                <div className="pa0 dib">{item.title}</div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default CategorySelect;

CategorySelect.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  setSelectedCategories: PropTypes.func.isRequired
};

CategorySelect.defaultProps = {
  selectedCategories: []
};
