const PatientReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PATIENTS':
      return {
        ...state,
        patients: action.payload,
        loading: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default PatientReducer;
