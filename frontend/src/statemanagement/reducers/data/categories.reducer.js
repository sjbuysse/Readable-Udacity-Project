import { ADD_CATEGORY } from '../../actions/data/categories.actions';

const initialCategoriesState = {};

export const categoriesReducer = (state = initialCategoriesState, action) => {
    switch (action.type) {
        case(ADD_CATEGORY):
            const {category} = action;
            return {
                ...state,
                [category.name]: category
            };
        default:
            return state;
    }
}
