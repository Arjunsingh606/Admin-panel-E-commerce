import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { RegisterFields } from '../../interface/InterfaceAuth';

interface UsersProps {
  users?: RegisterFields[];
  setUsers?:(item: RegisterFields[]) => void
  // setUsers?:(item:RegisterFields[])=>void;
}

const Users: React.FC<UsersProps> = ({ setUsers, users }) => {

  const handleDeleteUsers = async (id?: string) => {
    if (setUsers) { 
      const deleteResponse = await fetch(`http://localhost:4000/customer/${id}`, {
        method: "DELETE",
      });
      if (deleteResponse.ok) {
        const updatedUsers = users && users?.filter((note) => note.id !== id);
        setUsers(updatedUsers!);
      }
    }
  };

  return (
    <div>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td><Button onClick={()=>handleDeleteUsers(item?.id)}>Delete</Button></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
