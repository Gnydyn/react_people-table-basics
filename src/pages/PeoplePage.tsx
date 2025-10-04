import React, { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { people, isLoading, error } = useContext(PeopleContext);
  const { slug } = useParams();

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading ? (
              <Loader />
            ) : (
              <PeopleTable selected={slug?.toString() || ''} />
            )}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {people.length === 0 && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
