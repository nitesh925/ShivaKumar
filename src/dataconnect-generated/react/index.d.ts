import { CreateDemoUserData, ListProductsData, CreateOrderData, CreateOrderVariables, MyOrdersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDemoUser(options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;
export function useCreateDemoUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;

export function useListProducts(options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;
export function useListProducts(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;

export function useCreateOrder(options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
export function useCreateOrder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;

export function useMyOrders(options?: useDataConnectQueryOptions<MyOrdersData>): UseDataConnectQueryResult<MyOrdersData, undefined>;
export function useMyOrders(dc: DataConnect, options?: useDataConnectQueryOptions<MyOrdersData>): UseDataConnectQueryResult<MyOrdersData, undefined>;
