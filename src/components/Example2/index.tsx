import * as React from 'react';
import { componentFromStream } from 'recompose';
import { from, identity, interval, Observable } from 'rxjs';
import { map, scan, switchMap, zip } from 'rxjs/operators';


interface IProps {
  message: string;
};

const Component: React.SFC<IProps> = ({
  message,
}) => (
  <div>
    <h1>{message}</h1>
  </div>
);

const scanLetters = scan(
  (acc: string, curr: string): string => acc + curr,
)

const createTypewriter = (
  message: string,
  speed: number,
) => from(message).pipe(
  zip(
    interval(speed),
    identity,
  ),
  scanLetters,
);

export const Example2: any = componentFromStream(
  (props$: Observable<IProps>) => props$.pipe(
    switchMap(({ message }) => createTypewriter(message, 50)),
    map(message => ({ message })),
    map(Component),
  ),
);