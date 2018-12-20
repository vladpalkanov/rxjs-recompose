import * as React from 'react';
import { componentFromStream, createEventHandler } from 'recompose';
import { Observable } from 'rxjs';
import { delay, map, startWith } from 'rxjs/operators';

type FormEvent = React.FormEvent<HTMLInputElement>;
type EventHandler = React.EventHandler<FormEvent>;

interface ISimpleFormProps {
  text: string;
  onInput: EventHandler;
};

const SimpleForm: React.SFC<ISimpleFormProps> = ({ text, onInput }) => (
  <div>
    <input type="text" onInput={onInput} />
    <h3>{text}</h3>
  </div>
);

const SimpleFormStream = componentFromStream(
  () => {
    const {
      stream: onInput$,
      handler: onInput,
    } = createEventHandler();

    const text$: Observable<string> = onInput$.pipe(
      map((e: FormEvent) => e.currentTarget.value),
      delay(400),
      startWith(''),
    );

    return text$.pipe(
      map(text => ({ text, onInput })),
      map(SimpleForm),
    )
  }
)

const logInput = (e: FormEvent) => console.log(e.currentTarget.value);
export const Example4: React.SFC<{}> = () => (
  <div style={{ marginBottom: 100 }}>
    <SimpleForm
      text="Hello World"
      onInput={logInput}
    />
    <SimpleFormStream />
  </div>
);