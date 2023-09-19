import { useState } from 'react';
import Input from './Input';
import Client from '@/core/Client';
import Button from './Button';

interface FormsProps {
  client: Client,
  changed?: (client: Client) => void,
  canceled?: () => void,
}

export default function Forms(props: FormsProps) {
  const id = props.client?.id;
  const [name, setName] = useState(props.client?.name ?? '');
  const [age, setAge] = useState(props.client?.age ?? 0);
  return (
    <div>
      {id ? (
        <Input readOnly={true} text="code" className="mb-4" value={id} />
      ) : (
        false
      )}
      <Input text="name" value={name} className="mb-4" changed={setName} />
      <Input text="age" type="number" value={age} changed={setAge} />
      <div className="mt-3 flex justify-end">
        <Button className="mr-2" color="blue" onCick={() => props.changed?.(new Client(name, +age, id))}>
          {id ? 'Update' : 'Save'}
        </Button>
        <Button color="gray" onCick={props.canceled}>Cancel</Button>
      </div>
    </div>
  );
}
