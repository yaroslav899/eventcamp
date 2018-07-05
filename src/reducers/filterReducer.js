const initialFilterState = {
    list:[],
    categories:'',
    cities:'',
    dateRange:{
        from:'',
        to:''
    }
};

export default function(filterReducer = initialFilterState, action) {
    switch(action.type) {
        case 'EVENT_LIST_UPDATE':
            return {...filterReducer, list: action.list};
        case 'UPDATE_FILTER_CATEGORY':
            return {...filterReducer, categories: action.categories};
        case 'UPDATE_FILTER_CITY':
            return {...filterReducer, cities: action.cities};
        case 'UPDATE_FILTER_DATERANGE':
            return {...filterReducer, dateRange: action.dateRange};
    }
    return filterReducer;
};