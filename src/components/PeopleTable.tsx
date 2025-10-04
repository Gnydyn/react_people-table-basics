import React, { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type Props = {
  selected: string;
};

export const PeopleTable: React.FC<Props> = ({ selected }) => {
  const { people } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(pers => pers.name === person.motherName);
          const father = people.find(pers => pers.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': selected === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : person.motherName ? (
                  person.motherName
                ) : (
                  '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : person.fatherName ? (
                  person.fatherName
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
