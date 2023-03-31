import { createContext, useState, useEffect, useContext } from 'react';

const initialState = {
  isPreview: false,
  setIsPreview: (value) => {},
  toggleIsPreview: () => {}
};

const CreateOfferContext = createContext(initialState);


function CreateOfferProvider({ children }) {
  const [isPreview, setIsPreview] = useState(false);
  const toggleIsPreview = () => setIsPreview(prev => !prev)
  return (
    <CreateOfferContext.Provider
      value={{
        isPreview,
        setIsPreview,
        toggleIsPreview
      }}
    >
      {children}
    </CreateOfferContext.Provider>
  );
}

const useCreateOfferContext = () => useContext(CreateOfferContext)

const withCreateOfferProvider = (Component) => () => <CreateOfferProvider children={<Component />} />

export { CreateOfferProvider, CreateOfferContext, useCreateOfferContext, withCreateOfferProvider };
