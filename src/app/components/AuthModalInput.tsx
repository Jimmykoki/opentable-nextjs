import React from 'react';
import { Users } from './AuthModal';

export default function AuthModalInput({
  user,
  isSignin,
  handleChangesInput,
}: {
  user: Users;
  isSignin: boolean;
  handleChangesInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      {!isSignin ? (
        <div className="my-3 flex justify-between text=sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={user.firstName}
            name="firstName"
            onChange={handleChangesInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={user.lastName}
            name="lastName"
            onChange={handleChangesInput}
          />
        </div>
      ) : null}
      <div className="my-3 flex justify-between text=sm">
        <input
          type="email"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={handleChangesInput}
        />
      </div>
      {!isSignin ? (
        <div className="my-3 flex justify-between text=sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={user.phone}
            name="phone"
            onChange={handleChangesInput}
          />
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={user.city}
            name="city"
            onChange={handleChangesInput}
          />
        </div>
      ) : null}
      <div className="my-3 flex justify-between text=sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={handleChangesInput}
        />
      </div>
    </div>
  );
}
