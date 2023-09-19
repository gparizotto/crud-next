import '../app/globals.css';
import Table from '../components/Table';
import Layout from '../components/Layout';
import Client from '../core/Client';
import Button from '../components/Button';
import Form from '../components/Form';
import { useState } from 'react';

export default function Home() {
  const [client, setClient] = useState<Client>(Client.empty());
  const [visible, setVisible] = useState<'table' | 'form'>('table');

  const clients = [
    new Client('Gabriel', 20, '1'),
    new Client('Laura', 19, '2'),
    new Client('Luca', 20, '3'),
  ];

  function selectedClient(client: Client) {
    setClient(client);
    setVisible('form');
  }

  function deletedClient(client: Client) {
    console.log(client.name);
  }

  function newClient() {
    setClient(Client.empty())
    setVisible('form')
  }

  function saveClient(client: Client) {
    console.log(client);
    setVisible('table');
  }

  return (
    <div
      className={`flex h-screen justify-center items-center 
    bg-gradient-to-r from-purple-500 to-blue-600
    text-white`}
    >
      <Layout title="User Registration">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Button
                color="green"
                className="mb-4"
                onCick={newClient}
              >
                New Client
              </Button>
            </div>
            <Table
              clients={clients}
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            ></Table>
          </>
        ) : (
          <Form client={client} canceled={() => setVisible('table')} changed={saveClient}/>
        )}
      </Layout>
    </div>
  );
}
