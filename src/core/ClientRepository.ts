import Client from './Client';

export default interface ClientRepository {
  delete(client: Client): Promise<void>;
  save(client: Client): Promise<Client | undefined>;
  getAll(): Promise<Client[]>;
}
