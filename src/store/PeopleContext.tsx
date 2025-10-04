import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isLoading: false,
  error: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      people,
      isLoading,
      error,
    }),
    [people, isLoading, error],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}
