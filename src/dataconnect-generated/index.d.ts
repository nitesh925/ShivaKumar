import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDemoUserData {
  user_insert: User_Key;
}

export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderVariables {
  userId: UUIDString;
  totalAmount: number;
  status: string;
  orderDate: TimestampString;
}

export interface ListProductsData {
  products: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
  } & Product_Key)[];
}

export interface MyOrdersData {
  orders: ({
    id: UUIDString;
    totalAmount: number;
    status: string;
    orderDate: TimestampString;
  } & Order_Key)[];
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateDemoUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
  operationName: string;
}
export const createDemoUserRef: CreateDemoUserRef;

export function createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;
export function createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface ListProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
  operationName: string;
}
export const listProductsRef: ListProductsRef;

export function listProducts(): QueryPromise<ListProductsData, undefined>;
export function listProducts(dc: DataConnect): QueryPromise<ListProductsData, undefined>;

interface CreateOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  operationName: string;
}
export const createOrderRef: CreateOrderRef;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface MyOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<MyOrdersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<MyOrdersData, undefined>;
  operationName: string;
}
export const myOrdersRef: MyOrdersRef;

export function myOrders(): QueryPromise<MyOrdersData, undefined>;
export function myOrders(dc: DataConnect): QueryPromise<MyOrdersData, undefined>;

