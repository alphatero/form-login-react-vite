import React, { useState } from 'react';
import clsx from 'clsx';
import { ReactComponent as ErrorIcon } from './assets/icon-error.svg';


function Card({ children, className }) {
  return <div className={clsx('rounded-lg shadow mb-6 p-4', className)}>{children}</div>;
}
function Button({ children, className }) {
  return <button className={clsx('rounded shadow-solid py-4', className)}>{children}</button>;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function Input({ id, label, type, error, errorMsg }) {
  const [value, setValue] = useState('');

  return (
    <div>
      <div className={clsx('relative flex items-center focus:py-0', error ? 'text-red' : 'text-blue-dark')}>
        <label
          className={clsx('absolute w-full h-full p-4 ', value !== '' && 'opacity-0')}
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className={clsx(
            'box-border border rounded w-full text-sm px-4 py-[17px]  focus:border-2 ',
            error ? 'border-2 border-red' : 'border-gray-200 focus:border-blue focus:py-4'
          )}
          type={type}
          name={id}
          id={id}
          onChange={(event) => setValue(event.target.value)}
        />
        {error && <ErrorIcon className="absolute w-6 h-full right-0 py-3 mr-3" />}
      </div>

      {error && (
        <div className="flex justify-end">
          <span className="mt-1 text-red text-xs">{errorMsg}</span>
        </div>
      )}
    </div>
  );
}

function Form() {
  const [fields, setFields] = useState([
    {
      id: 'first-name',
      label: 'First Name',
      type: 'text',
      validate: Boolean,
      error: false,
      errorMsg: 'First Name cannot be empty',
    },
    {
      id: 'last-name',
      label: 'Last Name',
      type: 'text',
      validate: Boolean,
      error: false,
      errorMsg: 'Last Name cannot be empty',
    },
    {
      id: 'email-address',
      label: 'Email Address',
      type: 'email',
      validate: validateEmail,
      error: false,
      errorMsg: 'Looks like this is not an email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      validate: Boolean,
      error: false,
      errorMsg: 'Password cannot be empty',
    },
  ]);

  /**
   * @param {Event} event
   */

  function onSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.target);

    /* get all form's data by object */
    const data = Object.fromEntries(form.entries());

    setFields((fields) =>
      fields.map((field) => ({
        ...field,
        error: !Boolean(data[field.id]),
      }))
    );
  }

  console.log(fields);

  return (
    <form className="space-y-4 flex flex-col py-2" onSubmit={onSubmit}>
      {fields.map(({ id, label, type, error, errorMsg }) => (
        <Input
          id={id}
          label={label}
          type={type}
          key={id}
          name={id}
          error={error}
          errorMsg={errorMsg}
        />
      ))}
      

      <Button className="bg-green text-white hover:bg-green-light">
        <p>CLAIM YOUR FREE TRIAL</p>
      </Button>

      <small className="text-gray-400 text-center">
        By clicking the button, you are agreeing to our{' '}
        <span className="text-red">Terms and Services</span>{' '}
      </small>
    </form>
  );
}

function App() {
  return (
    <div className="max-w-screen-xl grid lg:grid-cols-2 gap-16 px-6 py-20 place-content-center mx-auto">
      {/* article */}
      <article className="text-white flex flex-col justify-center items-center">
        <h1 className="mb-4 font-bold text-2xl text-center">Learn to code by watching others</h1>
        <p className="text-center ">
          See how experienced developers solve problems in real-time. Watching scripted tutorials is
          great, but understanding how developers think is invaluable.
        </p>
      </article>

      <section className="space-y-4">
        {/* top card */}
        <Card className="bg-blue text-white">
          <p className="text-center px-12">
            <b> Try it free 7 days</b> then $20/mo. thereafter
          </p>
        </Card>

        {/* form card */}
        <Card className="bg-white">
          <Form />
        </Card>
      </section>
    </div>
  );
}

export default App;
