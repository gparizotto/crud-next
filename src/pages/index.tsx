import '../app/globals.css';
import Table from '../components/Table';
import Layout from '../components/Layout';
import Client from '../core/Client';
import Button from '../components/Button';
import Form from '../components/Form';
import { useEffect, useState } from 'react';
import ClientRepository from '@/core/ClientRepository';
import ClientCollection from '@/firebase/db/ClientCollection';

export default function Home() {
  const repo: ClientRepository = new ClientCollection();

  const [client, setClient] = useState<Client>(Client.empty());
  const [clients, setClients] = useState<Client[]>([]);
  const [visible, setVisible] = useState<'table' | 'form'>('table');

  useEffect(getAll, []);

  function selectedClient(client: Client) {
    setClient(client);
    setVisible('form');
  }

  async function deletedClient(client: Client) {
    await repo.delete(client);
    getAll();
  }

  function newClient() {
    setClient(Client.empty());
    setVisible('form');
  }

  function getAll() {
    repo.getAll().then((clients) => {
      setClients(clients);
      setVisible('table');
    });
  }

  async function saveClient(client: Client) {
    await repo.save(client);
    getAll();
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
              <Button color="green" className="mb-4" onCick={newClient}>
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
          <Form
            client={client}
            canceled={() => setVisible('table')}
            changed={saveClient}
          />
        )}
      </Layout>
    </div>
  );
}
