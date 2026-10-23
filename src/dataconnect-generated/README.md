# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetTrip*](#gettrip)
  - [*ListTrips*](#listtrips)
  - [*GetTripMember*](#gettripmember)
  - [*ListTripMembers*](#listtripmembers)
  - [*GetActivity*](#getactivity)
  - [*ListActivities*](#listactivities)
  - [*GetExpense*](#getexpense)
  - [*ListExpenses*](#listexpenses)
  - [*GetMemory*](#getmemory)
  - [*ListMemories*](#listmemories)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateTrip*](#createtrip)
  - [*UpdateTrip*](#updatetrip)
  - [*DeleteTrip*](#deletetrip)
  - [*AddTripMember*](#addtripmember)
  - [*UpdateTripMember*](#updatetripmember)
  - [*RemoveTripMember*](#removetripmember)
  - [*CreateActivity*](#createactivity)
  - [*UpdateActivity*](#updateactivity)
  - [*DeleteActivity*](#deleteactivity)
  - [*CreateExpense*](#createexpense)
  - [*UpdateExpense*](#updateexpense)
  - [*DeleteExpense*](#deleteexpense)
  - [*CreateMemory*](#creatememory)
  - [*UpdateMemory*](#updatememory)
  - [*DeleteMemory*](#deletememory)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    username: string;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetTrip
You can execute the `GetTrip` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTrip(vars: GetTripVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripData, GetTripVariables>;

interface GetTripRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTripVariables): QueryRef<GetTripData, GetTripVariables>;
}
export const getTripRef: GetTripRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTrip(dc: DataConnect, vars: GetTripVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripData, GetTripVariables>;

interface GetTripRef {
  ...
  (dc: DataConnect, vars: GetTripVariables): QueryRef<GetTripData, GetTripVariables>;
}
export const getTripRef: GetTripRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTripRef:
```typescript
const name = getTripRef.operationName;
console.log(name);
```

### Variables
The `GetTrip` query requires an argument of type `GetTripVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTripVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTrip` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTripData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTripData {
  trip?: {
    name: string;
    destination?: string | null;
  };
}
```
### Using `GetTrip`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTrip, GetTripVariables } from '@dataconnect/generated';

// The `GetTrip` query requires an argument of type `GetTripVariables`:
const getTripVars: GetTripVariables = {
  id: ..., 
};

// Call the `getTrip()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTrip(getTripVars);
// Variables can be defined inline as well.
const { data } = await getTrip({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTrip(dataConnect, getTripVars);

console.log(data.trip);

// Or, you can use the `Promise` API.
getTrip(getTripVars).then((response) => {
  const data = response.data;
  console.log(data.trip);
});
```

### Using `GetTrip`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTripRef, GetTripVariables } from '@dataconnect/generated';

// The `GetTrip` query requires an argument of type `GetTripVariables`:
const getTripVars: GetTripVariables = {
  id: ..., 
};

// Call the `getTripRef()` function to get a reference to the query.
const ref = getTripRef(getTripVars);
// Variables can be defined inline as well.
const ref = getTripRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTripRef(dataConnect, getTripVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.trip);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.trip);
});
```

## ListTrips
You can execute the `ListTrips` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTrips(options?: ExecuteQueryOptions): QueryPromise<ListTripsData, undefined>;

interface ListTripsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTripsData, undefined>;
}
export const listTripsRef: ListTripsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTrips(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTripsData, undefined>;

interface ListTripsRef {
  ...
  (dc: DataConnect): QueryRef<ListTripsData, undefined>;
}
export const listTripsRef: ListTripsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTripsRef:
```typescript
const name = listTripsRef.operationName;
console.log(name);
```

### Variables
The `ListTrips` query has no variables.
### Return Type
Recall that executing the `ListTrips` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTripsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTripsData {
  trips: ({
    name: string;
  })[];
}
```
### Using `ListTrips`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTrips } from '@dataconnect/generated';


// Call the `listTrips()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTrips();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTrips(dataConnect);

console.log(data.trips);

// Or, you can use the `Promise` API.
listTrips().then((response) => {
  const data = response.data;
  console.log(data.trips);
});
```

### Using `ListTrips`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTripsRef } from '@dataconnect/generated';


// Call the `listTripsRef()` function to get a reference to the query.
const ref = listTripsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTripsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.trips);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.trips);
});
```

## GetTripMember
You can execute the `GetTripMember` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTripMember(vars: GetTripMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripMemberData, GetTripMemberVariables>;

interface GetTripMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTripMemberVariables): QueryRef<GetTripMemberData, GetTripMemberVariables>;
}
export const getTripMemberRef: GetTripMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTripMember(dc: DataConnect, vars: GetTripMemberVariables, options?: ExecuteQueryOptions): QueryPromise<GetTripMemberData, GetTripMemberVariables>;

interface GetTripMemberRef {
  ...
  (dc: DataConnect, vars: GetTripMemberVariables): QueryRef<GetTripMemberData, GetTripMemberVariables>;
}
export const getTripMemberRef: GetTripMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTripMemberRef:
```typescript
const name = getTripMemberRef.operationName;
console.log(name);
```

### Variables
The `GetTripMember` query requires an argument of type `GetTripMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTripMemberVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTripMember` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTripMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTripMemberData {
  tripMember?: {
    role: string;
    user: {
      username: string;
    };
  };
}
```
### Using `GetTripMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTripMember, GetTripMemberVariables } from '@dataconnect/generated';

// The `GetTripMember` query requires an argument of type `GetTripMemberVariables`:
const getTripMemberVars: GetTripMemberVariables = {
  id: ..., 
};

// Call the `getTripMember()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTripMember(getTripMemberVars);
// Variables can be defined inline as well.
const { data } = await getTripMember({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTripMember(dataConnect, getTripMemberVars);

console.log(data.tripMember);

// Or, you can use the `Promise` API.
getTripMember(getTripMemberVars).then((response) => {
  const data = response.data;
  console.log(data.tripMember);
});
```

### Using `GetTripMember`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTripMemberRef, GetTripMemberVariables } from '@dataconnect/generated';

// The `GetTripMember` query requires an argument of type `GetTripMemberVariables`:
const getTripMemberVars: GetTripMemberVariables = {
  id: ..., 
};

// Call the `getTripMemberRef()` function to get a reference to the query.
const ref = getTripMemberRef(getTripMemberVars);
// Variables can be defined inline as well.
const ref = getTripMemberRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTripMemberRef(dataConnect, getTripMemberVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tripMember);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tripMember);
});
```

## ListTripMembers
You can execute the `ListTripMembers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTripMembers(vars: ListTripMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTripMembersData, ListTripMembersVariables>;

interface ListTripMembersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListTripMembersVariables): QueryRef<ListTripMembersData, ListTripMembersVariables>;
}
export const listTripMembersRef: ListTripMembersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTripMembers(dc: DataConnect, vars: ListTripMembersVariables, options?: ExecuteQueryOptions): QueryPromise<ListTripMembersData, ListTripMembersVariables>;

interface ListTripMembersRef {
  ...
  (dc: DataConnect, vars: ListTripMembersVariables): QueryRef<ListTripMembersData, ListTripMembersVariables>;
}
export const listTripMembersRef: ListTripMembersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTripMembersRef:
```typescript
const name = listTripMembersRef.operationName;
console.log(name);
```

### Variables
The `ListTripMembers` query requires an argument of type `ListTripMembersVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListTripMembersVariables {
  tripId: UUIDString;
}
```
### Return Type
Recall that executing the `ListTripMembers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTripMembersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTripMembersData {
  tripMembers: ({
    user: {
      username: string;
    };
    role: string;
  })[];
}
```
### Using `ListTripMembers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTripMembers, ListTripMembersVariables } from '@dataconnect/generated';

// The `ListTripMembers` query requires an argument of type `ListTripMembersVariables`:
const listTripMembersVars: ListTripMembersVariables = {
  tripId: ..., 
};

// Call the `listTripMembers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTripMembers(listTripMembersVars);
// Variables can be defined inline as well.
const { data } = await listTripMembers({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTripMembers(dataConnect, listTripMembersVars);

console.log(data.tripMembers);

// Or, you can use the `Promise` API.
listTripMembers(listTripMembersVars).then((response) => {
  const data = response.data;
  console.log(data.tripMembers);
});
```

### Using `ListTripMembers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTripMembersRef, ListTripMembersVariables } from '@dataconnect/generated';

// The `ListTripMembers` query requires an argument of type `ListTripMembersVariables`:
const listTripMembersVars: ListTripMembersVariables = {
  tripId: ..., 
};

// Call the `listTripMembersRef()` function to get a reference to the query.
const ref = listTripMembersRef(listTripMembersVars);
// Variables can be defined inline as well.
const ref = listTripMembersRef({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTripMembersRef(dataConnect, listTripMembersVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.tripMembers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.tripMembers);
});
```

## GetActivity
You can execute the `GetActivity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getActivity(vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;

interface GetActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
}
export const getActivityRef: GetActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getActivity(dc: DataConnect, vars: GetActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityData, GetActivityVariables>;

interface GetActivityRef {
  ...
  (dc: DataConnect, vars: GetActivityVariables): QueryRef<GetActivityData, GetActivityVariables>;
}
export const getActivityRef: GetActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getActivityRef:
```typescript
const name = getActivityRef.operationName;
console.log(name);
```

### Variables
The `GetActivity` query requires an argument of type `GetActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetActivityVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetActivity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetActivityData {
  activity?: {
    title: string;
    location?: string | null;
  };
}
```
### Using `GetActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getActivity, GetActivityVariables } from '@dataconnect/generated';

// The `GetActivity` query requires an argument of type `GetActivityVariables`:
const getActivityVars: GetActivityVariables = {
  id: ..., 
};

// Call the `getActivity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActivity(getActivityVars);
// Variables can be defined inline as well.
const { data } = await getActivity({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getActivity(dataConnect, getActivityVars);

console.log(data.activity);

// Or, you can use the `Promise` API.
getActivity(getActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity);
});
```

### Using `GetActivity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActivityRef, GetActivityVariables } from '@dataconnect/generated';

// The `GetActivity` query requires an argument of type `GetActivityVariables`:
const getActivityVars: GetActivityVariables = {
  id: ..., 
};

// Call the `getActivityRef()` function to get a reference to the query.
const ref = getActivityRef(getActivityVars);
// Variables can be defined inline as well.
const ref = getActivityRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getActivityRef(dataConnect, getActivityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activity);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activity);
});
```

## ListActivities
You can execute the `ListActivities` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listActivities(vars: ListActivitiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, ListActivitiesVariables>;

interface ListActivitiesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListActivitiesVariables): QueryRef<ListActivitiesData, ListActivitiesVariables>;
}
export const listActivitiesRef: ListActivitiesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActivities(dc: DataConnect, vars: ListActivitiesVariables, options?: ExecuteQueryOptions): QueryPromise<ListActivitiesData, ListActivitiesVariables>;

interface ListActivitiesRef {
  ...
  (dc: DataConnect, vars: ListActivitiesVariables): QueryRef<ListActivitiesData, ListActivitiesVariables>;
}
export const listActivitiesRef: ListActivitiesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActivitiesRef:
```typescript
const name = listActivitiesRef.operationName;
console.log(name);
```

### Variables
The `ListActivities` query requires an argument of type `ListActivitiesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListActivitiesVariables {
  tripId: UUIDString;
}
```
### Return Type
Recall that executing the `ListActivities` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActivitiesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListActivitiesData {
  activities: ({
    title: string;
    startTime: TimestampString;
  })[];
}
```
### Using `ListActivities`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActivities, ListActivitiesVariables } from '@dataconnect/generated';

// The `ListActivities` query requires an argument of type `ListActivitiesVariables`:
const listActivitiesVars: ListActivitiesVariables = {
  tripId: ..., 
};

// Call the `listActivities()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActivities(listActivitiesVars);
// Variables can be defined inline as well.
const { data } = await listActivities({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActivities(dataConnect, listActivitiesVars);

console.log(data.activities);

// Or, you can use the `Promise` API.
listActivities(listActivitiesVars).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

### Using `ListActivities`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActivitiesRef, ListActivitiesVariables } from '@dataconnect/generated';

// The `ListActivities` query requires an argument of type `ListActivitiesVariables`:
const listActivitiesVars: ListActivitiesVariables = {
  tripId: ..., 
};

// Call the `listActivitiesRef()` function to get a reference to the query.
const ref = listActivitiesRef(listActivitiesVars);
// Variables can be defined inline as well.
const ref = listActivitiesRef({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActivitiesRef(dataConnect, listActivitiesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activities);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activities);
});
```

## GetExpense
You can execute the `GetExpense` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getExpense(vars: GetExpenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetExpenseData, GetExpenseVariables>;

interface GetExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExpenseVariables): QueryRef<GetExpenseData, GetExpenseVariables>;
}
export const getExpenseRef: GetExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExpense(dc: DataConnect, vars: GetExpenseVariables, options?: ExecuteQueryOptions): QueryPromise<GetExpenseData, GetExpenseVariables>;

interface GetExpenseRef {
  ...
  (dc: DataConnect, vars: GetExpenseVariables): QueryRef<GetExpenseData, GetExpenseVariables>;
}
export const getExpenseRef: GetExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExpenseRef:
```typescript
const name = getExpenseRef.operationName;
console.log(name);
```

### Variables
The `GetExpense` query requires an argument of type `GetExpenseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExpenseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetExpense` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExpenseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetExpenseData {
  expense?: {
    amount: number;
    description?: string | null;
  };
}
```
### Using `GetExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExpense, GetExpenseVariables } from '@dataconnect/generated';

// The `GetExpense` query requires an argument of type `GetExpenseVariables`:
const getExpenseVars: GetExpenseVariables = {
  id: ..., 
};

// Call the `getExpense()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExpense(getExpenseVars);
// Variables can be defined inline as well.
const { data } = await getExpense({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExpense(dataConnect, getExpenseVars);

console.log(data.expense);

// Or, you can use the `Promise` API.
getExpense(getExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense);
});
```

### Using `GetExpense`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExpenseRef, GetExpenseVariables } from '@dataconnect/generated';

// The `GetExpense` query requires an argument of type `GetExpenseVariables`:
const getExpenseVars: GetExpenseVariables = {
  id: ..., 
};

// Call the `getExpenseRef()` function to get a reference to the query.
const ref = getExpenseRef(getExpenseVars);
// Variables can be defined inline as well.
const ref = getExpenseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExpenseRef(dataConnect, getExpenseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expense);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expense);
});
```

## ListExpenses
You can execute the `ListExpenses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listExpenses(vars: ListExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpensesData, ListExpensesVariables>;

interface ListExpensesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExpensesVariables): QueryRef<ListExpensesData, ListExpensesVariables>;
}
export const listExpensesRef: ListExpensesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExpenses(dc: DataConnect, vars: ListExpensesVariables, options?: ExecuteQueryOptions): QueryPromise<ListExpensesData, ListExpensesVariables>;

interface ListExpensesRef {
  ...
  (dc: DataConnect, vars: ListExpensesVariables): QueryRef<ListExpensesData, ListExpensesVariables>;
}
export const listExpensesRef: ListExpensesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExpensesRef:
```typescript
const name = listExpensesRef.operationName;
console.log(name);
```

### Variables
The `ListExpenses` query requires an argument of type `ListExpensesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExpensesVariables {
  tripId: UUIDString;
}
```
### Return Type
Recall that executing the `ListExpenses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExpensesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExpensesData {
  expenses: ({
    amount: number;
    paidBy: {
      username: string;
    };
  })[];
}
```
### Using `ListExpenses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExpenses, ListExpensesVariables } from '@dataconnect/generated';

// The `ListExpenses` query requires an argument of type `ListExpensesVariables`:
const listExpensesVars: ListExpensesVariables = {
  tripId: ..., 
};

// Call the `listExpenses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExpenses(listExpensesVars);
// Variables can be defined inline as well.
const { data } = await listExpenses({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExpenses(dataConnect, listExpensesVars);

console.log(data.expenses);

// Or, you can use the `Promise` API.
listExpenses(listExpensesVars).then((response) => {
  const data = response.data;
  console.log(data.expenses);
});
```

### Using `ListExpenses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExpensesRef, ListExpensesVariables } from '@dataconnect/generated';

// The `ListExpenses` query requires an argument of type `ListExpensesVariables`:
const listExpensesVars: ListExpensesVariables = {
  tripId: ..., 
};

// Call the `listExpensesRef()` function to get a reference to the query.
const ref = listExpensesRef(listExpensesVars);
// Variables can be defined inline as well.
const ref = listExpensesRef({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExpensesRef(dataConnect, listExpensesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.expenses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.expenses);
});
```

## GetMemory
You can execute the `GetMemory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMemory(vars: GetMemoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemoryData, GetMemoryVariables>;

interface GetMemoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMemoryVariables): QueryRef<GetMemoryData, GetMemoryVariables>;
}
export const getMemoryRef: GetMemoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMemory(dc: DataConnect, vars: GetMemoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetMemoryData, GetMemoryVariables>;

interface GetMemoryRef {
  ...
  (dc: DataConnect, vars: GetMemoryVariables): QueryRef<GetMemoryData, GetMemoryVariables>;
}
export const getMemoryRef: GetMemoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMemoryRef:
```typescript
const name = getMemoryRef.operationName;
console.log(name);
```

### Variables
The `GetMemory` query requires an argument of type `GetMemoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMemoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetMemory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMemoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMemoryData {
  memory?: {
    content: string;
    photoUrl?: string | null;
  };
}
```
### Using `GetMemory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMemory, GetMemoryVariables } from '@dataconnect/generated';

// The `GetMemory` query requires an argument of type `GetMemoryVariables`:
const getMemoryVars: GetMemoryVariables = {
  id: ..., 
};

// Call the `getMemory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMemory(getMemoryVars);
// Variables can be defined inline as well.
const { data } = await getMemory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMemory(dataConnect, getMemoryVars);

console.log(data.memory);

// Or, you can use the `Promise` API.
getMemory(getMemoryVars).then((response) => {
  const data = response.data;
  console.log(data.memory);
});
```

### Using `GetMemory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMemoryRef, GetMemoryVariables } from '@dataconnect/generated';

// The `GetMemory` query requires an argument of type `GetMemoryVariables`:
const getMemoryVars: GetMemoryVariables = {
  id: ..., 
};

// Call the `getMemoryRef()` function to get a reference to the query.
const ref = getMemoryRef(getMemoryVars);
// Variables can be defined inline as well.
const ref = getMemoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMemoryRef(dataConnect, getMemoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memory);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memory);
});
```

## ListMemories
You can execute the `ListMemories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMemories(vars: ListMemoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMemoriesData, ListMemoriesVariables>;

interface ListMemoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListMemoriesVariables): QueryRef<ListMemoriesData, ListMemoriesVariables>;
}
export const listMemoriesRef: ListMemoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMemories(dc: DataConnect, vars: ListMemoriesVariables, options?: ExecuteQueryOptions): QueryPromise<ListMemoriesData, ListMemoriesVariables>;

interface ListMemoriesRef {
  ...
  (dc: DataConnect, vars: ListMemoriesVariables): QueryRef<ListMemoriesData, ListMemoriesVariables>;
}
export const listMemoriesRef: ListMemoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMemoriesRef:
```typescript
const name = listMemoriesRef.operationName;
console.log(name);
```

### Variables
The `ListMemories` query requires an argument of type `ListMemoriesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListMemoriesVariables {
  tripId: UUIDString;
}
```
### Return Type
Recall that executing the `ListMemories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMemoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMemoriesData {
  memories: ({
    content: string;
    author: {
      username: string;
    };
  })[];
}
```
### Using `ListMemories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMemories, ListMemoriesVariables } from '@dataconnect/generated';

// The `ListMemories` query requires an argument of type `ListMemoriesVariables`:
const listMemoriesVars: ListMemoriesVariables = {
  tripId: ..., 
};

// Call the `listMemories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMemories(listMemoriesVars);
// Variables can be defined inline as well.
const { data } = await listMemories({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMemories(dataConnect, listMemoriesVars);

console.log(data.memories);

// Or, you can use the `Promise` API.
listMemories(listMemoriesVars).then((response) => {
  const data = response.data;
  console.log(data.memories);
});
```

### Using `ListMemories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMemoriesRef, ListMemoriesVariables } from '@dataconnect/generated';

// The `ListMemories` query requires an argument of type `ListMemoriesVariables`:
const listMemoriesVars: ListMemoriesVariables = {
  tripId: ..., 
};

// Call the `listMemoriesRef()` function to get a reference to the query.
const ref = listMemoriesRef(listMemoriesVars);
// Variables can be defined inline as well.
const ref = listMemoriesRef({ tripId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMemoriesRef(dataConnect, listMemoriesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.memories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.memories);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect): MutationPromise<UpdateUserData, undefined>;

interface UpdateUserRef {
  ...
  (dc: DataConnect): MutationRef<UpdateUserData, undefined>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has no variables.
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser } from '@dataconnect/generated';


// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser().then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef } from '@dataconnect/generated';


// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateTrip
You can execute the `CreateTrip` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTrip(): MutationPromise<CreateTripData, undefined>;

interface CreateTripRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTripData, undefined>;
}
export const createTripRef: CreateTripRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTrip(dc: DataConnect): MutationPromise<CreateTripData, undefined>;

interface CreateTripRef {
  ...
  (dc: DataConnect): MutationRef<CreateTripData, undefined>;
}
export const createTripRef: CreateTripRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTripRef:
```typescript
const name = createTripRef.operationName;
console.log(name);
```

### Variables
The `CreateTrip` mutation has no variables.
### Return Type
Recall that executing the `CreateTrip` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTripData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTripData {
  trip_insert: Trip_Key;
}
```
### Using `CreateTrip`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTrip } from '@dataconnect/generated';


// Call the `createTrip()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTrip();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTrip(dataConnect);

console.log(data.trip_insert);

// Or, you can use the `Promise` API.
createTrip().then((response) => {
  const data = response.data;
  console.log(data.trip_insert);
});
```

### Using `CreateTrip`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTripRef } from '@dataconnect/generated';


// Call the `createTripRef()` function to get a reference to the mutation.
const ref = createTripRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTripRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.trip_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.trip_insert);
});
```

## UpdateTrip
You can execute the `UpdateTrip` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTrip(vars: UpdateTripVariables): MutationPromise<UpdateTripData, UpdateTripVariables>;

interface UpdateTripRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTripVariables): MutationRef<UpdateTripData, UpdateTripVariables>;
}
export const updateTripRef: UpdateTripRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTrip(dc: DataConnect, vars: UpdateTripVariables): MutationPromise<UpdateTripData, UpdateTripVariables>;

interface UpdateTripRef {
  ...
  (dc: DataConnect, vars: UpdateTripVariables): MutationRef<UpdateTripData, UpdateTripVariables>;
}
export const updateTripRef: UpdateTripRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTripRef:
```typescript
const name = updateTripRef.operationName;
console.log(name);
```

### Variables
The `UpdateTrip` mutation requires an argument of type `UpdateTripVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTripVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateTrip` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTripData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTripData {
  trip_update?: Trip_Key | null;
}
```
### Using `UpdateTrip`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTrip, UpdateTripVariables } from '@dataconnect/generated';

// The `UpdateTrip` mutation requires an argument of type `UpdateTripVariables`:
const updateTripVars: UpdateTripVariables = {
  id: ..., 
};

// Call the `updateTrip()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTrip(updateTripVars);
// Variables can be defined inline as well.
const { data } = await updateTrip({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTrip(dataConnect, updateTripVars);

console.log(data.trip_update);

// Or, you can use the `Promise` API.
updateTrip(updateTripVars).then((response) => {
  const data = response.data;
  console.log(data.trip_update);
});
```

### Using `UpdateTrip`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTripRef, UpdateTripVariables } from '@dataconnect/generated';

// The `UpdateTrip` mutation requires an argument of type `UpdateTripVariables`:
const updateTripVars: UpdateTripVariables = {
  id: ..., 
};

// Call the `updateTripRef()` function to get a reference to the mutation.
const ref = updateTripRef(updateTripVars);
// Variables can be defined inline as well.
const ref = updateTripRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTripRef(dataConnect, updateTripVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.trip_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.trip_update);
});
```

## DeleteTrip
You can execute the `DeleteTrip` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTrip(vars: DeleteTripVariables): MutationPromise<DeleteTripData, DeleteTripVariables>;

interface DeleteTripRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTripVariables): MutationRef<DeleteTripData, DeleteTripVariables>;
}
export const deleteTripRef: DeleteTripRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTrip(dc: DataConnect, vars: DeleteTripVariables): MutationPromise<DeleteTripData, DeleteTripVariables>;

interface DeleteTripRef {
  ...
  (dc: DataConnect, vars: DeleteTripVariables): MutationRef<DeleteTripData, DeleteTripVariables>;
}
export const deleteTripRef: DeleteTripRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTripRef:
```typescript
const name = deleteTripRef.operationName;
console.log(name);
```

### Variables
The `DeleteTrip` mutation requires an argument of type `DeleteTripVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTripVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTrip` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTripData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTripData {
  trip_delete?: Trip_Key | null;
}
```
### Using `DeleteTrip`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTrip, DeleteTripVariables } from '@dataconnect/generated';

// The `DeleteTrip` mutation requires an argument of type `DeleteTripVariables`:
const deleteTripVars: DeleteTripVariables = {
  id: ..., 
};

// Call the `deleteTrip()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTrip(deleteTripVars);
// Variables can be defined inline as well.
const { data } = await deleteTrip({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTrip(dataConnect, deleteTripVars);

console.log(data.trip_delete);

// Or, you can use the `Promise` API.
deleteTrip(deleteTripVars).then((response) => {
  const data = response.data;
  console.log(data.trip_delete);
});
```

### Using `DeleteTrip`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTripRef, DeleteTripVariables } from '@dataconnect/generated';

// The `DeleteTrip` mutation requires an argument of type `DeleteTripVariables`:
const deleteTripVars: DeleteTripVariables = {
  id: ..., 
};

// Call the `deleteTripRef()` function to get a reference to the mutation.
const ref = deleteTripRef(deleteTripVars);
// Variables can be defined inline as well.
const ref = deleteTripRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTripRef(dataConnect, deleteTripVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.trip_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.trip_delete);
});
```

## AddTripMember
You can execute the `AddTripMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addTripMember(vars: AddTripMemberVariables): MutationPromise<AddTripMemberData, AddTripMemberVariables>;

interface AddTripMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddTripMemberVariables): MutationRef<AddTripMemberData, AddTripMemberVariables>;
}
export const addTripMemberRef: AddTripMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addTripMember(dc: DataConnect, vars: AddTripMemberVariables): MutationPromise<AddTripMemberData, AddTripMemberVariables>;

interface AddTripMemberRef {
  ...
  (dc: DataConnect, vars: AddTripMemberVariables): MutationRef<AddTripMemberData, AddTripMemberVariables>;
}
export const addTripMemberRef: AddTripMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addTripMemberRef:
```typescript
const name = addTripMemberRef.operationName;
console.log(name);
```

### Variables
The `AddTripMember` mutation requires an argument of type `AddTripMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddTripMemberVariables {
  tripId: UUIDString;
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `AddTripMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddTripMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddTripMemberData {
  tripMember_insert: TripMember_Key;
}
```
### Using `AddTripMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addTripMember, AddTripMemberVariables } from '@dataconnect/generated';

// The `AddTripMember` mutation requires an argument of type `AddTripMemberVariables`:
const addTripMemberVars: AddTripMemberVariables = {
  tripId: ..., 
  userId: ..., 
};

// Call the `addTripMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addTripMember(addTripMemberVars);
// Variables can be defined inline as well.
const { data } = await addTripMember({ tripId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addTripMember(dataConnect, addTripMemberVars);

console.log(data.tripMember_insert);

// Or, you can use the `Promise` API.
addTripMember(addTripMemberVars).then((response) => {
  const data = response.data;
  console.log(data.tripMember_insert);
});
```

### Using `AddTripMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addTripMemberRef, AddTripMemberVariables } from '@dataconnect/generated';

// The `AddTripMember` mutation requires an argument of type `AddTripMemberVariables`:
const addTripMemberVars: AddTripMemberVariables = {
  tripId: ..., 
  userId: ..., 
};

// Call the `addTripMemberRef()` function to get a reference to the mutation.
const ref = addTripMemberRef(addTripMemberVars);
// Variables can be defined inline as well.
const ref = addTripMemberRef({ tripId: ..., userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addTripMemberRef(dataConnect, addTripMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tripMember_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tripMember_insert);
});
```

## UpdateTripMember
You can execute the `UpdateTripMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTripMember(vars: UpdateTripMemberVariables): MutationPromise<UpdateTripMemberData, UpdateTripMemberVariables>;

interface UpdateTripMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTripMemberVariables): MutationRef<UpdateTripMemberData, UpdateTripMemberVariables>;
}
export const updateTripMemberRef: UpdateTripMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTripMember(dc: DataConnect, vars: UpdateTripMemberVariables): MutationPromise<UpdateTripMemberData, UpdateTripMemberVariables>;

interface UpdateTripMemberRef {
  ...
  (dc: DataConnect, vars: UpdateTripMemberVariables): MutationRef<UpdateTripMemberData, UpdateTripMemberVariables>;
}
export const updateTripMemberRef: UpdateTripMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTripMemberRef:
```typescript
const name = updateTripMemberRef.operationName;
console.log(name);
```

### Variables
The `UpdateTripMember` mutation requires an argument of type `UpdateTripMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTripMemberVariables {
  id: UUIDString;
  role: string;
}
```
### Return Type
Recall that executing the `UpdateTripMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTripMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTripMemberData {
  tripMember_update?: TripMember_Key | null;
}
```
### Using `UpdateTripMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTripMember, UpdateTripMemberVariables } from '@dataconnect/generated';

// The `UpdateTripMember` mutation requires an argument of type `UpdateTripMemberVariables`:
const updateTripMemberVars: UpdateTripMemberVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateTripMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTripMember(updateTripMemberVars);
// Variables can be defined inline as well.
const { data } = await updateTripMember({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTripMember(dataConnect, updateTripMemberVars);

console.log(data.tripMember_update);

// Or, you can use the `Promise` API.
updateTripMember(updateTripMemberVars).then((response) => {
  const data = response.data;
  console.log(data.tripMember_update);
});
```

### Using `UpdateTripMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTripMemberRef, UpdateTripMemberVariables } from '@dataconnect/generated';

// The `UpdateTripMember` mutation requires an argument of type `UpdateTripMemberVariables`:
const updateTripMemberVars: UpdateTripMemberVariables = {
  id: ..., 
  role: ..., 
};

// Call the `updateTripMemberRef()` function to get a reference to the mutation.
const ref = updateTripMemberRef(updateTripMemberVars);
// Variables can be defined inline as well.
const ref = updateTripMemberRef({ id: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTripMemberRef(dataConnect, updateTripMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tripMember_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tripMember_update);
});
```

## RemoveTripMember
You can execute the `RemoveTripMember` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeTripMember(vars: RemoveTripMemberVariables): MutationPromise<RemoveTripMemberData, RemoveTripMemberVariables>;

interface RemoveTripMemberRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveTripMemberVariables): MutationRef<RemoveTripMemberData, RemoveTripMemberVariables>;
}
export const removeTripMemberRef: RemoveTripMemberRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeTripMember(dc: DataConnect, vars: RemoveTripMemberVariables): MutationPromise<RemoveTripMemberData, RemoveTripMemberVariables>;

interface RemoveTripMemberRef {
  ...
  (dc: DataConnect, vars: RemoveTripMemberVariables): MutationRef<RemoveTripMemberData, RemoveTripMemberVariables>;
}
export const removeTripMemberRef: RemoveTripMemberRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeTripMemberRef:
```typescript
const name = removeTripMemberRef.operationName;
console.log(name);
```

### Variables
The `RemoveTripMember` mutation requires an argument of type `RemoveTripMemberVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveTripMemberVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveTripMember` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveTripMemberData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveTripMemberData {
  tripMember_delete?: TripMember_Key | null;
}
```
### Using `RemoveTripMember`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeTripMember, RemoveTripMemberVariables } from '@dataconnect/generated';

// The `RemoveTripMember` mutation requires an argument of type `RemoveTripMemberVariables`:
const removeTripMemberVars: RemoveTripMemberVariables = {
  id: ..., 
};

// Call the `removeTripMember()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeTripMember(removeTripMemberVars);
// Variables can be defined inline as well.
const { data } = await removeTripMember({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeTripMember(dataConnect, removeTripMemberVars);

console.log(data.tripMember_delete);

// Or, you can use the `Promise` API.
removeTripMember(removeTripMemberVars).then((response) => {
  const data = response.data;
  console.log(data.tripMember_delete);
});
```

### Using `RemoveTripMember`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeTripMemberRef, RemoveTripMemberVariables } from '@dataconnect/generated';

// The `RemoveTripMember` mutation requires an argument of type `RemoveTripMemberVariables`:
const removeTripMemberVars: RemoveTripMemberVariables = {
  id: ..., 
};

// Call the `removeTripMemberRef()` function to get a reference to the mutation.
const ref = removeTripMemberRef(removeTripMemberVars);
// Variables can be defined inline as well.
const ref = removeTripMemberRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeTripMemberRef(dataConnect, removeTripMemberVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.tripMember_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.tripMember_delete);
});
```

## CreateActivity
You can execute the `CreateActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createActivity(vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface CreateActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
}
export const createActivityRef: CreateActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createActivity(dc: DataConnect, vars: CreateActivityVariables): MutationPromise<CreateActivityData, CreateActivityVariables>;

interface CreateActivityRef {
  ...
  (dc: DataConnect, vars: CreateActivityVariables): MutationRef<CreateActivityData, CreateActivityVariables>;
}
export const createActivityRef: CreateActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createActivityRef:
```typescript
const name = createActivityRef.operationName;
console.log(name);
```

### Variables
The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateActivityVariables {
  tripId: UUIDString;
  title: string;
  startTime: TimestampString;
}
```
### Return Type
Recall that executing the `CreateActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateActivityData {
  activity_insert: Activity_Key;
}
```
### Using `CreateActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createActivity, CreateActivityVariables } from '@dataconnect/generated';

// The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`:
const createActivityVars: CreateActivityVariables = {
  tripId: ..., 
  title: ..., 
  startTime: ..., 
};

// Call the `createActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createActivity(createActivityVars);
// Variables can be defined inline as well.
const { data } = await createActivity({ tripId: ..., title: ..., startTime: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createActivity(dataConnect, createActivityVars);

console.log(data.activity_insert);

// Or, you can use the `Promise` API.
createActivity(createActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity_insert);
});
```

### Using `CreateActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createActivityRef, CreateActivityVariables } from '@dataconnect/generated';

// The `CreateActivity` mutation requires an argument of type `CreateActivityVariables`:
const createActivityVars: CreateActivityVariables = {
  tripId: ..., 
  title: ..., 
  startTime: ..., 
};

// Call the `createActivityRef()` function to get a reference to the mutation.
const ref = createActivityRef(createActivityVars);
// Variables can be defined inline as well.
const ref = createActivityRef({ tripId: ..., title: ..., startTime: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createActivityRef(dataConnect, createActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_insert);
});
```

## UpdateActivity
You can execute the `UpdateActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateActivity(vars: UpdateActivityVariables): MutationPromise<UpdateActivityData, UpdateActivityVariables>;

interface UpdateActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateActivityVariables): MutationRef<UpdateActivityData, UpdateActivityVariables>;
}
export const updateActivityRef: UpdateActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateActivity(dc: DataConnect, vars: UpdateActivityVariables): MutationPromise<UpdateActivityData, UpdateActivityVariables>;

interface UpdateActivityRef {
  ...
  (dc: DataConnect, vars: UpdateActivityVariables): MutationRef<UpdateActivityData, UpdateActivityVariables>;
}
export const updateActivityRef: UpdateActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateActivityRef:
```typescript
const name = updateActivityRef.operationName;
console.log(name);
```

### Variables
The `UpdateActivity` mutation requires an argument of type `UpdateActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateActivityVariables {
  id: UUIDString;
  notes: string;
}
```
### Return Type
Recall that executing the `UpdateActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateActivityData {
  activity_update?: Activity_Key | null;
}
```
### Using `UpdateActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateActivity, UpdateActivityVariables } from '@dataconnect/generated';

// The `UpdateActivity` mutation requires an argument of type `UpdateActivityVariables`:
const updateActivityVars: UpdateActivityVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updateActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateActivity(updateActivityVars);
// Variables can be defined inline as well.
const { data } = await updateActivity({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateActivity(dataConnect, updateActivityVars);

console.log(data.activity_update);

// Or, you can use the `Promise` API.
updateActivity(updateActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity_update);
});
```

### Using `UpdateActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateActivityRef, UpdateActivityVariables } from '@dataconnect/generated';

// The `UpdateActivity` mutation requires an argument of type `UpdateActivityVariables`:
const updateActivityVars: UpdateActivityVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updateActivityRef()` function to get a reference to the mutation.
const ref = updateActivityRef(updateActivityVars);
// Variables can be defined inline as well.
const ref = updateActivityRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateActivityRef(dataConnect, updateActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_update);
});
```

## DeleteActivity
You can execute the `DeleteActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteActivity(vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface DeleteActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
}
export const deleteActivityRef: DeleteActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteActivity(dc: DataConnect, vars: DeleteActivityVariables): MutationPromise<DeleteActivityData, DeleteActivityVariables>;

interface DeleteActivityRef {
  ...
  (dc: DataConnect, vars: DeleteActivityVariables): MutationRef<DeleteActivityData, DeleteActivityVariables>;
}
export const deleteActivityRef: DeleteActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteActivityRef:
```typescript
const name = deleteActivityRef.operationName;
console.log(name);
```

### Variables
The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteActivityVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteActivityData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteActivityData {
  activity_delete?: Activity_Key | null;
}
```
### Using `DeleteActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteActivity, DeleteActivityVariables } from '@dataconnect/generated';

// The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`:
const deleteActivityVars: DeleteActivityVariables = {
  id: ..., 
};

// Call the `deleteActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteActivity(deleteActivityVars);
// Variables can be defined inline as well.
const { data } = await deleteActivity({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteActivity(dataConnect, deleteActivityVars);

console.log(data.activity_delete);

// Or, you can use the `Promise` API.
deleteActivity(deleteActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activity_delete);
});
```

### Using `DeleteActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteActivityRef, DeleteActivityVariables } from '@dataconnect/generated';

// The `DeleteActivity` mutation requires an argument of type `DeleteActivityVariables`:
const deleteActivityVars: DeleteActivityVariables = {
  id: ..., 
};

// Call the `deleteActivityRef()` function to get a reference to the mutation.
const ref = deleteActivityRef(deleteActivityVars);
// Variables can be defined inline as well.
const ref = deleteActivityRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteActivityRef(dataConnect, deleteActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activity_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activity_delete);
});
```

## CreateExpense
You can execute the `CreateExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createExpense(vars: CreateExpenseVariables): MutationPromise<CreateExpenseData, CreateExpenseVariables>;

interface CreateExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateExpenseVariables): MutationRef<CreateExpenseData, CreateExpenseVariables>;
}
export const createExpenseRef: CreateExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createExpense(dc: DataConnect, vars: CreateExpenseVariables): MutationPromise<CreateExpenseData, CreateExpenseVariables>;

interface CreateExpenseRef {
  ...
  (dc: DataConnect, vars: CreateExpenseVariables): MutationRef<CreateExpenseData, CreateExpenseVariables>;
}
export const createExpenseRef: CreateExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createExpenseRef:
```typescript
const name = createExpenseRef.operationName;
console.log(name);
```

### Variables
The `CreateExpense` mutation requires an argument of type `CreateExpenseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateExpenseVariables {
  tripId: UUIDString;
  amount: number;
}
```
### Return Type
Recall that executing the `CreateExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateExpenseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateExpenseData {
  expense_insert: Expense_Key;
}
```
### Using `CreateExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createExpense, CreateExpenseVariables } from '@dataconnect/generated';

// The `CreateExpense` mutation requires an argument of type `CreateExpenseVariables`:
const createExpenseVars: CreateExpenseVariables = {
  tripId: ..., 
  amount: ..., 
};

// Call the `createExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createExpense(createExpenseVars);
// Variables can be defined inline as well.
const { data } = await createExpense({ tripId: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createExpense(dataConnect, createExpenseVars);

console.log(data.expense_insert);

// Or, you can use the `Promise` API.
createExpense(createExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_insert);
});
```

### Using `CreateExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createExpenseRef, CreateExpenseVariables } from '@dataconnect/generated';

// The `CreateExpense` mutation requires an argument of type `CreateExpenseVariables`:
const createExpenseVars: CreateExpenseVariables = {
  tripId: ..., 
  amount: ..., 
};

// Call the `createExpenseRef()` function to get a reference to the mutation.
const ref = createExpenseRef(createExpenseVars);
// Variables can be defined inline as well.
const ref = createExpenseRef({ tripId: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createExpenseRef(dataConnect, createExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_insert);
});
```

## UpdateExpense
You can execute the `UpdateExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateExpense(vars: UpdateExpenseVariables): MutationPromise<UpdateExpenseData, UpdateExpenseVariables>;

interface UpdateExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateExpenseVariables): MutationRef<UpdateExpenseData, UpdateExpenseVariables>;
}
export const updateExpenseRef: UpdateExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateExpense(dc: DataConnect, vars: UpdateExpenseVariables): MutationPromise<UpdateExpenseData, UpdateExpenseVariables>;

interface UpdateExpenseRef {
  ...
  (dc: DataConnect, vars: UpdateExpenseVariables): MutationRef<UpdateExpenseData, UpdateExpenseVariables>;
}
export const updateExpenseRef: UpdateExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateExpenseRef:
```typescript
const name = updateExpenseRef.operationName;
console.log(name);
```

### Variables
The `UpdateExpense` mutation requires an argument of type `UpdateExpenseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateExpenseVariables {
  id: UUIDString;
  amount: number;
}
```
### Return Type
Recall that executing the `UpdateExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateExpenseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateExpenseData {
  expense_update?: Expense_Key | null;
}
```
### Using `UpdateExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateExpense, UpdateExpenseVariables } from '@dataconnect/generated';

// The `UpdateExpense` mutation requires an argument of type `UpdateExpenseVariables`:
const updateExpenseVars: UpdateExpenseVariables = {
  id: ..., 
  amount: ..., 
};

// Call the `updateExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateExpense(updateExpenseVars);
// Variables can be defined inline as well.
const { data } = await updateExpense({ id: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateExpense(dataConnect, updateExpenseVars);

console.log(data.expense_update);

// Or, you can use the `Promise` API.
updateExpense(updateExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
});
```

### Using `UpdateExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateExpenseRef, UpdateExpenseVariables } from '@dataconnect/generated';

// The `UpdateExpense` mutation requires an argument of type `UpdateExpenseVariables`:
const updateExpenseVars: UpdateExpenseVariables = {
  id: ..., 
  amount: ..., 
};

// Call the `updateExpenseRef()` function to get a reference to the mutation.
const ref = updateExpenseRef(updateExpenseVars);
// Variables can be defined inline as well.
const ref = updateExpenseRef({ id: ..., amount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateExpenseRef(dataConnect, updateExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_update);
});
```

## DeleteExpense
You can execute the `DeleteExpense` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteExpense(vars: DeleteExpenseVariables): MutationPromise<DeleteExpenseData, DeleteExpenseVariables>;

interface DeleteExpenseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExpenseVariables): MutationRef<DeleteExpenseData, DeleteExpenseVariables>;
}
export const deleteExpenseRef: DeleteExpenseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteExpense(dc: DataConnect, vars: DeleteExpenseVariables): MutationPromise<DeleteExpenseData, DeleteExpenseVariables>;

interface DeleteExpenseRef {
  ...
  (dc: DataConnect, vars: DeleteExpenseVariables): MutationRef<DeleteExpenseData, DeleteExpenseVariables>;
}
export const deleteExpenseRef: DeleteExpenseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteExpenseRef:
```typescript
const name = deleteExpenseRef.operationName;
console.log(name);
```

### Variables
The `DeleteExpense` mutation requires an argument of type `DeleteExpenseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteExpenseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteExpense` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteExpenseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteExpenseData {
  expense_delete?: Expense_Key | null;
}
```
### Using `DeleteExpense`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteExpense, DeleteExpenseVariables } from '@dataconnect/generated';

// The `DeleteExpense` mutation requires an argument of type `DeleteExpenseVariables`:
const deleteExpenseVars: DeleteExpenseVariables = {
  id: ..., 
};

// Call the `deleteExpense()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteExpense(deleteExpenseVars);
// Variables can be defined inline as well.
const { data } = await deleteExpense({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteExpense(dataConnect, deleteExpenseVars);

console.log(data.expense_delete);

// Or, you can use the `Promise` API.
deleteExpense(deleteExpenseVars).then((response) => {
  const data = response.data;
  console.log(data.expense_delete);
});
```

### Using `DeleteExpense`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteExpenseRef, DeleteExpenseVariables } from '@dataconnect/generated';

// The `DeleteExpense` mutation requires an argument of type `DeleteExpenseVariables`:
const deleteExpenseVars: DeleteExpenseVariables = {
  id: ..., 
};

// Call the `deleteExpenseRef()` function to get a reference to the mutation.
const ref = deleteExpenseRef(deleteExpenseVars);
// Variables can be defined inline as well.
const ref = deleteExpenseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteExpenseRef(dataConnect, deleteExpenseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.expense_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.expense_delete);
});
```

## CreateMemory
You can execute the `CreateMemory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createMemory(vars: CreateMemoryVariables): MutationPromise<CreateMemoryData, CreateMemoryVariables>;

interface CreateMemoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateMemoryVariables): MutationRef<CreateMemoryData, CreateMemoryVariables>;
}
export const createMemoryRef: CreateMemoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createMemory(dc: DataConnect, vars: CreateMemoryVariables): MutationPromise<CreateMemoryData, CreateMemoryVariables>;

interface CreateMemoryRef {
  ...
  (dc: DataConnect, vars: CreateMemoryVariables): MutationRef<CreateMemoryData, CreateMemoryVariables>;
}
export const createMemoryRef: CreateMemoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createMemoryRef:
```typescript
const name = createMemoryRef.operationName;
console.log(name);
```

### Variables
The `CreateMemory` mutation requires an argument of type `CreateMemoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateMemoryVariables {
  tripId: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `CreateMemory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateMemoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateMemoryData {
  memory_insert: Memory_Key;
}
```
### Using `CreateMemory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createMemory, CreateMemoryVariables } from '@dataconnect/generated';

// The `CreateMemory` mutation requires an argument of type `CreateMemoryVariables`:
const createMemoryVars: CreateMemoryVariables = {
  tripId: ..., 
  content: ..., 
};

// Call the `createMemory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createMemory(createMemoryVars);
// Variables can be defined inline as well.
const { data } = await createMemory({ tripId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createMemory(dataConnect, createMemoryVars);

console.log(data.memory_insert);

// Or, you can use the `Promise` API.
createMemory(createMemoryVars).then((response) => {
  const data = response.data;
  console.log(data.memory_insert);
});
```

### Using `CreateMemory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createMemoryRef, CreateMemoryVariables } from '@dataconnect/generated';

// The `CreateMemory` mutation requires an argument of type `CreateMemoryVariables`:
const createMemoryVars: CreateMemoryVariables = {
  tripId: ..., 
  content: ..., 
};

// Call the `createMemoryRef()` function to get a reference to the mutation.
const ref = createMemoryRef(createMemoryVars);
// Variables can be defined inline as well.
const ref = createMemoryRef({ tripId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createMemoryRef(dataConnect, createMemoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.memory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.memory_insert);
});
```

## UpdateMemory
You can execute the `UpdateMemory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMemory(vars: UpdateMemoryVariables): MutationPromise<UpdateMemoryData, UpdateMemoryVariables>;

interface UpdateMemoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateMemoryVariables): MutationRef<UpdateMemoryData, UpdateMemoryVariables>;
}
export const updateMemoryRef: UpdateMemoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMemory(dc: DataConnect, vars: UpdateMemoryVariables): MutationPromise<UpdateMemoryData, UpdateMemoryVariables>;

interface UpdateMemoryRef {
  ...
  (dc: DataConnect, vars: UpdateMemoryVariables): MutationRef<UpdateMemoryData, UpdateMemoryVariables>;
}
export const updateMemoryRef: UpdateMemoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMemoryRef:
```typescript
const name = updateMemoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateMemory` mutation requires an argument of type `UpdateMemoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMemoryVariables {
  id: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `UpdateMemory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMemoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMemoryData {
  memory_update?: Memory_Key | null;
}
```
### Using `UpdateMemory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMemory, UpdateMemoryVariables } from '@dataconnect/generated';

// The `UpdateMemory` mutation requires an argument of type `UpdateMemoryVariables`:
const updateMemoryVars: UpdateMemoryVariables = {
  id: ..., 
  content: ..., 
};

// Call the `updateMemory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMemory(updateMemoryVars);
// Variables can be defined inline as well.
const { data } = await updateMemory({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMemory(dataConnect, updateMemoryVars);

console.log(data.memory_update);

// Or, you can use the `Promise` API.
updateMemory(updateMemoryVars).then((response) => {
  const data = response.data;
  console.log(data.memory_update);
});
```

### Using `UpdateMemory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMemoryRef, UpdateMemoryVariables } from '@dataconnect/generated';

// The `UpdateMemory` mutation requires an argument of type `UpdateMemoryVariables`:
const updateMemoryVars: UpdateMemoryVariables = {
  id: ..., 
  content: ..., 
};

// Call the `updateMemoryRef()` function to get a reference to the mutation.
const ref = updateMemoryRef(updateMemoryVars);
// Variables can be defined inline as well.
const ref = updateMemoryRef({ id: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMemoryRef(dataConnect, updateMemoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.memory_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.memory_update);
});
```

## DeleteMemory
You can execute the `DeleteMemory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteMemory(vars: DeleteMemoryVariables): MutationPromise<DeleteMemoryData, DeleteMemoryVariables>;

interface DeleteMemoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteMemoryVariables): MutationRef<DeleteMemoryData, DeleteMemoryVariables>;
}
export const deleteMemoryRef: DeleteMemoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteMemory(dc: DataConnect, vars: DeleteMemoryVariables): MutationPromise<DeleteMemoryData, DeleteMemoryVariables>;

interface DeleteMemoryRef {
  ...
  (dc: DataConnect, vars: DeleteMemoryVariables): MutationRef<DeleteMemoryData, DeleteMemoryVariables>;
}
export const deleteMemoryRef: DeleteMemoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteMemoryRef:
```typescript
const name = deleteMemoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteMemory` mutation requires an argument of type `DeleteMemoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteMemoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteMemory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteMemoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteMemoryData {
  memory_delete?: Memory_Key | null;
}
```
### Using `DeleteMemory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteMemory, DeleteMemoryVariables } from '@dataconnect/generated';

// The `DeleteMemory` mutation requires an argument of type `DeleteMemoryVariables`:
const deleteMemoryVars: DeleteMemoryVariables = {
  id: ..., 
};

// Call the `deleteMemory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteMemory(deleteMemoryVars);
// Variables can be defined inline as well.
const { data } = await deleteMemory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteMemory(dataConnect, deleteMemoryVars);

console.log(data.memory_delete);

// Or, you can use the `Promise` API.
deleteMemory(deleteMemoryVars).then((response) => {
  const data = response.data;
  console.log(data.memory_delete);
});
```

### Using `DeleteMemory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteMemoryRef, DeleteMemoryVariables } from '@dataconnect/generated';

// The `DeleteMemory` mutation requires an argument of type `DeleteMemoryVariables`:
const deleteMemoryVars: DeleteMemoryVariables = {
  id: ..., 
};

// Call the `deleteMemoryRef()` function to get a reference to the mutation.
const ref = deleteMemoryRef(deleteMemoryVars);
// Variables can be defined inline as well.
const ref = deleteMemoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteMemoryRef(dataConnect, deleteMemoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.memory_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.memory_delete);
});
```

