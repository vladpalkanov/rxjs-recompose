import * as React from 'react';
import { componentFromStream } from 'recompose';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

import { Http } from '../../services/api/HttpClient';

const httpClient = new Http.Client({ baseURL: 'https://swapi.co/api' });

interface ICardProps {
  name: string;
  homeworld: string;
}

interface ICardStreamProps {
  id: string;
}

const Card: React.SFC<ICardProps> = ({
  name,
  homeworld,
}) => (
  <div style={{ backgroundColor: 'aqua' }}>
    <h1>{name}</h1>
    <h1>{homeworld}</h1>
  </div>
);

const loadById = (id: string): Observable<any> => httpClient.get(`people/${id}`)
  .pipe(
    switchMap(
      ({ homeworld: homeworldUrl }) => 
        httpClient.get(homeworldUrl).pipe(
          startWith({ name: '' }),
        ),
      (person, homeworld) => ({ ...person, homeworld: homeworld.name }),
    ),
    
  // catchError((err: any) => console.log(err))
);

const CardStream: any = componentFromStream(
  (props$: Observable<ICardStreamProps>) => props$.pipe(
    switchMap(({ id }) => loadById(id)),
    map(Card),
  )
);

export const Example3 = () => (
  <div>
    <Card name="John" homeworld="Earth" />
    <CardStream id={1} />
    <CardStream id={2} />
    <CardStream id={3} />

  </div>
)