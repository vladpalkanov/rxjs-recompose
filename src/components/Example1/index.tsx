import * as React from 'react';
import { componentFromStream } from 'recompose';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

export const Example1 = componentFromStream(
  () => interval(10).pipe(
    take(2000),
    map((count: number) => <h1>{count}</h1>),
  )
);