import Client from '../core/Client';
import React from 'react';
import { EditIcon, TrashIcon } from './Icons';

interface TableProps {
  clients: Client[];
  selectedClient?: (client: Client) => void;
  deletedClient?: (client: Client) => void;
}

export default function Table(props: TableProps) {
  const showActions = props.deletedClient || props.selectedClient;

  function renderHeader() {
    return (
      <tr className="w-full">
        <th className="text-center p-3">Code</th>
        <th className="text-center p-3">Name</th>
        <th className="text-center p-3">Age</th>
        {showActions ? <th className="text-center p-3">Actions</th> : false}
      </tr>
    );
  }

  function renderData() {
    return props.clients?.map((client, i) => {
      return (
        <tr
          key={client.id}
          className={`${i % 2 === 0 ? 'bg-purple-100' : 'bg-purple-200'} `}
        >
          <td className="text-center p-3">{client.id}</td>
          <td className="text-center p-3">{client.name}</td>
          <td className="text-center p-3">{client.age}</td>
          {showActions ? renderActions(client) : false}
        </tr>
      );
    });
  }

  function renderActions(client: Client) {
    return (
      <td className="flex justify-center items-center h-full">
        {props.selectedClient ? (
          <button onClick={() => props.selectedClient?.(client)} className="rounded-full m-2 p-2 hover:bg-purple-50 text-green-600">
            {EditIcon()}
          </button>
        ) : (
          false
        )}
        {props.deletedClient ? (
          <button onClick={() => props.deletedClient?.(client)} className="rounded-full m-2 p-2 hover:bg-red-100 text-red-600">
            {TrashIcon()}
          </button>
        ) : (
          false
        )}
      </td>
    );
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className="text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800">
        {renderHeader()}
      </thead>
      <tbody>{renderData()}</tbody>
    </table>
  );
}
