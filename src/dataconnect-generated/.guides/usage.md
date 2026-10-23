# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateUser, useUpdateUser, useDeleteUser, useGetUser, useListUsers, useCreateTrip, useUpdateTrip, useDeleteTrip, useGetTrip, useListTrips } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateUser();

const { data, isPending, isSuccess, isError, error } = useUpdateUser();

const { data, isPending, isSuccess, isError, error } = useDeleteUser();

const { data, isPending, isSuccess, isError, error } = useGetUser();

const { data, isPending, isSuccess, isError, error } = useListUsers();

const { data, isPending, isSuccess, isError, error } = useCreateTrip();

const { data, isPending, isSuccess, isError, error } = useUpdateTrip(updateTripVars);

const { data, isPending, isSuccess, isError, error } = useDeleteTrip(deleteTripVars);

const { data, isPending, isSuccess, isError, error } = useGetTrip(getTripVars);

const { data, isPending, isSuccess, isError, error } = useListTrips();

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, getUser, listUsers, createTrip, updateTrip, deleteTrip, getTrip, listTrips } from '@dataconnect/generated';


// Operation CreateUser: 
const { data } = await CreateUser(dataConnect);

// Operation UpdateUser: 
const { data } = await UpdateUser(dataConnect);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation GetUser: 
const { data } = await GetUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateTrip: 
const { data } = await CreateTrip(dataConnect);

// Operation UpdateTrip:  For variables, look at type UpdateTripVars in ../index.d.ts
const { data } = await UpdateTrip(dataConnect, updateTripVars);

// Operation DeleteTrip:  For variables, look at type DeleteTripVars in ../index.d.ts
const { data } = await DeleteTrip(dataConnect, deleteTripVars);

// Operation GetTrip:  For variables, look at type GetTripVars in ../index.d.ts
const { data } = await GetTrip(dataConnect, getTripVars);

// Operation ListTrips: 
const { data } = await ListTrips(dataConnect);


```