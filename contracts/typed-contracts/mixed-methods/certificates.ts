/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/certificates';
import type * as ReturnTypes from '../types-returns/certificates';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/certificates.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/certificates.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* issueCertificate
	*
	* @param { ArgumentTypes.AccountId } studentId,
	* @param { string } courseId,
	* @param { string } certificateHash,
	* @returns { void }
	*/
	"issueCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		certificateHash: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "issueCertificate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [studentId, courseId, certificateHash], __options);
	}

	/**
	* verifyCertificate
	*
	* @param { ArgumentTypes.AccountId } studentId,
	* @param { string } courseId,
	* @returns { Result<string | null, ReturnTypes.LangError> }
	*/
	"verifyCertificate" (
		studentId: ArgumentTypes.AccountId,
		courseId: string,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<string | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "verifyCertificate", [studentId, courseId], __options, (result) => { return handleReturnType(result, getTypeDescription(7, DATA_TYPE_DESCRIPTIONS)); });
	}

}